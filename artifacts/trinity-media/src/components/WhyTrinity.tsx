import { motion } from 'framer-motion';
import { 
  Lightbulb, ShieldCheck, Factory, HardHat, 
  Gem, Timer, GitMerge, MapPin 
} from 'lucide-react';

const FEATURES = [
  { icon: Lightbulb, title: "Creative Strategy", desc: "Award-winning concepts tailored to your brand" },
  { icon: ShieldCheck, title: "Engineering Precision", desc: "Structural integrity and flawless execution" },
  { icon: Factory, title: "Own Manufacturing", desc: "100,000+ sqft state-of-the-art facility" },
  { icon: HardHat, title: "Skilled Installation", desc: "In-house expert deployment teams" },
  { icon: Gem, title: "Premium Materials", desc: "Highest grade substrates and finishes" },
  { icon: Timer, title: "Fast Turnaround", desc: "24/7 production capabilities" },
  { icon: GitMerge, title: "End-to-End PM", desc: "Single point of contact from concept to handover" },
  { icon: MapPin, title: "Nationwide Coverage", desc: "Operations across all 7 UAE Emirates" },
];

export function WhyTrinity() {
  return (
    <section className="py-24 md:py-32 bg-background border-y border-border">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          <div className="lg:col-span-4 flex flex-col">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-7xl md:text-8xl lg:text-9xl leading-[0.8] tracking-tighter uppercase"
            >
              WHY<br/>
              <span className="text-primary">TRINITY</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-border bg-[#0a0a0a] rounded hover:border-primary/50 transition-colors group"
              >
                <feat.icon size={32} className="text-muted-foreground group-hover:text-primary transition-colors mb-6" />
                <h3 className="text-white font-bold text-lg mb-2">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
