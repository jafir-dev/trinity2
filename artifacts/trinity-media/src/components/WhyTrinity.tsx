import { motion } from 'framer-motion';
import { 
  Cpu, Users, DollarSign, Clock, 
  Smile, ShieldCheck, ThumbsUp, Phone, 
  MessageSquare, Sparkles, CheckCircle2 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import manufacturingImg from '@assets/generated_images/manufacturing.jpg';
import servicesImg from '@assets/generated_images/services.jpg';

const STATS = [
  { value: "11+", label: "Years of Experience", sub: "Since 2011 in UAE" },
  { value: "2000+", label: "Completed Projects", sub: "Delivered on schedule" },
  { value: "250+", label: "Happy Corporate Clients", sub: "Across all 7 Emirates" },
  { value: "18,000", label: "Sqft Production Area", sub: "In Dubai Investment Park 1" },
];

const TRUST_FACTORS = [
  {
    icon: Cpu,
    title: "Best Machinery",
    desc: "State-of-the-art Flatbed UV printers, HP Latex, and precision CNC cutters delivering uncompromising sharpness."
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Highly skilled fabrication engineers, graphic artisans, and print specialists dedicated to flawless execution."
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    desc: "Direct in-house manufacturing rates without intermediary markups, offering unmatched value for premium quality."
  },
  {
    icon: Clock,
    title: "On Time Delivery",
    desc: "24/7 production scheduling ensuring prompt turnaround for high-stakes corporate deadlines and event dates."
  },
  {
    icon: Smile,
    title: "Friendly Service",
    desc: "Dedicated project managers providing transparent communication, updates, and end-to-end support."
  },
  {
    icon: ShieldCheck,
    title: "High Quality Products",
    desc: "ISO certified quality assurance with premium inks, European substrates, and rigorous inspection standards."
  },
  {
    icon: ThumbsUp,
    title: "Customer Satisfaction",
    desc: "100% committed to exceeding client expectations from initial concept to on-site handover."
  }
];

export function WhyTrinity() {
  return (
    <section id="why-us" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        
        {/* Header & Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
              <Sparkles size={16} />
              <span>Printing simplified since 2011</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight mb-6 text-foreground">
              WHY CHOOSE <span className="text-primary">TRINITY MEDIA</span>
            </h2>

            <p className="text-foreground/80 text-base sm:text-lg leading-relaxed mb-6">
              Devoted to brilliance, Trinity Media assures that every product is printed with perfection. When words fail, we speak through our quality. We are committed to exceeding your expectations round the clock.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#contact"
                className="px-7 py-3 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded transition-all shadow-lg shadow-primary/30"
              >
                Inquire For Your Project
              </a>
              <a
                href="https://wa.me/971526935456?text=Hi%20Trinity%20Media%2C%20I%20have%20a%20question%20regarding%20your%20printing%20services."
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded flex items-center gap-2 transition-all shadow-lg shadow-green-900/30"
              >
                <FaWhatsapp size={16} />
                <span>Talk to Expert Now</span>
              </a>
            </div>
          </div>

          {/* Right: Visual Showcase */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden border border-border h-64 sm:h-72 shadow-md">
              <img src={manufacturingImg} alt="Machinery & Printing Press" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white uppercase tracking-wider">
                18,000 SQFT PRESS
              </span>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-border h-64 sm:h-72 mt-6 shadow-md">
              <img src={servicesImg} alt="Quality Signage & Printing" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white uppercase tracking-wider">
                2000+ PROJECTS
              </span>
            </div>
          </div>

        </div>

        {/* 4 Stats Cards Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-primary/30 rounded-xl p-6 text-center hover:border-primary transition-all shadow-md group"
            >
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-primary group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="font-display text-lg text-foreground uppercase mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expertise You Can Trust (7 Factors) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Choose the right partner for you</span>
            <h3 className="font-display text-3xl sm:text-5xl text-foreground uppercase mt-1">
              EXPERTISE YOU CAN TRUST
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {TRUST_FACTORS.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 bg-card border border-border rounded-xl hover:border-primary/60 transition-all group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                    <feat.icon size={24} />
                  </div>
                  <h4 className="font-display text-xl text-foreground uppercase tracking-wide mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-[11px] text-primary font-semibold uppercase tracking-wider">
                  <CheckCircle2 size={13} />
                  <span>Guaranteed Standard</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Have a Question Banner */}
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
