import { motion } from 'framer-motion';
import { Trophy, Star, ShieldCheck, Sparkles } from 'lucide-react';

function UmmAlQuwainVector() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#1d112e] via-[#120820] to-[#0a0312] overflow-hidden">
      {/* Background Radial Glow & Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-purple-600/10 to-transparent" />
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 300" fill="none">
        <g stroke="url(#goldRays)" strokeWidth="0.8">
          {[...Array(24)].map((_, i) => (
            <line key={i} x1="200" y1="150" x2={200 + 220 * Math.cos((i * Math.PI) / 12)} y2={150 + 220 * Math.sin((i * Math.PI) / 12)} />
          ))}
        </g>
        <defs>
          <linearGradient id="goldRays" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Luxury Gold Vector Trophy & Wreath Emblem */}
      <svg className="w-48 h-48 drop-shadow-[0_12px_24px_rgba(245,158,11,0.35)]" viewBox="0 0 200 200" fill="none">
        <defs>
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FCD34D" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="goldGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#FFFBEB" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Outer Laurel Wreath Leaves */}
        <g stroke="url(#goldGrad1)" strokeWidth="2.5" strokeLinecap="round">
          {/* Left Wreath */}
          <path d="M 40 135 C 28 100 35 60 70 36" fill="none" />
          <path d="M 38 126 C 28 120 26 108 34 104 C 38 112 40 118 38 126 Z" fill="url(#goldGrad1)" />
          <path d="M 32 100 C 22 94 22 82 30 78 C 34 86 35 93 32 100 Z" fill="url(#goldGrad1)" />
          <path d="M 36 74 C 28 68 30 56 39 53 C 41 62 40 68 36 74 Z" fill="url(#goldGrad1)" />
          <path d="M 48 50 C 42 42 48 32 58 31 C 58 40 54 46 48 50 Z" fill="url(#goldGrad1)" />
          <path d="M 68 34 C 64 24 74 18 84 20 C 81 29 75 33 68 34 Z" fill="url(#goldGrad1)" />

          {/* Right Wreath */}
          <path d="M 160 135 C 172 100 165 60 130 36" fill="none" />
          <path d="M 162 126 C 172 120 174 108 166 104 C 162 112 160 118 162 126 Z" fill="url(#goldGrad1)" />
          <path d="M 168 100 C 178 94 178 82 170 78 C 166 86 165 93 168 100 Z" fill="url(#goldGrad1)" />
          <path d="M 164 74 C 172 68 170 56 161 53 C 159 62 160 68 164 74 Z" fill="url(#goldGrad1)" />
          <path d="M 152 50 C 158 42 152 32 142 31 C 142 40 146 46 152 50 Z" fill="url(#goldGrad1)" />
          <path d="M 132 34 C 136 24 126 18 116 20 C 119 29 125 33 132 34 Z" fill="url(#goldGrad1)" />
        </g>

        {/* Central Beveled Star & Medallion */}
        <circle cx="100" cy="95" r="42" fill="#1b0c2e" stroke="url(#goldGrad1)" strokeWidth="3" />
        <circle cx="100" cy="95" r="36" fill="url(#sunGlow)" stroke="url(#goldGrad2)" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* 8-Pointed Faceted Gold Muse Star */}
        <polygon points="100,64 106,86 128,95 106,104 100,126 94,104 72,95 94,86" fill="url(#goldGrad1)" />
        <polygon points="100,64 100,95 128,95" fill="url(#goldGrad2)" opacity="0.9" />
        <polygon points="100,126 100,95 72,95" fill="url(#goldGrad2)" opacity="0.9" />
        <circle cx="100" cy="95" r="7" fill="#FFFBEB" />

        {/* Bottom Banner Ribbon */}
        <path d="M 50 152 L 150 152 L 140 168 L 60 168 Z" fill="url(#goldGrad1)" stroke="#78350F" strokeWidth="1" />
        <text x="100" y="163" textAnchor="middle" fill="#521d03" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.5">
          GOLD WINNER
        </text>
      </svg>
    </div>
  );
}

function PhilipsVector() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#06192d] via-[#04111f] to-[#02070e] overflow-hidden">
      {/* Crystalline Geometric Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-sky-600/10 to-transparent" />
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300" fill="none">
        <polygon points="200,40 280,120 200,240 120,120" stroke="#38BDF8" strokeWidth="0.8" />
        <polygon points="200,70 250,130 200,210 150,130" stroke="#0284C7" strokeWidth="0.6" strokeDasharray="4 3" />
        <line x1="120" y1="120" x2="280" y2="120" stroke="#38BDF8" strokeWidth="0.5" />
        <line x1="200" y1="40" x2="200" y2="240" stroke="#38BDF8" strokeWidth="0.5" />
      </svg>

      {/* Main Crystal Trophy & Precision Medical Shield Vector */}
      <svg className="w-48 h-48 drop-shadow-[0_12px_24px_rgba(56,189,248,0.3)]" viewBox="0 0 200 200" fill="none">
        <defs>
          <linearGradient id="crystalFacet1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="crystalFacet2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id="crystalFacet3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="platBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Faceted Crystal Obelisk / Award Prism */}
        <polygon points="100,24 135,70 100,140 65,70" fill="url(#crystalFacet1)" opacity="0.9" />
        <polygon points="100,24 65,70 100,140" fill="url(#crystalFacet2)" opacity="0.85" />
        <polygon points="100,24 125,50 100,75 75,50" fill="#FFFFFF" opacity="0.6" />
        <polygon points="100,75 125,50 135,70" fill="url(#crystalFacet3)" opacity="0.95" />

        {/* Internal Healthcare Precision Cross & Shield Motif */}
        <circle cx="100" cy="85" r="22" fill="#04182b" stroke="#7DD3FC" strokeWidth="2" />
        {/* Modern Medical Plus/Cross */}
        <path d="M 96 74 L 104 74 L 104 81 L 111 81 L 111 89 L 104 89 L 104 96 L 96 96 L 96 89 L 89 89 L 89 81 L 96 81 Z" fill="url(#crystalFacet1)" />

        {/* Sparkling Diamond Vertex Flares */}
        <circle cx="100" cy="24" r="3.5" fill="#FFFFFF" />
        <circle cx="65" cy="70" r="2" fill="#E0F2FE" />
        <circle cx="135" cy="70" r="2" fill="#E0F2FE" />

        {/* Beveled Obsidian Pedestal */}
        <polygon points="68,145 132,145 142,165 58,165" fill="url(#platBase)" stroke="#475569" strokeWidth="1" />
        <polygon points="58,165 142,165 138,172 62,172" fill="#0F172A" />
        <text x="100" y="159" textAnchor="middle" fill="#E0F2FE" fontSize="7.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="1.2">
          CRYSTAL PARTNER
        </text>
      </svg>
    </div>
  );
}

function EDPVector() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#0c1c38] via-[#071124] to-[#040814] overflow-hidden">
      {/* Concentric Print Circles & CMYK Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-indigo-600/10 to-transparent" />
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 300" fill="none">
        <circle cx="200" cy="150" r="110" stroke="#FBBF24" strokeWidth="1" strokeDasharray="6 4" />
        <circle cx="200" cy="150" r="80" stroke="#38BDF8" strokeWidth="0.8" />
        <circle cx="200" cy="150" r="50" stroke="#F43F5E" strokeWidth="0.8" />
      </svg>

      {/* European Digital Press Medal & Rosette Vector */}
      <svg className="w-48 h-48 drop-shadow-[0_12px_24px_rgba(251,191,36,0.3)]" viewBox="0 0 200 200" fill="none">
        <defs>
          <linearGradient id="edpGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="euRibbon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* Drapery Ribbon Top */}
        <polygon points="76,20 100,50 85,75 62,20" fill="url(#euRibbon)" stroke="#F59E0B" strokeWidth="1.2" />
        <polygon points="124,20 100,50 115,75 138,20" fill="url(#euRibbon)" stroke="#F59E0B" strokeWidth="1.2" />

        {/* Outer Knurled Coin Edge */}
        <circle cx="100" cy="108" r="48" fill="url(#edpGold)" stroke="#78350F" strokeWidth="2" />
        <circle cx="100" cy="108" r="43" fill="#08142c" stroke="#FDE68A" strokeWidth="1.5" />

        {/* 12 European Stars Constellation */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x = 100 + 35 * Math.sin(angle);
          const y = 108 - 35 * Math.cos(angle);
          return (
            <polygon
              key={i}
              points={`${x},${y - 3} ${x + 1},${y - 1} ${x + 3},${y - 1} ${x + 1.5},${y + 0.8} ${x + 2},${y + 3} ${x},${y + 1.5} ${x - 2},${y + 3} ${x - 1.5},${y + 0.8} ${x - 3},${y - 1} ${x - 1},${y - 1}`}
              fill="#FBBF24"
            />
          );
        })}

        {/* Center Digital Print Engine Glyph */}
        <circle cx="100" cy="108" r="23" fill="url(#edpGold)" />
        <circle cx="100" cy="108" r="20" fill="#08142c" />
        {/* CMYK 4-Quadrant Print Precision Icon */}
        <circle cx="95" cy="103" r="5" fill="#06B6D4" opacity="0.9" />
        <circle cx="105" cy="103" r="5" fill="#EC4899" opacity="0.9" />
        <circle cx="100" cy="112" r="5" fill="#FACC15" opacity="0.9" />
        <circle cx="100" cy="106" r="2.5" fill="#FFFFFF" />

        {/* Medal Ribbon Banner */}
        <path d="M 54 158 L 146 158 L 138 172 L 62 172 Z" fill="url(#edpGold)" stroke="#78350F" strokeWidth="1" />
        <text x="100" y="168" textAnchor="middle" fill="#451a03" fontSize="8" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.2">
          EDP AWARDS 2021
        </text>
      </svg>
    </div>
  );
}

const AWARDS_LIST = [
  {
    id: 1,
    title: "UMM AL QUWAIN INNOVATIONS AWARD",
    subtitle: "Muse Creative Awards 2021 • Gold & Silver Winner",
    category: "Creative Branding & Large Format Innovation",
    desc: "Honored with the prestigious Umm Al Quwain Innovations Award and Gold & Silver recognition at the Muse Creative Awards 2021 for transformative brand makeovers and large-scale architectural branding installations.",
    VectorComponent: UmmAlQuwainVector,
    year: "2021"
  },
  {
    id: 2,
    title: "PHILIPS HEALTH CARE",
    subtitle: "Excellence in Precision Fabrication & Corporate Signage",
    category: "Crystal Partner Award",
    desc: "Awarded crystal recognition by Philips Health Care for exemplary delivery of specialized, high-durability hospital, clinic, and corporate healthcare environment branding and signage across the region.",
    VectorComponent: PhilipsVector,
    year: "2021"
  },
  {
    id: 3,
    title: "EUROPEAN PRESS ASSOCIATION",
    subtitle: "EDP Awards 2021 Winner",
    category: "Digital Printing & Print Quality Recognition",
    desc: "Recognized internationally by the European Digital Press (EDP) Association for outstanding large format digital print reproduction, color accuracy, and innovative UV flatbed substrate printing techniques.",
    VectorComponent: EDPVector,
    year: "2021"
  }
];

export function Awards() {
  return (
    <section id="awards" className="py-20 md:py-32 bg-background relative overflow-hidden border-b border-border transition-colors">
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
            className="font-display text-4xl sm:text-6xl md:text-7xl text-foreground uppercase tracking-tight"
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
          {AWARDS_LIST.map((award, i) => {
            const Vector = award.VectorComponent;
            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/60 transition-all flex flex-col justify-between shadow-lg group"
              >
                {/* Award Vector Showcase (Replaced photos with luxury vector emblems) */}
                <div className="relative h-64 overflow-hidden border-b border-border/80">
                  <Vector />

                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                    <Trophy size={13} className="text-yellow-300" />
                    <span>{award.year}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-pink-200 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded inline-block border border-white/10 shadow-sm">
                      {award.category}
                    </span>
                  </div>
                </div>

                {/* Award Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-foreground uppercase tracking-wide group-hover:text-primary transition-colors mb-2">
                      {award.title}
                    </h3>
                    <div className="text-xs text-primary font-semibold mb-4">
                      {award.subtitle}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {award.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Star size={13} />
                      <span className="font-semibold">Winner Distinction</span>
                    </div>
                    <span>Dubai, UAE</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
