import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Phone, Mail, MapPin, 
  Send, ShieldCheck, CheckCircle2, RefreshCw, 
  Truck, Factory, Briefcase, MessageSquare 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function ContactSection() {
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
    <section id="contact" className="py-20 md:py-32 bg-[#060606] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight">
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
            className="p-8 bg-[#111111] border border-border/80 rounded-2xl hover:border-primary/60 transition-all text-center flex flex-col items-center justify-between shadow-xl group"
          >
            <div className="w-full flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-primary/20 text-pink-300 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Briefcase size={28} />
              </div>
              <h3 className="font-display text-3xl text-white uppercase mb-3">Sales</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6 max-w-xs">
                Warehouse No. 4, Plot 194-0, Near Aiko Mall, Opp. BSL Gulf LLC, Dubai Investment park 1, Dubai UAE.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-white/10 space-y-2 text-xs text-gray-200">
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
            className="p-8 bg-[#111111] border border-border/80 rounded-2xl hover:border-primary/60 transition-all text-center flex flex-col items-center justify-between shadow-xl group"
          >
            <div className="w-full flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-primary/20 text-pink-300 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Factory size={28} />
              </div>
              <h3 className="font-display text-3xl text-white uppercase mb-3">Production</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6 max-w-xs">
                Warehouse No. 4, Plot 194-0, Dubai Investment Park - 1, Dubai United Arab Emirates.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-white/10 space-y-2 text-xs text-gray-200">
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
            className="p-8 bg-[#111111] border border-border/80 rounded-2xl hover:border-primary/60 transition-all text-center flex flex-col items-center justify-between shadow-xl group"
          >
            <div className="w-full flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-primary/20 text-pink-300 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Truck size={28} />
              </div>
              <h3 className="font-display text-3xl text-white uppercase mb-3">Logistic</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6 max-w-xs">
                Warehouse No. 4, Plot 194-0, Dubai Investment Park - 1, Dubai United Arab Emirates.
              </p>
            </div>

            <div className="w-full pt-4 border-t border-white/10 space-y-2 text-xs text-gray-200">
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
          <div className="lg:col-span-6 bg-[#101010] border border-border/80 rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-display text-3xl text-white uppercase mb-2">Send Us A Message</h3>
              <p className="text-xs text-muted-foreground mb-6">
                Fill out the inquiry form below for specifications, print consultations, or requests for proposal.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/40">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-display text-2xl text-white">Thank You For Your Message!</h4>
                  <p className="text-xs text-gray-300 max-w-sm mx-auto">
                    Your inquiry has been relayed to our team at Dubai Investment Park 1. We will respond swiftly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      refreshCaptcha();
                    }}
                    className="px-6 py-2.5 rounded bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#181818] border border-border/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-primary placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Email *
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#181818] border border-border/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-primary placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Phone *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="+971 5X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181818] border border-border/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-primary placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-1">
                      Your Message *
                    </label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Specify your project requirements, quantities, sizes, or timeline..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#181818] border border-border/80 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-primary placeholder:text-gray-600 resize-none"
                    />
                  </div>

                  {/* reCAPTCHA style security box */}
                  <div className="p-3.5 bg-[#141414] border border-border/90 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-3 cursor-pointer text-xs text-gray-200 select-none">
                        <input
                          type="checkbox"
                          checked={captchaChecked}
                          onChange={(e) => setCaptchaChecked(e.target.checked)}
                          className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary bg-black"
                        />
                        <span className="font-medium">I'm not a robot</span>
                      </label>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <ShieldCheck size={14} className="text-primary" />
                        <span>reCAPTCHA</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <span className="text-xs text-gray-300 font-mono bg-black/60 px-2 py-1 rounded border border-white/10">
                        Math Security: {num1} + {num2} = ?
                      </span>
                      <input
                        type="number"
                        placeholder="Answer"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="w-20 bg-black border border-white/15 rounded px-2 py-1 text-xs text-white text-center focus:border-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                      >
                        <RefreshCw size={13} />
                      </button>
                    </div>
                  </div>

                  {captchaError && (
                    <div className="text-xs text-red-400 bg-red-950/40 border border-red-800/50 px-3 py-2 rounded">
                      {captchaError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded text-sm transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send size={16} />
                    <span>{isSubmitting ? 'Sending Request...' : 'SEND NOW'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Embedded Google Map & Direct Location Info */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl overflow-hidden border border-border/80 bg-[#101010] shadow-2xl">
            <div className="p-6 border-b border-border/80 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Facility Location</span>
                <h4 className="font-display text-2xl text-white">Trinity Media LLC — DIP 1 Press</h4>
              </div>
              <div className="px-3 py-1 bg-primary/20 text-pink-300 text-xs rounded font-semibold">
                Open Mon - Sat
              </div>
            </div>

            {/* Google Map Iframe */}
            <div className="flex-1 min-h-[380px] w-full relative">
              <iframe
                title="Trinity Media Location Dubai Investment Park 1"
                src="https://maps.google.com/maps?q=Warehouse%20No.%204,%20Plot%20194-0,%20Near%20Aiko%20Mall,%20Dubai%20Investment%20Park%201,%20Dubai%20UAE&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0 filter invert-[0.9] hue-rotate-[180deg] contrast-[1.2]"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            <div className="p-6 bg-[#0c0c0c] border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary shrink-0" />
                <span>Warehouse No. 4, Plot 194-0, Near Aiko Mall, Opp. BSL Gulf LLC, DIP 1, Dubai UAE</span>
              </div>
              <a
                href="https://maps.google.com/maps?q=Dubai+Investment+Park+1"
                target="_blank"
                rel="noreferrer"
                className="text-pink-300 font-semibold hover:underline shrink-0"
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
