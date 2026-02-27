import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'The Cookbook', path: '/cookbook' },
      { name: 'Recipes', path: '/recipes' },
      { name: 'Events', path: '/events' },
      { name: 'Vendors', path: '/vendors' },
    ],
    community: [
      { name: 'Competitions', path: '/competitions' },
      { name: 'Home Cook Champions', path: '/competitions#champions' },
      { name: 'Frame Generator', path: '/frame-generator' },
      { name: 'PEIGoodEats Group', href: 'https://facebook.com/groups/PEIGoodEats' },
    ],
    about: [
      { name: 'PEI Food Strong', path: '/about' },
      { name: 'Our Mission', path: '/about#mission' },
      { name: 'PEI Cooks with Parry', path: '/parry' },
      { name: 'Book Parry', path: '/parry#booking' },
    ],
  };

  return (
    <footer className="bg-charcoal text-white relative overflow-hidden">
      {/* Wave Top Border */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-12"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-cream"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
                <img 
                  src="/images/1000499002.jpg" 
                  alt="PEI Cooks Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">PEI Cooks</h3>
                <p className="text-gold font-script text-lg">with Parry</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              Celebrating the warmth of home cooking and the rich culinary heritage of Prince Edward Island. 
              Join our community of 77 home cooks sharing 157 local recipes.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com/groups/PEIGoodEats" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-red transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/peicooks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-red transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@peicooks.com"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-red transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  {link.path ? (
                    <Link 
                      to={link.path}
                      className="text-white/70 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 text-sm hover:text-white transition-colors flex items-center gap-1"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-gold mb-4">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gold" />
            <span className="text-white/70 text-sm">Prince Edward Island, Canada</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gold" />
            <a href="mailto:info@peicooks.com" className="text-white/70 text-sm hover:text-white transition-colors">
              info@peicooks.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gold" />
            <a href="tel:+19025551234" className="text-white/70 text-sm hover:text-white transition-colors">
              (902) 555-1234
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} PEI Cooks with Parry. All rights reserved.
          </p>
          <p className="text-white/50 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary-red fill-primary-red" /> on Prince Edward Island
          </p>
        </div>
      </div>
    </footer>
  );
}
