import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Home, ArrowRight, Phone, BookOpen, Briefcase, Mail } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

const QUICK_LINKS = [
  { href: '/', label: 'Home', icon: Home, desc: 'Back to the main page' },
  { href: '/#services', label: 'Our Services', icon: Briefcase, desc: 'Explore what we offer' },
  { href: '/blog', label: 'Blog & Insights', icon: BookOpen, desc: 'Read our latest articles' },
  { href: '/contact', label: 'Contact Us', icon: Mail, desc: 'Get in touch with us' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative flex flex-col">
      <title>404 Page Not Found | Trinity Media LLC Dubai</title>
      <meta name="description" content="The page you are looking for does not exist. Navigate back to Trinity Media UAE homepage or explore our services." />
      <meta name="robots" content="noindex, nofollow" />
      <CustomCursor />
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-32 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="relative inline-block mb-2 select-none">
              <span className="font-display text-[140px] sm:text-[200px] md:text-[240px] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-400 to-indigo-500 block">404</span>
              <span className="font-display text-[140px] sm:text-[200px] md:text-[240px] leading-none tracking-tighter absolute inset-0 text-primary/10 blur-[2px] animate-pulse">404</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-lg mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-5"><span>Page Not Found</span></div>
            <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-foreground mb-4 leading-tight">Oops! This Page<br /><span className="text-primary">Does Not Exist</span></h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-10">The page you are looking for may have been moved, renamed, or deleted. Let us get you back on track.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
              <Link href="/"><a className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-xl text-sm transition-all shadow-xl shadow-primary/25"><Home size={16} />Back to Home</a></Link>
              <a href="https://wa.me/971526935456" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 bg-card border border-border hover:border-primary text-foreground hover:text-primary font-bold uppercase tracking-wider rounded-xl text-sm transition-all"><Phone size={16} />WhatsApp Us</a>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-5">Or explore these pages:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left">
              {QUICK_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className="group flex items-center gap-3 p-4 bg-card border border-border hover:border-primary/50 rounded-xl transition-all cursor-pointer">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                      <link.icon size={16} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">{link.label}</div>
                      <div className="text-[11px] text-muted-foreground truncate">{link.desc}</div>
                    </div>
                    <ArrowRight size={13} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
