import { useState } from 'react';
import { PenTool, Calendar, Mail, ExternalLink, BookOpen, Star, MapPin, Send, Newspaper, Video, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface Column {
  id: number;
  title: string;
  date: string;
  publication: string;
  excerpt: string;
  link?: string;
  featured: boolean;
}

interface Appearance {
  id: number;
  title: string;
  date: string;
  type: 'tv' | 'radio' | 'event';
  location: string;
  description: string;
}

export function ParryPage() {
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const columns: Column[] = [
    {
      id: 1,
      title: "The Comfort of Chowder: A PEI Tradition",
      date: "February 15, 2025",
      publication: "The Guardian",
      excerpt: "There's nothing quite like a bowl of creamy chowder on a cold winter day. In this column, I explore the history of this Island staple and share my favorite family recipe...",
      link: "https://peicanada.com/columns/chowder-tradition",
      featured: true
    },
    {
      id: 2,
      title: "Spring Fiddleheads: Nature's First Gift",
      date: "February 8, 2025",
      publication: "Journal Pioneer",
      excerpt: "As the snow melts and the Island awakens, fiddlehead ferns emerge as one of our first spring delicacies. Here's how to find, prepare, and enjoy them...",
      link: "https://peicanada.com/columns/fiddleheads",
      featured: false
    },
    {
      id: 3,
      title: "The Potato: King of PEI Agriculture",
      date: "February 1, 2025",
      publication: "The Guardian",
      excerpt: "Our red soil produces some of the finest potatoes in the world. Let's celebrate this humble vegetable and explore creative ways to enjoy it...",
      link: "https://peicanada.com/columns/potato-king",
      featured: false
    },
    {
      id: 4,
      title: "Lobster Season: A Time for Celebration",
      date: "January 25, 2025",
      publication: "Journal Pioneer",
      excerpt: "Setting Day marks the beginning of lobster season on PEI. Join me as I visit local fishermen and learn about this vital industry...",
      link: "https://peicanada.com/columns/lobster-season",
      featured: true
    },
    {
      id: 5,
      title: "Preserving Summer: Jams and Jellies",
      date: "January 18, 2025",
      publication: "The Guardian",
      excerpt: "There's something deeply satisfying about preserving the flavors of summer. In this column, I share my grandmother's secret strawberry jam recipe...",
      link: "https://peicanada.com/columns/preserving-summer",
      featured: false
    }
  ];

  const appearances: Appearance[] = [
    {
      id: 1,
      title: "CBC Radio: Island Morning",
      date: "March 5, 2025",
      type: "radio",
      location: "CBC Studio, Charlottetown",
      description: "Live interview discussing the cookbook and upcoming spring recipes."
    },
    {
      id: 2,
      title: "CTV News at 6",
      date: "March 12, 2025",
      type: "tv",
      location: "CTV Studio, Charlottetown",
      description: "Cooking segment featuring recipes from the new cookbook."
    },
    {
      id: 3,
      title: "Charlottetown Farmers Market Demo",
      date: "March 22, 2025",
      type: "event",
      location: "Charlottetown Farmers Market",
      description: "Live cooking demonstration and book signing."
    },
    {
      id: 4,
      title: "Island Food Summit",
      date: "April 8, 2025",
      type: "event",
      location: "Delta Prince Edward",
      description: "Keynote speaker on the future of Island food culture."
    }
  ];

  const featuredCooks = [
    {
      name: "Sarah MacDonald",
      recipe: "Buttermilk Biscuits",
      quote: "Sarah's biscuits are the best I've ever tasted. They're fluffy, buttery perfection.",
      image: "/images/cook-1.jpg"
    },
    {
      name: "James O'Brien",
      recipe: "Pan-Fried Halibut",
      quote: "James knows seafood like nobody else. His halibut recipe is simply divine.",
      image: "/images/cook-2.jpg"
    },
    {
      name: "Emma Wilson",
      recipe: "Wild Blueberry Grunt",
      quote: "Emma's desserts are award-winning for a reason. This grunt is pure comfort.",
      image: "/images/cook-3.jpg"
    }
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Booking request sent! We will contact you within 48 hours.');
    setShowBookingDialog(false);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-teal to-dark-teal overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-8 border-white rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
                <PenTool className="w-4 h-4 mr-2" />
                Food Columnist & Author
              </Badge>
              <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
                PEI Cooks with Parry
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                For over two decades, I've been sharing the stories and recipes of Prince Edward Island's 
                home cooks through my weekly columns, workshops, and community events.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-white text-teal hover:bg-white/90 rounded-full px-6"
                  onClick={() => setShowBookingDialog(true)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Book Parry
                </Button>
                <a 
                  href="https://peicanada.com/author/parry-aftab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-6">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read All Columns
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl transform -rotate-3" />
              <img 
                src="/images/1000499006.jpg" 
                alt="Parry Aftab" 
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-display text-3xl font-bold text-primary-red">20+</div>
              <div className="text-sm text-charcoal/60">Years Writing</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-teal">1,000+</div>
              <div className="text-sm text-charcoal/60">Columns Published</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-gold">77</div>
              <div className="text-sm text-charcoal/60">Cooks Featured</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-purple-500">50+</div>
              <div className="text-sm text-charcoal/60">Events Per Year</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section id="content-tabs" data-animate className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto container-padding">
          <Tabs defaultValue="columns" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="columns">Columns</TabsTrigger>
              <TabsTrigger value="appearances">Appearances</TabsTrigger>
              <TabsTrigger value="featured">Featured Cooks</TabsTrigger>
            </TabsList>

            {/* Columns Tab */}
            <TabsContent value="columns" className="animate-fade-in">
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-primary-red text-white border-0">
                  <Newspaper className="w-4 h-4 mr-2" />
                  Weekly Columns
                </Badge>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal">
                  Latest from PEI Cooks with Parry
                </h2>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Featured Column */}
                {columns.filter(c => c.featured).map((column) => (
                  <Card key={column.id} className="lg:col-span-2 border-0 shadow-xl overflow-hidden">
                    <div className="relative h-64">
                      <img 
                        src="/images/recipe-chowder.jpg" 
                        alt={column.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <Badge className="bg-gold text-white border-0 mb-2">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                        <h3 className="font-display text-2xl font-bold">{column.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-4">
                        <span>{column.publication}</span>
                        <span>•</span>
                        <span>{column.date}</span>
                      </div>
                      <p className="text-charcoal/70 mb-4">{column.excerpt}</p>
                      {column.link && (
                        <a 
                          href={column.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" className="border-teal text-teal hover:bg-teal/5">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Read Full Column
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}

                {/* Column List */}
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-bold text-charcoal">More Columns</h3>
                  {columns.filter(c => !c.featured).map((column) => (
                    <Card key={column.id} className="border-0 shadow hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-charcoal mb-1 line-clamp-2">{column.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-charcoal/60 mb-2">
                          <span>{column.publication}</span>
                          <span>•</span>
                          <span>{column.date}</span>
                        </div>
                        {column.link && (
                          <a 
                            href={column.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-teal hover:underline"
                          >
                            Read more
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  <a 
                    href="https://peicanada.com/author/parry-aftab"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" className="w-full text-teal">
                      View All Columns
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </TabsContent>

            {/* Appearances Tab */}
            <TabsContent value="appearances" className="animate-fade-in">
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-gold text-white border-0">
                  <Calendar className="w-4 h-4 mr-2" />
                  Upcoming Appearances
                </Badge>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal">
                  Where to Find Parry
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {appearances.map((appearance) => (
                  <Card key={appearance.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          appearance.type === 'tv' ? 'bg-red-100 text-red-600' :
                          appearance.type === 'radio' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {appearance.type === 'tv' && <Video className="w-6 h-6" />}
                          {appearance.type === 'radio' && <Mic className="w-6 h-6" />}
                          {appearance.type === 'event' && <Calendar className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-semibold text-charcoal mb-1">
                            {appearance.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-charcoal/60 mb-2">
                            <Calendar className="w-4 h-4" />
                            {appearance.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-charcoal/60 mb-3">
                            <MapPin className="w-4 h-4" />
                            {appearance.location}
                          </div>
                          <p className="text-sm text-charcoal/70">{appearance.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Featured Cooks Tab */}
            <TabsContent value="featured" className="animate-fade-in">
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-teal text-white border-0">
                  <Star className="w-4 h-4 mr-2" />
                  Spotlight
                </Badge>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal">
                  Featured Home Cooks
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {featuredCooks.map((cook, index) => (
                  <Card key={index} className="border-0 shadow-lg overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={cook.image} 
                        alt={cook.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-display text-xl font-bold">{cook.name}</h3>
                        <p className="text-sm text-white/80">{cook.recipe}</p>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-charcoal/70 italic">"{cook.quote}"</p>
                      <p className="text-sm text-charcoal/50 mt-2">— Parry</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link to="/cookbook#cooks">
                  <Button variant="outline" className="border-teal text-teal hover:bg-teal/5">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Meet All 77 Cooks
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Book Parry CTA */}
      <section id="booking" data-animate className="section-padding bg-primary-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Book Parry for Your Event
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Interested in having Parry at your cooking demonstration, book signing, 
            corporate event, or private function? We'd love to hear from you!
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <BookOpen className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Book Signings</h3>
              <p className="text-sm text-white/70">Promote the cookbook at your venue</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <PenTool className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Cooking Demos</h3>
              <p className="text-sm text-white/70">Live cooking workshops and classes</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <Mic className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-1">Speaking</h3>
              <p className="text-sm text-white/70">Keynotes and panel discussions</p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-white text-primary-red hover:bg-white/90 px-8 py-6 rounded-full text-lg"
            onClick={() => setShowBookingDialog(true)}
          >
            <Mail className="w-5 h-5 mr-2" />
            Request Booking
          </Button>
        </div>
      </section>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Book Parry for Your Event</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll get back to you within 48 hours.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleBooking} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" required />
            </div>
            <div>
              <Label htmlFor="organization">Organization/Venue</Label>
              <Input id="organization" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate">Preferred Date</Label>
                <Input id="eventDate" type="date" required />
              </div>
              <div>
                <Label htmlFor="eventType">Event Type</Label>
                <Input id="eventType" placeholder="e.g., Book Signing" required />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Event Location</Label>
              <Input id="location" required />
            </div>
            <div>
              <Label htmlFor="details">Event Details</Label>
              <Textarea 
                id="details" 
                placeholder="Tell us about your event, expected attendance, and any special requests..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary-red hover:bg-dark-red text-white">
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
