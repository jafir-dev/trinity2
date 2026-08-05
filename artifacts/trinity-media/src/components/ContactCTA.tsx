import { motion } from 'framer-motion';

export function ContactCTA() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-gradient-to-br from-primary to-[#4A1A56]">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 md:px-8 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-7xl md:text-9xl text-white uppercase tracking-tighter leading-[0.85] mb-12"
        >
          LET'S BUILD<br/>
          YOUR NEXT<br/>
          BIG IDEA.
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="w-full sm:w-auto px-10 py-5 bg-white text-primary font-bold uppercase tracking-widest rounded hover:bg-gray-100 transition-colors">
            Get Proposal
          </button>
          <button className="w-full sm:w-auto px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-widest rounded hover:bg-white hover:text-primary transition-colors">
            Schedule Meeting
          </button>
        </motion.div>
      </div>
    </section>
  );
}
