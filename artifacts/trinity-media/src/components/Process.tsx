import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  { num: '01', title: 'Discover', desc: 'Understanding your brand and requirements' },
  { num: '02', title: 'Strategy', desc: 'Developing the optimal approach' },
  { num: '03', title: 'Design', desc: 'Conceptualizing the visual experience' },
  { num: '04', title: 'Engineering', desc: 'Structural and technical planning' },
  { num: '05', title: 'Fabrication', desc: 'Precision building in our facility' },
  { num: '06', title: 'Production', desc: 'Large format printing and finishing' },
  { num: '07', title: 'Installation', desc: 'On-site assembly and deployment' },
  { num: '08', title: 'Quality Check', desc: 'Rigorous inspection standards' },
  { num: '09', title: 'Support', desc: 'Post-handover maintenance' },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const width = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 md:py-32 bg-background border-y border-border overflow-hidden" ref={containerRef}>
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        <h2 className="font-display text-5xl md:text-6xl text-foreground uppercase tracking-tight mb-20 text-center">OUR PROCESS</h2>
        
        <div className="relative">
          {/* Background Line */}
          <div className="absolute top-12 left-0 w-full h-[2px] bg-border z-0" />
          
          {/* Animated Fill Line */}
          <motion.div 
            style={{ width }} 
            className="absolute top-12 left-0 h-[2px] bg-primary z-10 origin-left" 
          />

          <div className="flex overflow-x-auto pb-12 pt-4 hide-scrollbar snap-x snap-mandatory">
            {STEPS.map((step, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[320px] flex-shrink-0 snap-start flex flex-col relative z-20 group px-4">
                <div className="w-16 h-16 rounded-full bg-card border-2 border-border group-hover:border-primary flex items-center justify-center mb-8 transition-colors mx-auto relative shadow-md">
                  <span className="font-display text-2xl text-foreground">{step.num}</span>
                  {/* Indicator Dot */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-150 transition-transform duration-500 z-[-1]" />
                </div>
                
                <div className="text-center">
                  <h3 className="font-bold text-xl text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
