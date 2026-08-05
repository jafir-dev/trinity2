import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import trinityLogo from "@assets/image_1785904865497.png";

export function Footer() {
  return (
    <footer className="bg-[#040404] pt-24 pb-8 border-t-[4px] border-primary">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          <div className="lg:col-span-4 flex flex-col">
            <img src={trinityLogo} alt="Trinity Media UAE" className="h-12 w-auto mb-6 self-start" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-8">
              Dubai's premier branding and fabrication powerhouse. We transform ideas into extraordinary brand experiences with engineering precision.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#121212] border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#process" className="hover:text-primary transition-colors">Our Process</a></li>
                <li><a href="#clients" className="hover:text-primary transition-colors">Clients</a></li>
                <li><a href="#careers" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Services</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-primary transition-colors">Exhibition Stands</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Interior Fit-Out</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Signage Solutions</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Large Format Print</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-2">
              <h4 className="text-white font-bold tracking-wider uppercase text-sm mb-6">Newsletter</h4>
              <p className="text-muted-foreground text-sm mb-4">Subscribe to receive insights and industry news.</p>
              <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-[#121212] border border-border rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-primary w-full"
                />
                <button className="bg-primary text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground uppercase tracking-wider">
          <p>Al Quoz Industrial Area, Dubai, UAE | +971 4 XXX XXXX | info@trinitymedia.ae</p>
          <p>© {new Date().getFullYear()} Trinity Media UAE. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}
