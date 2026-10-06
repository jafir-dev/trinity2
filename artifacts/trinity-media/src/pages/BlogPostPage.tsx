import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'wouter';
import { ArrowLeft, Clock, Tag, Calendar, Share2, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

const POSTS = [
  {
    id: 1,
    slug: 'future-of-exhibition-design-uae',
    category: 'Exhibition',
    title: 'The Future of Exhibition Stand Design in the UAE',
    excerpt: 'As Dubai cements its position as a global trade hub, we explore the innovations redefining exhibition stand design from double-deck modular builds to immersive LED integrations.',
    date: 'January 15, 2025',
    readTime: '5 min read',
    image: '/images/hero/banners/imag5.jpg',
    tags: ['Exhibition', 'DWTC', 'Design Trends'],
    content: `Dubai has long been the crossroads of global commerce, and exhibition stands are the physical embodiment of brand identity at trade shows. As GITEX, The Big 5, and Arab Health continue to draw thousands of international brands to the UAE, the demand for cutting-edge, bespoke exhibition stands has never been higher.

**Double-Deck Modular Systems**

One of the most significant trends reshaping exhibition stand design is the rise of double-deck modular structures. These two-level builds maximise limited floor space while creating private meeting rooms, product demo zones, and elevated brand visibility. Trinity Media has deployed over 120 double-deck structures across DWTC and ADNEC in the past three years alone.

**Immersive LED Integration**

Gone are the days of static banner walls. Today's leading exhibition brands demand curved LED walls, transparent LED panels, and floor-to-ceiling digital canvases that transform booth spaces into immersive brand universes. Our 18,000 sqft production facility enables us to prototype, fabricate, and test LED integrations in-house before deployment.

**Sustainability & Reusability**

The UAE's commitment to sustainability is driving demand for reusable, modular exhibition components. Aluminium extrusion systems, powder-coated steel frames, and eco-friendly fabric graphics can now be reconfigured for multiple events — reducing both cost and environmental footprint.

**What This Means for Brands**

If you are planning your next exhibition presence in the UAE, start planning at least 8–12 weeks in advance. Involve your stand builder in the concept phase, not just the execution phase. The brands that stand out at DWTC are the ones that treat their exhibition stand as a strategic marketing investment, not just a temporary structure.

Trinity Media provides end-to-end exhibition solutions from concept and 3D rendering to fabrication, logistics, and on-site installation. Contact our team to discuss your next exhibition stand project.`,
  },
  {
    id: 2,
    slug: 'custom-fabrication-brand-experiences',
    category: 'Fabrication',
    title: 'How Custom Fabrication Elevates Brand Experiences',
    excerpt: 'From acrylic channel letters to CNC-routed display fixtures, bespoke fabrication turns an ordinary brand into an unforgettable experience.',
    date: 'December 10, 2024',
    readTime: '4 min read',
    image: '/images/hero/banners/image4.jpg',
    tags: ['Fabrication', 'Acrylic', 'CNC'],
    content: `In a saturated marketplace, the difference between a brand that is noticed and one that is remembered often comes down to fabrication quality. Custom fabrication is the bridge between a designer's vision and a tangible, three-dimensional brand experience.

**Acrylic Fabrication**

Acrylic remains the gold standard for premium retail and exhibition displays. Its optical clarity, UV resistance, and versatility make it ideal for illuminated logos, product pedestals, and bespoke display cases. Trinity Media's CNC routing and laser cutting capabilities allow us to achieve tolerances within 0.1mm — critical for high-end retail installations.

**CNC Routing & 3D Lettering**

Channel letters, dimensional logos, and wayfinding signage are among the most impactful brand touchpoints in any physical environment. Our 4-axis CNC router handles substrates from 3mm acrylic to 25mm MDF and aluminium composite panels, enabling complex curves and interlocking components.

**Corian & Solid Surface**

For luxury retail and hospitality environments, Corian and solid surface materials deliver a seamless, premium aesthetic that mass-produced alternatives cannot replicate. Trinity Media's skilled fabricators hand-finish every joint to invisible tolerances.

**The Fabrication Process**

Every custom fabrication project at Trinity Media follows a rigorous process: brief and concept, material specification, 3D CAD modelling, prototype approval, production, quality control, and installation. This ensures zero surprises on delivery day.

Whether you need a bespoke retail display, an exhibition centrepiece, or architectural signage, Trinity Media's fabrication team is ready to bring your vision to life.`,
  },
  {
    id: 3,
    slug: 'led-signage-trends-dubai',
    category: 'Signage',
    title: "LED Signage Trends Shaping Dubai's Visual Landscape",
    excerpt: 'Illuminated channel letters, halo-lit logos, and programmable LED facades discover what drives the next wave of architectural signage across the UAE.',
    date: 'November 22, 2024',
    readTime: '6 min read',
    image: '/images/hero/banners/image6.jpg',
    tags: ['LED', 'Signage', 'Architecture'],
    content: `Dubai's skyline is defined as much by its signage as its architecture. From Sheikh Zayed Road's glittering corporate towers to the boutique-lined alleyways of Al Quoz, illuminated signage is the language brands use to communicate with the city after dark.

**Channel Letter Evolution**

Traditional front-lit channel letters have given way to halo-lit (reverse-lit) and hybrid illuminated letters that create a premium glow effect on the mounting surface. This technique is particularly popular among luxury retail and hospitality brands seeking understated elegance over bold visibility.

**Programmable RGB LED Systems**

Dynamic, colour-changing LED systems controlled via smartphone apps or cloud-based content management systems are transforming how brands communicate seasonally and promotionally. Trinity Media supplies and installs RGB LED systems compatible with DMX and Artnet control protocols.

**Transparent LED Film**

One of the most exciting innovations in architectural signage is transparent LED film, which can be applied directly to glass facades, creating a stunning display without obstructing views or natural light. We have installed transparent LED film across retail, hospitality, and corporate environments in Dubai.

**Solar-Powered Signage**

Sustainability is driving demand for solar-integrated signage, particularly for outdoor billboards and wayfinding systems in masterplan developments. Trinity Media partners with solar technology providers to deliver off-grid signage solutions.

**Regulatory Considerations**

All signage in Dubai requires approval from the relevant municipality or master developer. Trinity Media manages the full permitting process, from technical drawings to NOC applications, ensuring seamless project delivery.`,
  },
  {
    id: 4,
    slug: 'vehicle-fleet-branding-guide',
    category: 'Branding',
    title: 'The Complete Guide to Vehicle & Fleet Branding in UAE',
    excerpt: 'A branded fleet is one of the most cost-effective forms of outdoor advertising. Learn the materials, methods, and mistakes to avoid when wrapping your corporate fleet.',
    date: 'October 18, 2024',
    readTime: '7 min read',
    image: '/images/hero/banners/image5.jpg',
    tags: ['Vehicle Branding', 'Fleet', 'Outdoor'],
    content: `A single branded vehicle travelling through Dubai generates thousands of impressions daily. Scale that to a fleet of 50 vehicles and you have one of the most cost-effective outdoor advertising channels available to any UAE business.

**Cast vs Calendered Vinyl**

The single most important material decision in vehicle branding is the choice between cast and calendered vinyl. Cast vinyl (such as 3M 1080 or Avery Dennison Supreme Wrapping Film) conforms to complex curves, resists shrinkage, and lasts 7–10 years. Calendered vinyl is less expensive but prone to shrinkage at panel edges and suited only for flat surfaces. For full fleet wraps, always specify cast vinyl.

**Full Wrap vs Partial Wrap**

Full vehicle wraps deliver maximum visual impact and completely transform the vehicle's appearance. Partial wraps — typically covering the doors, hood, or rear — are a cost-effective alternative that still achieves strong brand recognition. Trinity Media has wrapped everything from compact cars to 40-foot articulated trucks and bus fleets.

**Colour Change Wraps**

Corporate fleets increasingly use colour change wraps in matte, satin, gloss, and chrome finishes to create a unified, premium brand identity. Unlike paint, vinyl wraps are removable and do not affect the vehicle's resale value.

**Installation Quality**

A poor installation will bubble, peel, and look unprofessional within months. Trinity Media's certified wrap installers work in a climate-controlled, dust-free installation bay to ensure a flawless finish on every vehicle. Our 5-year installation warranty covers any peeling or lifting under normal operating conditions.

**RTA Compliance**

All vehicle graphics in Dubai must comply with RTA regulations regarding reflective materials, window coverage, and branding placement. Trinity Media handles all RTA compliance documentation as part of every fleet branding project.`,
  },
  {
    id: 5,
    slug: 'large-format-printing-substrates',
    category: 'Printing',
    title: 'Choosing the Right Substrate for Large Format Printing',
    excerpt: 'Vinyl, fabric, canvas, aluminium composite - the substrate you choose defines the quality and longevity of your print.',
    date: 'September 5, 2024',
    readTime: '5 min read',
    image: '/images/hero/banners/image7.jpg',
    tags: ['HP Latex', 'UV Flatbed', 'Substrates'],
    content: `The substrate you choose for your large format print is just as important as the design itself. The wrong material can mean a beautiful print that fades in weeks, wrinkles in humidity, or fails to adhere to the intended surface.

**Self-Adhesive Vinyl**

The workhorse of large format printing, self-adhesive vinyl is available in gloss, matte, satin, and specialist finishes including micro-perforated (for window graphics) and reflective. For indoor applications, a 3-year outdoor vinyl is typically sufficient. For outdoor applications in Dubai's climate, specify 7-year cast vinyl with UV lamination.

**Fabric & Textile Printing**

Dye-sublimation fabric printing produces vibrant, lightweight graphics ideal for exhibition backdrops, retail displays, and event branding. Fabric graphics are crease-resistant, washable, and packable — making them ideal for brands that exhibit regularly. Trinity Media prints on polyester fabric with our Swiss-made dye-sublimation press at up to 3.2m width.

**Rigid Substrates**

UV flatbed printing directly onto rigid substrates — aluminium composite panels, PVC foam board, acrylic, wood, and glass — eliminates the need for mounting and produces a premium, scratch-resistant finish. Our 3.2m x 2m UV flatbed printer handles substrates up to 50mm thick.

**Canvas**

Fine art canvas printing demands pigment-based inks with a colour gamut that matches or exceeds sRGB. Trinity Media's HP Latex 800W printer uses water-based latex inks that are odourless, scratch-resistant, and rated for 100+ years of indoor lightfastness on canvas.

**Choosing the Right Substrate**

The right substrate depends on application (indoor/outdoor), duration (temporary/permanent), installation method (hanging/framing/mounting), and budget. Trinity Media's production consultants will specify the optimal substrate for every project. Contact us for a material sample pack.`,
  },
  {
    id: 6,
    slug: 'retail-posm-mall-branding-strategy',
    category: 'Branding',
    title: 'POSM & Mall Branding: Strategies That Drive Footfall',
    excerpt: 'Point-of-sale materials and in-mall displays directly influence purchase decisions. Explore the strategies that make shoppers stop and engage.',
    date: 'August 20, 2024',
    readTime: '4 min read',
    image: '/images/hero/banners/image8.jpg',
    tags: ['POSM', 'Retail', 'Mall Branding'],
    content: `In the age of e-commerce, physical retail must work harder than ever to attract, engage, and convert shoppers. Point-of-sale materials (POSM) and in-mall branding are among the most powerful tools available to retail and FMCG brands in the UAE.

**What is POSM?**

POSM encompasses any branded display, fixture, or material placed at or near the point of purchase. This includes shelf wobblers, floor stands, counter displays, header boards, shelf strips, and interactive kiosks. Effective POSM stops shoppers in their tracks and communicates product benefits at the moment of purchase decision.

**In-Mall Branding Formats**

UAE malls offer some of the most premium brand exposure environments in the world. Common in-mall branding formats include lightbox displays, floor graphics, column wraps, escalator panels, and bespoke branded installations. Trinity Media has executed in-mall campaigns for international brands across Mall of the Emirates, Dubai Mall, and City Centre properties.

**The Power of 3D POSM**

Dimensional, interactive POSM consistently outperforms flat printed alternatives in terms of dwell time and conversion. A 3D branded display that invites shoppers to touch, interact, or photograph generates social media amplification that extends its reach far beyond the mall floor.

**Seasonal Campaign Planning**

Ramadan, Eid, National Day, and DSF are peak branding moments in the UAE retail calendar. Trinity Media works with brands to plan, produce, and install seasonal POSM campaigns with lead times as short as 72 hours for repeat formats.

**Trinity Media POSM Capabilities**

Our in-house fabrication capabilities cover every POSM format: CNC-routed acrylic displays, printed cardboard standees, fabric tension displays, illuminated lightboxes, and custom-engineered interactive kiosks. All produced and quality-controlled in our DIP-1 facility.`,
  },
];

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
        <title>Post Not Found | Trinity Media LLC</title>
        <CustomCursor />
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-32 text-center px-4">
          <div>
            <span className="font-display text-7xl text-primary block mb-4">404</span>
            <h1 className="font-display text-4xl uppercase tracking-tight mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">This article does not exist or may have been removed.</p>
            <Link href="/blog">
              <a className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold uppercase tracking-wider rounded-xl text-sm transition-all shadow-lg shadow-primary/25">
                <ArrowLeft size={16} /> Back to Blog
              </a>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const others = related.length < 2 ? [...related, ...POSTS.filter((p) => p.slug !== slug && p.category !== post.category)].slice(0, 2) : related;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <title>{post.title} | Trinity Media LLC Blog</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={`${post.title} | Trinity Media LLC`} />
      <meta property="og:description" content={post.excerpt} />
      <meta property="og:image" content={post.image} />
      <meta property="og:type" content="article" />
      <link rel="canonical" href={`https://www.trinitymediauae.com/blog/${post.slug}`} />
      <CustomCursor />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-0 relative overflow-hidden">
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
          </div>
        </section>

        {/* Content */}
        <section className="pb-20">
          <div className="max-w-[900px] mx-auto px-4 md:px-8 -mt-32 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-6">
                <Link href="/blog"><a className="hover:text-primary transition-colors">Blog</a></Link>
                <span className="text-primary">•</span>
                <span className="text-primary font-semibold">{post.category}</span>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-5 text-xs text-muted-foreground">
                <span className="px-3 py-1 bg-primary text-white font-bold uppercase tracking-widest rounded-full">{post.category}</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-foreground leading-[0.95] mb-6">
                {post.title}
              </h1>

              {/* Excerpt lead */}
              <p className="text-foreground/80 text-lg sm:text-xl leading-relaxed border-l-4 border-primary pl-5 mb-10 italic">
                {post.excerpt}
              </p>

              {/* Body */}
              <div className="prose prose-lg max-w-none text-foreground/85 leading-relaxed space-y-6">
                {post.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('**') && para.endsWith('**')) {
                    return (
                      <h2 key={i} className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-foreground mt-10 mb-3">
                        {para.replace(/\*\*/g, '')}
                      </h2>
                    );
                  }
                  // Inline bold
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={i} className="text-foreground/80 text-base sm:text-lg leading-relaxed">
                      {parts.map((part, j) =>
                        part.startsWith('**') ? (
                          <strong key={j} className="text-foreground font-semibold">
                            {part.replace(/\*\*/g, '')}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold mr-2 flex items-center gap-1"><Tag size={12} /> Tags:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-muted border border-border rounded-full text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share / CTA */}
              <div className="mt-8 p-6 rounded-2xl bg-card border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-display text-xl text-foreground uppercase tracking-tight">Need Help With Your Project?</p>
                  <p className="text-sm text-muted-foreground">Our team is ready to bring your vision to life.</p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <a
                    href="https://wa.me/971526935456"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-xl text-xs transition-all shadow-lg shadow-primary/25"
                  >
                    <MessageCircle size={14} /> WhatsApp Us
                  </a>
                  <button
                    onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-border hover:border-primary text-foreground hover:text-primary font-bold uppercase tracking-wider rounded-xl text-xs transition-all"
                  >
                    <Share2 size={14} /> Share
                  </button>
                </div>
              </div>

              {/* Back link */}
              <div className="mt-8">
                <Link href="/blog">
                  <a className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={14} /> Back to All Articles
                  </a>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Articles */}
        {others.length > 0 && (
          <section className="py-16 border-t border-border bg-muted/20">
            <div className="max-w-[1360px] mx-auto px-4 md:px-8">
              <div className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Continue Reading</div>
              <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground mb-10">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {others.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`}>
                    <a className="group flex gap-5 bg-card border border-border hover:border-primary/40 rounded-2xl overflow-hidden transition-all shadow-sm cursor-pointer">
                      <div className="w-40 h-32 flex-shrink-0 overflow-hidden">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center py-4 pr-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{p.category}</span>
                        <h3 className="font-display text-base uppercase tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight mb-2">{p.title}</h3>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock size={10} />{p.readTime}</span>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
