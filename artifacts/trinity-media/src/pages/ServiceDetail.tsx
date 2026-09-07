import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'wouter';
import { 
  ArrowRight, ArrowLeft, Check, ChevronLeft, ChevronRight, 
  X, Maximize2, Sparkles, Phone, MessageCircle 
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { ContactCTA } from '@/components/ContactCTA';
import { getServiceBySlug, SERVICES } from '@/data/services';

// ─── Image Resolver ──────────────────────────────────────────────────────────
const imageMap: Record<string, string> = {
  'exhibition_1.jpg': new URL('@assets/generated_images/exhibition_1.jpg', import.meta.url).href,
  'exhibition_2.jpg': new URL('@assets/generated_images/exhibition_2.jpg', import.meta.url).href,
  'exhibition_3.jpg': new URL('@assets/generated_images/exhibition_3.jpg', import.meta.url).href,
  'exhibition_4.jpg': new URL('@assets/generated_images/exhibition_4.jpg', import.meta.url).href,
  'event_branding_1.jpg': new URL('@assets/generated_images/event_branding_1.jpg', import.meta.url).href,
  'event_branding_2.jpg': new URL('@assets/generated_images/event_branding_2.jpg', import.meta.url).href,
  'event_branding_3.jpg': new URL('@assets/generated_images/event_branding_3.jpg', import.meta.url).href,
  'event_branding_4.jpg': new URL('@assets/generated_images/event_branding_4.jpg', import.meta.url).href,
  'event_branding_5.jpg': new URL('@assets/generated_images/event_branding_5.jpg', import.meta.url).href,
  'event_branding_6.jpg': new URL('@assets/generated_images/event_branding_6.jpg', import.meta.url).href,
  'event_branding_7.jpg': new URL('@assets/generated_images/event_branding_7.jpg', import.meta.url).href,
  'event_branding_8.jpg': new URL('@assets/generated_images/event_branding_8.jpg', import.meta.url).href,
  'event_branding_9.jpg': new URL('@assets/generated_images/event_branding_9.jpg', import.meta.url).href,
  'kiosk_1.jpg': new URL('@assets/generated_images/kiosk_1.jpg', import.meta.url).href,
  'kiosk_2.jpg': new URL('@assets/generated_images/kiosk_2.jpg', import.meta.url).href,
  'service_retail_display.jpg': new URL('@assets/generated_images/service_retail_display.jpg', import.meta.url).href,
  'service_interior_fitout.jpg': new URL('@assets/generated_images/service_interior_fitout.jpg', import.meta.url).href,
  'service_portable_display.jpg': new URL('@assets/generated_images/service_portable_display.jpg', import.meta.url).href,
  'service_signage.jpg': new URL('@assets/generated_images/service_signage.jpg', import.meta.url).href,
  'service_led_signage.jpg': new URL('@assets/generated_images/service_led_signage.jpg', import.meta.url).href,
  'service_vehicle_branding.jpg': new URL('@assets/generated_images/service_vehicle_branding.jpg', import.meta.url).href,
};
const fallbackImg = new URL('@assets/generated_images/services.jpg', import.meta.url).href;

function resolveImg(filename?: string): string {
  if (!filename) return fallbackImg;
  if (filename.startsWith('/') || filename.startsWith('http')) return filename;
  return imageMap[filename] ?? fallbackImg;
}


// ─── Fullscreen Lightbox ─────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors z-20 cursor-pointer"
        aria-label="Close image viewer"
      >
        <X size={22} className="text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/80 font-mono">
        {idx + 1} / {images.length}
      </div>

      {/* Active Lightbox Image */}
      <motion.img
        key={idx}
        src={images[idx]}
        alt={`Preview ${idx + 1}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Prev / Next Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </>
      )}
    </motion.div>
  );
}

// ─── Hero Visual Showcase Component ──────────────────────────────────────────
function ServiceHeroShowcase({ 
  filenames, 
  title 
}: { 
  filenames: string[]; 
  title: string; 
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const urls = filenames.map(resolveImg);

  if (urls.length === 0) return null;

  const prev = () => setActiveIdx((i) => (i - 1 + urls.length) % urls.length);
  const next = () => setActiveIdx((i) => (i + 1) % urls.length);

  return (
    <>
      <div className="w-full mb-12">
        {/* Main Showcase Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-[#0c0c0c] shadow-2xl group">
          <div className="relative h-[360px] sm:h-[480px] md:h-[540px] w-full overflow-hidden flex items-center justify-center bg-black">
            <motion.img
              key={activeIdx}
              src={urls[activeIdx]}
              alt={`${title} showcase ${activeIdx + 1}`}
              initial={{ opacity: 0.7, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Dark Gradient Overlay for atmospheric depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top Right Zoom Button */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
              title="Click to view full screen"
            >
              <Maximize2 size={16} />
            </button>

            {/* Bottom Caption & Counter */}
            <div className="absolute bottom-4 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
              <div className="text-xs uppercase tracking-widest text-white/80 font-bold bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/10">
                {title} • Portfolio Preview
              </div>
              {urls.length > 1 && (
                <div className="text-xs text-white/90 font-mono bg-primary/80 backdrop-blur-md px-3 py-1.5 rounded-md font-bold shadow-lg">
                  {activeIdx + 1} of {urls.length}
                </div>
              )}
            </div>

            {/* Arrows for multi-image showcase */}
            {urls.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all cursor-pointer shadow-xl opacity-90 hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all cursor-pointer shadow-xl opacity-90 hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail Strip (only for multi-image) */}
        {urls.length > 1 && (
          <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin">
            {urls.map((thumbUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`relative h-20 w-28 sm:h-24 sm:w-36 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer ${
                  activeIdx === idx 
                    ? 'border-primary ring-2 ring-primary/40 scale-102 shadow-lg shadow-primary/20' 
                    : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                }`}
              >
                <img 
                  src={thumbUrl} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                />
                {activeIdx === idx && (
                  <div className="absolute inset-0 bg-primary/20 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox 
            images={urls} 
            startIndex={activeIdx} 
            onClose={() => setLightboxOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Main Service Detail Page ────────────────────────────────────────────────
export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <CustomCursor />
        <Navbar />
        <main className="max-w-[1360px] mx-auto px-6 md:px-8 py-40 text-center">
          <span className="font-display text-7xl md:text-8xl text-primary block mb-4">404</span>
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-6">
            Service Not Found
          </h1>
          <p className="text-secondary mb-10 max-w-md mx-auto">
            We couldn't find the service you're looking for.
          </p>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold uppercase tracking-wider text-primary border border-primary hover:bg-primary hover:text-white transition-all"
          >
            <ArrowLeft size={16} /> Back to all services
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  // Gallery files: multi-image array or fallback to single image
  const galleryFiles: string[] =
    service.images && service.images.length > 0
      ? service.images
      : service.image
      ? [service.image]
      : [];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <CustomCursor />
      <Navbar />

      <main>
        {/* Compact Hero Section */}
        <section className="pt-32 pb-8 md:pt-36 md:pb-12 bg-gradient-to-b from-[#100a14] via-[#090909] to-background relative overflow-hidden border-b border-border/60">
          {/* Subtle Background Watermark */}
          <div className="absolute top-0 right-0 overflow-hidden flex justify-end pointer-events-none opacity-5 -z-0">
            <h2 className="font-display text-[12rem] md:text-[18rem] leading-none whitespace-nowrap text-white">
              {service.num}
            </h2>
          </div>

          <div className="max-w-[1360px] mx-auto px-4 md:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-primary">•</span>
              <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
              <span className="text-primary">•</span>
              <span className="text-pink-300 font-semibold truncate max-w-[200px] sm:max-w-none">
                {service.title}
              </span>
            </div>

            {/* Title & Header */}
            <div className="max-w-4xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/15 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles size={14} />
                <span>Service {service.num}</span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.95] text-white mb-6"
              >
                {service.title}
              </motion.h1>
              <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
                {service.short}
              </p>
            </div>

            {/* Quick Action Bar */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-primary/30"
              >
                Inquire For This Service
              </a>
              <a
                href="https://wa.me/971526935456"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#151515] border border-border hover:border-primary text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200"
              >
                <MessageCircle size={16} className="text-green-400" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Visual Showcase + Overview & Capabilities Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1360px] mx-auto px-4 md:px-8">
            
            {/* ── Visual Showcase Banner / Gallery ── */}
            {galleryFiles.length > 0 && (
              <ServiceHeroShowcase filenames={galleryFiles} title={service.title} />
            )}

            {/* ── Content Grid: Overview & Capabilities ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-6">
              
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                    Service Scope & Delivery
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-white mb-6">
                    OVERVIEW
                  </h2>
                  <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                    {service.overview}
                  </div>
                </div>

                {/* Highlight Callout Box */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#180e1c] to-[#0f0f0f] border border-primary/30 shadow-xl">
                  <h3 className="font-display text-xl text-white uppercase mb-2">
                    Why Choose Trinity Media For {service.title}?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    With our state-of-the-art 18,000 sq.ft press at Dubai Investment Park-1, premium materials, and experienced technical teams, we guarantee fast turnaround, strict ISO quality control, and flawless execution.
                  </p>
                </div>
              </div>

              {/* Right Column: Capabilities & Deliverables */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Capabilities Card */}
                <div className="border border-border/80 rounded-2xl p-6 sm:p-8 bg-[#0c0c0c] shadow-xl">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                      Capabilities
                    </h3>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {service.capabilities.map((item) => (
                      <li key={item} className="text-gray-300 text-xs sm:text-sm flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Card */}
                <div className="border border-border/80 rounded-2xl p-6 sm:p-8 bg-[#0c0c0c] shadow-xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Check size={20} className="text-primary" />
                    <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                      Deliverables
                    </h3>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="text-gray-300 text-xs sm:text-sm flex items-start gap-2.5">
                        <Check size={15} className="text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Contact Card */}
                <div className="p-6 rounded-2xl bg-[#111111] border border-border/80 text-center">
                  <h4 className="font-display text-lg text-white uppercase mb-2">Need a Custom Quote?</h4>
                  <p className="text-xs text-muted-foreground mb-4">Our project managers are ready to assist with sizing, materials and budget estimates.</p>
                  <a
                    href="tel:+971526935456"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
                  >
                    <Phone size={14} /> Call +971 52 693 5456
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Other Services Grid */}
        <section className="py-20 bg-[#080808] border-t border-border/80">
          <div className="max-w-[1360px] mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
                  Explore More Solutions
                </span>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-white">
                  OTHER SERVICES
                </h2>
              </div>
              <Link
                href="/#services"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-white transition-colors"
              >
                View All 19 Services <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group p-6 rounded-xl border border-border/80 bg-[#0e0e0e] hover:border-primary/50 transition-all duration-300 flex flex-col shadow-lg"
                >
                  <span className="font-display text-2xl text-primary mb-2">{s.num}</span>
                  <h3 className="font-display text-xl tracking-wide text-gray-200 group-hover:text-white transition-colors mb-3 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed flex-1">
                    {s.short}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mt-auto">
                    Know More <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
