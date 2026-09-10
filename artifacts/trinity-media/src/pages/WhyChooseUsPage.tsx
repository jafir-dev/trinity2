import { Navbar } from '../components/Navbar';
import { WhyTrinity } from '../components/WhyTrinity';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import servicesImg from '@assets/generated_images/services.jpg';

export default function WhyChooseUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <CustomCursor />
      <Navbar />

      {/* Subheader Banner */}
      <div className="relative pt-40 pb-20 bg-cover bg-center overflow-hidden border-b border-border transition-colors" style={{ backgroundImage: `url(${servicesImg})` }}>
        <div className="absolute inset-0 bg-background/90 dark:bg-background/90 backdrop-blur-md transition-colors" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground uppercase tracking-tight transition-colors">
            WHY <span className="text-primary">CHOOSE US</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mt-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="text-primary" />
            <span className="text-primary font-semibold">Why Choose Us</span>
          </div>
        </div>
      </div>

      <main>
        <WhyTrinity />
      </main>

      <Footer />
    </div>
  );
}
