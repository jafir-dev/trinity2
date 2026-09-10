import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: "What types of projects does Trinity Media handle?",
    a: "Trinity Media handles the full spectrum of branding, exhibition, signage, fabrication, interior fit-out, and printing projects across the UAE and GCC."
  },
  {
    q: "Do you handle projects outside Dubai?",
    a: "Yes, we serve clients across all seven UAE emirates and GCC countries with our dedicated installation and logistics teams."
  },
  {
    q: "What is your typical project turnaround time?",
    a: "Turnaround varies by project scope. Standard signage: 3-5 days. Exhibition stands: 2-4 weeks. Interior fit-outs: 4-8 weeks. We also handle rush orders thanks to our 24/7 production facility."
  },
  {
    q: "Do you offer design services alongside fabrication?",
    a: "Absolutely. We provide end-to-end turnkey solutions from initial concept and design through to fabrication, installation, and after-service support."
  },
  {
    q: "Can you handle large-scale government and corporate projects?",
    a: "Yes — some of our biggest clients are government entities and major corporations across the UAE. We are fully equipped to meet strict compliance and scale requirements."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-muted/20 border-t border-border">
      <div className="max-w-[800px] mx-auto px-6 md:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-foreground uppercase tracking-tight">FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border border-border bg-card rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between group"
                >
                  <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                    {faq.q}
                  </span>
                  <div className="text-muted-foreground flex-shrink-0 ml-4">
                    {isOpen ? <Minus size={20} className="text-primary" /> : <Plus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border/50 pt-4 text-sm sm:text-base">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
