import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { 
  CheckCircle, ShieldCheck, Award, Leaf, 
  Lightbulb, Layers, Cpu, CheckCheck, 
  Play, Compass, ArrowRight, Sparkles 
} from 'lucide-react';
import aboutImg from '@assets/generated_images/about.jpg';
import manufacturingImg from '@assets/generated_images/manufacturing.jpg';
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
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
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
            <div className="relative rounded-2xl overflow-hidden border border-border/80 group shadow-2xl">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src={aboutImg} 
                alt="Trinity Media Workshop Dubai" 
                className="w-full h-[460px] sm:h-[540px] object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent z-10" />
              
              {/* Floating Tag */}
              <div className="absolute bottom-6 left-6 z-20 bg-primary/90 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20 shadow-xl">
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
              className="font-display text-4xl sm:text-6xl md:text-7xl leading-[0.92] tracking-tight uppercase mb-6"
            >
              TRINITY <span className="text-primary">MEDIA LLC</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed"
            >
              With more than a decade of expertise in the industry of printing, <strong className="text-white">2000+ projects</strong> and <strong className="text-white">100% satisfied clients</strong>, Trinity Media LLC is a premier large format printing company in Dubai and connoisseur in all digital printing formats. From conception to delivery, we guarantee the finest service experience.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground text-sm leading-relaxed mb-8"
            >
              For flex printing, digital flex designing, picture printing, fabric printing, screen printing, canvas printing, roll up banners, car branding, vehicle printing, and digital textile printing — we cover the whole nine yards professionally from our Dubai Investment Park 1 press.
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
                  className="p-3 bg-[#111111] border border-border/80 rounded-lg text-center flex flex-col items-center justify-center gap-1.5"
                >
                  <item.icon size={18} className="text-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-200">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* ISO Certifications Badges */}
            <div className="border-t border-border/80 pt-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">
                International Standard Certifications
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-primary/10 border border-primary/30 rounded-lg flex items-center gap-3">
                  <ShieldCheck size={26} className="text-pink-300 shrink-0" />
                  <div>
                    <div className="font-display text-lg text-white leading-none">ISO 9001</div>
                    <div className="text-[10px] text-gray-300">Quality Assurance</div>
                  </div>
                </div>

                <div className="p-3.5 bg-primary/10 border border-primary/30 rounded-lg flex items-center gap-3">
                  <Leaf size={26} className="text-pink-300 shrink-0" />
                  <div>
                    <div className="font-display text-lg text-white leading-none">ISO 14001</div>
                    <div className="text-[10px] text-gray-300">Environmental Mgt.</div>
                  </div>
                </div>

                <div className="p-3.5 bg-primary/10 border border-primary/30 rounded-lg flex items-center gap-3">
                  <Award size={26} className="text-pink-300 shrink-0" />
                  <div>
                    <div className="font-display text-lg text-white leading-none">OHSAS 18001</div>
                    <div className="text-[10px] text-gray-300">Health & Safety</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Capabilities Full-Width Highlight */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0e0e0e] border border-border/80 mb-24 shadow-xl">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Comprehensive Capabilities</span>
            <h3 className="font-display text-3xl sm:text-5xl text-white mt-2 uppercase">
              Advanced UV, HP Latex & Eco-Solvent Press in DIP-1
            </h3>
          </div>
          <div className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-5xl mx-auto space-y-4">
            <p>
              Trinity Media is one of the most trusted digital printing companies in Dubai, UAE. We specialize in large format digital printing and are dedicated to serving our valued clients with our best printing services from our modern Digital Printing Press in <strong className="text-white">Dubai Investment Park-1, Dubai UAE</strong>.
            </p>
            <p>
              We can print on multiple surfaces in a number of creative ways. Equipped with the latest technology <strong>UV Printing, HP Latex and Wide Spool Eco-solvent Printers</strong>, our Flatbed UV printing service offers high-quality, versatile printing onto irregular shaped rigid substrates like carpets, acrylic, glass, wood, metal, leather, and composites. Raised with a skilled workforce and cutting-edge machinery, we provide high quality prints for retail, corporate events, and bespoke architectural fit-outs.
            </p>
            <p>
              Brands and stores avail our Dubai printing services to create personalized branded merchandise, retail branding, office branding, POSM branding, facade branding, display stands, pop-up stands, customized wallpapers, and mall activations across the United Arab Emirates.
            </p>
          </div>
        </div>

        {/* Section: Our Strength - Produced with Perfection */}
        <div className="relative rounded-2xl overflow-hidden border border-border/80 p-8 sm:p-16 mb-24 bg-gradient-to-r from-black via-[#140b18] to-black">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="text-xs uppercase tracking-widest text-pink-300 font-bold">Produced with Perfection</span>
            <h3 className="font-display text-4xl sm:text-6xl text-white mt-2 mb-6 uppercase">
              OUR STRENGTH
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              We at Trinity Media have always strived to innovate and have invested in state-of-the-art equipment to give the best results and quality to our customers. For us, quality is the pride of our workmanship. Our ability to deliver projects on budget and uphold our customer commitments has made us the number one printing company in Dubai. With a strong, innovative company culture and unique printing knowledge, we are harnessing minds and setting new industry benchmarks.
            </p>

            <div className="flex items-center justify-center gap-4">
              <a
                href="#contact"
                className="px-8 py-3.5 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-all shadow-lg shadow-primary/30"
              >
                Inquire With Us
              </a>
              <Link
                href="/our-facilities"
                className="px-8 py-3.5 border border-white/20 hover:border-primary text-white hover:text-primary text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-all"
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
            <h3 className="font-display text-4xl sm:text-5xl text-white mt-1 uppercase">
              WHY WE ARE AT THE TOP
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-[#101010] border border-border/80 rounded-xl hover:border-primary/50 transition-colors shadow-lg group">
              <div className="w-12 h-12 rounded-lg bg-primary/20 text-pink-300 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Compass size={24} />
              </div>
              <h4 className="font-display text-2xl text-white uppercase mb-2">Our Mission</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                As unique as your thoughts, we make every print an unparalleled experience through innovation, precision, and reliable execution.
              </p>
            </div>

            <div className="p-8 bg-[#101010] border border-border/80 rounded-xl hover:border-primary/50 transition-colors shadow-lg group">
              <div className="w-12 h-12 rounded-lg bg-primary/20 text-pink-300 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Sparkles size={24} />
              </div>
              <h4 className="font-display text-2xl text-white uppercase mb-2">Our Vision</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                To make the best impressions and make high-end printing, fabrication, and brand displays universally accessible across the MENA region.
              </p>
            </div>

            <div className="p-8 bg-[#101010] border border-border/80 rounded-xl hover:border-primary/50 transition-colors shadow-lg group">
              <div className="w-12 h-12 rounded-lg bg-primary/20 text-pink-300 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-display text-2xl text-white uppercase mb-2">Core Values</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong className="text-white">Quality, Affordability and Excellence</strong> — underpinned by transparent client partnerships and strict deadline adherence.
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Banner: "Our Facilities Make Us More Efficient" */}
        <div className="relative rounded-2xl overflow-hidden border border-border/80 group">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${manufacturingImg})` }}
          />
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]" />
          
          <div className="relative z-10 p-8 sm:p-14 max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">State-Of-The-Art Equipment</span>
            <h3 className="font-display text-3xl sm:text-5xl text-white mt-2 mb-4 uppercase">
              Our Facilities Make Us More Efficient
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Delivering the best printing solutions in and around Dubai, we provide you with flex printing services, digital flex design, picture printing, fabric printing, canvas printing, rollup banners, car stickers, vehicle printing, digital textile printing, glass printing, material printing, vinyl printing, vehicle branding, large scale vinyl cutting, pull-up stands, and bespoke fabrication.
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
