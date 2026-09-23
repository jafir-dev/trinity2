// ── TEXT FALLBACK (commented out — revert by uncommenting the CLIENTS array and swapping the map below) ──
// import { motion } from 'framer-motion';
// const CLIENTS = [
//   "EMAAR", "ADNOC", "DUBAI EXPO", "ETISALAT", "DUBAI MALL",
//   "MAJID AL FUTTAIM", "DAMAC", "DEWA", "ENOC", "RTA", "MERAAS", "NAKHEEL"
// ];

const LOGOS = [
  "/images/client-logos/L1.png",
  "/images/client-logos/L2.png",
  "/images/client-logos/L3.png",
  "/images/client-logos/L4.png",
  "/images/client-logos/L5.png",
  "/images/client-logos/L6.png",
  "/images/client-logos/L7.png",
  "/images/client-logos/L8.png",
  "/images/client-logos/L9.png",
  "/images/client-logos/L10.png",
  "/images/client-logos/L11.png",
  "/images/client-logos/L12.png",
  "/images/client-logos/L13.png",
  "/images/client-logos/L14.png",
  "/images/client-logos/L15.png",
  "/images/client-logos/L16.png",
];

/*
 * CSS keyframe approach:
 * The track holds two identical sets of logos side-by-side (total width = 2×).
 * Animating translateX(-50%) moves exactly one full set, so the moment it
 * wraps back to 0% the image is identical — zero visible glitch.
 */
const marqueeStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "3rem",
  paddingInline: "3rem",
  width: "max-content",
  animation: "marquee 35s linear infinite",
  willChange: "transform",
};

export function TrustedBy() {
  return (
    <section className="py-6 sm:py-8 border-b border-border bg-muted/40 dark:bg-[#141622]/90 overflow-hidden flex flex-col items-center relative z-20 transition-colors">
      {/* Keyframe definition — injected once via a <style> tag */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <h3 className="text-xs font-bold text-muted-foreground dark:text-purple-300/80 tracking-[0.3em] uppercase mb-4">
        Trusted By Industry Leaders
      </h3>

      <div className="w-full relative flex items-center">
        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-muted/80 dark:from-[#141622] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-muted/80 dark:from-[#141622] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden w-full">
          {/* Logo images — two copies so translateX(-50%) loops invisibly */}
          <div style={marqueeStyle}>
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Client logo ${(i % LOGOS.length) + 1}`}
                className="h-8 md:h-10 lg:h-12 w-auto object-contain shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            ))}
          </div>

          {/* ── TEXT FALLBACK (revert: remove the div above, restore motion import + CLIENTS, and use this block) ──
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex items-center space-x-12 md:space-x-24 px-12 shrink-0"
          >
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div
                key={i}
                className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground/50 dark:text-slate-300/60 uppercase whitespace-nowrap tracking-wider hover:text-primary dark:hover:text-white transition-colors duration-300"
              >
                {client}
              </div>
            ))}
          </motion.div>
          */}
        </div>
      </div>
    </section>
  );
}
