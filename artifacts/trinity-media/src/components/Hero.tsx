import { motion } from 'framer-motion';
import { ArrowDown, Facebook, Instagram, Linkedin } from 'lucide-react';
import heroImg from '@assets/generated_images/hero.jpg';

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image & Gradient */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,45,142,0.15)_0%,transparent_70%)] z-10" />
      </div>

      {/* Floating Shapes Animation */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] z-10"
      />

      <div className="relative z-20 max-w-[1360px] mx-auto w-full px-6 md:px-8 mt-20 flex flex-col lg:flex-row items-center justify-between">
        <div className="max-w-4xl">
          <div className="overflow-hidden mb-2">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-7xl md:text-8xl lg:text-[9rem] leading-[0.85] text-white tracking-tighter"
            >
              WE BUILD
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-7xl md:text-8xl lg:text-[9rem] leading-[0.85] text-white tracking-tighter"
            >
              <span className="text-primary">BRAND</span> EXPERIENCES.
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-lg md:text-xl text-secondary max-w-2xl font-sans leading-relaxed"
          >
            Trinity Media delivers premium branding, exhibition, signage, fabrication and printing solutions across the UAE with engineering precision and creative excellence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <button 
              onClick={() => scrollTo('#contact')}
              className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider rounded text-sm hover:bg-primary/90 transition-colors"
            >
              Request Proposal
            </button>
            <button 
              onClick={() => scrollTo('#portfolio')}
              className="px-8 py-4 border border-border text-white font-bold uppercase tracking-wider rounded text-sm hover:border-primary hover:text-primary transition-colors"
            >
              View Portfolio
            </button>
          </motion.div>
        </div>
      </div>

      {/* Socials & Scroll Indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 z-20">
        {[Instagram, Linkedin, Facebook].map((Icon, i) => (
          <motion.a 
            key={i}
            href="#"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon size={20} />
          </motion.a>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo('#about')}
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
