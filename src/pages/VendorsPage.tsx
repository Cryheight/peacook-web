import { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Truck, Store, Phone, Mail, Globe, Star, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface Vendor {
  id: number;
  name: string;
  type: string;
  address: string;
  area: string;
  phone: string;
  email: string;
  website?: string;
  ships: boolean;
  carriesCookbook: boolean;
  description: string;
  products: string[];
}

export function VendorsPage() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All');
  const [shipsOnly, setShipsOnly] = useState(false);
  const [carriesCookbookOnly, setCarriesCookbookOnly] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
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

  const areas = ['All', 'Charlottetown', 'Summerside', 'Montague', 'O\'Leary', 'North Rustico', 'Online'];

  const vendors: Vendor[] = [
    {
      id: 1,
      name: "Charlottetown Farmers Market",
      type: "Farmers Market",
      address: "100 Belvedere Ave, Charlottetown",
      area: "Charlottetown",
      phone: "(902) 368-7385",
      email: "info@charlottetownfarmersmarket.com",
      website: "https://charlottetownfarmersmarket.com",
      ships: false,
      carriesCookbook: true,
      description: "PEI's largest farmers market featuring over 50 local vendors. Open Saturdays year-round.",
      products: ["Fresh Produce", "Baked Goods", "Artisan Foods", "Crafts"]
    },
    {
      id: 2,
      name: "Summerside Farmers Market",
      type: "Farmers Market",
      address: "249 Water St, Summerside",
      area: "Summerside",
      phone: "(902) 436-7325",
      email: "summersidemarket@gmail.com",
      ships: false,
      carriesCookbook: true,
      description: "A vibrant community market showcasing the best of western PEI's agricultural products.",
      products: ["Fresh Produce", "Seafood", "Baked Goods", "Local Crafts"]
    },
    {
      id: 3,
      name: "PEI Preserve Company",
      type: "Specialty Food Store",
      address: "2841 New Glasgow Rd, New Glasgow",
      area: "Charlottetown",
      phone: "(902) 964-4300",
      email: "info@peipreservecompany.com",
      website: "https://peipreservecompany.com",
      ships: true,
      carriesCookbook: true,
      description: "Award-winning preserves, jams, and sauces made from local PEI fruits.",
      products: ["Preserves", "Jams", "Sauces", "Gift Baskets"]
    },
    {
      id: 4,
      name: "Cows Creamery",
      type: "Dairy & Gift Shop",
      address: "397 Capital Dr, Charlottetown",
      area: "Charlottetown",
      phone: "(902) 566-5508",
      email: "info@cowscreamery.ca",
      website: "https://cowscreamery.ca",
      ships: true,
      carriesCookbook: true,
      description: "World-famous PEI ice cream, cheese, and whimsical merchandise.",
      products: ["Ice Cream", "Cheese", "T-shirts", "Gifts"]
    },
    {
      id: 5,
      name: "Riverview Country Market",
      type: "Farm Market",
      address: "7184 Rte 1A, North Rustico",
      area: "North Rustico",
      phone: "(902) 963-2966",
      email: "riverviewmarket@pei.sympatico.ca",
      ships: false,
      carriesCookbook: true,
      description: "Family-owned market offering fresh local produce, baked goods, and PEI products.",
      products: ["Fresh Produce", "Baked Goods", "Local Products", "Plants"]
    },
    {
      id: 6,
      name: "Lady's Slipper Drive Farm",
      type: "Farm Stand",
      address: "Rte 6, O'Leary",
      area: "O'Leary",
      phone: "(902) 853-3443",
      email: "ladysslipperfarm@hotmail.com",
      ships: false,
      carriesCookbook: false,
      description: "Working potato farm with on-site farm stand featuring their famous PEI potatoes.",
      products: ["PEI Potatoes", "Fresh Vegetables", "Eggs"]
    },
    {
      id: 7,
      name: "Montague Farmers Market",
      type: "Farmers Market",
      address: "3 Main St N, Montague",
      area: "Montague",
      phone: "(902) 838-2400",
      email: "montaguemarket@eastlink.ca",
      ships: false,
      carriesCookbook: true,
      description: "Eastern PEI's premier farmers market, featuring local farmers, artisans, and food producers.",
      products: ["Fresh Produce", "Seafood", "Baked Goods", "Crafts"]
    },
    {
      id: 8,
      name: "Island Honey Wine Company",
      type: "Winery",
      address: "8291 Rte 20, Rose Valley",
      area: "O'Leary",
      phone: "(902) 853-3275",
      email: "info@islandhoneywine.ca",
      website: "https://islandhoneywine.ca",
      ships: true,
      carriesCookbook: false,
      description: "Unique honey wines and meads made from local PEI honey.",
      products: ["Honey Wine", "Mead", "Honey Products"]
    },
    {
      id: 9,
      name: "PEI Online Market",
      type: "Online Store",
      address: "Online Only",
      area: "Online",
      phone: "(902) 555-0199",
      email: "orders@peionlinemarket.com",
      website: "https://peionlinemarket.com",
      ships: true,
      carriesCookbook: true,
      description: "Your one-stop shop for PEI products delivered anywhere in Canada.",
      products: ["PEI Products", "Gift Baskets", "Food Items", "Souvenirs"]
    },
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.products.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesArea = selectedArea === 'All' || vendor.area === selectedArea;
    const matchesShips = !shipsOnly || vendor.ships;
    const matchesCookbook = !carriesCookbookOnly || vendor.carriesCookbook;
    return matchesSearch && matchesArea && matchesShips && matchesCookbook;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Application submitted! We will review and contact you soon.');
    setShowApplyDialog(false);
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
              <Store className="w-4 h-4 mr-2" />
              Local Partners
            </Badge>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              Find Our Vendors
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover where to find the PEI Cooks at Home cookbook and support local businesses 
              across Prince Edward Island.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" data-animate className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal text-white border-0">
              <MapPin className="w-4 h-4 mr-2" />
              Vendor Locations
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal">
              Across Prince Edward Island
            </h2>
          </div>

          <div className={`transition-all duration-1000 ${isVisible['map'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="relative h-96 bg-teal/10">
                {/* Simplified PEI Map Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-2xl h-full">
                    {/* PEI Shape */}
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      {/* Island outline */}
                      <path 
                        d="M50,100 Q80,60 150,50 Q220,40 280,60 Q340,80 360,120 Q350,150 300,160 Q220,170 150,160 Q80,150 50,120 Z" 
                        fill="#2E8B8B" 
                        fillOpacity="0.2"
                        stroke="#2E8B8B"
                        strokeWidth="2"
                      />
                      {/* Vendor markers */}
                      {[
                        { x: 120, y: 80, name: "Charlottetown" },
                        { x: 80, y: 110, name: "Summerside" },
                        { x: 280, y: 130, name: "Montague" },
                        { x: 60, y: 140, name: "O'Leary" },
                        { x: 140, y: 70, name: "North Rustico" },
                      ].map((marker, index) => (
                        <g key={index}>
                          <circle 
                            cx={marker.x} 
                            cy={marker.y} 
                            r="8" 
                            fill="#C41230"
                            className="animate-pulse"
                          />
                          <circle 
                            cx={marker.x} 
                            cy={marker.y} 
                            r="12" 
                            fill="none"
                            stroke="#C41230"
                            strokeWidth="2"
                            strokeOpacity="0.5"
                          />
                          <text 
                            x={marker.x} 
                            y={marker.y - 15} 
                            textAnchor="middle" 
                            className="text-xs fill-charcoal font-medium"
                          >
                            {marker.name}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-primary-red" />
                    <span className="text-sm text-charcoal">Vendor Location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-teal" />
                    <span className="text-sm text-charcoal">Shipping Available</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Vendor List Section */}
      <section id="vendors-list" data-animate className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto container-padding">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <Input 
                placeholder="Search vendors or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-5 h-5 text-charcoal/60" />
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-primary-red"
              >
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              <label className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 cursor-pointer">
                <Checkbox 
                  checked={shipsOnly}
                  onCheckedChange={(checked) => setShipsOnly(checked as boolean)}
                />
                <span className="text-sm text-charcoal">Ships</span>
                <Truck className="w-4 h-4 text-teal" />
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 cursor-pointer">
                <Checkbox 
                  checked={carriesCookbookOnly}
                  onCheckedChange={(checked) => setCarriesCookbookOnly(checked as boolean)}
                />
                <span className="text-sm text-charcoal">Has Cookbook</span>
                <Star className="w-4 h-4 text-gold" />
              </label>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-charcoal/60">
              Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Vendor Grid */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ${isVisible['vendors-list'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {filteredVendors.map((vendor) => (
              <Card key={vendor.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-charcoal group-hover:text-primary-red transition-colors">
                        {vendor.name}
                      </h3>
                      <p className="text-sm text-charcoal/60">{vendor.type}</p>
                    </div>
                    <div className="flex gap-1">
                      {vendor.ships && (
                        <Badge className="bg-teal text-white">
                          <Truck className="w-3 h-3 mr-1" />
                          Ships
                        </Badge>
                      )}
                      {vendor.carriesCookbook && (
                        <Badge className="bg-gold text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Book
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-sm text-charcoal/70">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal" />
                      <span>{vendor.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal/70">
                      <Phone className="w-4 h-4 flex-shrink-0 text-teal" />
                      <span>{vendor.phone}</span>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal/60 mb-4 line-clamp-2">
                    {vendor.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {vendor.products.slice(0, 3).map((product) => (
                      <span 
                        key={product}
                        className="px-2 py-1 bg-cream rounded-full text-xs text-charcoal/70"
                      >
                        {product}
                      </span>
                    ))}
                    {vendor.products.length > 3 && (
                      <span className="px-2 py-1 bg-cream rounded-full text-xs text-charcoal/70">
                        +{vendor.products.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 text-sm"
                      onClick={() => setSelectedVendor(vendor)}
                    >
                      View Details
                    </Button>
                    {vendor.website && (
                      <a 
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Globe className="w-4 h-4 text-charcoal/60" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-16">
              <Store className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-charcoal mb-2">No vendors found</h3>
              <p className="text-charcoal/60">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Become a Vendor CTA */}
      <section className="py-20 bg-teal relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Become a Vendor Partner
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Are you a local business interested in carrying the PEI Cooks at Home cookbook? 
            Join our network of vendor partners and help spread the love of Island cooking.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-teal hover:bg-white/90 px-8 py-6 rounded-full text-lg"
            onClick={() => setShowApplyDialog(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Apply to Become a Vendor
          </Button>
        </div>
      </section>

      {/* Vendor Detail Dialog */}
      <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <DialogContent className="max-w-lg">
          {selectedVendor && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{selectedVendor.name}</DialogTitle>
                <DialogDescription>{selectedVendor.type}</DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <div className="flex gap-2">
                  {selectedVendor.ships && (
                    <Badge className="bg-teal text-white">
                      <Truck className="w-3 h-3 mr-1" />
                      Shipping Available
                    </Badge>
                  )}
                  {selectedVendor.carriesCookbook && (
                    <Badge className="bg-gold text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Carries Cookbook
                    </Badge>
                  )}
                </div>

                <p className="text-charcoal/70">{selectedVendor.description}</p>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-teal" />
                    <span>{selectedVendor.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-teal" />
                    <a href={`tel:${selectedVendor.phone}`} className="text-primary-red hover:underline">
                      {selectedVendor.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-teal" />
                    <a href={`mailto:${selectedVendor.email}`} className="text-primary-red hover:underline">
                      {selectedVendor.email}
                    </a>
                  </div>
                  {selectedVendor.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-teal" />
                      <a 
                        href={selectedVendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-red hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-charcoal mb-2">Products</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.products.map((product) => (
                      <span 
                        key={product}
                        className="px-3 py-1 bg-cream rounded-full text-sm text-charcoal/70"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Become a Vendor Partner</DialogTitle>
            <DialogDescription>
              Fill out the form below and we'll get back to you within 2 business days.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleApply} className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required />
              </div>
            </div>
            
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" required />
            </div>
            
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Input id="businessType" placeholder="e.g., Farmers Market, Gift Shop, Online Store" required />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" required />
            </div>
            
            <div>
              <Label htmlFor="address">Business Address</Label>
              <Input id="address" required />
            </div>
            
            <div>
              <Label htmlFor="message">Tell us about your business</Label>
              <Textarea 
                id="message" 
                placeholder="What products do you carry? Why are you interested in partnering with us?"
                rows={4}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Checkbox id="shipping" />
              <Label htmlFor="shipping" className="text-sm">
                We offer shipping/delivery
              </Label>
            </div>
            
            <Button type="submit" className="w-full bg-primary-red hover:bg-dark-red text-white">
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
