import { Navbar } from '../components/Navbar';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import heroImg from '@assets/generated_images/hero.jpg';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <CustomCursor />
      <Navbar />

      {/* Subheader Banner matching Reference Image 1 */}
      <div className="relative pt-40 pb-20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight">
            CONTACT <span className="text-primary">US</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-300 uppercase tracking-widest mt-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="text-primary" />
            <span className="text-pink-300 font-semibold">Contact</span>
          </div>
        </div>
      </div>

      <main>
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
