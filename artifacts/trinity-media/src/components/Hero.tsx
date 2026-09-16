import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, ChevronLeft, ChevronRight, CheckCircle2, 
  RefreshCw, ShieldCheck, Sparkles, Send, PhoneCall,
  Printer, Layers, Box, Check, HelpCircle
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import heroImg from '@assets/generated_images/hero.jpg';
import manufacturingImg from '@assets/generated_images/manufacturing.jpg';
import servicesImg from '@assets/generated_images/services.jpg';
import portfolioImg from '@assets/generated_images/portfolio1.jpg';

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
  }
];


const SERVICES_OPTIONS = [
  "Large Format Digital Printing",
  "Exhibition Stands & Display Units",
  "Signage & Acrylic Works",
  "Wallpaper & Custom Murals",
  "Canvas & Fine Art Printing",
  "Flag & Fabric Printing",
  "Flatbed UV Printing on Rigid Substrates",
  "Vehicle & Fleet Branding",
  "Retail, POSM & Mall Branding",
  "Other Custom Fabrication"
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Quote Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SERVICES_OPTIONS[0]);
  const [message, setMessage] = useState('');
  
  // Captcha State
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [num1, setNum1] = useState(4);
  const [num2, setNum2] = useState(3);
  const [userAnswer, setUserAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Generate new math captcha
  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setCaptchaError('');
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  // Slider Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
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

  // Submit quote request to WhatsApp
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError('');

    if (!fullName.trim() || !phone.trim()) {
      setCaptchaError('Please provide your name and phone number.');
      return;
    }

    if (!captchaChecked) {
      setCaptchaError('Please check the verification box to proceed.');
      return;
    }

    const expectedAnswer = num1 + num2;
    if (parseInt(userAnswer.trim(), 10) !== expectedAnswer) {
      setCaptchaError(`Incorrect security answer. Please solve: ${num1} + ${num2} = ?`);
      return;
    }

    setIsSubmitting(true);

    const whatsappMessage = `*NEW QUOTE REQUEST - TRINITY MEDIA LLC*
----------------------------------
👤 *Name:* ${fullName.trim()}
📧 *Email:* ${email.trim() || 'Not specified'}
📱 *Phone:* ${phone.trim()}
🛠️ *Service Needed:* ${service}
📝 *Project Scope / Notes:* ${message.trim() || 'Requesting standard quote & consultation'}
----------------------------------
*Location:* Dubai Investment Park - 1
*Source:* Hero Quote Form (Trinity Media UAE)`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/971526935456?text=${encodedMessage}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
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

        {/* Cinematic Theme-Aware Gradient Overlays — soft light accents mixed in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/70 dark:from-[#0d0f17]/90 dark:via-[#0f111a]/75 dark:to-[#141622]/80 z-10 transition-colors" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 dark:to-[#0d0f17]/50 z-10 transition-colors" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(182,62,204,0.24)_0%,transparent_60%)] z-10" />
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,197,253,0.06)_0%,transparent_50%)] z-10" />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-20 max-w-[1360px] mx-auto w-full px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-10">
        
        {/* Left Column: Slider Content */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary dark:text-purple-200 dark:bg-primary/20 dark:border-primary/40 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-sm dark:shadow-[0_0_15px_rgba(182,62,204,0.2)]">
                <Sparkles size={14} className="text-primary dark:text-purple-300" />
                <span>{SLIDES[currentSlide].badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.88] text-foreground tracking-tighter uppercase mb-4">
                <span>{SLIDES[currentSlide].titleTop}</span>{' '}
                <span className="text-primary">{SLIDES[currentSlide].titleHighlight}</span><br />
                <span>{SLIDES[currentSlide].titleBottom}</span>
              </h1>

              {/* Description - Punchy 1-2 lines */}
              <p className="mt-4 text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl font-sans leading-relaxed">
                {SLIDES[currentSlide].description}
              </p>

              {/* Quick Info & Stats Strip */}
              <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-10 border-t border-border pt-6">
                <div>
                  <div className="font-display text-4xl text-foreground">
                    {SLIDES[currentSlide].highlightStat}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    {SLIDES[currentSlide].highlightLabel}
                  </div>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <div>
                  <div className="font-display text-4xl text-primary">ISO Certified</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    9001 • 14001 • 18001
                  </div>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <div>
                  <div className="font-display text-4xl text-foreground">Dubai, UAE</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    DIP-1 Warehouse 4
                  </div>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a
                  href="https://wa.me/971526935456?text=Hello%20Trinity%20Media%2C%20I%20would%20like%20to%20discuss%20a%20printing%20and%20branding%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-wider rounded text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-lg shadow-green-900/30"
                >
                  <FaWhatsapp size={18} />
                  <span>Contact Now</span>
                </a>
                <button
                  onClick={() => scrollTo('#services')}
                  className="px-7 py-3.5 border border-border hover:border-primary text-foreground hover:text-primary font-bold uppercase tracking-wider rounded text-xs sm:text-sm transition-all bg-background/50 hover:bg-muted/40 cursor-pointer"
                >
                  Explore Services
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Visual Slide Thumbnails & Controls */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full border border-border bg-background/70 text-foreground hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Slide Visual Image Previews */}
            <div className="flex items-center gap-3">
              {SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`group relative overflow-hidden rounded-lg transition-all duration-300 cursor-pointer border ${
                    currentSlide === idx 
                      ? 'w-20 h-12 border-primary ring-2 ring-primary/40' 
                      : 'w-12 h-10 border-border/70 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={slide.image} 
                    alt={`Preview slide ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full border border-border bg-background/70 text-foreground hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Column: Instant Request Quote Form with Captcha */}
        <div className="w-full lg:w-5/12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/95 border border-border rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl"
          >
            {/* Ambient glow accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none -z-10" />
            
            <div className="border-b border-border pb-4 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">Fast Turnaround</span>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground tracking-wide">
                    REQUEST A QUOTE
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500">
                  <FaWhatsapp size={22} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Instant inquiry directly sent to our production engineering team via WhatsApp.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/40">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="font-display text-2xl text-foreground">Inquiry Transmitted!</h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Your project specifications were encoded and redirected to our WhatsApp desk (+971 52 693 5456).
                </p>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    refreshCaptcha();
                  }}
                  className="px-6 py-2.5 rounded bg-primary text-white text-xs font-bold uppercase tracking-wider transition-all hover:bg-primary/90 cursor-pointer"
                >
                  Send Another Quote Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Walter"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-background border border-border rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 5X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-background border border-border rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.ae"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-border rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                    Select Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-background border border-border rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    {SERVICES_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt} className="bg-background text-foreground">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                    Project Details / Sizes / Quantity
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe your dimensions, material, or deadline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-background border border-border rounded px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-primary resize-none placeholder:text-muted-foreground"
                  />
                </div>

                {/* Captcha Protection Block */}
                <div className="p-3 bg-muted/40 border border-border rounded-lg space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-foreground select-none">
                      <input
                        type="checkbox"
                        checked={captchaChecked}
                        onChange={(e) => setCaptchaChecked(e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      />
                      <span className="font-medium">I'm not a robot</span>
                    </label>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <ShieldCheck size={12} className="text-primary" />
                      <span>Security Verification</span>
                    </div>
                  </div>

                  {/* Math Security Challenge */}
                  <div className="flex items-center gap-2 pt-1 border-t border-border/50">
                    <span className="text-xs text-foreground font-mono bg-background px-2 py-1 rounded border border-border">
                      Security Code: {num1} + {num2} = ?
                    </span>
                    <input
                      type="number"
                      placeholder="Answer"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-20 bg-background border border-border rounded px-2 py-1 text-xs text-foreground text-center focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      title="Generate new calculation"
                      className="p-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <RefreshCw size={13} />
                    </button>
                  </div>
                </div>

                {captchaError && (
                  <div className="text-[11px] text-red-500 font-medium bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded">
                    {captchaError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30 cursor-pointer disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Submitting Quote...' : 'REQUEST A QUOTE'}</span>
                </button>
              </form>
            )}
          </motion.div>
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
