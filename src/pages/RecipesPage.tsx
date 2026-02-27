import { useState, useEffect, useRef } from 'react';
import { Clock, Users, ChefHat, Search, Filter, ExternalLink, Share2, Bookmark, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  cook: string;
  time: string;
  difficulty: string;
  servings: number;
  category: string;
  ingredients: string[];
  instructions: string[];
  featured?: boolean;
}

export function RecipesPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const categories = [
    'All',
    'Appetizers',
    'Soups & Chowders',
    'Seafood',
    'Meat & Poultry',
    'Vegetarian',
    'Potatoes',
    'Breads',
    'Desserts',
    'Preserves'
  ];

  const recipes: Recipe[] = [
    {
      id: 1,
      name: "Classic PEI Lobster Rolls",
      image: "/images/recipe-lobster-roll.jpg",
      description: "Fresh Atlantic lobster meat tossed in a light mayo dressing, served in buttery toasted buns with a side of crispy fries.",
      cook: "Sarah MacDonald",
      time: "25 min",
      difficulty: "Easy",
      servings: 4,
      category: "Seafood",
      featured: true,
      ingredients: [
        "2 lbs fresh PEI lobster meat, cooked and chopped",
        "1/2 cup mayonnaise",
        "2 tbsp fresh lemon juice",
        "2 tbsp chopped fresh chives",
        "Salt and pepper to taste",
        "4 hot dog buns, split and toasted",
        "4 tbsp butter, melted",
        "Lettuce leaves for serving"
      ],
      instructions: [
        "In a large bowl, combine lobster meat, mayonnaise, lemon juice, and chives.",
        "Season with salt and pepper to taste. Mix gently.",
        "Brush the inside of each bun with melted butter.",
        "Toast the buns in a skillet until golden brown.",
        "Line each bun with lettuce and fill with lobster mixture.",
        "Serve immediately with lemon wedges."
      ]
    },
    {
      id: 2,
      name: "Grandma's Blueberry Pie",
      image: "/images/recipe-blueberry-pie.jpg",
      description: "A classic Island dessert made with wild blueberries and a flaky, buttery crust that melts in your mouth.",
      cook: "Emma Wilson",
      time: "1 hr 30 min",
      difficulty: "Medium",
      servings: 8,
      category: "Desserts",
      ingredients: [
        "4 cups fresh wild blueberries",
        "3/4 cup sugar",
        "3 tbsp cornstarch",
        "1 tbsp lemon juice",
        "1/2 tsp cinnamon",
        "2 pie crusts (homemade or store-bought)",
        "2 tbsp butter, cubed",
        "1 egg, beaten (for egg wash)"
      ],
      instructions: [
        "Preheat oven to 425°F (220°C).",
        "In a large bowl, mix blueberries, sugar, cornstarch, lemon juice, and cinnamon.",
        "Line a 9-inch pie dish with one crust.",
        "Pour the blueberry mixture into the crust.",
        "Dot with butter cubes.",
        "Cover with second crust and crimp edges.",
        "Cut slits in top crust and brush with egg wash.",
        "Bake for 45-50 minutes until golden brown."
      ]
    },
    {
      id: 3,
      name: "PEI Potato Chowder",
      image: "/images/recipe-chowder.jpg",
      description: "Creamy, comforting chowder showcasing PEI's world-famous potatoes with smoky bacon and fresh herbs.",
      cook: "Robert Stewart",
      time: "45 min",
      difficulty: "Easy",
      servings: 6,
      category: "Soups & Chowders",
      ingredients: [
        "4 cups PEI potatoes, diced",
        "6 slices bacon, chopped",
        "1 onion, diced",
        "2 cloves garlic, minced",
        "4 cups chicken broth",
        "2 cups heavy cream",
        "2 tbsp flour",
        "Salt and pepper to taste",
        "Fresh chives for garnish"
      ],
      instructions: [
        "In a large pot, cook bacon until crispy. Remove and set aside.",
        "Sauté onion and garlic in bacon fat until soft.",
        "Add flour and cook for 1 minute.",
        "Gradually whisk in chicken broth.",
        "Add potatoes and bring to a boil.",
        "Reduce heat and simmer until potatoes are tender, about 20 minutes.",
        "Stir in cream and heat through.",
        "Season with salt and pepper.",
        "Serve topped with bacon and chives."
      ]
    },
    {
      id: 4,
      name: "Fresh PEI Oysters on the Half Shell",
      image: "/images/recipe-oysters.jpg",
      description: "The purest taste of the Atlantic - fresh oysters served with classic mignonette sauce.",
      cook: "James O'Brien",
      time: "15 min",
      difficulty: "Easy",
      servings: 4,
      category: "Seafood",
      ingredients: [
        "24 fresh PEI oysters",
        "2 shallots, finely minced",
        "1/2 cup red wine vinegar",
        "1 tbsp cracked black pepper",
        "Lemon wedges for serving",
        "Crushed ice for serving"
      ],
      instructions: [
        "Scrub oysters under cold running water.",
        "Using an oyster knife, carefully shuck each oyster.",
        "Leave oysters on the half shell and discard top shells.",
        "Arrange oysters on a bed of crushed ice.",
        "For mignonette: combine shallots, vinegar, and pepper.",
        "Spoon a little mignonette over each oyster.",
        "Serve immediately with lemon wedges."
      ]
    },
    {
      id: 5,
      name: "Buttermilk Biscuits",
      image: "/images/recipe-biscuits.jpg",
      description: "Fluffy, golden biscuits that are perfect for breakfast or alongside any meal.",
      cook: "Sarah MacDonald",
      time: "30 min",
      difficulty: "Medium",
      servings: 12,
      category: "Breads",
      ingredients: [
        "3 cups all-purpose flour",
        "1 tbsp baking powder",
        "1 tsp baking soda",
        "1 tsp salt",
        "1/2 cup cold butter, cubed",
        "1 1/2 cups buttermilk",
        "2 tbsp melted butter for brushing"
      ],
      instructions: [
        "Preheat oven to 450°F (230°C).",
        "In a large bowl, whisk together flour, baking powder, baking soda, and salt.",
        "Cut in cold butter until mixture resembles coarse crumbs.",
        "Stir in buttermilk until just combined.",
        "Turn dough onto floured surface and knead gently 5-6 times.",
        "Pat dough to 1-inch thickness.",
        "Cut with 2-inch biscuit cutter.",
        "Place on baking sheet and brush with melted butter.",
        "Bake for 12-15 minutes until golden brown."
      ]
    },
    {
      id: 6,
      name: "Acadian Rappie Pie",
      image: "/images/recipe-chowder.jpg",
      description: "A traditional Acadian dish of grated potatoes and chicken, slow-baked to perfection.",
      cook: "Marie LeBlanc",
      time: "3 hrs",
      difficulty: "Hard",
      servings: 8,
      category: "Meat & Poultry",
      ingredients: [
        "10 lbs potatoes, peeled",
        "1 whole chicken (3-4 lbs)",
        "1 large onion, chopped",
        "1/4 cup chicken fat or butter",
        "Salt and pepper to taste",
        "2 cups hot chicken broth"
      ],
      instructions: [
        "Boil chicken with onion until cooked through, about 1 hour.",
        "Remove chicken, reserve broth, and shred meat.",
        "Grate potatoes and squeeze out excess liquid.",
        "Mix grated potatoes with hot broth until moist.",
        "Layer half the potato mixture in a greased baking dish.",
        "Top with shredded chicken.",
        "Cover with remaining potato mixture.",
        "Dot with chicken fat and bake at 350°F for 2 hours.",
        "Top should be crispy and golden."
      ]
    },
  ];

  const weeklyFeatured = recipes.find(r => r.featured) || recipes[0];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.cook.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveRecipe = (recipeId: number) => {
    setSavedRecipes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
        toast.info('Recipe removed from saved');
      } else {
        newSet.add(recipeId);
        toast.success('Recipe saved!');
      }
      return newSet;
    });
  };

  const handleShare = (recipe: Recipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: recipe.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-teal to-dark-teal overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-8 border-white rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <ChefHat className="w-4 h-4 mr-2" />
              Island Recipes
            </Badge>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              Recipes from Our Kitchens
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover authentic PEI recipes shared by our community of home cooks. 
              From seafood to sweets, find your new family favorite.
            </p>
          </div>
        </div>
      </section>

      {/* Weekly Featured Recipe */}
      <section id="featured" data-animate className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gold text-white border-0">
              <Flame className="w-4 h-4 mr-2" />
              This Week's Featured
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
              Featured Recipe
            </h2>
          </div>

          <div className={`transition-all duration-1000 ${isVisible['featured'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Card className="overflow-hidden border-0 shadow-2xl">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-80 lg:h-auto">
                  <img 
                    src={weeklyFeatured.image} 
                    alt={weeklyFeatured.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gold text-white border-0">
                      <Flame className="w-3.5 h-3.5 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="font-display text-3xl font-bold text-charcoal mb-4">
                    {weeklyFeatured.name}
                  </h3>
                  <p className="text-charcoal/70 mb-6 leading-relaxed">
                    {weeklyFeatured.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <Users className="w-4 h-4" />
                      <span>By {weeklyFeatured.cook}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <Clock className="w-4 h-4" />
                      <span>{weeklyFeatured.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <ChefHat className="w-4 h-4" />
                      <span>{weeklyFeatured.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <Users className="w-4 h-4" />
                      <span>Serves {weeklyFeatured.servings}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      className="bg-primary-red hover:bg-dark-red text-white rounded-full"
                      onClick={() => setSelectedRecipe(weeklyFeatured)}
                    >
                      View Full Recipe
                    </Button>
                    <a 
                      href="https://facebook.com/groups/PEIGoodEats" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="rounded-full border-teal text-teal hover:bg-teal/5">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Discuss on Facebook
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Recipe Gallery */}
      <section id="recipes-gallery" data-animate className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto container-padding">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <Input 
                placeholder="Search recipes or cooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-5 h-5 text-charcoal/60 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-red text-white'
                      : 'bg-white text-charcoal hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible['recipes-gallery'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                <div className="relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleSaveRecipe(recipe.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        savedRecipes.has(recipe.id)
                          ? 'bg-primary-red text-white'
                          : 'bg-white/90 text-charcoal hover:bg-white'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${savedRecipes.has(recipe.id) ? 'fill-white' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleShare(recipe)}
                      className="w-8 h-8 rounded-full bg-white/90 text-charcoal flex items-center justify-center hover:bg-white transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                    <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                      {recipe.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-2 group-hover:text-primary-red transition-colors">
                    {recipe.name}
                  </h3>
                  <p className="text-charcoal/60 text-sm line-clamp-2 mb-4">{recipe.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-charcoal/60 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.cook}
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full text-primary-red hover:text-dark-red hover:bg-primary-red/5"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-16">
              <ChefHat className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-charcoal mb-2">No recipes found</h3>
              <p className="text-charcoal/60">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-20 bg-primary-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Share Your Creations
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Cooked one of our recipes? Join the PEIGoodEats Facebook group and share your photos, 
            stories, and variations with our community!
          </p>
          <a 
            href="https://facebook.com/groups/PEIGoodEats" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-white text-primary-red hover:bg-white/90 px-8 py-6 rounded-full text-lg">
              <ExternalLink className="w-5 h-5 mr-2" />
              Join PEIGoodEats
            </Button>
          </a>
        </div>
      </section>

      {/* Recipe Detail Dialog */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-3xl">{selectedRecipe.name}</DialogTitle>
              </DialogHeader>
              
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.name}
                className="w-full h-64 object-cover rounded-lg mt-4"
              />
              
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-charcoal/60">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  By {selectedRecipe.cook}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedRecipe.time}
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="w-4 h-4" />
                  {selectedRecipe.difficulty}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Serves {selectedRecipe.servings}
                </div>
              </div>

              <p className="text-charcoal/70 mt-4">{selectedRecipe.description}</p>

              <div className="mt-6">
                <h4 className="font-display text-xl font-bold text-charcoal mb-3">Ingredients</h4>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2 text-charcoal/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-display text-xl font-bold text-charcoal mb-3">Instructions</h4>
                <ol className="space-y-4">
                  {selectedRecipe.instructions.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-primary-red text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-charcoal/70 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
                <Button 
                  className="flex-1 bg-primary-red hover:bg-dark-red text-white"
                  onClick={() => handleSaveRecipe(selectedRecipe.id)}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${savedRecipes.has(selectedRecipe.id) ? 'fill-white' : ''}`} />
                  {savedRecipes.has(selectedRecipe.id) ? 'Saved' : 'Save Recipe'}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleShare(selectedRecipe)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
