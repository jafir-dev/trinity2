import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { Link } from 'wouter';
import { ChevronRight, Sparkles, CheckCircle2, Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import servicesImg from '@assets/generated_images/services.jpg';

const FILTERS = ['All', 'Exhibitions', 'Retail', 'Signage', 'Fabrication', 'Events', 'Vehicles'];

const PROJECTS = [
  { 
    id: 1, 
    title: 'Bespoke Exhibition Stand', 
    category: 'Exhibitions', 
    image: '/images/portfolio/exhibition-stand.jpg', 
    location: 'Dubai World Trade Centre (DWTC)', 
    span: 'col-span-1 md:col-span-2 row-span-2',
    description: 'Custom double-deck exhibition stand designed and fabricated for Gitex Global at DWTC.'
  },
  { 
    id: 2, 
    title: 'Luxury Retail Display & POSM', 
    category: 'Retail', 
    image: '/images/portfolio/retail-display.jpg', 
    location: 'The Dubai Mall', 
    span: 'col-span-1 row-span-1',
    description: 'High-gloss acrylic display podiums with integrated LED edge lighting for luxury fragrance brands.'
  },
  { 
    id: 3, 
    title: 'Architectural Illuminated Signage', 
    category: 'Signage', 
    image: '/images/portfolio/led-neon.jpg', 
    location: 'Downtown Dubai', 
    span: 'col-span-1 row-span-1',
    description: 'Precision CNC-cut 3D illuminated letters with Samsung LED modules for exterior high-rise exposure.'
  },
  { 
    id: 4, 
    title: 'Custom Interactive Mall Kiosk', 
    category: 'Fabrication', 
    image: '/images/portfolio/kiosk-fabrication.jpg', 
    location: 'Mall of the Emirates', 
    span: 'col-span-1 md:col-span-2 row-span-1',
    description: 'Turnkey retail kiosk featuring premium joinery, Corian countertops, and concealed power cable management.'
  },
  { 
    id: 5, 
    title: 'Corporate Event Stage & Activation', 
    category: 'Events', 
    image: '/images/portfolio/event-activation.jpg', 
    location: 'Madinat Jumeirah, Dubai', 
    span: 'col-span-1 row-span-1',
    description: 'Full stage backdrop, AV surrounds, printed acoustic fabric panels, and VIP photo op activations.'
  },
  { 
    id: 6, 
    title: 'Commercial Fleet Vehicle Branding', 
    category: 'Vehicles', 
    image: '/images/portfolio/vehicle-branding.jpg', 
    location: 'Dubai Investment Park (DIP)', 
    span: 'col-span-1 row-span-1',
    description: 'Full 3M cast vinyl vehicle wraps engineered with UV-resistant overlaminate for extreme Gulf weather.'
  },
];

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
    label: '18,000 SQFT PRODUCTION',
    sub: 'UV flatbed, HP Latex & CNC in-house',
    span: 'md:col-span-2 md:row-span-1',
    badge: 'ISO Certified',
  },
];

export default function OurWorksPage() {
  const [filter, setFilter] = useState('All');
  const filtered = PROJECTS.filter(p => filter === 'All' || p.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <CustomCursor />
      <Navbar />

      {/* Subheader Banner */}
      <div 
        className="relative pt-40 pb-20 bg-cover bg-center overflow-hidden border-b border-border transition-colors" 
        style={{ backgroundImage: `url(${servicesImg})` }}
      >
        <div className="absolute inset-0 bg-background/90 dark:bg-background/90 backdrop-blur-md transition-colors" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3">
            <Sparkles size={15} />
            <span>Turnkey Visual Fabrication</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-foreground uppercase tracking-tight transition-colors">
            OUR <span className="text-primary">WORKS</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mt-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="text-primary" />
            <span className="text-primary font-semibold">Our Works</span>
          </div>
        </div>
      </div>

      <main className="py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-4 md:px-8">

          {/* Section 1: Featured Signature Projects Bento */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                  Portfolio Highlights
                </span>
                <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-foreground">
                  FEATURED <span className="text-primary">PROJECTS</span>
                </h2>
              </div>
              <p className="text-muted-foreground text-sm max-w-md leading-relaxed md:text-right">
                Explore a curated selection of our high-impact exhibition builds, mall retail signage, and commercial vehicle fleet transformations delivered across Dubai and the UAE.
              </p>
            </div>

            {/* Bento Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[270px] gap-4">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm shadow-md">
                    {cell.badge}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h4 className="font-display text-2xl text-white tracking-wide leading-tight">
                          {cell.label}
                        </h4>
                        <p className="text-xs text-white/80 mt-1">{cell.sub}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-colors flex-shrink-0">
                        <CheckCircle2 size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Filterable Portfolio Gallery */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                  Browse By Category
                </span>
                <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-foreground">
                  PROJECT ARCHIVE
                </h3>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                      filter === f 
                        ? 'bg-primary border-primary text-white shadow-md shadow-primary/25' 
                        : 'border-border text-foreground/75 hover:border-primary hover:text-primary bg-card/60'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 auto-rows-[320px] gap-5">
              <AnimatePresence>
                {filtered.map((proj) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35 }}
                    key={proj.id}
                    className={`relative group overflow-hidden rounded-2xl border border-border bg-card shadow-md ${proj.span}`}
                  >
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Persistent Bottom Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity" />

                    {/* Content on Hover & Default View */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                      <span className="text-pink-300 text-[11px] font-bold tracking-widest uppercase mb-1">
                        {proj.category}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-display tracking-wide text-white mb-1.5 leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-white/70 text-xs mb-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" /> {proj.location}
                      </p>
                      <p className="text-white/85 text-xs line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {proj.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#4d195a] via-[#35103f] to-[#200727] p-8 sm:p-14 border border-primary/50 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs uppercase tracking-widest text-pink-200 font-bold block mb-1">
                  Ready to Start Your Project?
                </span>
                <h3 className="font-display text-3xl sm:text-5xl text-white uppercase">
                  Let's Bring Your Vision To Reality.
                </h3>
                <p className="text-xs sm:text-sm text-pink-100/90 mt-2">
                  Speak directly with our fabrication engineers and estimators in DIP-1 for material samples, custom engineering, and quotation.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-primary font-bold uppercase tracking-wider rounded text-xs sm:text-sm flex items-center gap-2.5 hover:bg-gray-100 transition-all shadow-xl cursor-pointer"
                >
                  <span>Request Proposal</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/971526935456?text=Hi%20Trinity%20Media%2C%20I%20saw%20your%20portfolio%20of%20works%20and%20would%20like%20to%20discuss%20a%20project."
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
      </main>

      <Footer />
    </div>
  );
}
