import { motion } from 'framer-motion';
import { Award, Trophy, Star, Sparkles, ShieldCheck } from 'lucide-react';
import portfolioImg1 from '@assets/generated_images/portfolio1.jpg';
import portfolioImg2 from '@assets/generated_images/portfolio2.jpg';
import portfolioImg3 from '@assets/generated_images/portfolio3.jpg';

const AWARDS_LIST = [
  {
    id: 1,
    title: "UMM AL QUWAIN INNOVATIONS AWARD",
    subtitle: "Muse Creative Awards 2021 • Gold & Silver Winner",
    category: "Creative Branding & Large Format Innovation",
    desc: "Honored with the prestigious Umm Al Quwain Innovations Award and Gold & Silver recognition at the Muse Creative Awards 2021 for transformative brand makeovers and large-scale architectural branding installations.",
    image: portfolioImg1,
    year: "2021"
  },
  {
    id: 2,
    title: "PHILIPS HEALTH CARE",
    subtitle: "Excellence in Precision Fabrication & Corporate Signage",
    category: "Crystal Partner Award",
    desc: "Awarded crystal recognition by Philips Health Care for exemplary delivery of specialized, high-durability hospital, clinic, and corporate healthcare environment branding and signage across the region.",
    image: portfolioImg2,
    year: "2021"
  },
  {
    id: 3,
    title: "EUROPEAN PRESS ASSOCIATION",
    subtitle: "EDP Awards 2021 Winner",
    category: "Digital Printing & Print Quality Recognition",
    desc: "Recognized internationally by the European Digital Press (EDP) Association for outstanding large format digital print reproduction, color accuracy, and innovative UV flatbed substrate printing techniques.",
    image: portfolioImg3,
    year: "2021"
  }
];

export function Awards() {
  return (
    <section id="awards" className="py-20 md:py-32 bg-[#090909] relative overflow-hidden border-b border-border/80">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-primary font-bold block mb-2"
          >
            Excellence & Industry Recognition
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight"
          >
            AWARDS & <span className="text-primary">SPONSORSHIPS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base mt-4"
          >
            Recognized by international bodies and Fortune 500 partners for extraordinary print fidelity and innovative fabrication.
          </motion.p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AWARDS_LIST.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#121212] border border-border/80 rounded-2xl overflow-hidden hover:border-primary/60 transition-all flex flex-col justify-between shadow-xl group"
            >
              {/* Award Visual Showcase */}
              <div className="relative h-64 overflow-hidden bg-black/40">
                <img 
                  src={award.image} 
                  alt={award.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/60" />
                
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Trophy size={13} className="text-yellow-300" />
                  <span>{award.year}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pink-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded inline-block">
                    {award.category}
                  </span>
                </div>
              </div>

              {/* Award Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl text-white uppercase tracking-wide group-hover:text-primary transition-colors mb-2">
                    {award.title}
                  </h3>
                  <div className="text-xs text-pink-300 font-semibold mb-4">
                    {award.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {award.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 text-pink-300">
                    <Star size={13} />
                    <span className="font-semibold">Winner Distinction</span>
                  </div>
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
