import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import aboutImg from '@assets/generated_images/about.jpg';

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
      <div className="font-display text-5xl md:text-6xl text-primary leading-none">
        {count.toLocaleString()}{suffix}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Image with Parallax-like wrapper */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[700px] rounded overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src={aboutImg} 
              alt="Trinity Media Workshop" 
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            {/* Decor */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent z-10" />
            <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-primary/50 z-20" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-primary/50 z-20" />
          </motion.div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4"
            >
              About Trinity
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-8"
            >
              NOT JUST PRINTING.<br/>
              <span className="text-secondary">WE BUILD BRANDS.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg mb-12 max-w-xl leading-relaxed"
            >
              For over 20 years, Trinity Media has been the trusted partner for brands demanding excellence. From concept to installation, we deliver turnkey solutions in branding, fabrication, exhibition, signage, and interiors — built to the highest standards across the UAE.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-x-8 gap-y-12"
            >
              <div>
                <Counter end={20} suffix="+" />
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2">Years Experience</p>
              </div>
              <div>
                <Counter end={15000} suffix="+" />
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2">Projects</p>
              </div>
              <div>
                <Counter end={500} suffix="+" />
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2">Clients</p>
              </div>
              <div>
                <Counter end={100000} suffix="+" />
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2">Sqft Production</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
