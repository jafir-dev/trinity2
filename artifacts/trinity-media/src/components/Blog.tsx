import { motion } from 'framer-motion';
import blogImg from '@assets/generated_images/blog.jpg';

const ARTICLES = [
  {
    category: 'BRANDING',
    title: 'The Future of Exhibition Design in the UAE',
    date: 'Jan 2025'
  },
  {
    category: 'FABRICATION',
    title: 'How Custom Fabrication Elevates Brand Experiences',
    date: 'Dec 2024'
  },
  {
    category: 'SIGNAGE',
    title: 'LED Signage Trends Shaping Dubai\'s Visual Landscape',
    date: 'Nov 2024'
  }
];

export function Blog() {
  return (
    <section id="insights" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <h2 className="font-display text-5xl md:text-6xl text-white uppercase tracking-tight">INSIGHTS</h2>
          <button className="self-start md:self-auto px-6 py-2 border border-border text-white font-bold uppercase tracking-wider rounded text-sm hover:border-primary hover:text-primary transition-colors">
            View All Articles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative h-64 md:h-80 overflow-hidden mb-6 rounded">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                <img 
                  src={blogImg} 
                  alt={article.title} 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <span className="text-primary text-xs font-bold tracking-widest uppercase">{article.category}</span>
                <span className="text-muted-foreground text-xs tracking-widest uppercase">{article.date}</span>
              </div>
              
              <h3 className="text-2xl font-display tracking-wide text-white mb-4 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              
              <div className="mt-auto">
                <span className="uppercase tracking-wider text-xs font-bold text-muted-foreground border-b border-muted-foreground group-hover:border-primary group-hover:text-white pb-1 transition-all">
                  Read More →
                </span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
