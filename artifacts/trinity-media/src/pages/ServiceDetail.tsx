import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'wouter';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { ContactCTA } from '@/components/ContactCTA';
import { getServiceBySlug, SERVICES } from '@/data/services';

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
            href={`${import.meta.env.BASE_URL}#services`}
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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <CustomCursor />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-40 pb-20 md:pt-48 md:pb-24 bg-[#0C0C0C] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-5">
            <h2 className="font-display text-[10rem] md:text-[16rem] leading-none whitespace-nowrap text-white">
              {service.title.split(' ')[0]}
            </h2>
          </div>

          <div className="max-w-[1360px] mx-auto px-6 md:px-8 relative z-10">
            <Link
              href={`${import.meta.env.BASE_URL}#services`}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft size={16} /> All Services
            </Link>

            <div className="max-w-4xl">
              <span className="font-display text-4xl md:text-5xl text-primary block mb-4">{service.num}</span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl md:text-7xl uppercase tracking-tight leading-[0.95] mb-8"
              >
                {service.title}
              </motion.h1>
              <p className="text-secondary text-lg md:text-xl leading-relaxed">{service.short}</p>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1360px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7">
                <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight mb-8">Overview</h2>
                <p className="text-secondary text-base md:text-lg leading-relaxed mb-6">{service.overview}</p>
                <p className="text-secondary text-base md:text-lg leading-relaxed">
                  Talk to our team about your project and we'll scope the right approach, timeline and budget.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="border border-border rounded-lg p-8 md:p-10 bg-[#0C0C0C]">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-primary mb-6">Capabilities</h3>
                  <ul className="space-y-3 mb-10">
                    {service.capabilities.map((item) => (
                      <li key={item} className="text-secondary flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-display text-2xl uppercase tracking-wide text-primary mb-6">Deliverables</h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((item) => (
                      <li key={item} className="text-secondary flex items-center gap-3">
                        <Check size={16} className="text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-20 md:py-24 border-t border-border">
          <div className="max-w-[1360px] mx-auto px-6 md:px-8">
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight mb-12">Other Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`${import.meta.env.BASE_URL}services/${s.slug}`}
                  className="group p-6 rounded-lg border border-border hover:border-primary transition-colors flex flex-col"
                >
                  <span className="font-display text-2xl text-primary mb-3">{s.num}</span>
                  <h3 className="font-display text-xl tracking-wide text-muted-foreground group-hover:text-white transition-colors mb-4 leading-tight">
                    {s.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mt-auto">
                    Know More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
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
