import { Phone, Mail, MapPin, MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'wouter';
import trinityLogo from "@assets/trinity-logo-original.png";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/40 dark:bg-[#050505] pt-20 pb-8 border-t-[4px] border-primary text-foreground/80 transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Col 1: About Us & Socials */}
          <div className="lg:col-span-4 flex flex-col">
            <Link href="/">
              <img 
                src={trinityLogo} 
                alt="Trinity Media UAE" 
              className="h-11 w-auto mb-6 self-start cursor-pointer transition-all" 
              />
            </Link>
            
            <h4 className="font-bold tracking-wider uppercase text-xs mb-3 text-primary">About Us</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 pr-4">
              Trinity Media LLC is a premier Large Format Printing & Fabrication Company in Dubai specializing in all digital printing formats. From conception to delivery, we guarantee exceptional quality and engineering precision.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
                { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
                { icon: FaWhatsapp, href: "https://wa.me/971526935456", label: "WhatsApp" },
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-foreground/70 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm"
                >
                  <item.icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services List */}
          <div className="lg:col-span-3">
            <h4 className="text-foreground font-bold tracking-wider uppercase text-sm mb-6 pb-2 border-b border-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/services/exhibition-stand-design-construction" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-xs">›</span> Exhibition Stand & Construction
                </Link>
              </li>
              <li>
                <Link href="/services/event-branding-activation" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-xs">›</span> Event Branding & Activation
                </Link>
              </li>
              <li>
                <Link href="/services/custom-kiosk-design-fabrication" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-xs">›</span> Custom Kiosk Fabrication
                </Link>
              </li>
              <li>
                <Link href="/services/large-format-digital-printing" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-xs">›</span> Large Format Digital Printing
                </Link>
              </li>
              <li>
                <Link href="/services/indoor-outdoor-signage" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-xs">›</span> Indoor & Outdoor Signage
                </Link>
              </li>
              <li>
                <Link href="/services/acrylic-fabrication" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-xs">›</span> Acrylic Fabrication
                </Link>
              </li>
              <li>
                <Link href="/services/vehicle-branding-fleet-graphics" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary text-xs">›</span> Vehicle Branding & Fleet
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-foreground font-bold tracking-wider uppercase text-sm mb-6 pb-2 border-b border-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/our-journey" className="hover:text-primary transition-colors">Our Journey</Link></li>
              <li><Link href="/why-choose-us" className="hover:text-primary transition-colors">Why Choose Us</Link></li>
              <li><Link href="/our-facilities" className="hover:text-primary transition-colors">Our Facilities</Link></li>
              <li><Link href="/awards" className="hover:text-primary transition-colors">Awards</Link></li>
              <li><Link href="/#portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 4: Get In Touch (Exact Reference Data) */}
          <div className="lg:col-span-3">
            <h4 className="text-foreground font-bold tracking-wider uppercase text-sm mb-6 pb-2 border-b border-border flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Get in Touch
            </h4>
            
            <div className="space-y-3.5 text-xs text-foreground/80">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
                <span>
                  Warehouse No. 4, Plot 194-0, Near Aiko Mall, Opp. BSL Gulf LLC, Dubai Investment park 1, Dubai UAE
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-primary shrink-0" />
                <a href="tel:+971526935456" className="hover:text-primary transition-colors">+971 52 693 5456 (Mob)</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-primary shrink-0" />
                <a href="tel:+97143409377" className="hover:text-primary transition-colors">+971 4 340 9377 (Tel)</a>
              </div>

              <div className="flex items-center gap-2.5">
                <FaWhatsapp size={15} className="text-green-500 shrink-0" />
                <a 
                  href="https://wa.me/971526935456" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-green-600 hover:text-green-500 font-semibold transition-colors"
                >
                  +971 52 693 5456 (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-primary shrink-0" />
                <a href="mailto:inquiry@trinitymediauae.com" className="hover:text-primary transition-colors">
                  inquiry@trinitymediauae.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Back to top */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            Copyrights © 2026 <strong className="text-foreground font-semibold">Trinity Media LLC</strong>. Designed by CEZCON | <Link href="/contact" className="hover:text-primary transition-colors">Privacy & Contact</Link>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}
