import { useState, useEffect, useRef } from 'react';
import { Heart, Leaf, Users, Globe, Send, Check, MapPin, Shield, ShoppingBag, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export function AboutPage() {
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
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const initiatives = [
    {
      title: "Food Future-Proofing",
      icon: Shield,
      description: "Building resilient food systems that can withstand climate change and economic challenges.",
      color: "bg-teal"
    },
    {
      title: "Supporting Local",
      icon: MapPin,
      description: "Connecting consumers with local farmers, fishers, and food producers across PEI.",
      color: "bg-primary-red"
    },
    {
      title: "PEI-Made Products",
      icon: ShoppingBag,
      description: "Promoting and celebrating food products grown, raised, and made on Prince Edward Island.",
      color: "bg-gold"
    },
    {
      title: "Community Education",
      icon: Users,
      description: "Teaching cooking skills, food preservation, and sustainable practices to all Islanders.",
      color: "bg-purple-500"
    }
  ];

  const supportedPrograms = [
    {
      name: "Island Food Banks",
      description: "Providing fresh, local produce to food banks across PEI.",
      amount: "$15,000"
    },
    {
      name: "School Nutrition Programs",
      description: "Teaching children about healthy eating and local food.",
      amount: "$8,500"
    },
    {
      name: "Community Gardens",
      description: "Supporting urban agriculture and community growing spaces.",
      amount: "$5,000"
    },
    {
      name: "Senior Meal Programs",
      description: "Delivering nutritious meals to isolated seniors.",
      amount: "$6,500"
    }
  ];

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your idea! We will review it and get back to you.');
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
                <Heart className="w-4 h-4 mr-2" />
                Non-Profit Organization
              </Badge>
              <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
                PEI Food Strong
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Together, we nourish community. All proceeds from the PEI Cooks at Home cookbook 
                support initiatives that strengthen our local food system and help those in need.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">$35K+</div>
                    <div className="text-white/70 text-sm">Raised</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold">12</div>
                    <div className="text-white/70 text-sm">Programs</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl transform rotate-3" />
              <img 
                src="/images/1000499000.jpg" 
                alt="PEI Food Strong" 
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto bg-white p-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section id="mission" data-animate className="section-padding bg-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <Badge className="mb-4 bg-gold text-white border-0">
            <Globe className="w-4 h-4 mr-2" />
            Our Mission
          </Badge>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Building a Stronger Food Community
          </h2>
          <p className="text-xl text-charcoal/70 leading-relaxed mb-8">
            PEI Food Strong, Inc. is dedicated to creating a resilient, sustainable, and inclusive 
            food system on Prince Edward Island. We believe that everyone deserves access to 
            fresh, nutritious, locally-grown food, and that our community is stronger when we 
            support one another.
          </p>
          <p className="text-lg text-charcoal/70 leading-relaxed">
            Through the sale of the PEI Cooks at Home cookbook, we fund programs that support 
            local farmers, educate our youth, feed the hungry, and preserve our Island's rich 
            culinary heritage for future generations.
          </p>
        </div>
      </section>

      {/* Initiatives */}
      <section id="initiatives" data-animate className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal text-white border-0">
              <Sprout className="w-4 h-4 mr-2" />
              Our Focus Areas
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
              What We Do
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 ${isVisible['initiatives'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {initiatives.map((initiative) => (
              <Card key={initiative.title} className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className={`w-24 ${initiative.color} flex items-center justify-center flex-shrink-0`}>
                      <initiative.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="p-6 flex-1">
                      <h3 className="font-display text-xl font-semibold text-charcoal mb-2 group-hover:text-primary-red transition-colors">
                        {initiative.title}
                      </h3>
                      <p className="text-charcoal/70">{initiative.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Programs */}
      <section id="programs" data-animate className="section-padding bg-primary-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Heart className="w-4 h-4 mr-2" />
              Making a Difference
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
              Programs We Support
            </h2>
            <p className="text-xl text-white/80 mt-4 max-w-2xl mx-auto">
              Every cookbook purchase directly supports these vital community programs
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible['programs'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {supportedPrograms.map((program) => (
              <Card key={program.name} className="border-0 shadow-xl bg-white/10 backdrop-blur-sm text-white">
                <CardContent className="p-6 text-center">
                  <div className="font-display text-4xl font-bold text-gold mb-2">
                    {program.amount}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
                  <p className="text-sm text-white/70">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Idea Section */}
      <section id="submit-idea" data-animate className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-teal text-white border-0">
                <Send className="w-4 h-4 mr-2" />
                Have an Idea?
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-6">
                Suggest a Program to Support
              </h2>
              <p className="text-lg text-charcoal/70 mb-6 leading-relaxed">
                Do you know of a community program or initiative that aligns with our mission? 
                We'd love to hear your ideas for how we can make an even bigger impact on 
                Prince Edward Island.
              </p>
              <p className="text-charcoal/70 mb-8">
                Whether it's a food bank that needs support, a school garden program, 
                a community kitchen, or any other initiative that strengthens our local 
                food system, we want to know about it.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-teal" />
                  </div>
                  <p className="text-charcoal/70">Programs must benefit PEI residents</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-teal" />
                  </div>
                  <p className="text-charcoal/70">Should align with our food-focused mission</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-teal" />
                  </div>
                  <p className="text-charcoal/70">Non-profit or community-based initiatives preferred</p>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmitIdea} className="space-y-4">
                  <div>
                    <Label htmlFor="yourName">Your Name</Label>
                    <Input id="yourName" required />
                  </div>
                  <div>
                    <Label htmlFor="yourEmail">Your Email</Label>
                    <Input id="yourEmail" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="programName">Program/Organization Name</Label>
                    <Input id="programName" required />
                  </div>
                  <div>
                    <Label htmlFor="programDescription">Tell Us About the Program</Label>
                    <Textarea 
                      id="programDescription" 
                      placeholder="What does this program do? Who does it serve? How would funding help?"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="fundingAmount">Suggested Funding Amount</Label>
                    <Input id="fundingAmount" placeholder="e.g., $5,000" />
                  </div>
                  <Button type="submit" className="w-full bg-teal hover:bg-dark-teal text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Idea
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-6">
            Be Part of the Solution
          </h2>
          <p className="text-xl text-charcoal/70 mb-8 max-w-2xl mx-auto">
            Every cookbook purchase helps us support more programs and make a bigger impact 
            on our Island community. Together, we can build a stronger, more resilient food system.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/cookbook#order">
              <Button size="lg" className="bg-primary-red hover:bg-dark-red text-white px-8 py-6 rounded-full text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Order the Cookbook
              </Button>
            </Link>
            <a href="mailto:info@peifoodstrong.org">
              <Button size="lg" variant="outline" className="border-teal text-teal hover:bg-teal/5 px-8 py-6 rounded-full text-lg">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
