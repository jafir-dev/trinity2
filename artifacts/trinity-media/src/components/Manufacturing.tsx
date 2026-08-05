import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import mfgImg from '@assets/generated_images/manufacturing.jpg';

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
    <div ref={ref} className="font-display text-4xl md:text-5xl text-primary mb-2">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

const STATS = [
  { val: 20, suffix: '+', label: 'Years' },
  { val: 15000, suffix: '+', label: 'Projects' },
  { val: 500, suffix: '+', label: 'Clients' },
  { val: 100000, suffix: '+', label: 'Sqft Production' },
  { val: 50, suffix: '+', label: 'Team Members' },
  { val: 99, suffix: '%', label: 'Client Satisfaction' }
];

export function Manufacturing() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/90 z-10" />
        <img 
          src={mfgImg} 
          alt="Manufacturing Facility" 
          className="w-full h-full object-cover grayscale opacity-20"
        />
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-8 relative z-20">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl text-white uppercase tracking-tight"
          >
            Manufacturing Excellence
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary max-w-2xl mx-auto mt-4"
          >
            Our in-house fabrication facility ensures absolute control over quality, timelines, and execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border border-border/50 bg-black/40 backdrop-blur-sm rounded hover:border-primary/50 transition-colors"
            >
              <Counter end={stat.val} suffix={stat.suffix} />
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
