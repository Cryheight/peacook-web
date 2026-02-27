import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Heart, BookOpen, MapPin, Calendar, Trophy, PenTool, Info, Camera } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/', icon: Heart },
    { 
      name: 'Cookbook', 
      path: '/cookbook',
      icon: BookOpen,
      dropdown: [
        { name: 'About the Book', path: '/cookbook' },
        { name: 'Meet the Cooks', path: '/cookbook#cooks' },
        { name: 'Order Now', path: '/cookbook#order' },
      ]
    },
    { name: 'Recipes', path: '/recipes', icon: Heart },
    { name: 'Vendors', path: '/vendors', icon: MapPin },
    { name: 'Events', path: '/events', icon: Calendar },
    { 
      name: 'Competitions', 
      path: '/competitions',
      icon: Trophy,
      dropdown: [
        { name: 'Collect the Cooks', path: '/competitions#collect' },
        { name: 'Cooking My Way Through', path: '/competitions#cooking' },
        { name: 'Next Cookbook', path: '/competitions#next' },
        { name: 'Home Cook Champions', path: '/competitions#champions' },
      ]
    },
    { 
      name: 'PEI Cooks with Parry', 
      path: '/parry',
      icon: PenTool,
      dropdown: [
        { name: 'Columns', path: '/parry#columns' },
        { name: 'Appearances', path: '/parry#appearances' },
        { name: 'Book Parry', path: '/parry#booking' },
      ]
    },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-red group-hover:border-teal transition-colors">
              <img 
                src="/images/1000499002.jpg" 
                alt="PEI Cooks Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className={`font-display text-xl font-bold transition-colors ${
                isScrolled ? 'text-primary-red' : 'text-white'
              }`}>
                PEI Cooks
              </span>
              <span className={`block text-xs font-body transition-colors ${
                isScrolled ? 'text-charcoal/70' : 'text-white/80'
              }`}>
                with Parry
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isScrolled
                      ? 'text-charcoal hover:text-primary-red hover:bg-primary-red/5'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  } ${location.pathname === item.path ? (isScrolled ? 'text-primary-red' : 'text-white') : ''}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Dropdown */}
                {item.dropdown && openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-scale-in">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-4 py-3 text-sm text-charcoal hover:bg-primary-red/5 hover:text-primary-red transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/frame-generator"
              className="flex items-center gap-2 px-4 py-2 bg-gold text-white rounded-full text-sm font-medium hover:bg-gold/90 transition-colors shadow-lg hover:shadow-xl"
            >
              <Camera className="w-4 h-4" />
              <span>Frame Generator</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-charcoal hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200/20 animate-slide-up">
            <div className="flex flex-col gap-1 mt-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isScrolled
                        ? 'text-charcoal hover:bg-primary-red/5 hover:text-primary-red'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                  {item.dropdown && (
                    <div className="ml-8 mt-1 flex flex-col gap-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                            isScrolled
                              ? 'text-charcoal/70 hover:text-primary-red hover:bg-primary-red/5'
                              : 'text-white/70 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/frame-generator"
                className="flex items-center gap-3 px-4 py-3 mt-2 bg-gold text-white rounded-lg text-base font-medium"
              >
                <Camera className="w-5 h-5" />
                <span>Frame Generator</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
