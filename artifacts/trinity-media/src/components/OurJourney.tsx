import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle, Quote, Sparkles, UserCheck } from 'lucide-react';
import manufacturingImg from '@assets/generated_images/manufacturing.jpg';
import { CeoMessage } from './CeoMessage';

const TIMELINE = [
  {
    year: "2010",
    title: "Started Our Journey",
    desc: "Dedicated to the pursuit of excellence, we started our journey in 2010 to bring in a revolution in the printing sector. Today we are happy to announce that we are one of Dubai's best and most rated printing companies.",
    highlight: "Foundation of Trinity Media LLC in Dubai"
  },
  {
    year: "2018",
    title: "Award for Best Printing",
    desc: "With unfailingly and invariably delivering the best printing solutions, we are honored with the Award for Best Printing in 2018, establishing our reputation as the gold standard in large format printing.",
    highlight: "Excellence in Large Format & UV Printing"
  },
  {
    year: "2022",
    title: "We Are One of the Top Printing Solution",
    desc: "It is always said hard work really pays off in the end and it is true. The long 11 years of journey has led us to eternal glory making and branding us as the topmost printing solutions in Dubai.",
    highlight: "Expanded 18,000 sqft Press in DIP-1"
  }
];

export function OurJourney({ showCeoMessage = false }: { showCeoMessage?: boolean }) {
  return (
    <section id="journey" className="py-20 md:py-32 bg-[#080808] relative overflow-hidden border-y border-border/80">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-primary font-bold block mb-2"
          >
            Journey Of Trinity Media LLC
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight"
          >
            COMPANY <span className="text-primary">HISTORY</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base mt-4"
          >
            A decade-long commitment to engineering perfection, continuous machinery investment, and client success.
          </motion.p>
        </div>

        {/* Timeline Grid (3 Distinct Milestones) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-16">
          {TIMELINE.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-[#111111] border border-border/80 rounded-2xl p-8 flex flex-col relative group hover:border-primary/50 transition-all duration-300 shadow-xl"
            >
              {/* Year Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="font-display text-4xl sm:text-5xl text-primary font-bold tracking-tight">
                  {item.year}
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/15 text-pink-300 flex items-center justify-center border border-primary/30 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Calendar size={18} />
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6 flex-1">
                {item.desc}
              </p>

              {/* Milestone Tag */}
              <div className="pt-4 border-t border-border/80 flex items-center gap-2">
                <CheckCircle size={14} className="text-primary shrink-0" />
                <span className="text-xs font-semibold text-gray-300 tracking-wide">
                  {item.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CEO's Message Section if requested */}
        {showCeoMessage && (
          <div id="ceo-message" className="pt-4">
            <CeoMessage />
          </div>
        )}

      </div>
    </section>
  );
}
