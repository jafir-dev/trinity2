import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '@/components/ThemeProvider';

interface SlideData {
  id: number;
  image: string;
  badge: string;
  titleTop: string;
  titleHighlight: string;
  titleBottom: string;
  description: string;
  highlightStat: string;
  highlightLabel: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    image: '/images/hero/hero-slide-1.jpg',
    badge: "DUBAI'S PREMIER DIGITAL PRINTING PRESS",
    titleTop: "WE BUILD",
    titleHighlight: "BRAND",
    titleBottom: "EXPERIENCES.",
    description: "World-class digital printing, exhibition fabrication & bespoke signage across the UAE.",
    highlightStat: "2000+",
    highlightLabel: "Projects Delivered"
  },
  {
    id: 2,
    image: '/images/hero/hero-slide-2.jpg',
    badge: "18,000 SQFT PRODUCTION FACILITY IN DIP-1",
    titleTop: "PRECISION",
    titleHighlight: "UV FLATBED",
    titleBottom: "& FABRICATION.",
    description: "UV Flatbed, HP Latex, CNC cutting & acrylic fabrication on wood, glass, metal & textiles.",
    highlightStat: "18,000",
    highlightLabel: "Sqft Production Press"
  },
  {
    id: 3,
    image: '/images/hero/hero-slide-3.jpg',
    badge: "EXHIBITIONS • RETAIL • CORPORATE BRANDING",
    titleTop: "CREATIVE",
    titleHighlight: "LARGE FORMAT",
    titleBottom: "SOLUTIONS.",
    description: "Powering corporate brands, retail chains, and international exhibitions with premium print quality.",
    highlightStat: "100%",
    highlightLabel: "Client Satisfaction"
  },
  {
    id: 4,
    image: '/images/hero/banners/imag5.jpg',
    badge: "BESPOKE EXHIBITION STAND FABRICATION",
    titleTop: "EXHIBITION",
    titleHighlight: "STANDS",
    titleBottom: "& DISPLAYS.",
    description: "Custom exhibition booths, display units & retail POSM fabricated for DWTC and events across the GCC.",
    highlightStat: "500+",
    highlightLabel: "Exhibitions Built"
  },
  {
    id: 5,
    image: '/images/hero/banners/image4.jpg',
    badge: "RETAIL & MALL BRANDING SPECIALISTS",
    titleTop: "RETAIL",
    titleHighlight: "VISUAL",
    titleBottom: "BRANDING.",
    description: "Backlit acrylic displays, illuminated signage & POSM solutions for premium retail and mall environments.",
    highlightStat: "250+",
    highlightLabel: "Retail Brands Served"
  },
  {
    id: 6,
    image: '/images/hero/banners/image5.jpg',
    badge: "FLEET & VEHICLE BRANDING ACROSS UAE",
    titleTop: "VEHICLE",
    titleHighlight: "FLEET",
    titleBottom: "BRANDING.",
    description: "Full fleet wraps, partial vehicle graphics, and corporate branding solutions delivered across all 7 Emirates.",
    highlightStat: "1000+",
    highlightLabel: "Vehicles Wrapped"
  },
  {
    id: 7,
    image: '/images/hero/banners/image6.jpg',
    badge: "ARCHITECTURAL SIGNAGE & ILLUMINATED DISPLAYS",
    titleTop: "PREMIUM",
    titleHighlight: "SIGNAGE",
    titleBottom: "SOLUTIONS.",
    description: "Architectural illuminated signage, LED channel letters & wayfinding systems for corporate headquarters.",
    highlightStat: "11+",
    highlightLabel: "Years of Excellence"
  },
  {
    id: 8,
    image: '/images/hero/banners/image7.jpg',
    badge: "LARGE FORMAT DIGITAL PRINTING",
    titleTop: "HIGH RES",
    titleHighlight: "DIGITAL",
    titleBottom: "PRINT.",
    description: "HP Latex, UV Flatbed and Swiss-grade printing on canvas, vinyl, fabric, glass, wood and metal substrates.",
    highlightStat: "ISO",
    highlightLabel: "9001 • 14001 • 18001"
  },
  {
    id: 9,
    image: '/images/hero/banners/image8.jpg',
    badge: "TURNKEY 360° ADVERTISING SOLUTIONS",
    titleTop: "360°",
    titleHighlight: "BRAND",
    titleBottom: "ACTIVATION.",
    description: "End-to-end brand strategy, fabrication, printing, logistics and on-site installation across the UAE.",
    highlightStat: "DIP-1",
    highlightLabel: "Dubai Facility"
  },
  {
    id: 10,
    image: '/images/hero/banners/image9.jpg',
    badge: "WALLPAPER, MURALS & CUSTOM PRINTS",
    titleTop: "CUSTOM",
    titleHighlight: "MURALS",
    titleBottom: "& WALLPAPER.",
    description: "Bespoke custom murals, fine art prints, wallpaper installations for hospitality, retail & corporate spaces.",
    highlightStat: "2000+",
    highlightLabel: "Projects Delivered"
  },
  {
    id: 11,
    image: '/images/hero/banners/image10.jpg',
    badge: "ACRYLIC & CNC FABRICATION",
    titleTop: "ACRYLIC",
    titleHighlight: "& CNC",
    titleBottom: "ENGINEERING.",
    description: "Premium acrylic fabrication, CNC routing, laser cutting and 3D lettering for luxury displays.",
    highlightStat: "100%",
    highlightLabel: "Client Satisfaction"
  },
  {
    id: 12,
    image: '/images/hero/banners/image11.jpg',
    badge: "CANVAS & FINE ART PRINTING",
    titleTop: "FINE ART",
    titleHighlight: "CANVAS",
    titleBottom: "PRINTS.",
    description: "Gallery-quality canvas and fine art printing with fade-resistant inks for hotels, restaurants & studios.",
    highlightStat: "18,000",
    highlightLabel: "Sqft Production"
  },
  {
    id: 13,
    image: '/images/hero/banners/image12.jpg',
    badge: "FLAG & FABRIC PRINTING SPECIALISTS",
    titleTop: "FLAGS",
    titleHighlight: "& FABRIC",
    titleBottom: "PRINTING.",
    description: "Dye-sublimation flag & fabric printing for events, exhibitions, hotels & corporate campaigns across the GCC.",
    highlightStat: "250+",
    highlightLabel: "Corporate Clients"
  },
  {
    id: 14,
    image: '/images/hero/banners/image13.jpg',
    badge: "CORPORATE & OUTDOOR BILLBOARD BRANDING",
    titleTop: "OUTDOOR",
    titleHighlight: "BILLBOARD",
    titleBottom: "BRANDING.",
    description: "Large format outdoor billboards, hoardings and corporate signage solutions for maximum brand visibility.",
    highlightStat: "UAE & GCC",
    highlightLabel: "Coverage"
  },
];



export function Hero() {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Slider Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[85vh] lg:min-h-[90vh] w-full flex items-center justify-center overflow-hidden pt-24 pb-8 md:pt-28 md:pb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slider Images with Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Gradient Overlays — clean, neutral, no color tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/58 via-white/30 to-white/10 dark:from-black/60 dark:via-black/35 dark:to-black/15 z-10 transition-colors" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent z-10 transition-colors" />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-20 max-w-[1360px] mx-auto w-full px-4 md:px-8 flex flex-col items-start justify-center gap-8">
        
        {/* Full-width Slider Content */}
        <div className="w-full lg:w-8/12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary dark:text-purple-200 dark:bg-primary/20 dark:border-primary/40 text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4 backdrop-blur-md shadow-sm dark:shadow-[0_0_15px_rgba(182,62,204,0.2)]">
                <Sparkles size={13} className="text-primary dark:text-purple-300" />
                <span>{SLIDES[currentSlide].badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6rem] leading-[0.9] text-foreground tracking-tighter uppercase mb-3">
                <span>{SLIDES[currentSlide].titleTop}</span>{' '}
                <span className={theme === 'dark' ? 'text-white drop-shadow-lg' : 'text-primary'}>{SLIDES[currentSlide].titleHighlight}</span><br />
                <span>{SLIDES[currentSlide].titleBottom}</span>
              </h1>

              {/* Description - Punchy 1-2 lines */}
              <p className="mt-2 text-sm sm:text-base md:text-lg text-foreground/80 max-w-2xl font-sans leading-relaxed">
                {SLIDES[currentSlide].description}
              </p>

              {/* Quick Info & Stats Strip */}
              <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-8 border-t border-border pt-4">
                <div>
                  <div className="font-display text-3xl sm:text-4xl text-foreground">
                    {SLIDES[currentSlide].highlightStat}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    {SLIDES[currentSlide].highlightLabel}
                  </div>
                </div>
                <div className="h-7 w-px bg-border hidden sm:block" />
                <div>
                  <div className="font-display text-3xl sm:text-4xl text-primary">ISO Certified</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    9001 • 14001 • 18001
                  </div>
                </div>
                <div className="h-7 w-px bg-border hidden sm:block" />
                <div>
                  <div className="font-display text-3xl sm:text-4xl text-foreground">Dubai, UAE</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    DIP-1 Warehouse 4
                  </div>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="mt-5 flex flex-wrap gap-3.5 items-center">
                <button
                  onClick={() => scrollTo('quote-form')}
                  className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-wider rounded text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-green-900/30 cursor-pointer"
                >
                  <FaWhatsapp size={17} />
                  <span>Contact Now</span>
                </button>
                <button
                  onClick={() => scrollTo('#services')}
                  className="px-6 py-3 border border-border hover:border-primary text-foreground hover:text-primary font-bold uppercase tracking-wider rounded text-xs sm:text-sm transition-all bg-background/50 hover:bg-muted/40 cursor-pointer"
                >
                  Explore Services
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Controls: Prev / Dot Navigation / Next */}
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full border border-border bg-background/70 text-foreground hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all cursor-pointer shadow-sm flex-shrink-0"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 cursor-pointer rounded-full flex-shrink-0 ${
                    currentSlide === idx
                      ? 'w-6 h-2.5 bg-primary'
                      : 'w-2.5 h-2.5 bg-border/80 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full border border-border bg-background/70 text-foreground hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all cursor-pointer shadow-sm flex-shrink-0"
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide counter */}
            <span className="text-xs text-muted-foreground font-mono ml-1">
              {String(currentSlide + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>
          </div>
        </div>


      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={() => scrollTo('#about')}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
