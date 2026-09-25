import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustedBy } from '../components/TrustedBy';
import { Industries } from '../components/Industries';
import { Services } from '../components/Services';
import { Portfolio } from '../components/Portfolio';
import { About } from '../components/About';
import { QuoteFormSection } from '../components/QuoteFormSection';
import { Milestones } from '../components/Milestones';
import { Awards } from '../components/Awards';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <TrustedBy />
        <Industries />
        <Services />
        <Portfolio />
        <About />
        <QuoteFormSection />
        <Milestones />
        <Awards />
      </main>

      <Footer />
    </div>
  );
}
