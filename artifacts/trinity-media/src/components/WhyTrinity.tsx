import { motion } from 'framer-motion';
import { Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const STATS = [
  { value: "11+", label: "Years in UAE", sub: "Since 2011" },
  { value: "2,000+", label: "Projects Delivered", sub: "On schedule" },
  { value: "250+", label: "Corporate Clients", sub: "Across all 7 Emirates" },
  { value: "18,000", label: "Sqft Production", sub: "DIP-1 Dubai" },
];

// Image bento cells — all real photos from the public folder
const BENTO = [
  {
    img: '/images/why-choose-us/exhibition.jpg',
    label: 'EXHIBITION STANDS',
    sub: 'World-class bespoke booths for DWTC',
    span: 'md:col-span-2 md:row-span-2',
    badge: '2,000+ builds',
  },
  {
    img: '/images/why-choose-us/retail.jpg',
    label: 'RETAIL & MALL SIGNAGE',
    sub: 'Backlit acrylic, LED & POSM displays',
    span: 'md:col-span-1 md:row-span-1',
    badge: '250+ brands',
  },
  {
    img: '/images/why-choose-us/vehicle.jpg',
    label: 'VEHICLE BRANDING',
    sub: 'Full fleet wraps & partial graphics',
    span: 'md:col-span-1 md:row-span-1',
    badge: 'Dubai based',
  },
  {
    img: '/images/manufacturing/facility.jpg',
    label: '18,000 SQFT FACILITY',
    sub: 'UV flatbed, HP Latex & CNC in-house',
    span: 'md:col-span-2 md:row-span-1',
    badge: 'ISO Certified',
  },
];

const TRUST_FACTORS = [
  { icon: '🖨️', title: 'Best Machinery', desc: 'UV Flatbed, HP Latex & CNC cutters' },
  { icon: '👷', title: 'Expert Team', desc: 'Skilled fabrication engineers & artisans' },
  { icon: '💰', title: 'Competitive Pricing', desc: 'Direct in-house, no middleman markup' },
  { icon: '⚡', title: 'On-Time Delivery', desc: '24/7 production, strict deadlines met' },
  { icon: '😊', title: 'Friendly Service', desc: 'Dedicated project managers, end-to-end' },
  { icon: '🛡️', title: 'ISO Certified Quality', desc: 'Premium inks, European substrates' },
  { icon: '👍', title: '100% Satisfaction', desc: 'From concept to on-site handover' },
];

export function WhyTrinity() {
  return (
    <section id="why-us" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">
              <Sparkles size={15} />
              <span>Printing simplified since 2011</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-foreground">
              WHY CHOOSE <span className="text-primary">TRINITY MEDIA</span>
            </h2>
          </div>
          <p className="text-foreground/70 text-base max-w-sm leading-relaxed md:text-right">
            Devoted to brilliance. Every product printed with perfection — quality that speaks when words fail.
          </p>
        </div>

        {/* ── BENTO IMAGE MOSAIC ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-4 mb-16">
          {BENTO.map((cell, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl border border-border shadow-md ${cell.span}`}
            >
              <img
                src={cell.img}
                alt={cell.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Always-visible gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badge pill top-left */}
              <div className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                {cell.badge}
              </div>

              {/* Label bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="font-display text-xl text-white tracking-wide leading-tight">
                      {cell.label}
                    </h4>
                    <p className="text-xs text-white/75 mt-0.5">{cell.sub}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-colors flex-shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── STATS BAR ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-primary/25 rounded-xl p-6 text-center hover:border-primary transition-all shadow-sm group"
            >
              <div className="font-display text-4xl sm:text-5xl text-primary group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="font-display text-base text-foreground uppercase mt-1 tracking-wide">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── TRUST FACTORS — icon + short text, horizontal scroll on mobile ── */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Choose the right partner</span>
            <h3 className="font-display text-3xl sm:text-4xl text-foreground uppercase mt-1">
              EXPERTISE YOU CAN TRUST
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {TRUST_FACTORS.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="p-4 bg-card border border-border rounded-xl hover:border-primary/60 transition-all group text-center shadow-sm"
              >
                <div className="text-3xl mb-3">{feat.icon}</div>
                <h4 className="font-bold text-sm text-foreground uppercase tracking-wide mb-1">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#4d195a] via-[#35103f] to-[#200727] p-8 sm:p-12 border border-primary/50 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest text-pink-200 font-bold block mb-1">Direct Consultation</span>
              <h3 className="font-display text-3xl sm:text-5xl text-white uppercase">
                HAVE A QUESTION? ASK OUR EXPERT NOW.
              </h3>
              <p className="text-xs sm:text-sm text-pink-100/90 mt-2">
                Our senior print engineers and estimators in DIP-1 are available to assist with custom dimensions, material samples, and expedited deadlines.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:+971526935456"
                className="px-8 py-4 bg-white text-primary font-bold uppercase tracking-wider rounded text-xs sm:text-sm flex items-center gap-2.5 hover:bg-gray-100 transition-all shadow-xl cursor-pointer"
              >
                <Phone size={16} />
                <span>+971 52 693 5456</span>
              </a>
              <a
                href="https://wa.me/971526935456?text=Hi%20Trinity%20Media%2C%20I%20have%20an%20urgent%20question%20regarding%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-wider rounded text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-xl"
              >
                <FaWhatsapp size={18} />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
