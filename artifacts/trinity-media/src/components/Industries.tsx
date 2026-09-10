import { motion } from 'framer-motion';
import { 
  ShoppingBag, Diamond, HeartPulse, GraduationCap, 
  Landmark, Building2, Utensils, Library, 
  Home, Ticket, Hammer, CarFront 
} from 'lucide-react';

const INDUSTRIES = [
  { name: 'Retail', icon: ShoppingBag },
  { name: 'Luxury', icon: Diamond },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Education', icon: GraduationCap },
  { name: 'Government', icon: Landmark },
  { name: 'Corporate', icon: Building2 },
  { name: 'Hospitality', icon: Utensils },
  { name: 'Museums', icon: Library },
  { name: 'Real Estate', icon: Home },
  { name: 'Events', icon: Ticket },
  { name: 'Construction', icon: Hammer },
  { name: 'Automotive', icon: CarFront },
];

export function Industries() {
  return (
    <section id="industries" className="py-24 bg-background transition-colors">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Sectors We Empower</div>
          <h2 className="font-display text-5xl md:text-6xl text-foreground uppercase tracking-tight">Industries We Serve</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative p-8 bg-card border border-border flex flex-col items-center justify-center gap-4 group cursor-pointer overflow-hidden rounded-xl shadow-sm hover:border-primary/50 transition-colors"
            >
              <div className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <ind.icon size={32} className="text-muted-foreground group-hover:text-primary relative z-10 transition-colors" />
              <span className="text-sm font-bold uppercase tracking-wider text-foreground/80 group-hover:text-primary relative z-10 transition-colors">
                {ind.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
