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

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden transition-colors">
      {/* Subtle ambient light gradient glows in dark mode */}
      <div className="hidden dark:block absolute top-10 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-0" />
      <div className="hidden dark:block absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-0" />

      <div className="max-w-[1360px] mx-auto px-4 md:px-8 relative z-10">
        
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
            <div className="relative rounded-2xl overflow-hidden border border-border dark:border-white/10 group shadow-2xl">
              <img 
                src="/images/about/main-cover.png" 
                alt="Trinity Media 360 Advertising and Visual Fabrication Dubai" 
                className="w-full h-[460px] sm:h-[540px] object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent z-10" />
              
              {/* Floating Tag */}
              <div className="absolute bottom-6 left-6 z-20 bg-primary/95 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20 shadow-xl">
                <span className="text-xs uppercase tracking-widest text-pink-200 font-bold block">360° Creative Agency</span>
                <span className="font-display text-2xl text-white">Full-Service Advertising In Dubai, UAE</span>
              </div>
            </div>

            {/* Overlapping Inset Card: Trinity's Own Company Fleet */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex absolute -bottom-5 -right-5 z-30 p-2.5 bg-card/95 dark:bg-[#141624]/95 border border-border dark:border-white/15 rounded-xl shadow-2xl backdrop-blur-md items-center gap-3 max-w-[280px]"
            >
              <img 
                src="/images/about/vehicle-1.png" 
                alt="Trinity Media Company Fleet & Rapid Logistics" 
                className="w-16 h-14 rounded-lg object-cover border border-border"
              />
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-primary font-bold block">In-House Operations</span>
                <span className="text-xs font-semibold text-foreground block leading-tight">Dedicated Company Fleet</span>
                <span className="text-[10px] text-muted-foreground">Logistics & Install Across UAE</span>
              </div>
            </motion.div>

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
              className="inline-flex items-center gap-2 text-primary dark:text-purple-300 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3"
            >
              <Sparkles size={16} />
              <span>360° Advertising & Visual Fabrication Specialists In UAE</span>
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
            
            {/* 360-degree advertising rewritten description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/80 text-base sm:text-lg mb-6 leading-relaxed"
            >
              With over a decade of industry-defining mastery, <strong className="text-foreground font-semibold">2000+ completed projects</strong> and <strong className="text-foreground font-semibold">100% satisfied corporate partners</strong>, Trinity Media is Dubai’s premier full-service 360° advertising, visual branding, and fabrication powerhouse. Beyond traditional printing, we engineer complete 360-degree marketing solutions — encompassing large format digital printing, bespoke exhibition stand fabrication, luxury retail POSM displays, architectural illuminated signage, and nationwide commercial fleet branding.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground text-sm leading-relaxed mb-8"
            >
              Operating from our 18,000 sqft centralized production facility in Dubai Investment Park 1, we combine creative conceptualization, Swiss-grade UV flatbed and latex printing, advanced CNC routing, acrylic engineering, and end-to-end turnkey installation across the UAE and GCC.
            </motion.p>

            {/* 4 360-Degree Service Process Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { title: '360° Brand Strategy', icon: Compass },
                { title: 'Large Format & UV Print', icon: Layers },
                { title: 'Bespoke Fabrication', icon: Lightbulb },
                { title: 'Fleet & Signage Install', icon: Cpu },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3 bg-card dark:bg-[#181a26] border border-border dark:border-white/10 hover:border-primary/50 rounded-lg text-center flex flex-col items-center justify-center gap-1.5 shadow-sm transition-all group cursor-default"
                >
                  <item.icon size={18} className="text-primary dark:text-purple-300 group-hover:scale-110 transition-transform" />
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

        {/* 360° Advertising Agency & Production Facility Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-border group shadow-2xl mb-12">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${manufacturingImg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/82 to-black/92" />
          
          <div className="relative z-10 p-8 sm:p-14 max-w-5xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">
              360° Advertising & Turnkey Production Hub
            </span>
            <h3 className="font-display text-3xl sm:text-5xl text-white mt-2 mb-4 uppercase">
              18,000 SQFT 360° ADVERTISING & FABRICATION FACILITY
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed mb-8 max-w-3xl mx-auto">
              Operating as a full-service 360-degree advertising agency in Dubai Investment Park 1, we combine creative strategy, 3D retail POSM fabrication, bespoke exhibition stands, illuminated architectural signage, and our own dedicated installation fleet across the UAE.
            </p>

            {/* In-House Operations & Dedicated Fleet Pillar Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left max-w-3xl mx-auto">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="text-primary font-display text-lg mb-1">360° Brand Activations</div>
                <div className="text-xs text-gray-300">Bespoke Exhibition Booths, Retail POSM & Illuminated Signage</div>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="text-primary font-display text-lg mb-1">Precision In-House Press</div>
                <div className="text-xs text-gray-300">Swiss UV Flatbed, Latex Systems, CNC Routers & Joinery</div>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3">
                <img 
                  src="/images/about/vehicle-2.png" 
                  alt="Trinity Media In-House Company Fleet" 
                  className="w-14 h-12 rounded-lg object-cover shrink-0 border border-white/20"
                />
                <div>
                  <div className="text-primary font-display text-lg mb-0.5">Our Dedicated Fleet</div>
                  <div className="text-[11px] text-gray-300">Company transport & 24/7 on-site installation across UAE</div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded text-xs sm:text-sm transition-all shadow-xl shadow-primary/30 cursor-pointer"
            >
              <span>CONTACT NOW</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
