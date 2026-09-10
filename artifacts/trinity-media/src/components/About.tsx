import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { 
  CheckCircle, ShieldCheck, Award, Leaf, 
  Lightbulb, Layers, Cpu, CheckCheck, 
  Play, Compass, ArrowRight, Sparkles 
} from 'lucide-react';
import aboutImg from '@assets/generated_images/about.jpg';
import manufacturingImg from '@assets/generated_images/manufacturing.jpg';
import exhibitionImg from '@assets/generated_images/exhibition_1.jpg';
import retailImg from '@assets/generated_images/service_retail_display.jpg';
import signageImg from '@assets/generated_images/service_led_signage.jpg';
import vehicleImg from '@assets/generated_images/service_vehicle_branding.jpg';
import { Link } from 'wouter';

function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inView) {
      let start = 0;
      const steps = 60;
      const increment = end / steps;
      const stepTime = (duration * 1000) / steps;
      
      timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, stepTime);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-display text-4xl sm:text-5xl md:text-6xl text-primary leading-none">
        {count.toLocaleString()}{suffix}
      </div>
    </div>
  );
}

const VISUAL_CAPABILITIES = [
  {
    title: "Exhibition Stand Fabrication",
    tag: "Custom Builds",
    image: exhibitionImg,
    caption: "Bespoke double-decker & custom pavilions"
  },
  {
    title: "UV Flatbed Rigid Printing",
    tag: "Wood, Acrylic & Metal",
    image: manufacturingImg,
    caption: "Direct substrate precision printing up to 1440 DPI"
  },
  {
    title: "Retail Displays & POSM",
    tag: "Mall Activations",
    image: retailImg,
    caption: "Turnkey luxury brand display units across UAE"
  },
  {
    title: "Illuminated 3D Signage",
    tag: "Architectural Works",
    image: signageImg,
    caption: "Precision CNC acrylic & architectural signage"
  }
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        
        {/* Main Grid: About Overview & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left: Image & Badge Banner */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border group shadow-2xl">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={aboutImg} 
                alt="Trinity Media Workshop Dubai" 
                className="w-full h-[460px] sm:h-[540px] object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent z-10" />
              
              {/* Floating Tag */}
              <div className="absolute bottom-6 left-6 z-20 bg-primary/95 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20 shadow-xl">
                <span className="text-xs uppercase tracking-widest text-pink-200 font-bold block">Certified Excellence</span>
                <span className="font-display text-2xl text-white">Creative Print Provider In Dubai, UAE</span>
              </div>
            </div>

            {/* Corner Decorative Accents */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-primary/60 -z-10" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-primary/60 -z-10" />
          </motion.div>

          {/* Right: Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3"
            >
              <Sparkles size={16} />
              <span>Digital Printing Providers In UAE</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.92] tracking-tight uppercase mb-6 text-foreground"
            >
              TRINITY <span className="text-primary">MEDIA LLC</span>
            </motion.h2>
            
            {/* Concise punchy description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/80 text-base sm:text-lg mb-6 leading-relaxed"
            >
              With over a decade of printing mastery, <strong className="text-foreground font-semibold">2000+ completed projects</strong> and <strong className="text-foreground font-semibold">100% satisfied corporate partners</strong>, Trinity Media is Dubai's leading specialist in high-impact visual fabrication.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground text-sm leading-relaxed mb-8"
            >
              Operating from our 18,000 sqft facility in Dubai Investment Park 1, we combine Swiss-grade UV flatbed technology, latex printing, and artisan fabrication.
            </motion.p>

            {/* 4 Process Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { title: 'Concept & Research', icon: Compass },
                { title: 'Prototype Sampling', icon: Layers },
                { title: 'Design & Dev', icon: Lightbulb },
                { title: 'Final Production', icon: Cpu },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3 bg-card border border-border rounded-lg text-center flex flex-col items-center justify-center gap-1.5 shadow-sm"
                >
                  <item.icon size={18} className="text-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* ISO Certifications Badges */}
            <div className="border-t border-border pt-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">
                International Standard Certifications
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
                  <ShieldCheck size={26} className="text-primary shrink-0" />
                  <div>
                    <div className="font-display text-lg text-foreground leading-none">ISO 9001</div>
                    <div className="text-[10px] text-muted-foreground">Quality Assurance</div>
                  </div>
                </div>

                <div className="p-3.5 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
                  <Leaf size={26} className="text-primary shrink-0" />
                  <div>
                    <div className="font-display text-lg text-foreground leading-none">ISO 14001</div>
                    <div className="text-[10px] text-muted-foreground">Environmental Mgt.</div>
                  </div>
                </div>

                <div className="p-3.5 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
                  <Award size={26} className="text-primary shrink-0" />
                  <div>
                    <div className="font-display text-lg text-foreground leading-none">OHSAS 18001</div>
                    <div className="text-[10px] text-muted-foreground">Health & Safety</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Visual Capabilities Image Grid (Replaces long walls of text with stunning visual cards) */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Visual Capabilities & Infrastructure</span>
            <h3 className="font-display text-3xl sm:text-5xl text-foreground mt-2 uppercase">
              Engineered In Dubai Investment Park 1
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Our 18,000 sqft facility is equipped with UV Flatbed, HP Latex, Eco-Solvent, and precision CNC fabrication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VISUAL_CAPABILITIES.map((cap, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-xl overflow-hidden border border-border bg-card shadow-lg flex flex-col hover:border-primary/50 transition-all duration-300"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <img 
                    src={cap.image} 
                    alt={cap.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider">
                    {cap.tag}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-xl text-foreground uppercase tracking-wide group-hover:text-primary transition-colors">
                      {cap.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {cap.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section: Our Strength - Produced with Perfection */}
        <div className="relative rounded-2xl overflow-hidden border border-border p-8 sm:p-14 mb-24 bg-card/60 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Produced with Perfection</span>
            <h3 className="font-display text-4xl sm:text-6xl text-foreground mt-2 mb-4 uppercase">
              OUR STRENGTH
            </h3>
            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              For us, quality is the pride of our workmanship. Our ability to deliver turnkey projects on schedule and budget has positioned Trinity Media as Dubai's most dependable partner in branding fabrication.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-all shadow-lg shadow-primary/30"
              >
                Inquire With Us
              </a>
              <Link
                href="/our-facilities"
                className="px-8 py-3.5 border border-border hover:border-primary text-foreground hover:text-primary text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-all bg-background/50 hover:bg-muted"
              >
                View Our Facilities
              </Link>
            </div>
          </div>
        </div>

        {/* Modern Printing Technology: Mission, Vision & Core Values */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Modern Printing Technology</span>
            <h3 className="font-display text-4xl sm:text-5xl text-foreground mt-1 uppercase">
              WHY WE ARE AT THE TOP
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm group">
              <div className="w-12 h-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Compass size={24} />
              </div>
              <h4 className="font-display text-2xl text-foreground uppercase mb-2">Our Mission</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                As unique as your thoughts, we make every print an unparalleled visual experience through precision engineering.
              </p>
            </div>

            <div className="p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm group">
              <div className="w-12 h-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Sparkles size={24} />
              </div>
              <h4 className="font-display text-2xl text-foreground uppercase mb-2">Our Vision</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To make high-end printing, bespoke fabrication, and architectural displays universally accessible across the MENA region.
              </p>
            </div>

            <div className="p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors shadow-sm group">
              <div className="w-12 h-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-display text-2xl text-foreground uppercase mb-2">Core Values</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-semibold">Quality, Speed and Integrity</strong> — backed by transparent client partnerships and strict deadline adherence.
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Banner: "Our Facilities Make Us More Efficient" */}
        <div className="relative rounded-2xl overflow-hidden border border-border group shadow-xl">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${manufacturingImg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/85" />
          
          <div className="relative z-10 p-8 sm:p-14 max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-pink-300 font-bold">State-Of-The-Art Equipment</span>
            <h3 className="font-display text-3xl sm:text-5xl text-white mt-2 mb-4 uppercase">
              Our Facilities Make Us More Efficient
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              From flex printing and digital textiles to rigid acrylic and CNC fabrication, tour our 18,000 sqft facility in Dubai.
            </p>
            <Link
              href="/our-facilities"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded text-xs sm:text-sm transition-all shadow-xl shadow-primary/30 cursor-pointer"
            >
              <span>TAKE THE TOUR</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
