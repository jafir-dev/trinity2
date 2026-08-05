import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import servicesImg from '@assets/generated_images/services.jpg';

const SERVICES = [
  { num: '01', title: 'Exhibition Stand Design & Construction', items: ['Custom Booth Fabrication', 'Space Planning', '3D Rendering', 'On-site Installation'] },
  { num: '02', title: 'Event Branding & Activation', items: ['Stage Backdrops', 'Registration Desks', 'Branded Archways', 'Experiential Zones'] },
  { num: '03', title: 'Custom Kiosk Design & Fabrication', items: ['Mall Kiosks', 'Interactive Displays', 'Vending Carts', 'Information Desks'] },
  { num: '04', title: 'Retail Display & Point-of-Sale Solutions', items: ['Gondolas', 'FSU (Free Standing Units)', 'Window Displays', 'Counter Top Units'] },
  { num: '05', title: 'Interior Fit-Out Solutions', items: ['Corporate Offices', 'Retail Stores', 'Restaurants & Cafes', 'Bespoke Joinery'] },
  { num: '06', title: 'Portable Display & Branding Solutions', items: ['Pop-up Displays', 'Roll-up Banners', 'Promotional Counters', 'Flags & Tents'] },
  { num: '07', title: 'Corrugated & Forex Stand Solutions', items: ['Cardboard POS', 'Dump Bins', 'Pallet Displays', 'Counter Displays'] },
  { num: '08', title: 'Indoor & Outdoor Signage', items: ['Wayfinding', 'Building Wraps', 'Pylon Signs', 'Safety Signs'] },
  { num: '09', title: 'LED Neon & Illuminated Signage', items: ['3D Channel Letters', 'Flex Face Signs', 'Neon Art', 'Lightboxes'] },
  { num: '10', title: 'Shell Scheme & Furniture Rental', items: ['Standard Booths', 'Upgraded Shells', 'Display Counters', 'Event Seating'] },
  { num: '11', title: 'Acrylic Fabrication', items: ['Podiums', 'Display Cases', 'Trophy & Awards', 'Leaflet Holders'] },
  { num: '12', title: 'Large Format & Digital Printing', items: ['Banners', 'Posters', 'Vinyl Stickers', 'Backlits'] },
  { num: '13', title: 'Vehicle Branding & Fleet Graphics', items: ['Full Wraps', 'Partial Wraps', 'Van Lettering', 'Food Trucks'] },
  { num: '14', title: 'Custom Fabric Printing', items: ['Tension Fabric', 'Flags', 'Backdrops', 'Soft Signage'] },
  { num: '15', title: 'Canvas Prints & Wall Décor', items: ['Gallery Wraps', 'Framed Art', 'Acoustic Panels', 'Custom Murals'] },
  { num: '16', title: 'Kitchen Cabinet Wrapping', items: ['Architectural Film', 'Vinyl Refacing', 'Countertop Wraps', 'Appliance Wrapping'] },
  { num: '17', title: 'Decorative Wallpaper Solutions', items: ['Custom Printed', 'Textured Vinyl', 'Mural Graphics', 'Installation'] },
  { num: '18', title: 'Custom Awards & Recognition', items: ['Crystal Awards', 'Wooden Plaques', 'Metal Trophies', 'Medals'] },
  { num: '19', title: 'Commercial Offset Printing', items: ['Brochures', 'Business Cards', 'Catalogs', 'Corporate Stationery'] },
];

export function Services() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0C0C0C] relative overflow-hidden">
      {/* Background Typography */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-5">
        <h2 className="font-display text-[15rem] md:text-[25rem] leading-none whitespace-nowrap text-white">SERVICES</h2>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="font-display text-5xl md:text-7xl mb-12 uppercase tracking-tight">WHAT WE DO</h2>
            
            {/* Sticky Image Container */}
            <div className="sticky top-32 rounded overflow-hidden h-[400px] md:h-[600px] w-full hidden lg:block">
              <div className="absolute inset-0 bg-primary/20 z-10" />
              <img 
                src={servicesImg} 
                alt="Trinity Media Services" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-border">
              {SERVICES.map((srv, idx) => {
                const isActive = active === idx;
                return (
                  <div key={idx} className="border-b border-border">
                    <button 
                      onClick={() => setActive(isActive ? null : idx)}
                      className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-6 md:gap-12">
                        <span className="font-display text-2xl md:text-3xl text-primary transition-colors">
                          {srv.num}
                        </span>
                        <span className={`font-display tracking-wide text-2xl md:text-4xl transition-colors ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-white'}`}>
                          {srv.title}
                        </span>
                      </div>
                      <div className="relative w-6 h-6 flex items-center justify-center">
                        <div className={`absolute w-full h-[2px] bg-white transition-transform ${isActive ? 'rotate-180' : ''}`} />
                        <div className={`absolute w-full h-[2px] bg-white transition-transform ${isActive ? 'rotate-0 opacity-0' : 'rotate-90'}`} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pl-12 md:pl-20">
                            <ul className="space-y-3 mb-6">
                              {srv.items.map((item, i) => (
                                <li key={i} className="text-secondary flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                            <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-white transition-colors">
                              Learn More <span className="text-lg">→</span>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
