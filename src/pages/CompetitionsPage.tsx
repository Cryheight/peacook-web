import { useState } from 'react';
import { Trophy, Camera, BookOpen, Heart, Users, Star, Upload, Send, Check, Medal, ChefHat, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Submission {
  id: number;
  user: string;
  image: string;
  recipe: string;
  story: string;
  likes: number;
}

interface Champion {
  id: number;
  name: string;
  image: string;
  specialty: string;
  bio: string;
  votes: number;
}

export function CompetitionsPage() {
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showNominateDialog, setShowNominateDialog] = useState(false);
  const [likedSubmissions, setLikedSubmissions] = useState<Set<number>>(new Set());
  const [votedChampions, setVotedChampions] = useState<Set<number>>(new Set());

  const cookingSubmissions: Submission[] = [
    {
      id: 1,
      user: "Maria S.",
      image: "/images/recipe-lobster-roll.jpg",
      recipe: "Classic PEI Lobster Rolls",
      story: "Made these for my family's reunion and they were a huge hit! The secret is fresh lobster from our local fisherman.",
      likes: 47
    },
    {
      id: 2,
      user: "David K.",
      image: "/images/recipe-blueberry-pie.jpg",
      recipe: "Grandma's Blueberry Pie",
      story: "My first attempt at pie crust! It took three tries but I finally got it right. The wild blueberries made all the difference.",
      likes: 62
    },
    {
      id: 3,
      user: "Jennifer L.",
      image: "/images/recipe-chowder.jpg",
      recipe: "PEI Potato Chowder",
      story: "Perfect comfort food for a rainy Island day. I added extra bacon because why not?",
      likes: 38
    },
    {
      id: 4,
      user: "Robert M.",
      image: "/images/recipe-biscuits.jpg",
      recipe: "Buttermilk Biscuits",
      story: "These biscuits are now a Sunday morning tradition in our house. My kids love helping make them.",
      likes: 55
    }
  ];

  const champions: Champion[] = [
    {
      id: 1,
      name: "Margaret Thompson",
      image: "/images/cook-1.jpg",
      specialty: "Traditional Island Baking",
      bio: "Margaret has been baking for over 50 years, preserving recipes passed down through four generations of Island women.",
      votes: 234
    },
    {
      id: 2,
      name: "George MacDonald",
      image: "/images/cook-2.jpg",
      specialty: "Seafood & Chowders",
      bio: "A retired fisherman who knows the waters around PEI better than anyone. His chowder recipe is legendary.",
      votes: 189
    },
    {
      id: 3,
      name: "Lisa Chen",
      image: "/images/cook-3.jpg",
      specialty: "Fusion Island Cuisine",
      bio: "Lisa combines her Asian heritage with PEI ingredients to create unique and delicious fusion dishes.",
      votes: 156
    }
  ];

  const nextCookbookThemes = [
    { name: "Preserves & Canning", icon: "🫙", description: "Jams, jellies, pickles, and preserves" },
    { name: "Fermented Foods", icon: "🥒", description: "Kimchi, sauerkraut, and fermented vegetables" },
    { name: "Freeze-Dried Foods", icon: "❄️", description: "Modern preservation techniques" },
    { name: "Dehydrated Foods", icon: "🍎", description: "Fruit leathers, jerky, and dried goods" },
    { name: "Pressure-Canned Foods", icon: "🥫", description: "Safe home canning methods" },
    { name: "Sourdough", icon: "🍞", description: "Bread, rolls, and sourdough creations" },
  ];

  const handleLike = (submissionId: number) => {
    setLikedSubmissions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
        toast.info('Like removed');
      } else {
        newSet.add(submissionId);
        toast.success('Liked!');
      }
      return newSet;
    });
  };

  const handleVote = (championId: number) => {
    setVotedChampions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(championId)) {
        newSet.delete(championId);
        toast.info('Vote removed');
      } else {
        newSet.add(championId);
        toast.success('Vote cast! Thank you for participating.');
      }
      return newSet;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Submission received! We will review and post it soon.');
    setShowSubmitDialog(false);
  };

  const handleNominate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Nomination submitted! Thank you for recognizing an amazing home cook.');
    setShowNominateDialog(false);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-gold to-yellow-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-8 border-white rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Trophy className="w-4 h-4 mr-2" />
              Community Competitions
            </Badge>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              PEI Cooks Competitions
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join the fun! Collect signatures, share your cooking journey, 
              compete to be in the next cookbook, and nominate your favorite Island cooks.
            </p>
          </div>
        </div>
      </section>

      {/* Competitions Tabs */}
      <section id="competitions-tabs" data-animate className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <Tabs defaultValue="collect" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="collect">Collect the Cooks</TabsTrigger>
              <TabsTrigger value="cooking">Cooking Through</TabsTrigger>
              <TabsTrigger value="next">Next Cookbook</TabsTrigger>
              <TabsTrigger value="champions">Champions</TabsTrigger>
            </TabsList>

            {/* Collect the Cooks */}
            <TabsContent value="collect" className="animate-fade-in">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-primary-red text-white border-0">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Book Signing Challenge
                </Badge>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
                  Collect the Cooks
                </h2>
                <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                  Attend book signings and events to collect signatures from the contributing cooks. 
                  Can you get all 77 autographs?
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <Card className="border-0 shadow-xl overflow-hidden">
                  <div className="relative h-64">
                    <img 
                      src="/images/event-book-signing.jpg" 
                      alt="Book Signing"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-display text-2xl font-bold">How It Works</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary-red text-white flex items-center justify-center flex-shrink-0 font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal">Get Your Cookbook</h4>
                          <p className="text-sm text-charcoal/60">Purchase your copy from any vendor or online</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary-red text-white flex items-center justify-center flex-shrink-0 font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal">Attend Events</h4>
                          <p className="text-sm text-charcoal/60">Check our events page for book signings</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary-red text-white flex items-center justify-center flex-shrink-0 font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal">Collect Signatures</h4>
                          <p className="text-sm text-charcoal/60">Meet the cooks and get your book signed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center flex-shrink-0 font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-semibold text-charcoal">Win Prizes!</h4>
                          <p className="text-sm text-charcoal/60">Share your progress for chances to win</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="font-display text-2xl font-bold text-charcoal mb-4">
                      Prizes & Rewards
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gold/10 rounded-lg border-l-4 border-gold">
                        <div className="flex items-center gap-2 mb-1">
                          <Medal className="w-5 h-5 text-gold" />
                          <span className="font-semibold text-charcoal">Grand Prize</span>
                        </div>
                        <p className="text-sm text-charcoal/70">
                          Collect all 77 signatures and win a private cooking class with Parry!
                        </p>
                      </div>
                      <div className="p-4 bg-teal/10 rounded-lg border-l-4 border-teal">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-5 h-5 text-teal" />
                          <span className="font-semibold text-charcoal">Milestone Prizes</span>
                        </div>
                        <p className="text-sm text-charcoal/70">
                          Win prizes at 10, 25, 50, and 75 signatures
                        </p>
                      </div>
                      <div className="p-4 bg-primary-red/10 rounded-lg border-l-4 border-primary-red">
                        <div className="flex items-center gap-2 mb-1">
                          <Heart className="w-5 h-5 text-primary-red" />
                          <span className="font-semibold text-charcoal">Participation Rewards</span>
                        </div>
                        <p className="text-sm text-charcoal/70">
                          Everyone who shares their progress gets a special PEI Cooks pin
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold text-charcoal mb-3">Upcoming Signing Events</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-cream rounded-lg">
                          <div>
                            <p className="font-medium text-charcoal text-sm">Charlottetown Market</p>
                            <p className="text-xs text-charcoal/60">March 22, 2025</p>
                          </div>
                          <Badge className="bg-teal text-white">5 Cooks</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-cream rounded-lg">
                          <div>
                            <p className="font-medium text-charcoal text-sm">Summerside Library</p>
                            <p className="text-xs text-charcoal/60">April 5, 2025</p>
                          </div>
                          <Badge className="bg-teal text-white">8 Cooks</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Cooking My Way Through */}
            <TabsContent value="cooking" className="animate-fade-in">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-teal text-white border-0">
                  <ChefHat className="w-4 h-4 mr-2" />
                  Community Challenge
                </Badge>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
                  Cooking My Way Through
                </h2>
                <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                  Like "Julie & Julia," cook your way through the cookbook and share your journey! 
                  Post photos, stories, and tips from each recipe you try.
                </p>
              </div>

              <div className="mb-8">
                <Button 
                  className="bg-primary-red hover:bg-dark-red text-white"
                  onClick={() => setShowSubmitDialog(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Share Your Creation
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cookingSubmissions.map((submission) => (
                  <Card key={submission.id} className="overflow-hidden border-0 shadow-lg">
                    <div className="relative h-48">
                      <img 
                        src={submission.image} 
                        alt={submission.recipe}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => handleLike(submission.id)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            likedSubmissions.has(submission.id)
                              ? 'bg-primary-red text-white'
                              : 'bg-white/90 text-charcoal'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${likedSubmissions.has(submission.id) ? 'fill-white' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display text-lg font-semibold text-charcoal mb-1">
                        {submission.recipe}
                      </h3>
                      <p className="text-sm text-charcoal/60 mb-3">by {submission.user}</p>
                      <p className="text-sm text-charcoal/70 mb-4">{submission.story}</p>
                      <div className="flex items-center gap-1 text-charcoal/60">
                        <Heart className="w-4 h-4 text-primary-red fill-primary-red" />
                        <span className="text-sm">{submission.likes + (likedSubmissions.has(submission.id) ? 1 : 0)} likes</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a 
                  href="https://facebook.com/groups/PEIGoodEats"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-teal text-teal hover:bg-teal/5">
                    View More on Facebook
                  </Button>
                </a>
              </div>
            </TabsContent>

            {/* Next Cookbook */}
            <TabsContent value="next" className="animate-fade-in">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-500 text-white border-0">
                  <PenTool className="w-4 h-4 mr-2" />
                  Coming Soon
                </Badge>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
                  Be in the Next Cookbook!
                </h2>
                <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                  We're planning our next cookbook and want YOU to be part of it! 
                  Submit your best recipes in these categories for a chance to be featured.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {nextCookbookThemes.map((theme) => (
                  <Card key={theme.name} className="border-0 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-4">{theme.icon}</div>
                      <h3 className="font-display text-xl font-semibold text-charcoal mb-2 group-hover:text-primary-red transition-colors">
                        {theme.name}
                      </h3>
                      <p className="text-sm text-charcoal/60">{theme.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-700 text-white">
                <CardContent className="p-8 text-center">
                  <Trophy className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="font-display text-3xl font-bold mb-4">
                    How to Submit Your Recipe
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold mb-2">1. Prepare Your Recipe</h4>
                      <p className="text-sm text-white/80">Test it multiple times and write clear instructions</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                        <Camera className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold mb-2">2. Take Photos</h4>
                      <p className="text-sm text-white/80">Capture your dish in good lighting</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                        <Send className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold mb-2">3. Submit Online</h4>
                      <p className="text-sm text-white/80">Fill out our submission form</p>
                    </div>
                  </div>
                  <Button 
                    className="mt-8 bg-white text-purple-700 hover:bg-white/90"
                    onClick={() => toast.info('Submission form coming soon!')}
                  >
                    Submit Your Recipe
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Home Cook Champions */}
            <TabsContent value="champions" className="animate-fade-in">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gold text-white border-0">
                  <Users className="w-4 h-4 mr-2" />
                  Community Choice Awards
                </Badge>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-4">
                  Home Cook Champions
                </h2>
                <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                  Nominate and vote for your favorite Island home cooks! 
                  Recognize the unsung heroes of Island cuisine.
                </p>
              </div>

              <div className="mb-8 text-center">
                <Button 
                  className="bg-primary-red hover:bg-dark-red text-white"
                  onClick={() => setShowNominateDialog(true)}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Nominate a Home Cook
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {champions.map((champion) => (
                  <Card key={champion.id} className="overflow-hidden border-0 shadow-lg">
                    <div className="relative h-64">
                      <img 
                        src={champion.image} 
                        alt={champion.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/90 to-transparent p-4">
                        <h3 className="font-display text-xl font-bold text-white">{champion.name}</h3>
                        <p className="text-sm text-white/80">{champion.specialty}</p>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-sm text-charcoal/70 mb-4">{champion.bio}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-gold fill-gold" />
                          <span className="font-bold text-charcoal">{champion.votes + (votedChampions.has(champion.id) ? 1 : 0)}</span>
                          <span className="text-sm text-charcoal/60">votes</span>
                        </div>
                        <Button 
                          variant={votedChampions.has(champion.id) ? 'default' : 'outline'}
                          size="sm"
                          className={votedChampions.has(champion.id) ? 'bg-gold hover:bg-gold/90' : 'border-gold text-gold hover:bg-gold/5'}
                          onClick={() => handleVote(champion.id)}
                        >
                          <Star className={`w-4 h-4 mr-1 ${votedChampions.has(champion.id) ? 'fill-white' : ''}`} />
                          {votedChampions.has(champion.id) ? 'Voted' : 'Vote'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Submit Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Share Your Creation</DialogTitle>
            <DialogDescription>
              Submit your photo and story from cooking a recipe from the book
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" required />
            </div>
            <div>
              <Label htmlFor="recipe">Recipe Name</Label>
              <Input id="recipe" placeholder="e.g., Classic PEI Lobster Rolls" required />
            </div>
            <div>
              <Label htmlFor="story">Your Story</Label>
              <Textarea 
                id="story" 
                placeholder="Tell us about your cooking experience..."
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="photo">Upload Photo</Label>
              <Input id="photo" type="file" accept="image/*" />
            </div>
            <Button type="submit" className="w-full bg-primary-red hover:bg-dark-red text-white">
              <Upload className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Nominate Dialog */}
      <Dialog open={showNominateDialog} onOpenChange={setShowNominateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Nominate a Home Cook</DialogTitle>
            <DialogDescription>
              Recognize an amazing Island home cook for our Champions group
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleNominate} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="nomineeName">Nominee's Name</Label>
              <Input id="nomineeName" required />
            </div>
            <div>
              <Label htmlFor="nomineeLocation">Their Location</Label>
              <Input id="nomineeLocation" placeholder="e.g., Charlottetown" required />
            </div>
            <div>
              <Label htmlFor="specialty">Their Specialty</Label>
              <Input id="specialty" placeholder="e.g., Baking, Seafood, Preserves" required />
            </div>
            <div>
              <Label htmlFor="whyNominate">Why Should They Be a Champion?</Label>
              <Textarea 
                id="whyNominate" 
                placeholder="Tell us what makes them special..."
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="yourName">Your Name</Label>
              <Input id="yourName" required />
            </div>
            <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-white">
              <Star className="w-4 h-4 mr-2" />
              Submit Nomination
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
