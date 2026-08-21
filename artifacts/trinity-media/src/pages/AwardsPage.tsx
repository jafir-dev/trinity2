import { Navbar } from '../components/Navbar';
import { Awards } from '../components/Awards';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import portfolioImg1 from '@assets/generated_images/portfolio1.jpg';

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <CustomCursor />
      <Navbar />

      {/* Subheader Banner */}
      <div className="relative pt-40 pb-20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${portfolioImg1})` }}>
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight">
            AWARDS & <span className="text-primary">SPONSORSHIPS</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-300 uppercase tracking-widest mt-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="text-primary" />
            <span className="text-pink-300 font-semibold">Awards & Sponsorships</span>
          </div>
        </div>
      </div>

      <main>
        <Awards />
      </main>

      <Footer />
    </div>
  );
}
