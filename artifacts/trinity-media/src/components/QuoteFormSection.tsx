import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RefreshCw, ShieldCheck, Send, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '@/components/ThemeProvider';

const SERVICES_OPTIONS = [
  "Large Format Digital Printing",
  "Exhibition Stands & Display Units",
  "Signage & Acrylic Works",
  "Wallpaper & Custom Murals",
  "Canvas & Fine Art Printing",
  "Flag & Fabric Printing",
  "Flatbed UV Printing on Rigid Substrates",
  "Vehicle & Fleet Branding",
  "Retail, POSM & Mall Branding",
  "Other Custom Fabrication"
];

export function QuoteFormSection() {
  const { theme } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SERVICES_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [num1, setNum1] = useState(4);
  const [num2, setNum2] = useState(3);
  const [userAnswer, setUserAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setNum1(n1); setNum2(n2);
    setUserAnswer(''); setCaptchaError('');
  };

  useEffect(() => { refreshCaptcha(); }, []);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaptchaError('');
    if (!fullName.trim() || !phone.trim()) { setCaptchaError('Please provide your name and phone number.'); return; }
    if (!captchaChecked) { setCaptchaError('Please check the verification box to proceed.'); return; }
    const expectedAnswer = num1 + num2;
    if (parseInt(userAnswer.trim(), 10) !== expectedAnswer) {
      setCaptchaError(`Incorrect security answer. Please solve: ${num1} + ${num2} = ?`);
      return;
    }
    setIsSubmitting(true);
    const whatsappMessage = `*NEW QUOTE REQUEST - TRINITY MEDIA LLC*\n----------------------------------\n${"👤"} *Name:* ${fullName.trim()}\n${"📧"} *Email:* ${email.trim() || 'Not specified'}\n${"📱"} *Phone:* ${phone.trim()}\n${"🛠️"} *Service Needed:* ${service}\n${"📝"} *Project Scope / Notes:* ${message.trim() || 'Requesting standard quote & consultation'}\n----------------------------------\n*Location:* Dubai Investment Park - 1\n*Source:* Quote Form (Trinity Media UAE)`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/971526935456?text=${encodedMessage}`;
    setTimeout(() => { setIsSubmitting(false); setSubmittedSuccess(true); window.open(whatsappUrl, '_blank', 'noopener,noreferrer'); }, 400);
  };

  const isDark = theme === 'dark';

  return (
    <section
      id="request-quote"
      className="relative py-12 md:py-16 overflow-hidden bg-background"
    >
      {/* Subtle glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden dark:block absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3"
          >
            <Sparkles size={13} />
            <span>Instant WhatsApp Inquiry</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-foreground"
          >
            REQUEST A <span className="text-primary">QUOTE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="text-muted-foreground text-base mt-3 max-w-lg mx-auto"
          >
            Fill in your details and we will respond instantly via WhatsApp.
          </motion.p>
        </div>

        {/* Centred glass card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
            style={{
              background: isDark
                ? 'rgba(12, 14, 22, 0.55)'
                : 'rgba(255, 255, 255, 0.60)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              border: isDark
                ? '1px solid rgba(255,255,255,0.10)'
                : '1px solid rgba(180,180,180,0.35)',
              boxShadow: isDark
                ? '0 25px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
                : '0 25px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.90)',
            }}
          >
            {/* Top-right glow inside card */}
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Card header */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-border">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-primary font-bold block mb-0.5">
                  Fast Turnaround
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground tracking-wide">
                  GET YOUR QUOTE
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center text-green-500">
                <FaWhatsapp size={24} />
              </div>
            </div>

            {submittedSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/40">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="font-display text-2xl text-foreground">Inquiry Transmitted!</h4>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Your project specifications were sent to our WhatsApp desk (+971 52 693 5456).
                </p>
                <button
                  onClick={() => { setSubmittedSuccess(false); refreshCaptcha(); }}
                  className="px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-foreground/70 font-semibold mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Walter"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-foreground/70 font-semibold mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 5X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-foreground/70 font-semibold mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.ae"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-foreground/70 font-semibold mb-1.5">
                    Select Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    {SERVICES_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt} className="bg-background text-foreground">{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-foreground/70 font-semibold mb-1.5">
                    Project Details / Sizes / Quantity
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your dimensions, material, or deadline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none transition-colors"
                  />
                </div>

                {/* Captcha */}
                <div className="p-4 bg-muted/40 border border-border rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={captchaChecked}
                        onChange={(e) => setCaptchaChecked(e.target.checked)}
                        className="w-4 h-4 accent-primary rounded"
                      />
                      <span className="text-[12px] text-foreground/80 font-medium">I'm not a robot</span>
                    </label>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <ShieldCheck size={12} className="text-primary" />
                      <span>Security Verification</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 pt-2 border-t border-border/50">
                    <span className="text-[11px] text-foreground/80 font-mono bg-background px-3 py-1.5 rounded-lg border border-border">
                      {num1} + {num2} = ?
                    </span>
                    <input
                      type="number"
                      placeholder="Answer"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-20 bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground text-center focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      title="New question"
                      className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <RefreshCw size={13} />
                    </button>
                  </div>
                </div>

                {captchaError && (
                  <div className="text-[11px] text-red-400 font-medium bg-red-500/15 border border-red-500/30 px-3 py-2 rounded-xl">
                    {captchaError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-primary/30 cursor-pointer disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Submitting...' : 'REQUEST A QUOTE'}</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
