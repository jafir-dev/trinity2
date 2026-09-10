import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'wouter';
import { 
  ArrowRight, ArrowLeft, Check, ChevronLeft, ChevronRight, 
  X, Maximize2, Sparkles, Phone, MessageCircle, ExternalLink 
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
        className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors z-20 cursor-pointer text-white"
        aria-label="Close image viewer"
      >
        <X size={22} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/90 font-mono">
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
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors cursor-pointer z-10 text-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors cursor-pointer z-10 text-white"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </motion.div>
  );
}

// ─── Main Service Detail Page ────────────────────────────────────────────────
export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStartIndex, setLightboxStartIndex] = useState(0);

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
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
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
  const rawGalleryFiles: string[] =
    service.images && service.images.length > 0
      ? service.images
      : service.image
      ? [service.image]
      : [];

  const allImageUrls = rawGalleryFiles.map(resolveImg);
  const heroImageUrl = allImageUrls[0] || fallbackImg;
  const remainingImages = allImageUrls.slice(1);

  const openLightbox = (index: number) => {
    setLightboxStartIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative transition-colors">
      <CustomCursor />
      <Navbar />

      <main>
        {/* Compact Top Header & Breadcrumbs */}
        <section className="pt-32 pb-8 md:pt-36 md:pb-10 bg-background border-b border-border/60">
          <div className="max-w-[1360px] mx-auto px-4 md:px-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-primary">•</span>
              <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
              <span className="text-primary">•</span>
              <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
                {service.title}
              </span>
            </div>

            {/* Title & Quick Summary */}
            <div className="max-w-4xl mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles size={14} />
                <span>Service {service.num}</span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.95] text-foreground mb-4"
              >
                {service.title}
              </motion.h1>
              <p className="text-foreground/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl">
                {service.short}
              </p>
            </div>

            {/* Quick Action Bar */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-primary/25"
              >
                Inquire For This Service
              </a>
              <a
                href="https://wa.me/971526935456"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-card border border-border hover:border-primary text-foreground text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
              >
                <MessageCircle size={16} className="text-green-500" />
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </section>

        {/* ── Single Hero Image (Replaces Slider) ── */}
        <section className="pt-8 pb-12">
          <div className="max-w-[1360px] mx-auto px-4 md:px-8">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl group">
              <div className="relative h-[360px] sm:h-[480px] md:h-[580px] w-full overflow-hidden bg-neutral-900">
                <img
                  src={heroImageUrl}
                  alt={`${service.title} Hero Showcase`}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 cursor-zoom-in"
                  onClick={() => openLightbox(0)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Right Zoom Fullscreen button */}
                <button
                  onClick={() => openLightbox(0)}
                  className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-primary transition-colors cursor-pointer shadow-lg"
                  title="View Fullscreen"
                >
                  <Maximize2 size={18} />
                </button>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
                  <div className="px-4 py-2 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-white font-display text-lg sm:text-xl tracking-wide uppercase shadow-lg">
                    {service.title} • Featured Build
                  </div>
                  <div className="px-3.5 py-1.5 rounded-md bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    Click to enlarge
                  </div>
                </div>
              </div>
            </div>

            {/* ── Overview & Capabilities Content Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-12">
              
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
                    Service Scope & Engineering
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground mb-6">
                    OVERVIEW
                  </h2>
                  <div className="text-foreground/85 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                    {service.overview}
                  </div>
                </div>

                {/* Highlight Callout Box */}
                <div className="p-6 rounded-xl bg-card border border-primary/30 shadow-md">
                  <h3 className="font-display text-xl text-foreground uppercase mb-2">
                    Why Choose Trinity Media For {service.title}?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    With our state-of-the-art 18,000 sq.ft facility at Dubai Investment Park-1, premium materials, and experienced production engineers, we guarantee fast turnaround, strict ISO quality control, and flawless on-site installation.
                  </p>
                </div>
              </div>

              {/* Right Column: Capabilities & Deliverables */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Capabilities Card */}
                <div className="border border-border rounded-2xl p-6 sm:p-8 bg-card shadow-md">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                      Capabilities
                    </h3>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {service.capabilities.map((item) => (
                      <li key={item} className="text-foreground/80 text-xs sm:text-sm flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Card */}
                <div className="border border-border rounded-2xl p-6 sm:p-8 bg-card shadow-md">
                  <div className="flex items-center gap-2 mb-6">
                    <Check size={20} className="text-primary" />
                    <h3 className="font-display text-2xl uppercase tracking-wide text-foreground">
                      Deliverables
                    </h3>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="text-foreground/80 text-xs sm:text-sm flex items-start gap-2.5">
                        <Check size={15} className="text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Contact Card */}
                <div className="p-6 rounded-2xl bg-muted/40 border border-border text-center shadow-sm">
                  <h4 className="font-display text-lg text-foreground uppercase mb-2">Need a Custom Quote?</h4>
                  <p className="text-xs text-muted-foreground mb-4">Our project managers are ready to assist with sizing, materials and budget estimates.</p>
                  <a
                    href="tel:+971526935456"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <Phone size={14} /> Call +971 52 693 5456
                  </a>
                </div>

              </div>

            </div>

            {/* ── Remaining Project Images Cards Grid (Below Description) ── */}
            {remainingImages.length > 0 && (
              <div className="mt-20 pt-12 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
                      Project Portfolio & Gallery
                    </span>
                    <h3 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
                      {service.title} Gallery
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-md">
                    Explore high-resolution fabrication photos from our Dubai projects. Click any card to inspect full-screen detail.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingImages.map((imgUrl, index) => {
                    const fullIndex = index + 1; // since hero is index 0
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index % 3) * 0.08 }}
                        className="group relative rounded-xl overflow-hidden border border-border bg-card shadow-md hover:border-primary/60 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
                        onClick={() => openLightbox(fullIndex)}
                      >
                        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                          <img
                            src={imgUrl}
                            alt={`${service.title} project view ${fullIndex}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/10 transition-colors" />
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openLightbox(fullIndex);
                            }}
                            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-primary transition-all duration-200"
                            title="View Fullscreen"
                          >
                            <Maximize2 size={15} />
                          </button>

                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-pink-200 block">
                              Project {fullIndex} of {allImageUrls.length}
                            </span>
                            <span className="font-display text-lg tracking-wide uppercase block">
                              {service.title}
                            </span>
                          </div>
                        </div>

                        <div className="p-3.5 flex items-center justify-center border-t border-border/50 bg-card group-hover:bg-primary/5 transition-colors">
                          <span className="text-xs font-bold text-primary inline-flex items-center justify-center gap-1.5 group-hover:translate-x-0.5 transition-transform uppercase tracking-wider">
                            Full View <ArrowRight size={13} />
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Other Services Grid */}
        <section className="py-20 bg-muted/30 border-t border-border">
          <div className="max-w-[1360px] mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
                  Explore More Solutions
                </span>
                <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground">
                  OTHER SERVICES
                </h2>
              </div>
              <Link
                href="/#services"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
              >
                View All 19 Services <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 flex flex-col shadow-sm"
                >
                  <span className="font-display text-2xl text-primary mb-2">{s.num}</span>
                  <h3 className="font-display text-xl tracking-wide text-foreground group-hover:text-primary transition-colors mb-3 leading-tight">
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox 
            images={allImageUrls} 
            startIndex={lightboxStartIndex} 
            onClose={() => setLightboxOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
