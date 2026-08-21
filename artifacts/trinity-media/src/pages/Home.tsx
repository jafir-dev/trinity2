import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustedBy } from '../components/TrustedBy';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { OurJourney } from '../components/OurJourney';
import { WhyTrinity } from '../components/WhyTrinity';
import { Awards } from '../components/Awards';
import { Industries } from '../components/Industries';
import { Portfolio } from '../components/Portfolio';
import { Process } from '../components/Process';
import { Manufacturing } from '../components/Manufacturing';
import { Testimonials } from '../components/Testimonials';
import { Brands } from '../components/Brands';
import { FAQ } from '../components/FAQ';
import { ContactSection } from '../components/ContactSection';
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
        <About />
        <Services />
        <OurJourney />
        <WhyTrinity />
        <Awards />
        <Industries />
        <Portfolio />
        <Process />
        <Manufacturing />
        <Testimonials />
        <Brands />
        <FAQ />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
