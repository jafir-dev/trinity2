import { Link } from 'wouter';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { About } from '../components/About';
import { OurJourney } from '../components/OurJourney';
import { CeoMessage } from '../components/CeoMessage';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <CustomCursor />
      <Navbar />

      {/* Video Hero Banner */}
      <div className="relative min-h-[55vh] md:min-h-[62vh] flex items-center justify-center overflow-hidden border-b border-border pt-32 pb-16">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
            poster="/images/about/Main Cover.png"
          >
            <source src="/images/about/Video 3.mp4" type="video/mp4" />
            <source src="/images/about/about-video.mp4" type="video/mp4" />
          </video>
          {/* Subtle light gradient overlays so the video is clearly visible */}
          <div className="absolute inset-0 bg-black/25 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-black/30 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/25 border border-primary/40 text-pink-200 text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md shadow-md">
            <Sparkles size={14} className="text-primary" />
            <span>360° Advertising & Visual Fabrication Hub</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight drop-shadow-md">
            ABOUT <span className="text-primary">TRINITY MEDIA</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-200 mt-4 leading-relaxed font-sans">
            Dubai's premier full-spectrum advertising partner — delivering high-impact print engineering, bespoke exhibition builds, and commercial fleet branding.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-300 uppercase tracking-widest mt-6">
            <Link href="/" className="hover:text-primary transition-colors text-white">Home</Link>
            <ChevronRight size={14} className="text-primary" />
            <span className="text-primary font-semibold">About Us</span>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-white/15 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl text-white">2010</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-300">Established in UAE</div>
            </div>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl text-primary">2,000+</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-300">Projects Delivered</div>
            </div>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl text-white">18,000 Sq.Ft</div>
              <div className="text-[11px] uppercase tracking-wider text-gray-300">DIP-1 Facility</div>
            </div>
          </div>
        </div>
      </div>

      <main>
        <About />
        <OurJourney />
        <CeoMessage />
      </main>

      <Footer />
    </div>
  );
}
