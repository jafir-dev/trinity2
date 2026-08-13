import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { SERVICES } from '@/data/services';

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#0C0C0C] relative overflow-hidden">
      {/* Background Typography */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-5">
        <h2 className="font-display text-[15rem] md:text-[25rem] leading-none whitespace-nowrap text-white">SERVICES</h2>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-20">
          <h2 className="font-display text-5xl md:text-7xl mb-6 uppercase tracking-tight">WHAT WE DO</h2>
          <p className="text-secondary text-base md:text-lg leading-relaxed">
            Nineteen specialised services under one roof — from exhibition stands and interior fit-outs to signage, print and vehicle branding. Explore any service to see how we deliver it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/60 border border-border/60 rounded-lg overflow-hidden">
          {SERVICES.map((srv, idx) => (
            <Link key={srv.num} to={`/services/${srv.slug}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (idx % 2) * 0.05 }}
                className="group relative bg-[#0C0C0C] p-8 md:p-10 flex flex-col transition-colors duration-300 hover:bg-[#121212] h-full"
              >
                <div className="flex items-start gap-5 mb-5">
                  <span className="font-display text-3xl md:text-4xl text-primary leading-none">
                    {srv.num}
                  </span>
                  <h3 className="font-display tracking-wide text-2xl md:text-3xl text-muted-foreground group-hover:text-white transition-colors leading-tight pt-1">
                    {srv.title}
                  </h3>
                </div>

                <p className="text-secondary text-sm md:text-base leading-relaxed mb-8 flex-1">
                  {srv.short}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary hover:text-white transition-colors self-start">
                  Know More
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
