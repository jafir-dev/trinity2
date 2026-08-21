import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, Mail, ChevronDown, 
  MapPin, MessageCircle, Clock, Award, Users, 
  Sparkles, Layers, ShieldCheck 
} from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from 'wouter';
import trinityLogo from "@assets/image_1785904865497.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (href: string) => {
    setMobileOpen(false);
    setAboutDropdownOpen(false);
    setServicesDropdownOpen(false);
    
    if (href.startsWith('/#') || href.startsWith('#')) {
      const id = href.replace('/#', '').replace('#', '');
      if (location === '/') {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      } else {
        setLocation('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }
    }
    
    setLocation(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Info Bar */}
      <div className="bg-[#5c1c69] text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="font-medium tracking-wide flex items-center gap-1.5 text-white/90">
              <Sparkles size={13} className="text-pink-300" />
              Welcome to Trinity Group
            </span>
            <a 
              href="tel:+971526935456" 
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              <Phone size={12} className="text-pink-300" />
              <span>+971 52 693 5456</span>
            </a>
            <a 
              href="tel:+97143409377" 
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              <Phone size={12} className="text-pink-300" />
              <span>+971 4 340 9377</span>
            </a>
            <a 
              href="mailto:inquiry@trinitymediauae.com" 
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              <Mail size={12} className="text-pink-300" />
              <span>inquiry@trinitymediauae.com</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-white/80">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebookF size={12} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter size={12} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram size={12} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={12} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
                <FaYoutube size={12} />
              </a>
            </div>
            <span className="text-white/30">|</span>
            <a
              href="https://wa.me/971526935456?text=Hi%20Trinity%20Media%2C%20I%20would%20like%20to%20inquire%20about%20your%20printing%20and%20branding%20services."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-pink-200 hover:text-white transition-colors font-semibold"
            >
              <MessageCircle size={13} />
              <span>Contact Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-border/80 py-3 shadow-xl' 
            : 'bg-[#080808]/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="block">
            <img src={trinityLogo} alt="Trinity Media UAE" className="h-10 md:h-12 w-auto object-contain cursor-pointer" />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center space-x-7">
            <button
              onClick={() => navigateTo('/')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === '/' ? 'text-primary font-semibold' : 'text-gray-200 hover:text-primary'
              }`}
            >
              Home
            </button>

            {/* About Us Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('/about')}
                className="flex items-center gap-1 text-sm font-medium text-gray-200 hover:text-primary transition-colors py-2 cursor-pointer"
              >
                <span>About Us</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-64 bg-[#141414] border border-border/80 rounded-lg shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    <button
                      onClick={() => navigateTo('/about')}
                      className="w-full text-left px-3 py-2.5 rounded-md text-sm text-gray-200 hover:bg-primary/20 hover:text-white transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <Sparkles size={16} className="text-primary" />
                      <div>
                        <div className="font-semibold">About Trinity</div>
                        <div className="text-xs text-muted-foreground">Company overview & ISO standards</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigateTo('/our-journey')}
                      className="w-full text-left px-3 py-2.5 rounded-md text-sm text-gray-200 hover:bg-primary/20 hover:text-white transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <Clock size={16} className="text-primary" />
                      <div>
                        <div className="font-semibold">Our Journey</div>
                        <div className="text-xs text-muted-foreground">Timeline from 2010 to present</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigateTo('/why-choose-us')}
                      className="w-full text-left px-3 py-2.5 rounded-md text-sm text-gray-200 hover:bg-primary/20 hover:text-white transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <ShieldCheck size={16} className="text-primary" />
                      <div>
                        <div className="font-semibold">Why Choose Us</div>
                        <div className="text-xs text-muted-foreground">7 trust pillars & machinery</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigateTo('/our-journey#ceo-message')}
                      className="w-full text-left px-3 py-2.5 rounded-md text-sm text-gray-200 hover:bg-primary/20 hover:text-white transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <Users size={16} className="text-primary" />
                      <div>
                        <div className="font-semibold">CEO's Message</div>
                        <div className="text-xs text-muted-foreground">Leadership vision & commitment</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigateTo('/awards')}
                      className="w-full text-left px-3 py-2.5 rounded-md text-sm text-gray-200 hover:bg-primary/20 hover:text-white transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <Award size={16} className="text-primary" />
                      <div>
                        <div className="font-semibold">Awards & Sponsorships</div>
                        <div className="text-xs text-muted-foreground">Industry recognition & EDP awards</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('/#services')}
                className="flex items-center gap-1 text-sm font-medium text-gray-200 hover:text-primary transition-colors py-2 cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-72 bg-[#141414] border border-border/80 rounded-lg shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    {[
                      { name: 'Large Format Digital Printing', slug: 'large-format-printing' },
                      { name: 'Exhibition Stands & Display Unit', slug: 'exhibition-stands' },
                      { name: 'Signage & Acrylic Works', slug: 'signage-acrylic' },
                      { name: 'Wallpaper Printing', slug: 'wallpaper-printing' },
                      { name: 'Canvas & Fine Art Printing', slug: 'canvas-printing' },
                      { name: 'Flag & Fabric Printing', slug: 'flag-printing' },
                      { name: 'Flatbed UV Printing Service', slug: 'uv-printing' },
                    ].map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => navigateTo(`/services/${item.slug}`)}
                        className="w-full text-left px-3 py-2 rounded text-xs md:text-sm text-gray-300 hover:bg-primary/20 hover:text-white transition-colors block cursor-pointer"
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigateTo('/our-facilities')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === '/our-facilities' ? 'text-primary font-semibold' : 'text-gray-200 hover:text-primary'
              }`}
            >
              Our Facilities
            </button>

            <button
              onClick={() => navigateTo('/awards')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === '/awards' ? 'text-primary font-semibold' : 'text-gray-200 hover:text-primary'
              }`}
            >
              Awards
            </button>

            <button
              onClick={() => navigateTo('/#portfolio')}
              className="text-sm font-medium text-gray-200 hover:text-primary transition-colors cursor-pointer"
            >
              Portfolio
            </button>

            <button
              onClick={() => navigateTo('/contact')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === '/contact' ? 'text-primary font-semibold' : 'text-gray-200 hover:text-primary'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="px-6 py-2.5 rounded bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-primary/25 cursor-pointer"
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            className="xl:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden fixed top-[60px] left-0 right-0 bg-[#0c0c0c]/98 backdrop-blur-2xl z-40 overflow-y-auto px-6 py-8 flex flex-col space-y-6"
            >
              <div className="flex flex-col space-y-4 border-b border-border pb-6">
                <button
                  onClick={() => navigateTo('/')}
                  className="text-left text-lg font-display tracking-wider text-white hover:text-primary transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateTo('/about')}
                  className="text-left text-lg font-display tracking-wider text-white hover:text-primary transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => navigateTo('/our-journey')}
                  className="text-left text-lg font-display tracking-wider text-white hover:text-primary transition-colors pl-4 text-gray-400"
                >
                  • Our Journey & CEO Message
                </button>
                <button
                  onClick={() => navigateTo('/why-choose-us')}
                  className="text-left text-lg font-display tracking-wider text-white hover:text-primary transition-colors pl-4 text-gray-400"
                >
                  • Why Choose Us
                </button>
                <button
                  onClick={() => navigateTo('/#services')}
                  className="text-left text-lg font-display tracking-wider text-white hover:text-primary transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => navigateTo('/our-facilities')}
                  className="text-left text-lg font-display tracking-wider text-white hover:text-primary transition-colors"
                >
                  Our Facilities
                </button>
                <button
                  onClick={() => navigateTo('/awards')}
                  className="text-left text-lg font-display tracking-wider text-white hover:text-primary transition-colors"
                >
                  Awards & Sponsorships
                </button>
                <button
                  onClick={() => navigateTo('/#portfolio')}
                  className="text-left text-lg font-display tracking-wider text-white hover:text-primary transition-colors"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="text-left text-lg font-display tracking-wider text-white hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </div>

              {/* Mobile Contact Quick Links */}
              <div className="space-y-3 text-sm text-gray-300">
                <div className="text-xs uppercase tracking-widest text-primary font-bold">Direct Inquiries</div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  <a href="tel:+971526935456">+971 52 693 5456</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  <a href="tel:+97143409377">+971 4 340 9377</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-primary" />
                  <a href="mailto:inquiry@trinitymediauae.com">inquiry@trinitymediauae.com</a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/contact')}
                  className="w-full py-3.5 rounded bg-primary text-white font-bold uppercase tracking-wider text-center"
                >
                  GET IN TOUCH / REQUEST QUOTE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
