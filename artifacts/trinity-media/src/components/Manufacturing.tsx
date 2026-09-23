import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
    <div ref={ref} className="font-display text-4xl md:text-5xl text-white font-black tracking-tight mb-1 drop-shadow-md">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

const STATS = [
  { val: 20, suffix: '+', label: 'Years' },
  { val: 15000, suffix: '+', label: 'Projects' },
  { val: 500, suffix: '+', label: 'Clients' },
  { val: 18000, suffix: '+', label: 'Sqft' },
  { val: 50, suffix: '+', label: 'Team' },
  { val: 99, suffix: '%', label: 'Satisfaction' },
];

// Gallery row — real production shots
const GALLERY = [
  { img: '/images/manufacturing/facility.jpg', label: 'UV Flatbed Printing Press', wide: true },
  { img: '/images/about/vehicle-1.png', label: 'Vehicle Wrap Workshop' },
  { img: '/images/why-choose-us/retail.jpg', label: 'Retail Signage Output' },
];

export function Manufacturing() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Facility & Capacity</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl text-foreground uppercase tracking-tight"
          >
            Manufacturing Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto mt-3 text-base"
          >
            Our in-house fabrication facility ensures absolute control over quality, timelines, and execution.
          </motion.p>
        </div>

        {/* ── LARGE HERO FACILITY IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden mb-8 shadow-2xl border border-border h-[420px] md:h-[520px] group"
        >
          <img
            src="/images/manufacturing/facility.jpg"
            alt="Trinity Media Manufacturing Facility - Dubai Investment Park"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
          {/* Overlay stats strip */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-wrap gap-6 md:gap-10">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <Counter end={stat.val} suffix={stat.suffix} />
                  <p className="text-xs font-bold uppercase tracking-wider text-white/95 drop-shadow-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Top-right ISO badge */}
          <div className="absolute top-5 right-5 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full backdrop-blur-sm">
            ISO Certified • DIP-1 Dubai
          </div>
        </motion.div>

        {/* ── SECONDARY IMAGE ROW ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative group overflow-hidden rounded-xl border border-border h-56 shadow-md"
            >
              <img
                src={g.img}
                alt={g.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <span className="absolute bottom-4 left-4 text-xs font-bold text-white uppercase tracking-wider">
                {g.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
