import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { SERVICES } from '@/data/services';

const imageMap: Record<string, string> = {
  'exhibition_1.jpg': new URL('@assets/generated_images/exhibition_1.jpg', import.meta.url).href,
  'event_branding_1.jpg': new URL('@assets/generated_images/event_branding_1.jpg', import.meta.url).href,
  'kiosk_1.jpg': new URL('@assets/generated_images/kiosk_1.jpg', import.meta.url).href,
  'service_retail_display.jpg': new URL('@assets/generated_images/service_retail_display.jpg', import.meta.url).href,
  'service_interior_fitout.jpg': new URL('@assets/generated_images/service_interior_fitout.jpg', import.meta.url).href,
  'service_portable_display.jpg': new URL('@assets/generated_images/service_portable_display.jpg', import.meta.url).href,
  'service_signage.jpg': new URL('@assets/generated_images/service_signage.jpg', import.meta.url).href,
  'service_led_signage.jpg': new URL('@assets/generated_images/service_led_signage.jpg', import.meta.url).href,
  'service_vehicle_branding.jpg': new URL('@assets/generated_images/service_vehicle_branding.jpg', import.meta.url).href,
};
const fallbackImg = new URL('@assets/generated_images/services.jpg', import.meta.url).href;

function getImg(filename?: string): string {
  if (!filename) return fallbackImg;
  if (filename.startsWith('/') || filename.startsWith('http')) return filename;
  return imageMap[filename] ?? fallbackImg;
}


export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background relative overflow-hidden transition-colors">
      {/* Background Typography */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-5">
        <h2 className="font-display text-[15rem] md:text-[25rem] leading-none whitespace-nowrap text-foreground">SERVICES</h2>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="text-xs uppercase tracking-widest text-primary font-bold mb-3">Our Core Capabilities</div>
          <h2 className="font-display text-5xl md:text-7xl mb-4 uppercase tracking-tight text-foreground">WHAT WE DO</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Nineteen specialised turnkey services under one roof — from large-scale exhibition stands to bespoke retail signage, UV flatbed printing, and vehicle branding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((srv, idx) => (
            <Link key={srv.num} href={`/services/${srv.slug}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (idx % 2) * 0.05 }}
                className="relative bg-card border border-border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/60 hover:shadow-2xl h-full"
              >
                {/* Image - Tall, visually impactful */}
                <div className="relative h-72 sm:h-80 md:h-84 overflow-hidden">
                  <img
                    src={getImg(srv.image)}
                    alt={srv.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category / Badge overlay */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-white font-display text-sm tracking-wider uppercase">
                    Service {srv.num}
                  </span>

                  {/* Big Number overlay bottom-right */}
                  <span className="absolute bottom-2 right-4 font-display text-8xl leading-none text-white/20 select-none pointer-events-none">
                    {srv.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display tracking-wide text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors leading-tight mb-3">
                      {srv.title}
                    </h3>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                      {srv.short}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform self-start">
                    Explore Service Gallery
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
