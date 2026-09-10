import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import mdImg from '@assets/generated_images/md_image.jpg';

export function CeoMessage() {
  return (
    <section id="ceo-message" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden transition-colors"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left: Message Text */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center">
              {/* Header with 99 Quote Icon */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/40 text-primary flex items-center justify-center shrink-0">
                  <Quote size={20} className="fill-primary/30 text-primary" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-bold block leading-tight">
                    LEADERSHIP VISION
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-foreground uppercase tracking-tight leading-none mt-0.5">
                    CEO'S MESSAGE
                  </h3>
                </div>
              </div>

              {/* Quotes */}
              <div className="border-l-2 border-primary pl-5 my-2 space-y-4 text-foreground/85 text-sm sm:text-base leading-relaxed italic">
                <p>
                  "It gives me immense pleasure to welcome you all. As we grow bigger, I would like to take this opportunity to express my profound gratitude to all our respectful clients and business partners for their valuable support and cooperative contributions to the smooth functioning."
                </p>
                <p>
                  "Today, change is everywhere but one thing we as a company keep constant is our client satisfaction and to ensure their mission objectives are achieved with the highest level of capability and quality. Whether you are a potential customer, a small business partner, or a future employee, we always look forward to finding out how we can work together to bring service to life."
                </p>
              </div>

              {/* Signature Badge */}
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-primary/15 border border-primary/40 text-primary flex items-center justify-center font-display text-base font-bold shrink-0">
                  SW
                </div>
                <div>
                  <h4 className="font-display text-xl text-foreground tracking-wide uppercase leading-tight">
                    MR. SURAJ WALTER
                  </h4>
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-primary mt-0.5">
                    MANAGING DIRECTOR — TRINITY MEDIA LLC
                  </p>
                </div>
              </div>
            </div>

            {/* Right: MD Portrait Card */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl group">
                <img
                  src={mdImg}
                  alt="Mr. Suraj Walter - Managing Director"
                  className="w-full h-80 sm:h-96 object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#080808]/90 backdrop-blur-md p-3.5 rounded-lg border border-white/15 text-center shadow-xl">
                  <div className="font-display text-lg sm:text-xl text-white font-bold tracking-wide uppercase leading-tight">
                    MR. SURAJ WALTER
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-pink-300 mt-0.5">
                    MANAGING DIRECTOR
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 font-medium">
                    Trinity Media LLC • Dubai, UAE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
