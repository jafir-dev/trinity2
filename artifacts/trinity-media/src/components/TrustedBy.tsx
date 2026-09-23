import { motion } from 'framer-motion';

const CLIENTS = [
  "EMAAR", "ADNOC", "DUBAI EXPO", "ETISALAT", "DUBAI MALL", 
  "MAJID AL FUTTAIM", "DAMAC", "DEWA", "ENOC", "RTA", "MERAAS", "NAKHEEL"
];

export function TrustedBy() {
  return (
    <section className="py-6 sm:py-8 border-b border-border bg-muted/40 dark:bg-[#141622]/90 overflow-hidden flex flex-col items-center relative z-20 transition-colors">
      <h3 className="text-xs font-bold text-muted-foreground dark:text-purple-300/80 tracking-[0.3em] uppercase mb-4">Trusted By Industry Leaders</h3>
      
      <div className="w-full relative flex items-center">
        {/* Gradients for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-muted/80 dark:from-[#141622] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-muted/80 dark:from-[#141622] to-transparent z-10 pointer-events-none" />
        
        <div className="flex overflow-hidden w-full group">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex items-center space-x-12 md:space-x-24 px-12 shrink-0"
          >
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div 
                key={i} 
                className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground/50 dark:text-slate-300/60 uppercase whitespace-nowrap tracking-wider hover:text-primary dark:hover:text-white transition-colors duration-300"
              >
                {client}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
