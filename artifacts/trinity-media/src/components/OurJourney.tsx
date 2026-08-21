import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle, Quote, Sparkles, UserCheck } from 'lucide-react';
import manufacturingImg from '@assets/generated_images/manufacturing.jpg';
import aboutImg from '@assets/generated_images/about.jpg';

const TIMELINE = [
  {
    year: "2010",
    title: "Started Our Journey",
    desc: "Dedicated to the pursuit of excellence, we started our journey in 2010 to bring in a revolution in the printing sector. Today we are happy to announce that we are one of Dubai's best and most rated printing companies.",
    highlight: "Foundation of Trinity Media LLC in Dubai"
  },
  {
    year: "2018",
    title: "Award for Best Printing",
    desc: "With unfailingly and invariably delivering the best printing solutions, we are honored with the Award for Best Printing in 2018, establishing our reputation as the gold standard in large format printing.",
    highlight: "Excellence in Large Format & UV Printing"
  },
  {
    year: "2022",
    title: "We Are One of the Top Printing Solution",
    desc: "It is always said hard work really pays off in the end and it is true. The long 11 years of journey has led us to eternal glory making and branding us as the topmost printing solutions in Dubai.",
    highlight: "Expanded 18,000 sqft Press in DIP-1"
  }
];

export function OurJourney() {
  return (
    <section id="journey" className="py-20 md:py-32 bg-[#080808] relative overflow-hidden border-y border-border/80">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-primary font-bold block mb-2"
          >
            Journey Of Trinity Media LLC
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight"
          >
            COMPANY <span className="text-primary">HISTORY</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base mt-4"
          >
            A decade-long commitment to engineering perfection, continuous machinery investment, and client success.
          </motion.p>
        </div>

        {/* Timeline Grid & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left: Interactive Timeline Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-2xl">
              <img 
                src={manufacturingImg} 
                alt="Trinity Media Press & Printing Evolution" 
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-pink-300 block mb-1">
                  11+ Years of Heritage
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Over a decade of transforming the UAE branding landscape with cutting-edge UV flatbeds and turnkey exhibition solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Milestones List */}
          <div className="lg:col-span-7 flex flex-col space-y-8 relative">
            {/* Timeline track line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden sm:block -z-0" />

            {TIMELINE.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-[#111111] border border-border/80 rounded-xl p-6 sm:p-8 hover:border-primary/50 transition-all z-10 group"
              >
                {/* Year Badge */}
                <div className="font-display text-4xl sm:text-5xl text-primary leading-none sm:min-w-[100px] group-hover:text-pink-300 transition-colors">
                  {item.year}
                </div>

                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-pink-300 bg-primary/20 px-2.5 py-1 rounded inline-block mb-2">
                    {item.highlight}
                  </span>
                  <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* CEO's Message Section */}
        <div id="ceo-message" className="pt-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-gradient-to-br from-[#180e1c] via-[#121212] to-[#0c0c0c] border border-primary/40 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none -z-0" />

            {/* Left: Message Text */}
            <div className="lg:col-span-8 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-pink-300 flex items-center justify-center">
                  <Quote size={20} />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-bold block">Leadership Vision</span>
                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase">CEO'S MESSAGE</h3>
                </div>
              </div>

              <blockquote className="text-sm sm:text-base text-gray-200 leading-relaxed space-y-4 italic border-l-2 border-primary/60 pl-4 mb-8">
                <p>
                  "It gives me immense pleasure to welcome you all. As we grow bigger, I would like to take this opportunity to express my profound gratitude to all our respectful clients and business partners for their valuable support and cooperative contributions to the smooth functioning."
                </p>
                <p>
                  "Today, change is everywhere but one thing we as a company keep constant is our client satisfaction and to ensure their mission objectives are achieved with the highest level of capability and quality. Whether you are a potential customer, a small business partner, or a future employee, we always look forward to finding out how we can work together to bring service to life."
                </p>
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center font-display text-xl text-white border border-primary/50">
                  SW
                </div>
                <div>
                  <h4 className="font-display text-xl sm:text-2xl text-white tracking-wide">Mr. Suraj Walter</h4>
                  <p className="text-xs uppercase tracking-widest text-pink-300 font-bold">Managing Director — Trinity Media LLC</p>
                </div>
              </div>
            </div>

            {/* Right: Executive Portrait Card */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative z-10">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
                <img 
                  src={aboutImg} 
                  alt="Mr. Suraj Walter - Managing Director Trinity Media" 
                  className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/15 text-center">
                  <div className="font-display text-xl text-white">Mr. Suraj Walter</div>
                  <div className="text-xs text-pink-300 font-semibold uppercase tracking-wider">Managing Director</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Trinity Media LLC • Dubai, UAE</div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
