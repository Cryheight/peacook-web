import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, Users, Calendar, Star, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function HomePage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const featuredRecipe = {
    name: "Classic PEI Lobster Rolls",
    image: "/images/recipe-lobster-roll.jpg",
    description: "Fresh Atlantic lobster meat tossed in a light mayo dressing, served in buttery toasted buns with a side of crispy fries.",
    cook: "Sarah MacDonald",
    time: "25 min",
    difficulty: "Easy"
  };

  const stats = [
    { number: 77, label: "Home Cooks", icon: Users },
    { number: 157, label: "Local Recipes", icon: BookOpen },
    { number: 200, label: "Color Pages", icon: Star },
  ];

  const testimonials = [
    {
      quote: "This cookbook captures the heart and soul of PEI cooking. Every recipe tells a story.",
      author: "Margaret Johnson",
      location: "Charlottetown"
    },
    {
      quote: "I've cooked my way through half the book already. The lobster chowder is incredible!",
      author: "David Chen",
      location: "Summerside"
    },
    {
      quote: "A beautiful celebration of our island's culinary heritage. A must-have for every kitchen.",
      author: "Emma MacLeod",
      location: "Montague"
    },
  ];

  const upcomingEvents = [
    {
      title: "Summer Cooking Workshop",
      date: "March 15, 2025",
      location: "Charlottetown",
      image: "/images/event-workshop.jpg"
    },
    {
      title: "Book Signing at Farmers Market",
      date: "March 22, 2025",
      location: "Summerside",
      image: "/images/event-book-signing.jpg"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-coastline.jpg" 
            alt="PEI Coastline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-gold/90 text-white border-0 px-4 py-1.5 text-sm">
              <Star className="w-3.5 h-3.5 mr-1 fill-white" />
              77 Home Cooks • 157 Recipes • 200 Pages
            </Badge>
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Taste the Island.
            <br />
            <span className="text-gradient-gold">Share the Love.</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Join our community of home cooks celebrating the flavors of Prince Edward Island. 
            From our red soil to your kitchen table.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Link to="/cookbook">
              <Button size="lg" className="bg-primary-red hover:bg-dark-red text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore the Cookbook
              </Button>
            </Link>
            <Link to="/recipes">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
                <Heart className="w-5 h-5 mr-2" />
                View Recipes
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About the Cookbook Section */}
      <section id="cookbook-section" data-animate className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Book Image */}
            <div className={`relative transition-all duration-1000 ${isVisible['cookbook-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary-red/10 rounded-3xl transform rotate-3" />
                <img 
                  src="/images/1000498998.jpg" 
                  alt="PEI Cooks at Home Cookbook" 
                  className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto hover-lift"
                />
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-gold text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg animate-float">
                  <span className="font-display text-2xl font-bold">$35</span>
                  <span className="text-xs">CAD</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible['cookbook-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <Badge className="mb-4 bg-teal text-white border-0">
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                Available Now
              </Badge>
              
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-6">
                PEI Cooks at Home
              </h2>
              
              <p className="text-lg text-charcoal/70 mb-6 leading-relaxed">
                A celebration of community, culture, and comfort food from Canada's smallest province. 
                This stunning 200-page cookbook features 157 authentic recipes from 77 home cooks, 
                each sharing their family favorites and cherished traditions.
              </p>
              
              <p className="text-charcoal/70 mb-8 leading-relaxed">
                From fresh Atlantic seafood to farm-fresh produce grown in our famous red soil, 
                discover why Prince Edward Island is a food lover's paradise.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary-red/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary-red" />
                    </div>
                    <div className="font-display text-3xl font-bold text-primary-red">{stat.number}</div>
                    <div className="text-sm text-charcoal/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link to="/cookbook">
                <Button className="bg-primary-red hover:bg-dark-red text-white px-8 py-6 rounded-full text-lg">
                  Get Your Copy
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipe Section */}
      <section id="featured-recipe" data-animate className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gold text-white border-0">
              <Heart className="w-3.5 h-3.5 mr-1 fill-white" />
              This Week's Featured Recipe
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
              From Our Kitchen to Yours
            </h2>
          </div>

          <div className={`transition-all duration-1000 ${isVisible['featured-recipe'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Card className="overflow-hidden shadow-2xl border-0">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={featuredRecipe.image} 
                    alt={featuredRecipe.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary-red text-white border-0">
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="font-display text-3xl font-bold text-charcoal mb-4">
                    {featuredRecipe.name}
                  </h3>
                  <p className="text-charcoal/70 mb-6 leading-relaxed">
                    {featuredRecipe.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <Users className="w-4 h-4" />
                      <span>By {featuredRecipe.cook}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredRecipe.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal/60">
                      <Star className="w-4 h-4" />
                      <span>{featuredRecipe.difficulty}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Link to="/recipes">
                      <Button className="bg-primary-red hover:bg-dark-red text-white rounded-full">
                        View Full Recipe
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <a 
                      href="https://facebook.com/groups/PEIGoodEats" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="rounded-full border-teal text-teal hover:bg-teal/5">
                        Join Discussion
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Cooks Preview */}
      <section id="cooks-preview" data-animate className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-teal text-white border-0">
                <Users className="w-3.5 h-3.5 mr-1" />
                Our Community
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
                Meet the Heart of PEI Cooking
              </h2>
            </div>
            <Link to="/cookbook#cooks" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-primary-red text-primary-red hover:bg-primary-red/5 rounded-full">
                View All Cooks
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible['cooks-preview'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {[
              { name: "Sarah MacDonald", recipes: 4, image: "/images/cook-1.jpg", hearts: 128 },
              { name: "James O'Brien", recipes: 3, image: "/images/cook-2.jpg", hearts: 96 },
              { name: "Emma Wilson", recipes: 5, image: "/images/cook-3.jpg", hearts: 156 },
              { name: "Parry Aftab", recipes: 12, image: "/images/1000499006.jpg", hearts: 342 },
            ].map((cook) => (
              <Card key={cook.name} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="relative">
                  <img 
                    src={cook.image} 
                    alt={cook.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{cook.recipes} recipes</span>
                      <div className="flex items-center gap-1 text-white/80">
                        <Heart className="w-4 h-4 fill-primary-red text-primary-red" />
                        <span className="text-sm">{cook.hearts}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-xl font-semibold text-charcoal">{cook.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" data-animate className="section-padding bg-primary-red relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Star className="w-3.5 h-3.5 mr-1 fill-white" />
              What People Are Saying
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
              Island Love
            </h2>
          </div>

          <div className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible['testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed text-white/90">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-display font-bold">{testimonial.author[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-white/60 flex items-center gap-1">
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

      {/* Upcoming Events Section */}
      <section id="events-preview" data-animate className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-teal text-white border-0">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Coming Up
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
                Upcoming Events
              </h2>
            </div>
            <Link to="/events" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-teal text-teal hover:bg-teal/5 rounded-full">
                View All Events
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 ${isVisible['events-preview'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                <div className="relative h-48">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white mb-1">{event.title}</h3>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Link to="/events">
                    <Button variant="ghost" className="text-primary-red hover:text-dark-red hover:bg-primary-red/5 p-0">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Join the PEI Good Eats Community
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Connect with fellow food lovers, share your creations, and discover new recipes 
            from across Prince Edward Island.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://facebook.com/groups/PEIGoodEats" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-white text-teal hover:bg-white/90 px-8 py-6 rounded-full text-lg">
                Join Facebook Group
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Link to="/cookbook#order">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg">
                Order the Cookbook
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
