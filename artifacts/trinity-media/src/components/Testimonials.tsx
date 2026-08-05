import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Trinity Media transformed our exhibition presence completely. Their attention to detail and engineering precision is unmatched in the UAE.",
    name: "Ahmed Al Rashidi",
    role: "Marketing Director",
    company: "Emaar Properties"
  },
  {
    quote: "From concept to installation, the Trinity team delivered beyond expectations. A truly premium partner for any high-end retail brand.",
    name: "Sarah Mitchell",
    role: "Brand Manager",
    company: "Dubai Mall"
  },
  {
    quote: "The fastest turnaround, the highest quality — Trinity Media is our go-to for all fabrication needs across all our real estate developments.",
    name: "Mohammed Khalil",
    role: "CEO",
    company: "Al Futtaim Group"
  }
];

export function Testimonials() {
  return (
    <section id="clients" className="py-24 md:py-32 bg-[#0C0C0C]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        
        <div className="mb-16">
          <h2 className="font-display text-5xl md:text-6xl text-white uppercase tracking-tight">WHAT CLIENTS SAY</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-10 border border-border bg-[#121212] rounded flex flex-col justify-between group hover:border-primary/50 transition-colors"
            >
              <div>
                <Quote size={40} className="text-primary/20 mb-6 group-hover:text-primary/50 transition-colors" />
                <p className="text-secondary text-lg leading-relaxed mb-8 italic">
                  "{test.quote}"
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-sm mb-1">{test.name}</h4>
                <p className="text-primary text-xs font-medium uppercase tracking-widest">{test.role}</p>
                <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">{test.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
