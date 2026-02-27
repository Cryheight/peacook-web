import { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Users, Share2, Check, ExternalLink, Ticket, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  type: 'workshop' | 'signing' | 'class' | 'competition';
  price: string;
  capacity: number;
  registered: number;
  host: string;
  isThirdParty?: boolean;
  registrationLink?: string;
}

export function EventsPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [goingEvents, setGoingEvents] = useState<Set<number>>(new Set());
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

  const events: Event[] = [
    {
      id: 1,
      title: "Spring Cooking Workshop",
      date: "March 15, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Charlottetown Culinary Centre",
      image: "/images/event-workshop.jpg",
      description: "Join Parry and guest chefs for a hands-on workshop featuring spring recipes from the cookbook. Learn techniques for working with fresh seasonal ingredients.",
      type: "workshop",
      price: "$75",
      capacity: 20,
      registered: 14,
      host: "PEI Cooks with Parry"
    },
    {
      id: 2,
      title: "Book Signing at Farmers Market",
      date: "March 22, 2025",
      time: "9:00 AM - 1:00 PM",
      location: "Summerside Farmers Market",
      image: "/images/event-book-signing.jpg",
      description: "Meet Parry and several contributing cooks! Get your cookbook signed and sample recipes from the book.",
      type: "signing",
      price: "Free",
      capacity: 100,
      registered: 45,
      host: "PEI Cooks with Parry"
    },
    {
      id: 3,
      title: "Seafood Masterclass",
      date: "April 5, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Culinary Institute of Canada",
      image: "/images/recipe-oysters.jpg",
      description: "A comprehensive class on preparing PEI seafood. Learn to shuck oysters, cook lobster, and make the perfect chowder.",
      type: "class",
      price: "$120",
      capacity: 15,
      registered: 12,
      host: "Culinary Institute of Canada",
      isThirdParty: true,
      registrationLink: "https://cic.edu/events"
    },
    {
      id: 4,
      title: "Collect the Cooks Kickoff",
      date: "April 12, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Montague Rotary Library",
      image: "/images/1000498998.jpg",
      description: "Launch event for our 'Collect the Cooks' competition! Meet contributing cooks, get signatures, and learn about the contest.",
      type: "competition",
      price: "Free",
      capacity: 50,
      registered: 28,
      host: "PEI Cooks with Parry"
    },
    {
      id: 5,
      title: "Kids in the Kitchen",
      date: "April 19, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Charlottetown YMCA",
      image: "/images/cook-3.jpg",
      description: "A fun cooking class for kids ages 8-12. Learn to make simple, delicious recipes from the cookbook.",
      type: "class",
      price: "$25",
      capacity: 12,
      registered: 8,
      host: "Charlottetown YMCA",
      isThirdParty: true,
      registrationLink: "https://ymcapei.org/programs"
    },
    {
      id: 6,
      title: "Summer Preserving Workshop",
      date: "May 10, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "PEI Preserve Company",
      image: "/images/recipe-blueberry-pie.jpg",
      description: "Learn the art of preserving from the experts. Make your own jams and preserves to take home.",
      type: "workshop",
      price: "$85",
      capacity: 16,
      registered: 6,
      host: "PEI Preserve Company"
    },
  ];

  const pastEvents = [
    {
      id: 101,
      title: "Winter Warmers Workshop",
      date: "February 8, 2025",
      image: "/images/recipe-chowder.jpg",
      attendees: 18,
      testimonials: [
        { name: "Alice M.", text: "Learned so much about making the perfect chowder!" },
        { name: "Robert K.", text: "Great atmosphere and delicious food. Can't wait for the next one!" }
      ]
    },
    {
      id: 102,
      title: "Cookbook Launch Party",
      date: "January 15, 2025",
      image: "/images/1000498998.jpg",
      attendees: 150,
      testimonials: [
        { name: "Susan T.", text: "What a wonderful celebration of Island cooking!" },
        { name: "Michael P.", text: "Met so many amazing cooks. The book is beautiful!" }
      ]
    }
  ];

  const handleShare = (event: Event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Join me at ${event.title} on ${event.date}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Join me at ${event.title} on ${event.date}! ${window.location.href}`);
      toast.success('Event link copied to clipboard!');
    }
  };

  const handleGoing = (eventId: number) => {
    setGoingEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
        toast.info('Removed from your events');
      } else {
        newSet.add(eventId);
        toast.success('You\'re going! See you there!');
      }
      return newSet;
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Registration submitted! Check your email for confirmation.');
    setShowRegistrationDialog(false);
    setSelectedEvent(null);
  };

  const upcomingEvents = events.filter(e => new Date(e.date) > new Date());
  const thirdPartyEvents = events.filter(e => e.isThirdParty);
  const ourEvents = events.filter(e => !e.isThirdParty);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary-red to-dark-red overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-8 border-white rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Calendar className="w-4 h-4 mr-2" />
              Join Us
            </Badge>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              Upcoming Events
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Cooking workshops, book signings, and community gatherings. 
              Come cook with us and celebrate Island food culture!
            </p>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section id="events-tabs" data-animate className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="ours">Our Events</TabsTrigger>
              <TabsTrigger value="third">Partner Events</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="animate-fade-in">
              <EventGrid 
                events={upcomingEvents} 
                onSelect={setSelectedEvent}
                onShare={handleShare}
                onGoing={handleGoing}
                goingEvents={goingEvents}
                isVisible={isVisible['events-tabs']}
              />
            </TabsContent>

            <TabsContent value="ours" className="animate-fade-in">
              <EventGrid 
                events={ourEvents} 
                onSelect={setSelectedEvent}
                onShare={handleShare}
                onGoing={handleGoing}
                goingEvents={goingEvents}
                isVisible={isVisible['events-tabs']}
              />
            </TabsContent>

            <TabsContent value="third" className="animate-fade-in">
              <div className="mb-6 p-4 bg-teal/10 rounded-lg">
                <p className="text-teal text-sm">
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  These events are hosted by our partners. Registration is handled through their websites.
                </p>
              </div>
              <EventGrid 
                events={thirdPartyEvents} 
                onSelect={setSelectedEvent}
                onShare={handleShare}
                onGoing={handleGoing}
                goingEvents={goingEvents}
                isVisible={isVisible['events-tabs']}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Past Events & Testimonials */}
      <section id="past-events" data-animate className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gold text-white border-0">
              <Heart className="w-4 h-4 mr-2" />
              Memories
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
              Past Events & Testimonials
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 ${isVisible['past-events'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden border-0 shadow-lg">
                <div className="relative h-48">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-display text-xl font-bold">{event.title}</h3>
                    <p className="text-sm text-white/80">{event.date}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-teal" />
                    <span className="text-sm text-charcoal/60">{event.attendees} attendees</span>
                  </div>
                  
                  <div className="space-y-3">
                    {event.testimonials.map((testimonial, index) => (
                      <div key={index} className="p-3 bg-cream rounded-lg">
                        <p className="text-sm text-charcoal/70 italic">"{testimonial.text}"</p>
                        <p className="text-xs text-charcoal/50 mt-1">— {testimonial.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Host Your Own Event CTA */}
      <section className="py-20 bg-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Want to Host an Event?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Interested in having Parry or the PEI Cooks team at your venue? 
            We'd love to bring our cooking workshops and book signings to your community.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-teal hover:bg-white/90 px-8 py-6 rounded-full text-lg"
            onClick={() => window.location.href = '/parry#booking'}
          >
            <Plus className="w-5 h-5 mr-2" />
            Book an Event
          </Button>
        </div>
      </section>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  <Badge className={`mt-2 ${
                    selectedEvent.type === 'workshop' ? 'bg-teal' :
                    selectedEvent.type === 'signing' ? 'bg-gold' :
                    selectedEvent.type === 'class' ? 'bg-primary-red' :
                    'bg-purple-500'
                  } text-white`}>
                    {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                  </Badge>
                </DialogDescription>
              </DialogHeader>
              
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-teal" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-teal" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-teal" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-teal" />
                  <span>Hosted by {selectedEvent.host}</span>
                </div>
              </div>

              <p className="text-charcoal/70 mt-4">{selectedEvent.description}</p>

              <div className="flex items-center justify-between mt-4 p-4 bg-cream rounded-lg">
                <div>
                  <p className="text-sm text-charcoal/60">Price</p>
                  <p className="font-display text-2xl font-bold text-primary-red">{selectedEvent.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-charcoal/60">Spots Left</p>
                  <p className="font-bold text-charcoal">{selectedEvent.capacity - selectedEvent.registered} / {selectedEvent.capacity}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                {selectedEvent.isThirdParty ? (
                  <a 
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-teal hover:bg-dark-teal text-white">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Register on Partner Site
                    </Button>
                  </a>
                ) : (
                  <Button 
                    className="flex-1 bg-primary-red hover:bg-dark-red text-white"
                    onClick={() => setShowRegistrationDialog(true)}
                  >
                    <Ticket className="w-4 h-4 mr-2" />
                    Register Now
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => handleShare(selectedEvent)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleGoing(selectedEvent.id)}
                  className={goingEvents.has(selectedEvent.id) ? 'bg-primary-red/10 border-primary-red text-primary-red' : ''}
                >
                  <Heart className={`w-4 h-4 mr-2 ${goingEvents.has(selectedEvent.id) ? 'fill-primary-red' : ''}`} />
                  {goingEvents.has(selectedEvent.id) ? 'Going' : 'I\'m Going'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Registration Dialog */}
      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Register for Event</DialogTitle>
            <DialogDescription>
              {selectedEvent?.title} - {selectedEvent?.date}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleRegister} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" required />
            </div>
            {selectedEvent && selectedEvent.price !== 'Free' && (
              <div className="p-4 bg-cream rounded-lg">
                <p className="text-sm text-charcoal/60">Payment Required</p>
                <p className="font-display text-xl font-bold text-primary-red">{selectedEvent.price}</p>
                <p className="text-xs text-charcoal/50 mt-1">
                  Payment details will be sent via email after registration
                </p>
              </div>
            )}
            <Button type="submit" className="w-full bg-primary-red hover:bg-dark-red text-white">
              <Check className="w-4 h-4 mr-2" />
              Complete Registration
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Event Grid Component
interface EventGridProps {
  events: Event[];
  onSelect: (event: Event) => void;
  onShare: (event: Event) => void;
  onGoing: (eventId: number) => void;
  goingEvents: Set<number>;
  isVisible: boolean;
}

function EventGrid({ events, onSelect, onShare, onGoing, goingEvents, isVisible }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <Calendar className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-charcoal mb-2">No events found</h3>
        <p className="text-charcoal/60">Check back soon for new events!</p>
      </div>
    );
  }

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
          <div className="relative h-48">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <Badge className={`${
                event.type === 'workshop' ? 'bg-teal' :
                event.type === 'signing' ? 'bg-gold' :
                event.type === 'class' ? 'bg-primary-red' :
                'bg-purple-500'
              } text-white`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </Badge>
            </div>
            {event.isThirdParty && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-white/90 text-charcoal">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Partner
                </Badge>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4">
              <div className="flex items-center gap-2 text-white text-sm">
                <Calendar className="w-4 h-4" />
                {event.date}
              </div>
            </div>
          </div>
          <CardContent className="p-5">
            <h3 className="font-display text-xl font-semibold text-charcoal mb-2 group-hover:text-primary-red transition-colors">
              {event.title}
            </h3>
            
            <div className="space-y-1 mb-4">
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <Clock className="w-4 h-4" />
                {event.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-xl font-bold text-primary-red">{event.price}</span>
              <span className="text-sm text-charcoal/60">
                {event.capacity - event.registered} spots left
              </span>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 text-sm"
                onClick={() => onSelect(event)}
              >
                Details
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onShare(event)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onGoing(event.id)}
                className={goingEvents.has(event.id) ? 'text-primary-red' : ''}
              >
                <Heart className={`w-4 h-4 ${goingEvents.has(event.id) ? 'fill-primary-red' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
