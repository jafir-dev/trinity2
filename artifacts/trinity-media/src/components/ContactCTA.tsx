import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Calendar, FileText, ArrowRight } from 'lucide-react';

export function ContactCTA() {
  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-br from-primary via-[#6B1B6B] to-[#300E3A]">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
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
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm uppercase tracking-[0.25em] text-pink-200 font-bold block mb-4"
        >
          Partner With Dubai's Premier Print & Fabrication Press
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl sm:text-7xl md:text-9xl text-white uppercase tracking-tighter leading-[0.88] mb-10"
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
          className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-xl mx-auto"
        >
          <Link 
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 sm:py-5 bg-white text-primary hover:text-black font-bold uppercase tracking-wider text-xs sm:text-sm rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl shadow-black/40 cursor-pointer"
          >
            <FileText size={18} />
            <span>Get Proposal</span>
          </Link>
          
          <a 
            href="https://wa.me/971526935456?text=Hi%20Trinity%20Media,%20I%20would%20like%20to%20schedule%20a%20meeting%20with%20your%20team%20to%20discuss%20our%20project." 
            target="_blank" 
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 sm:py-5 border-2 border-white/90 text-white hover:bg-white hover:text-primary font-bold uppercase tracking-wider text-xs sm:text-sm rounded-lg transition-all duration-200 shadow-2xl cursor-pointer"
          >
            <Calendar size={18} />
            <span>Schedule Meeting</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
