import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Search, Tag, Clock, ArrowRight, Rss, BookOpen, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

// ─── SEO Head ──────────────────────────────────────────────────────────────────
function BlogSEO() {
  return (
    <>
      <title>Blog & Insights | Trinity Media LLC – Dubai Printing & Fabrication</title>
      <meta
        name="description"
        content="Explore expert articles on exhibition stand design, large format printing, signage, vehicle branding, retail POSM, and visual fabrication trends across Dubai and the UAE."
      />
      <meta
        name="keywords"
        content="trinity media blog, exhibition stand design tips, large format printing Dubai, signage UAE, vehicle branding guide, visual fabrication insights"
      />
      <meta property="og:title" content="Blog & Insights | Trinity Media LLC" />
      <meta
        property="og:description"
        content="Expert guides and industry insights on printing, fabrication, signage, and branding in Dubai and the UAE from Trinity Media LLC."
      />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://www.trinitymediauae.com/blog" />
    </>
  );
}

const CATEGORIES = ['All', 'Exhibition', 'Printing', 'Signage', 'Branding', 'Fabrication', 'Events'];

const POSTS = [
  {
    id: 1,
    slug: 'future-of-exhibition-design-uae',
    category: 'Exhibition',
    title: 'The Future of Exhibition Stand Design in the UAE',
    excerpt: 'As Dubai cements its position as a global trade hub, we explore the innovations redefining exhibition stand design from double-deck modular builds to immersive LED integrations.',
    date: 'January 15, 2025',
    readTime: '5 min read',
    featured: true,
    image: '/images/hero/banners/imag5.jpg',
    tags: ['Exhibition', 'DWTC', 'Design Trends'],
  },
  {
    id: 2,
    slug: 'custom-fabrication-brand-experiences',
    category: 'Fabrication',
    title: 'How Custom Fabrication Elevates Brand Experiences',
    excerpt: 'From acrylic channel letters to CNC-routed display fixtures, bespoke fabrication turns an ordinary brand into an unforgettable experience.',
    date: 'December 10, 2024',
    readTime: '4 min read',
    featured: false,
    image: '/images/hero/banners/image4.jpg',
    tags: ['Fabrication', 'Acrylic', 'CNC'],
  },
  {
    id: 3,
    slug: 'led-signage-trends-dubai',
    category: 'Signage',
    title: "LED Signage Trends Shaping Dubai's Visual Landscape",
    excerpt: 'Illuminated channel letters, halo-lit logos, and programmable LED facades discover what drives the next wave of architectural signage across the UAE.',
    date: 'November 22, 2024',
    readTime: '6 min read',
    featured: false,
    image: '/images/hero/banners/image6.jpg',
    tags: ['LED', 'Signage', 'Architecture'],
  },
  {
    id: 4,
    slug: 'vehicle-fleet-branding-guide',
    category: 'Branding',
    title: 'The Complete Guide to Vehicle & Fleet Branding in UAE',
    excerpt: 'A branded fleet is one of the most cost-effective forms of outdoor advertising. Learn the materials, methods, and mistakes to avoid when wrapping your corporate fleet.',
    date: 'October 18, 2024',
    readTime: '7 min read',
    featured: false,
    image: '/images/hero/banners/image5.jpg',
    tags: ['Vehicle Branding', 'Fleet', 'Outdoor'],
  },
  {
    id: 5,
    slug: 'large-format-printing-substrates',
    category: 'Printing',
    title: 'Choosing the Right Substrate for Large Format Printing',
    excerpt: 'Vinyl, fabric, canvas, aluminium composite - the substrate you choose defines the quality and longevity of your print. Our production team breaks down the options.',
    date: 'September 5, 2024',
    readTime: '5 min read',
    featured: false,
    image: '/images/hero/banners/image7.jpg',
    tags: ['HP Latex', 'UV Flatbed', 'Substrates'],
  },
  {
    id: 6,
    slug: 'retail-posm-mall-branding-strategy',
    category: 'Branding',
    title: 'POSM & Mall Branding: Strategies That Drive Footfall',
    excerpt: 'Point-of-sale materials and in-mall displays directly influence purchase decisions. Explore the strategies that make shoppers stop and engage.',
    date: 'August 20, 2024',
    readTime: '4 min read',
    featured: false,
    image: '/images/hero/banners/image8.jpg',
    tags: ['POSM', 'Retail', 'Mall Branding'],
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featured = POSTS.find((p) => p.featured)!;

  const filtered = POSTS.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const grid = filtered.filter((p) => !p.featured || activeCategory !== 'All' || searchQuery !== '');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative">
      <BlogSEO />
      <CustomCursor />
      <Navbar />

      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-14 md:pt-36 md:pb-16 bg-muted/30 dark:bg-card/40 border-b border-border relative overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-[1360px] mx-auto px-4 md:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                <Rss size={13} />
                <span>Insights & Resources</span>
              </div>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight leading-[0.9] text-foreground mb-4">
                BLOG &amp; <span className="text-primary">INSIGHTS</span>
              </h1>
              <p className="text-foreground/70 text-base sm:text-lg max-w-2xl leading-relaxed">
                Expert articles on exhibition design, large format printing, signage, fabrication,
                and visual branding from Trinity Media's production floor in Dubai.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-8 relative max-w-lg"
            >
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search articles, topics, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl pl-11 pr-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors shadow-sm"
              />
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-border bg-background sticky top-16 z-30 transition-colors">
          <div className="max-w-[1360px] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeCategory === cat
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/25'
                      : 'border-border text-muted-foreground hover:border-primary hover:text-primary bg-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-[1360px] mx-auto px-4 md:px-8 py-16 md:py-20 space-y-20">

          {/* Featured Post */}
          {activeCategory === 'All' && searchQuery === '' && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={14} className="text-primary" />
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Featured Article</span>
              </div>
              <Link href={`/blog/${featured.slug}`}>
                <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all shadow-lg cursor-pointer">
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/60 hidden lg:block" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {featured.category}
                      </span>
                    </div>
                  </div>
                  <div className="bg-card p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Clock size={12} />{featured.readTime}</span>
                      <span>{featured.date}</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-muted border border-border rounded-full text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                          <Tag size={9} />{tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:gap-3 transition-all">
                      Read Full Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Articles Grid */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  {activeCategory === 'All' && searchQuery === '' ? 'More Articles' : 'Articles'}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{grid.length} article{grid.length !== 1 ? 's' : ''}</span>
            </div>

            {grid.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                <Search size={40} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No articles found for "{searchQuery}"</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-4 text-sm text-primary underline cursor-pointer"
                >
                  Clear search
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {grid.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <article className="group h-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5 cursor-pointer">
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-[9px] font-bold uppercase tracking-widest rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <div className="flex flex-col flex-1 p-6">
                          <div className="flex items-center gap-3 mb-3 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                            <span>{post.date}</span>
                          </div>
                          <h3 className="font-display text-xl uppercase tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-muted border border-border rounded-full text-[9px] text-muted-foreground font-semibold uppercase tracking-wider">
                                <Tag size={8} />{tag}
                              </span>
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary group-hover:gap-2.5 transition-all mt-auto">
                            Read More <ArrowRight size={12} />
                          </span>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center border border-primary/30 bg-card"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                <Rss size={13} />
                <span>Stay Updated</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-foreground mb-3">
                Get Expert Insights<br />
                <span className="text-primary">Delivered to You</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8">
                Subscribe to receive the latest articles on printing, fabrication, signage, and branding from Trinity Media's team of specialists.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full sm:flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-xl text-sm transition-all shadow-lg shadow-primary/25 cursor-pointer whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
