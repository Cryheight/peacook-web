import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Users, Star, MapPin, Check, ChevronRight, Quote, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Cook {
  id: number;
  name: string;
  image: string;
  recipes: number;
  bio: string;
  location: string;
  hearts: number;
  featured: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
  approved: boolean;
}

export function CookbookPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [likedCooks, setLikedCooks] = useState<Set<number>>(new Set());
  const [selectedCook, setSelectedCook] = useState<Cook | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
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

  const handleLike = (cookId: number) => {
    setLikedCooks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cookId)) {
        newSet.delete(cookId);
        toast.info('Removed from favorites');
      } else {
        newSet.add(cookId);
        toast.success('Added to favorites!');
      }
      return newSet;
    });
  };

  const cooks: Cook[] = [
    {
      id: 1,
      name: "Parry Aftab",
      image: "/images/1000499006.jpg",
      recipes: 12,
      bio: "The heart and soul behind PEI Cooks, Parry has been celebrating Island cuisine for over two decades. Her weekly columns in local newspapers have made her a household name across PEI.",
      location: "Charlottetown",
      hearts: 342,
      featured: "Parry's Famous Seafood Chowder"
    },
    {
      id: 2,
      name: "Sarah MacDonald",
      image: "/images/cook-1.jpg",
      recipes: 4,
      bio: "A third-generation Islander, Sarah brings generations of family recipes to the table. Her grandmother's secret biscuit recipe is a crowd favorite at community gatherings.",
      location: "Summerside",
      hearts: 128,
      featured: "Grandma's Buttermilk Biscuits"
    },
    {
      id: 3,
      name: "James O'Brien",
      image: "/images/cook-2.jpg",
      recipes: 3,
      bio: "Retired fisherman James knows the waters around PEI like the back of his hand. His seafood recipes are legendary, passed down from his father and grandfather before him.",
      location: "North Rustico",
      hearts: 96,
      featured: "James's Pan-Fried Halibut"
    },
    {
      id: 4,
      name: "Emma Wilson",
      image: "/images/cook-3.jpg",
      recipes: 5,
      bio: "Emma combines her training as a pastry chef with traditional Island recipes. Her desserts have won awards at the Provincial Exhibition for three consecutive years.",
      location: "Montague",
      hearts: 156,
      featured: "Wild Blueberry Grunt"
    },
    {
      id: 5,
      name: "Marie LeBlanc",
      image: "/images/cook-1.jpg",
      recipes: 6,
      bio: "Marie's Acadian heritage shines through in her recipes. She preserves the traditions of her ancestors while adding her own creative twists to classic dishes.",
      location: "Abram-Village",
      hearts: 89,
      featured: "Acadian Rappie Pie"
    },
    {
      id: 6,
      name: "Robert Stewart",
      image: "/images/cook-2.jpg",
      recipes: 4,
      bio: "A potato farmer by trade, Robert knows exactly how to showcase PEI's world-famous potatoes. His recipes range from hearty chowders to elegant gratins.",
      location: "O'Leary",
      hearts: 112,
      featured: "PEI Potato Leek Soup"
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Margaret Johnson",
      location: "Charlottetown",
      quote: "This cookbook captures the heart and soul of PEI cooking. Every recipe tells a story, and every story brings back memories of my grandmother's kitchen.",
      rating: 5,
      approved: true
    },
    {
      id: 2,
      name: "David Chen",
      location: "Summerside",
      quote: "I've cooked my way through half the book already. The lobster chowder is incredible - just like what my mother used to make!",
      rating: 5,
      approved: true
    },
    {
      id: 3,
      name: "Emma MacLeod",
      location: "Montague",
      quote: "A beautiful celebration of our island's culinary heritage. The photography is stunning, and the recipes are authentic and delicious.",
      rating: 5,
      approved: true
    },
    {
      id: 4,
      name: "Thomas Anderson",
      location: "Stratford",
      quote: "Bought this as a gift for my sister who moved away. She says it helps her feel connected to home. Thank you for creating this treasure!",
      rating: 5,
      approved: true
    },
  ];

  const pickupLocations = [
    { name: "Charlottetown Farmers Market", address: "100 Belvedere Ave, Charlottetown" },
    { name: "Summerside Farmers Market", address: "249 Water St, Summerside" },
    { name: "Montague Rotary Library", address: "3 Main St N, Montague" },
    { name: "O'Leary Community Centre", address: "455 Main St, O'Leary" },
  ];

  const handleOrder = () => {
    const total = orderQuantity * 35;
    toast.success(`Order submitted! Please send $${total} via eTransfer to info@peicooks.com`);
    setShowOrderDialog(false);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary-red to-dark-red overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-8 border-white rounded-full" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border-8 border-white rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Now Available
              </Badge>
              <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
                PEI Cooks at Home
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                A stunning 200-page celebration of Prince Edward Island's home cooking tradition. 
                Featuring 157 authentic recipes from 77 home cooks who pour their hearts into every dish.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">77</div>
                    <div className="text-white/70 text-sm">Contributors</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">157</div>
                    <div className="text-white/70 text-sm">Recipes</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">200</div>
                    <div className="text-white/70 text-sm">Color Pages</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary-red hover:bg-white/90 px-8 rounded-full"
                  onClick={() => setShowOrderDialog(true)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Order Now - $35
                </Button>
                <Link to="#cooks">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 rounded-full">
                    Meet the Cooks
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl transform rotate-3" />
              <img 
                src="/images/1000498998.jpg" 
                alt="PEI Cooks at Home Cookbook" 
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Book Details Tabs */}
      <section id="book-details" data-animate className="section-padding bg-white">
        <div className="max-w-5xl mx-auto container-padding">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="about">About the Book</TabsTrigger>
              <TabsTrigger value="contents">What's Inside</TabsTrigger>
              <TabsTrigger value="recipes">Recipe Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="animate-fade-in">
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-charcoal mb-4">
                        A Love Letter to Island Cooking
                      </h3>
                      <p className="text-charcoal/70 mb-4 leading-relaxed">
                        PEI Cooks at Home is more than a cookbook - it's a celebration of community, 
                        tradition, and the incredible food that comes from our red soil and surrounding waters.
                      </p>
                      <p className="text-charcoal/70 mb-4 leading-relaxed">
                        Each recipe has been tested and perfected by home cooks who have been making 
                        these dishes for generations. From seafood chowders to potato recipes that 
                        showcase our world-famous spuds, every page tells a story.
                      </p>
                      <p className="text-charcoal/70 leading-relaxed">
                        All proceeds support PEI Food Strong initiatives, helping to build a more 
                        resilient and connected local food system.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal">Full-Color Photography</h4>
                          <p className="text-sm text-charcoal/60">Stunning photos of every recipe and contributor</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal">Easy-to-Follow Instructions</h4>
                          <p className="text-sm text-charcoal/60">Clear steps tested by home cooks</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal">Local Ingredient Sourcing</h4>
                          <p className="text-sm text-charcoal/60">Tips on where to find the best local ingredients</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal">Family Stories</h4>
                          <p className="text-sm text-charcoal/60">Heartwarming tales behind the recipes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contents" className="animate-fade-in">
              <Card>
                <CardContent className="p-8">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: "Appetizers & Small Plates", count: 18 },
                      { title: "Soups & Chowders", count: 15 },
                      { title: "Seafood Specialties", count: 28 },
                      { title: "Meat & Poultry", count: 22 },
                      { title: "Vegetarian Dishes", count: 16 },
                      { title: "Potato Recipes", count: 12 },
                      { title: "Breads & Biscuits", count: 14 },
                      { title: "Desserts & Sweets", count: 24 },
                      { title: "Preserves & Pickles", count: 8 },
                    ].map((category) => (
                      <div key={category.title} className="flex items-center justify-between p-4 bg-cream rounded-lg">
                        <span className="font-medium text-charcoal">{category.title}</span>
                        <Badge variant="secondary">{category.count} recipes</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recipes" className="animate-fade-in">
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-display text-xl font-bold text-charcoal mb-4">Signature Dishes</h4>
                      <ul className="space-y-3">
                        {[
                          "Parry's Famous Seafood Chowder",
                          "Classic PEI Lobster Rolls",
                          "Grandma's Buttermilk Biscuits",
                          "Acadian Rappie Pie",
                          "Wild Blueberry Grunt",
                          "PEI Potato Leek Soup",
                        ].map((recipe) => (
                          <li key={recipe} className="flex items-center gap-2 text-charcoal/70">
                            <ChevronRight className="w-4 h-4 text-gold" />
                            {recipe}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-charcoal mb-4">Seasonal Specialties</h4>
                      <ul className="space-y-3">
                        {[
                          "Spring: Fiddlehead Fern Saute",
                          "Summer: Fresh Corn Chowder",
                          "Fall: Pumpkin Spice Muffins",
                          "Winter: Hearty Beef Stew",
                          "Year-round: Island Fish Cakes",
                          "Holiday: Traditional Plum Pudding",
                        ].map((recipe) => (
                          <li key={recipe} className="flex items-center gap-2 text-charcoal/70">
                            <ChevronRight className="w-4 h-4 text-gold" />
                            {recipe}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Meet the Cooks Section */}
      <section id="cooks" data-animate className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal text-white border-0">
              <Users className="w-4 h-4 mr-2" />
              Our Contributors
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
              Meet the Home Cooks
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              77 passionate home cooks sharing their family recipes and stories. 
              Click the heart to show your appreciation!
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible['cooks'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {cooks.map((cook) => (
              <Card key={cook.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                <div className="relative">
                  <img 
                    src={cook.image} 
                    alt={cook.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleLike(cook.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        likedCooks.has(cook.id) 
                          ? 'bg-primary-red text-white heart-animate' 
                          : 'bg-white/90 text-charcoal hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedCooks.has(cook.id) ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/90 to-transparent p-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-sm">{cook.recipes} recipes</span>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-primary-red text-primary-red" />
                        <span className="text-sm">{cook.hearts + (likedCooks.has(cook.id) ? 1 : 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-1">{cook.name}</h3>
                  <div className="flex items-center gap-1 text-charcoal/60 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {cook.location}
                  </div>
                  <p className="text-charcoal/70 text-sm line-clamp-2 mb-3">{cook.bio}</p>
                  <div className="text-sm">
                    <span className="text-gold font-medium">Featured:</span>
                    <span className="text-charcoal/70 ml-1">{cook.featured}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-primary-red hover:text-dark-red hover:bg-primary-red/5"
                    onClick={() => setSelectedCook(cook)}
                  >
                    Read Full Bio
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" data-animate className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gold text-white border-0">
              <Quote className="w-4 h-4 mr-2" />
              Reader Reviews
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
              What Readers Are Saying
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              Reviews are pre-approved before publishing to ensure quality and authenticity.
            </p>
          </div>

          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 ${isVisible['testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary-red/20 mb-4" />
                  <p className="text-lg text-charcoal/80 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-red/10 flex items-center justify-center">
                      <span className="font-display text-lg font-bold text-primary-red">
                        {testimonial.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">{testimonial.name}</p>
                      <p className="text-sm text-charcoal/60 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" data-animate className="section-padding bg-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto container-padding relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white border-0 backdrop-blur-sm">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Order Your Copy
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Get Your Cookbook Today
            </h2>
            <p className="text-xl text-white/80">
              $35 CAD per copy. Pickup at convenient locations across PEI.
            </p>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-2xl font-bold text-charcoal mb-4">
                    How to Order
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary-red text-white flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal">Select Quantity</h4>
                        <p className="text-sm text-charcoal/60">Choose how many copies you'd like</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary-red text-white flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal">Send eTransfer</h4>
                        <p className="text-sm text-charcoal/60">Send payment to info@peicooks.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary-red text-white flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal">Pick Up Your Book</h4>
                        <p className="text-sm text-charcoal/60">Collect at your chosen location</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-charcoal mb-4">
                    Pickup Locations
                  </h3>
                  <div className="space-y-3">
                    {pickupLocations.map((location) => (
                      <div key={location.name} className="flex items-start gap-3 p-3 bg-cream rounded-lg">
                        <MapPin className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-charcoal text-sm">{location.name}</p>
                          <p className="text-xs text-charcoal/60">{location.address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                        className="w-10 h-10 rounded-full bg-cream flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-lg">{orderQuantity}</span>
                      <button 
                        onClick={() => setOrderQuantity(orderQuantity + 1)}
                        className="w-10 h-10 rounded-full bg-cream flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-charcoal/60">Total</p>
                      <p className="font-display text-2xl font-bold text-primary-red">${orderQuantity * 35} CAD</p>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-primary-red hover:bg-dark-red text-white px-8 rounded-full"
                    onClick={() => setShowOrderDialog(true)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Place Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cook Bio Dialog */}
      <Dialog open={!!selectedCook} onOpenChange={() => setSelectedCook(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{selectedCook?.name}</DialogTitle>
            <DialogDescription className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {selectedCook?.location}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <img 
              src={selectedCook?.image} 
              alt={selectedCook?.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-charcoal/70 leading-relaxed mb-4">{selectedCook?.bio}</p>
            <div className="p-4 bg-cream rounded-lg">
              <p className="text-sm">
                <span className="text-gold font-medium">Featured Recipe:</span>
                <span className="text-charcoal ml-1">{selectedCook?.featured}</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Complete Your Order</DialogTitle>
            <DialogDescription>
              Please send an eTransfer to complete your purchase
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-cream rounded-lg">
              <p className="text-sm text-charcoal/60 mb-1">Order Summary</p>
              <div className="flex justify-between items-center">
                <span className="font-medium">{orderQuantity} x PEI Cooks at Home</span>
                <span className="font-display text-xl font-bold text-primary-red">${orderQuantity * 35}</span>
              </div>
            </div>
            <div className="p-4 bg-teal/10 rounded-lg">
              <p className="text-sm text-charcoal/60 mb-2">Send eTransfer to:</p>
              <p className="font-mono text-lg font-medium text-teal">info@peicooks.com</p>
              <p className="text-sm text-charcoal/60 mt-2">
                Please include your name and phone number in the message
              </p>
            </div>
            <Button 
              className="w-full bg-primary-red hover:bg-dark-red text-white"
              onClick={handleOrder}
            >
              I've Sent the eTransfer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
