import { motion } from 'framer-motion';

const BRANDS = [
  "Emaar", "Adnoc", "Etisalat", "Du", "DEWA", 
  "RTA", "Nakheel", "Meraas", "ENOC", "Majid Al Futtaim", 
  "Damac", "Aldar", "RAK Ceramics", "Jumeirah Group", "Abu Dhabi Airports"
];

export function Brands() {
  return (
    <section className="py-24 border-b border-border bg-background">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-white uppercase tracking-tight">BRANDS WE WORK WITH</h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-4">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-center p-4 group"
            >
              <span className="font-display text-xl md:text-2xl text-muted-foreground/50 group-hover:text-primary transition-colors text-center uppercase tracking-widest cursor-default">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
