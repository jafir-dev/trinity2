import { motion } from 'framer-motion';

const CLIENTS = [
  "EMAAR", "ADNOC", "DUBAI EXPO", "ETISALAT", "DUBAI MALL", 
  "MAJID AL FUTTAIM", "DAMAC", "DEWA", "ENOC", "RTA", "MERAAS", "NAKHEEL"
];

export function TrustedBy() {
  return (
    <section className="py-12 border-b border-border bg-background overflow-hidden flex flex-col items-center relative z-20">
      <h3 className="text-xs font-bold text-muted-foreground tracking-[0.3em] uppercase mb-8">Trusted By</h3>
      
      <div className="w-full relative flex items-center">
        {/* Gradients for smooth fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex overflow-hidden w-full group">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex items-center space-x-12 md:space-x-24 px-12 shrink-0"
          >
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div 
                key={i} 
                className="font-display text-2xl md:text-3xl lg:text-4xl text-muted-foreground/40 uppercase whitespace-nowrap tracking-wider hover:text-white transition-colors duration-300"
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
