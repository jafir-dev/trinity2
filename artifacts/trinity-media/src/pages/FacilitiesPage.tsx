import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CustomCursor } from '../components/CustomCursor';
import { Link } from 'wouter';
import { 
  ChevronRight, Cpu, Layers, ShieldCheck, 
  Sparkles, CheckCircle2, ArrowRight, Printer,
  Factory, Box, HardHat 
} from 'lucide-react';
import manufacturingImg from '@assets/generated_images/manufacturing.jpg';
import aboutImg from '@assets/generated_images/about.jpg';
import servicesImg from '@assets/generated_images/services.jpg';

const EQUIPMENT = [
  {
    category: "UV Flatbed & Hybrid Printers",
    desc: "Industrial grade flatbeds capable of direct-to-substrate printing on acrylic, wood, glass, metal, stone, leather, and irregular materials up to 100mm thickness with vibrant white ink and spot varnish effects.",
    specs: ["High-speed Ricoh Gen6 printheads", "Dual UV-LED curing lamps", "Max print width: 3.2m seamless"]
  },
  {
    category: "HP Latex & Eco-Solvent Roll-to-Roll",
    desc: "Odorless, UL ECOLOGO and GREENGUARD Gold certified latex inks engineered for indoor healthcare, hotel wallpapers, retail window graphics, and vehicle fleet wraps with instant drying.",
    specs: ["True 1200 DPI resolution", "Scratch-resistant polymer inks", "Wide spool 3.2m & 1.6m lineup"]
  },
  {
    category: "CNC Routing & Laser Profiling",
    desc: "Heavy-duty 3-axis CNC router tables and high-precision fiber laser cutting machines for wood fabrication, acrylic letters, metal fascias, display fixtures, and custom exhibition structures.",
    specs: ["Automatic tool changers (ATC)", "0.05mm precision cutting", "Large 4m x 2m vacuum bed"]
  },
  {
    category: "Finishing, Welding & Fabrication",
    desc: "Full in-house carpentry, aluminum welding, acrylic thermoforming, hot-air banner seamers, automated eyelet machines, and laminators ensuring structural stability and longevity.",
    specs: ["Automatic roll laminators", "Structural metal welding", "Dust-controlled spray booth"]
  }
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <CustomCursor />
      <Navbar />

      {/* Subheader */}
      <div className="relative pt-40 pb-20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${manufacturingImg})` }}>
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-tight">
            OUR <span className="text-primary">FACILITIES</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-300 uppercase tracking-widest mt-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="text-primary" />
            <span className="text-pink-300 font-semibold">Our Facilities</span>
          </div>
        </div>
      </div>

      <main className="py-20 md:py-28 max-w-[1360px] mx-auto px-4 md:px-8">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
              <Sparkles size={16} />
              <span>DIP-1 Manufacturing Powerhouse</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-white uppercase mb-6">
              18,000 SQFT OF ADVANCED PRINTING & FABRICATION
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Delivering the best printing solutions in and around Dubai, Trinity Media operates a modern manufacturing facility in <strong className="text-white">Warehouse No. 4, Plot 194-0, Dubai Investment Park 1</strong>.
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-8">
              We provide flex printing services, digital flex design, picture printing, fabric printing, canvas printing, roll up banners, car stickers, vehicle printing, digital textile printing, glass printing, material printing, car branding stickers, vinyl printing, vehicle branding, canvas digital printing, large scale vinyl cutting, banner printing, pull up stand banners, and custom POSM displays.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-7 py-3 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded transition-all shadow-xl shadow-primary/30 cursor-pointer"
              >
                Schedule Factory Visit
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-border h-64 sm:h-72">
              <img src={aboutImg} alt="Trinity Workshop" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden border border-border h-64 sm:h-72 mt-6">
              <img src={servicesImg} alt="Printing Press" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Machinery Specs Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Cutting-Edge Infrastructure</span>
            <h3 className="font-display text-3xl sm:text-5xl text-white uppercase mt-1">
              PRODUCTION CAPABILITIES & MACHINERY
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EQUIPMENT.map((item, idx) => (
              <div key={idx} className="p-8 bg-[#111111] border border-border/80 rounded-2xl flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 text-pink-300 flex items-center justify-center">
                      <Cpu size={22} />
                    </div>
                    <h4 className="font-display text-2xl text-white uppercase">{item.category}</h4>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6">{item.desc}</p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2">
                  {item.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-pink-300">
                      <CheckCircle2 size={13} className="shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
