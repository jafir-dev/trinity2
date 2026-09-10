import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, Mail, ChevronDown, 
  MapPin, MessageCircle, Clock, Award, Users, 
  Sparkles, Layers, ShieldCheck, ArrowRight,
  Sun, Moon
} from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from 'wouter';
import trinityLogo from "@assets/trinity-logo-original.png";
import { SERVICES } from '@/data/services';
import { useTheme } from '@/components/ThemeProvider';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (href: string) => {
    setLocation(href);
    setMobileOpen(false);
    setAboutDropdownOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans">
      {/* Top Notification & Contact Bar */}
      <div className="bg-neutral-100 dark:bg-[#050505] text-neutral-600 dark:text-gray-300 text-[11px] md:text-xs py-2 px-4 md:px-8 border-b border-border/60 hidden sm:block transition-colors">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-primary" />
              <span>DIP-1, Dubai, UAE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail size={13} className="text-primary" />
              <a href="mailto:inquiry@trinitymediauae.com" className="hover:text-primary transition-colors">
                inquiry@trinitymediauae.com
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-primary" />
              <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-neutral-400 dark:text-gray-400">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <FaFacebookF size={12} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <FaTwitter size={12} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <FaInstagram size={12} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <FaLinkedinIn size={12} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                <FaYoutube size={12} />
              </a>
            </div>

            <span className="text-border">|</span>

            <a 
              href="https://wa.me/971526935456" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-primary hover:text-primary/80 dark:hover:text-white transition-colors font-semibold uppercase tracking-wider"
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
            ? 'bg-background/95 backdrop-blur-md border-b border-border/80 py-3 shadow-md dark:shadow-xl' 
            : 'bg-background/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="block">
            <img 
              src={trinityLogo} 
              alt="Trinity Media UAE" 
              className="h-10 md:h-12 w-auto object-contain cursor-pointer transition-all"
            />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center space-x-7">
            <button
              onClick={() => navigateTo('/')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === '/' ? 'text-primary font-semibold' : 'text-foreground/85 hover:text-primary'
              }`}
            >
              Home
            </button>

            {/* About Us with Submenu (Our Journey, Why Choose Trinity) */}
            <div 
              className="relative group"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('/about')}
                className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 cursor-pointer ${
                  location.startsWith('/about') || location === '/our-journey' || location === '/why-choose-us'
                    ? 'text-primary font-semibold' 
                    : 'text-foreground/85 hover:text-primary'
                }`}
              >
                <span>About Us</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-64 bg-card border border-border/80 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    <button
                      onClick={() => navigateTo('/about')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-foreground/85 hover:bg-primary/15 hover:text-primary transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <Sparkles size={16} className="text-primary shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">About Trinity</div>
                        <div className="text-[11px] text-muted-foreground">Overview & ISO certifications</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigateTo('/our-journey')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-foreground/85 hover:bg-primary/15 hover:text-primary transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <Clock size={16} className="text-primary shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">Our Journey</div>
                        <div className="text-[11px] text-muted-foreground">Company timeline from 2010</div>
                      </div>
                    </button>
                    <button
                      onClick={() => navigateTo('/why-choose-us')}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-foreground/85 hover:bg-primary/15 hover:text-primary transition-colors flex items-center gap-2.5 cursor-pointer"
                    >
                      <ShieldCheck size={16} className="text-primary shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">Why Choose Trinity</div>
                        <div className="text-[11px] text-muted-foreground">7 trust pillars & machinery</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services 19-Service Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('/#services')}
                className="flex items-center gap-1 text-sm font-medium text-foreground/85 hover:text-primary transition-colors py-2 cursor-pointer"
              >
                <span>Services</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-primary/20 text-primary font-bold border border-primary/40">19</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-[-320px] w-[1080px] max-w-[90vw] bg-card/98 border border-border/90 rounded-2xl shadow-2xl p-6 z-50 backdrop-blur-2xl"
                  >
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/80">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="font-display text-lg text-foreground uppercase tracking-wide">
                          All 19 Specialised Services
                        </span>
                      </div>
                      <Link
                        href="/#services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5"
                      >
                        Explore Services Section <ArrowRight size={13} />
                      </Link>
                    </div>

                    {/* 4-Column Grid for All 19 Services */}
                    <div className="grid grid-cols-4 gap-4">
                      {SERVICES.map((srv) => (
                        <button
                          key={srv.slug}
                          onClick={() => navigateTo(`/services/${srv.slug}`)}
                          className="text-left p-2.5 rounded-lg bg-muted/50 hover:bg-primary/15 border border-border/50 hover:border-primary/40 transition-all duration-200 flex items-start gap-2.5 group cursor-pointer"
                        >
                          <span className="font-display text-sm text-primary group-hover:text-primary font-bold shrink-0 mt-0.5">
                            {srv.num}
                          </span>
                          <span className="text-xs text-foreground/80 group-hover:text-primary font-medium leading-snug">
                            {srv.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigateTo('/our-facilities')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === '/our-facilities' ? 'text-primary font-semibold' : 'text-foreground/85 hover:text-primary'
              }`}
            >
              Our Facilities
            </button>

            <button
              onClick={() => navigateTo('/awards')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === '/awards' ? 'text-primary font-semibold' : 'text-foreground/85 hover:text-primary'
              }`}
            >
              Awards
            </button>

            <button
              onClick={() => navigateTo('/contact')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                location === '/contact' ? 'text-primary font-semibold' : 'text-foreground/85 hover:text-primary'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Quick CTA Button & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg border border-border/80 bg-muted/40 hover:bg-muted text-foreground transition-all duration-200 cursor-pointer flex items-center justify-center"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle light and dark mode"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-foreground" />
              )}
            </button>

            <button
              onClick={() => navigateTo('/contact')}
              className="px-6 py-2.5 rounded bg-primary hover:bg-primary/90 text-white text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-primary/25 cursor-pointer"
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Mobile menu trigger & Theme Toggle */}
          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border/80 bg-muted/40 text-foreground cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle light and dark mode"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-amber-400" />
              ) : (
                <Moon size={20} className="text-foreground" />
              )}
            </button>

            <button 
              className="text-foreground p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden fixed top-[60px] left-0 right-0 bg-card/98 backdrop-blur-2xl z-40 overflow-y-auto px-6 py-8 flex flex-col space-y-6"
            >

              <div className="flex flex-col space-y-4 border-b border-border pb-6">
                <button
                  onClick={() => navigateTo('/')}
                  className="text-left text-lg font-display tracking-wider text-foreground hover:text-primary transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigateTo('/about')}
                  className="text-left text-lg font-display tracking-wider text-foreground hover:text-primary transition-colors"
                >
                  About Us
                </button>
                <div className="pl-4 space-y-2 border-l border-primary/30 my-1">
                  <button
                    onClick={() => navigateTo('/our-journey')}
                    className="block text-left text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    • Our Journey
                  </button>
                  <button
                    onClick={() => navigateTo('/why-choose-us')}
                    className="block text-left text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    • Why Choose Trinity
                  </button>
                </div>

                {/* Mobile Services Accordion */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between text-left text-lg font-display tracking-wider text-foreground hover:text-primary transition-colors"
                  >
                    <span>Services (19)</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="mt-3 pl-3 space-y-2 border-l border-primary/40">
                      {SERVICES.map((s) => (
                        <button
                          key={s.slug}
                          onClick={() => navigateTo(`/services/${s.slug}`)}
                          className="w-full text-left text-xs text-muted-foreground hover:text-primary py-1 flex items-center gap-2"
                        >
                          <span className="text-primary font-bold">{s.num}</span>
                          <span>{s.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigateTo('/our-facilities')}
                  className="text-left text-lg font-display tracking-wider text-foreground hover:text-primary transition-colors"
                >
                  Our Facilities
                </button>
                <button
                  onClick={() => navigateTo('/awards')}
                  className="text-left text-lg font-display tracking-wider text-foreground hover:text-primary transition-colors"
                >
                  Awards & Sponsorships
                </button>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="text-left text-lg font-display tracking-wider text-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </div>

              {/* Mobile Contact Quick Links */}
              <div className="space-y-3 text-sm text-foreground/80">
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
                  className="w-full py-3.5 rounded bg-primary text-white font-bold uppercase tracking-wider text-center cursor-pointer shadow-lg shadow-primary/20"
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
