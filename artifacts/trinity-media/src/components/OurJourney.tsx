import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle, Sparkles, Building2, Cpu, Rocket } from 'lucide-react';
import { CeoMessage } from './CeoMessage';

const TIMELINE_STEPS = [
  {
    year: "2010",
    badge: "Foundation & Inception",
    title: "Started Our Journey in Dubai",
    desc: "Dedicated to the pursuit of excellence, we founded Trinity Media LLC in 2010 to bring a revolution to the digital printing and branding sector in Dubai.",
    highlight: "Incorporation of Trinity Media LLC in Dubai, UAE",
    icon: Rocket,
  },
  {
    year: "2018",
    badge: "Industry Recognition",
    title: "Award For Best Printing & Quality",
    desc: "By invariably delivering high-precision printing solutions with zero compromise on quality, we were honored with the prestigious Award for Best Printing in 2018, cementing our reputation as a market leader.",
    highlight: "Honored with Industry Best Printing Award",
    icon: Award,
  },
  {
    year: "2022",
    badge: "Facility Expansion",
    title: "18,000 Sq.Ft State-of-the-Art Press in DIP-1",
    desc: "Over a decade of relentless dedication culminated in the establishment of our premier manufacturing hub in Dubai Investment Park-1, bringing large format, UV flatbed, and joinery under one roof.",
    highlight: "Expanded Press & Fabrication Workshop in DIP-1",
    icon: Building2,
  },
  {
    year: "2024+",
    badge: "Innovation & Future",
    title: "Advanced Fabrication & GCC Regional Reach",
    desc: "Equipped with the latest HP Latex, Flatbed UV, and high-speed CNC routers, Trinity Media now delivers end-to-end bespoke fit-outs, luxury exhibition stands, and multi-asset corporate activations across the UAE and GCC.",
    highlight: "2000+ Completed Projects & 100% Satisfied Clients",
    icon: Cpu,
  }
];

export function OurJourney({ showCeoMessage = false }: { showCeoMessage?: boolean }) {
  return (
    <section id="journey" className="py-20 md:py-32 bg-background relative overflow-hidden border-y border-border/80">
      {/* Background Typography */}
      <div className="absolute top-10 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-5">
        <h2 className="font-display text-[14rem] md:text-[22rem] leading-none whitespace-nowrap text-foreground">
          JOURNEY
        </h2>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold mb-3"
          >
            <Sparkles size={15} />
            <span>Milestones & Evolution</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl text-foreground uppercase tracking-tight"
          >
            OUR <span className="text-primary">JOURNEY</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base mt-4 max-w-2xl mx-auto"
          >
            From our founding in 2010 to operating an 18,000 sq.ft press in Dubai Investment Park, our journey represents relentless innovation and craftsmanship.
          </motion.p>
        </div>

        {/* ── Chronological Connected Timeline ── */}
        <div className="relative max-w-5xl mx-auto mb-16">
          
          {/* Vertical Central Line on Desktop / Left Line on Mobile */}
          <div className="absolute top-6 bottom-6 left-6 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20 pointer-events-none" />

          <div className="space-y-12 md:space-y-16">
            {TIMELINE_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const IconComp = step.icon;

              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8 pl-16 md:pl-0`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-card dark:bg-[#1c1e2b] border-2 border-primary text-primary flex items-center justify-center shadow-xl dark:shadow-[0_0_20px_rgba(182,62,204,0.35)] group-hover:scale-110 transition-transform">
                      <IconComp size={20} className="text-primary dark:text-purple-300" />
                    </div>
                  </div>

                  {/* Content Card (Desktop: 50% width) */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className="bg-card dark:bg-[#181a26] border border-border/80 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 rounded-2xl p-6 sm:p-8 shadow-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 group">
                      
                      {/* Top Year & Category Badge */}
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="font-display text-4xl sm:text-5xl text-primary dark:text-purple-300 font-bold tracking-tight">
                          {step.year}
                        </span>
                        <span className="text-[11px] uppercase tracking-widest text-primary dark:text-purple-200 font-bold px-3 py-1 rounded-full bg-primary/15 dark:bg-primary/25 border border-primary/30 dark:border-primary/40">
                          {step.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl text-foreground uppercase tracking-wide mb-3 leading-snug">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                        {step.desc}
                      </p>

                      {/* Highlight Tag */}
                      <div className={`pt-4 border-t border-border/80 flex items-center gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <CheckCircle size={15} className="text-primary shrink-0" />
                        <span className="text-xs font-semibold text-muted-foreground tracking-wide">
                          {step.highlight}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Empty Spacer on Opposite Side for Balanced Layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CEO's Message Section if requested */}
        {showCeoMessage && (
          <div id="ceo-message" className="pt-8">
            <CeoMessage />
          </div>
        )}

      </div>
    </section>
  );
}
