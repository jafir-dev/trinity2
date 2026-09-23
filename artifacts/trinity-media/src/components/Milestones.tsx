import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, Trophy, Award, Building2, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';

function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inView) {
      let start = 0;
      const steps = 50;
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
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const STATS = [
  { value: 15, suffix: '+', label: 'Years in UAE', sub: 'Established 2010 in Dubai' },
  { value: 2000, suffix: '+', label: 'Completed Builds', sub: 'Exhibitions, retail & signage' },
  { value: 250, suffix: '+', label: 'Corporate Clients', sub: 'Across UAE and GCC' },
  { value: 18000, suffix: ' sqft', label: 'In-House Production', sub: 'DIP-1 facility & CNC workshop' },
];

const MILESTONES = [
  {
    year: '2010',
    title: 'Inception in Dubai',
    desc: 'Founded Trinity Media LLC with high-precision digital printing and outdoor branding.',
    badge: 'Foundation',
  },
  {
    year: '2018',
    title: 'Best Printing Award',
    desc: 'Recognized with prestigious industry awards for color accuracy, finish, and turnaround speed.',
    badge: 'Excellence',
  },
  {
    year: '2022',
    title: '18,000 Sq.Ft DIP-1 Expansion',
    desc: 'Consolidated large-format UV flatbed, HP Latex, CNC routers, and carpentry workshop.',
    badge: 'Infrastructure',
  },
  {
    year: '2024+',
    title: 'Pan-GCC Brand Activations',
    desc: 'Delivering mega turnkey exhibition pavilions and enterprise fleet transformations across UAE.',
    badge: 'Innovation',
  },
];

export function Milestones() {
  return (
    <section id="milestones" className="py-20 md:py-32 bg-background relative overflow-hidden border-t border-border/80">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">
              <Sparkles size={15} />
              <span>Proven Track Record</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-foreground">
              OUR <span className="text-primary">MILESTONES</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed md:text-right">
            Over a decade and a half of engineering perfection, setting benchmarks for large-format printing and bespoke fabrication in the UAE.
          </p>
        </div>

        {/* ── Key Numerical Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/80 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:border-primary/60 dark:hover:border-primary/60 transition-all duration-300 shadow-md group"
            >
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary font-bold group-hover:scale-105 transition-transform duration-300">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-display text-base sm:text-lg text-foreground uppercase mt-2 tracking-wide">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Milestones Timeline Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {MILESTONES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card dark:bg-[#181a26] border border-border/80 dark:border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-3xl font-bold text-primary group-hover:text-primary transition-colors">
                    {item.year}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-display text-xl text-foreground uppercase mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-border/60 flex items-center gap-2 text-[11px] font-semibold text-primary">
                <CheckCircle size={14} className="text-primary shrink-0" />
                <span>Verified Milestone</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-card hover:bg-muted border border-border hover:border-primary text-foreground hover:text-primary font-bold uppercase tracking-wider rounded-xl text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
          >
            <span>Learn More About Our Evolution</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
