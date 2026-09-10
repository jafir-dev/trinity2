import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const FILTERS = ['All', 'Exhibitions', 'Retail', 'Signage', 'Fabrication', 'Events', 'Vehicles'];

const PROJECTS = [
  { id: 1, title: 'Bespoke Exhibition Stand', category: 'Exhibitions', image: '/images/portfolio/exhibition-stand.jpg', location: 'Dubai World Trade Centre (DWTC)', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 2, title: 'Luxury Retail Display & POSM', category: 'Retail', image: '/images/portfolio/retail-display.jpg', location: 'The Dubai Mall', span: 'col-span-1 row-span-1' },
  { id: 3, title: 'Architectural Illuminated Neon Signage', category: 'Signage', image: '/images/portfolio/led-neon.jpg', location: 'Downtown Dubai', span: 'col-span-1 row-span-1' },
  { id: 4, title: 'Custom Interactive Mall Kiosk', category: 'Fabrication', image: '/images/portfolio/kiosk-fabrication.jpg', location: 'Mall of the Emirates', span: 'col-span-1 md:col-span-2 row-span-1' },
  { id: 5, title: 'Corporate Event Stage & Activation', category: 'Events', image: '/images/portfolio/event-activation.jpg', location: 'Madinat Jumeirah, Dubai', span: 'col-span-1 row-span-1' },
  { id: 6, title: 'Commercial Fleet Vehicle Branding', category: 'Vehicles', image: '/images/portfolio/vehicle-branding.jpg', location: 'Dubai Investment Park (DIP)', span: 'col-span-1 row-span-1' },
];


export function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filtered = PROJECTS.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background relative">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 relative z-10">
          <div className="relative">
            <h2 className="absolute -top-10 left-0 font-display text-[6rem] md:text-[8rem] text-foreground/5 whitespace-nowrap pointer-events-none select-none">PORTFOLIO</h2>
            <h3 className="font-display text-5xl md:text-6xl text-foreground relative z-10">OUR WORK</h3>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-4 relative z-10">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded border transition-colors cursor-pointer ${
                  filter === f 
                    ? 'bg-primary border-primary text-white' 
                    : 'border-border text-foreground/70 hover:border-primary hover:text-primary bg-card/60'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4">
          <AnimatePresence>
            {filtered.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={proj.id}
                className={`relative group overflow-hidden rounded-xl border border-border bg-card shadow-md ${proj.span}`}
              >
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-pink-300 text-sm font-bold tracking-widest uppercase mb-2">{proj.category}</span>
                  <h4 className="text-2xl font-display tracking-wide text-white mb-1">{proj.title}</h4>
                  <p className="text-gray-300 text-sm mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" /> {proj.location}
                  </p>
                  
                  <button className="self-start uppercase tracking-wider text-xs font-bold text-white border-b border-primary pb-1 hover:text-primary transition-colors cursor-pointer">
                    View Project Details →
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <a 
            href="#services"
            className="inline-block px-8 py-4 border border-border text-foreground font-bold uppercase tracking-wider rounded text-sm hover:border-primary hover:text-primary transition-colors bg-card shadow-sm cursor-pointer"
          >
            Explore All Project Services
          </a>
        </div>

      </div>
    </section>
  );
}
