import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Phone, Mail, MapPin, 
  Send, ShieldCheck, CheckCircle2, RefreshCw, 
  Truck, Factory, Briefcase, MessageSquare 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '@/components/ThemeProvider';

export function ContactSection() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // Captcha State
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(4);
  const [userAnswer, setUserAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshCaptcha = () => {
    setNum1(Math.floor(Math.random() * 9) + 2);
    setNum2(Math.floor(Math.random() * 8) + 1);
    setUserAnswer('');
    setCaptchaError('');
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError('');

    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setCaptchaError('Please fill in all required fields.');
      return;
    }

    if (!captchaChecked) {
      setCaptchaError('Please check the verification box to proceed.');
      return;
    }

    if (parseInt(userAnswer.trim(), 10) !== (num1 + num2)) {
      setCaptchaError(`Incorrect security calculation. Please solve: ${num1} + ${num2} = ?`);
      return;
    }

    setIsSubmitting(true);

    const whatsappMessage = `*INQUIRY FROM TRINITY MEDIA CONTACT DESK*
----------------------------------
👤 *Name:* ${name.trim()}
📧 *Email:* ${email.trim()}
📱 *Phone:* ${phone.trim()}
💬 *Message:* ${message.trim()}
----------------------------------
*Facility:* Warehouse No. 4, Plot 194-0, DIP-1, Dubai UAE
*Status:* Direct Inquire Now Submission`;

    const encoded = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/971526935456?text=${encoded}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden transition-colors" style={{
      background: theme === 'dark'
        ? 'linear-gradient(135deg, #0d0f17 0%, #12141f 50%, #0a0c14 100%)'
        : 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f8f0ff 100%)'
    }}>
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-foreground uppercase tracking-tight">
            INQUIRE <span className="text-primary">NOW</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-4">
            Connect directly with our Sales, Production, and Logistics teams in Dubai Investment Park 1.
          </p>
        </div>

        {/* 3 Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          
          {/* Sales Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-card border border-border rounded-2xl hover:border-primary/60 transition-all text-center flex flex-col items-center justify-between shadow-lg group"
          >
            <div className="w-full flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Briefcase size={28} />
              </div>
              <h3 className="font-display text-3xl text-foreground uppercase mb-3">Sales</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6 max-w-xs">
                Warehouse No. 4, Plot 194-0, Near Aiko Mall, Opp. BSL Gulf LLC, Dubai Investment park 1, Dubai UAE.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-border space-y-2 text-xs text-foreground/80">
              <div className="flex items-center justify-center gap-2">
                <Phone size={13} className="text-primary" />
                <a href="tel:+97143409377" className="hover:text-primary transition-colors">+971 4 340 9377</a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone size={13} className="text-primary" />
                <a href="tel:+971526935456" className="hover:text-primary transition-colors">+971 52 693 5456</a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail size={13} className="text-primary" />
                <a href="mailto:inquiry@trinitymediauae.com" className="hover:text-primary transition-colors">inquiry@trinitymediauae.com</a>
              </div>
            </div>
          </motion.div>

          {/* Production Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-card border border-border rounded-2xl hover:border-primary/60 transition-all text-center flex flex-col items-center justify-between shadow-lg group"
          >
            <div className="w-full flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Factory size={28} />
              </div>
              <h3 className="font-display text-3xl text-foreground uppercase mb-3">Production</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6 max-w-xs">
                Warehouse No. 4, Plot 194-0, Dubai Investment Park - 1, Dubai United Arab Emirates.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-border space-y-2 text-xs text-foreground/80">
              <div className="flex items-center justify-center gap-2">
                <Phone size={13} className="text-primary" />
                <a href="tel:+97143409377" className="hover:text-primary transition-colors">+971 4 340 9377</a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone size={13} className="text-primary" />
                <a href="tel:+971526935456" className="hover:text-primary transition-colors">+971 52 693 5456</a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail size={13} className="text-primary" />
                <a href="mailto:inquiry@trinitymediauae.com" className="hover:text-primary transition-colors">inquiry@trinitymediauae.com</a>
              </div>
            </div>
          </motion.div>

          {/* Logistic Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-card border border-border rounded-2xl hover:border-primary/60 transition-all text-center flex flex-col items-center justify-between shadow-lg group"
          >
            <div className="w-full flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Truck size={28} />
              </div>
              <h3 className="font-display text-3xl text-foreground uppercase mb-3">Logistic</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6 max-w-xs">
                Warehouse No. 4, Plot 194-0, Dubai Investment Park - 1, Dubai United Arab Emirates.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-border space-y-2 text-xs text-foreground/80">
              <div className="flex items-center justify-center gap-2">
                <Phone size={13} className="text-primary" />
                <a href="tel:+97143409377" className="hover:text-primary transition-colors">+971 4 340 9377</a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone size={13} className="text-primary" />
                <a href="tel:+971526935456" className="hover:text-primary transition-colors">+971 52 693 5456</a>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail size={13} className="text-primary" />
                <a href="mailto:inquiry@trinitymediauae.com" className="hover:text-primary transition-colors">inquiry@trinitymediauae.com</a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Contact Form & Google Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left: Contact Form */}
          <div
            className="lg:col-span-6 rounded-2xl p-8 sm:p-10 flex flex-col justify-between"
            style={{
              background: theme === 'dark' ? 'rgba(18,22,35,0.65)' : 'rgba(255,255,255,0.62)',
              backdropFilter: 'blur(36px) saturate(200%)',
              WebkitBackdropFilter: 'blur(36px) saturate(200%)',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(255,255,255,0.70)',
              boxShadow: theme === 'dark'
                ? '0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)'
                : '0 20px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.90)'
            }}
          >
            <div>
              <h3 className="font-display text-3xl text-foreground uppercase mb-2">Send Us A Message</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Fill out the inquiry form below for specifications, print consultations, or requests for proposal.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/40">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-display text-2xl text-foreground">Thank You For Your Message!</h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Your inquiry has been relayed to our team at Dubai Investment Park 1. We will respond swiftly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      refreshCaptcha();
                    }}
                    className="px-6 py-2.5 rounded bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                      Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                      Email *
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                      Phone *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="+971 5X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-foreground/80 font-semibold mb-1">
                      Your Message *
                    </label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Specify your project requirements, quantities, sizes, or timeline..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-background border border-border rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground resize-none"
                    />
                  </div>

                  {/* reCAPTCHA style security box */}
                  <div className="p-3.5 bg-muted/40 border border-border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-3 cursor-pointer text-xs text-foreground select-none">
                        <input
                          type="checkbox"
                          checked={captchaChecked}
                          onChange={(e) => setCaptchaChecked(e.target.checked)}
                          className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                        />
                        <span className="font-medium">I'm not a robot</span>
                      </label>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <ShieldCheck size={14} className="text-primary" />
                        <span>Security Verification</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                      <span className="text-xs text-foreground font-mono bg-background px-2 py-1 rounded border border-border">
                        Security Code: {num1} + {num2} = ?
                      </span>
                      <input
                        type="number"
                        placeholder="Answer"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="w-20 bg-background border border-border rounded px-2 py-1 text-xs text-foreground text-center focus:border-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="p-1 rounded bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <RefreshCw size={13} />
                      </button>
                    </div>
                  </div>

                  {captchaError && (
                    <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded">
                      {captchaError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded text-sm transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send size={16} />
                    <span>{isSubmitting ? 'Sending Request...' : 'SEND NOW'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Embedded Google Map & Direct Location Info */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl overflow-hidden border border-border bg-card shadow-lg">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Facility Location</span>
                <h4 className="font-display text-2xl text-foreground">Trinity Media LLC — DIP 1 Press</h4>
              </div>
              <div className="px-3 py-1 bg-primary/15 text-primary text-xs rounded font-semibold border border-primary/20">
                Open Mon - Sat
              </div>
            </div>

            {/* Google Map Iframe */}
            <div className="flex-1 min-h-[380px] w-full relative">
              <iframe
                title="Trinity Media Location Dubai Investment Park 1"
                src="https://maps.google.com/maps?q=Warehouse%20No.%204,%20Plot%20194-0,%20Near%20Aiko%20Mall,%20Dubai%20Investment%20Park%201,%20Dubai%20UAE&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className={`w-full h-full border-0 absolute inset-0 ${
                  theme === 'dark' ? 'filter invert-[0.9] hue-rotate-[180deg] contrast-[1.2]' : ''
                }`}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            <div className="p-6 bg-muted/40 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/80">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary shrink-0" />
                <span>Warehouse No. 4, Plot 194-0, Near Aiko Mall, Opp. BSL Gulf LLC, DIP 1, Dubai UAE</span>
              </div>
              <a
                href="https://maps.google.com/maps?q=Dubai+Investment+Park+1"
                target="_blank"
                rel="noreferrer"
                className="text-primary font-semibold hover:underline shrink-0"
              >
                Open in Maps →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
