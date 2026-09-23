import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Phone, Mail, CheckCircle2, 
  Sparkles, Clock, ShieldCheck, RefreshCw 
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '@/components/ThemeProvider';

interface ServiceRequestFormProps {
  serviceTitle: string;
}

export function ServiceRequestForm({ serviceTitle }: ServiceRequestFormProps) {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeline, setTimeline] = useState('Standard (3-5 days)');
  const [specifications, setSpecifications] = useState('');

  // Captcha State
  const [num1, setNum1] = useState(4);
  const [num2, setNum2] = useState(3);
  const [userAnswer, setUserAnswer] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshCaptcha = () => {
    setNum1(Math.floor(Math.random() * 8) + 2);
    setNum2(Math.floor(Math.random() * 7) + 1);
    setUserAnswer('');
    setErrorMsg('');
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !phone.trim() || !specifications.trim()) {
      setErrorMsg('Please complete all required fields (*)');
      return;
    }

    if (parseInt(userAnswer.trim(), 10) !== (num1 + num2)) {
      setErrorMsg(`Calculation incorrect. Please solve: ${num1} + ${num2} = ?`);
      return;
    }

    setIsSubmitting(true);

    const formattedMessage = `*NEW HIGH-CONVERSION QUOTE REQUEST*
----------------------------------
🎯 *Service:* ${serviceTitle}
👤 *Name:* ${name.trim()}
📧 *Email:* ${email.trim()}
📱 *Phone:* ${phone.trim()}
⏱️ *Timeline:* ${timeline}
📝 *Specifications / Dimensions:*
${specifications.trim()}
----------------------------------
*Location:* DIP-1 Production Press, Dubai`;

    const encoded = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/971526935456?text=${encoded}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div 
      className="rounded-2xl p-6 sm:p-7 flex flex-col gap-4 relative overflow-hidden w-full"
      style={{
        background: theme === 'dark' ? 'rgba(18,22,35,0.65)' : 'rgba(255,255,255,0.62)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.70)',
        boxShadow: theme === 'dark'
          ? '0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)'
          : '0 20px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.90)'
      }}
    >
      {/* Top Ambient Glow Accent */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-primary/20 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

      {/* Header */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-widest mb-2">
          <Sparkles size={12} />
          <span>Get instant Quote</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl text-foreground uppercase tracking-tight leading-tight">
          Request A <span className="text-primary">Fast Quote</span>
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Direct in-house pricing for <strong className="text-foreground">{serviceTitle}</strong> from our DIP-1 press.
        </p>
      </div>

      {submitted ? (
        <div className="py-10 text-center space-y-4 relative z-10">
          <div className="w-14 h-14 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/40">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="font-display text-2xl text-foreground">
            Quote Request Sent!
          </h4>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Our estimating team at Dubai Investment Park has received your specifications. WhatsApp has opened for direct chat.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              refreshCaptcha();
            }}
            className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-bold mb-1">
                Name *
              </label>
              <input 
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background/80 border border-border rounded-lg px-3.5 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-bold mb-1">
                Phone Number *
              </label>
              <input 
                type="tel"
                required
                placeholder="+971 5X XXX XXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-background/80 border border-border rounded-lg px-3.5 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-bold mb-1">
                Work Email *
              </label>
              <input 
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background/80 border border-border rounded-lg px-3.5 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-bold mb-1">
                Timeline
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full bg-background/80 border border-border rounded-lg px-3 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="Urgent (24 - 48 hours)">Urgent (24 - 48 hrs)</option>
                <option value="Standard (3 - 5 days)">Standard (3 - 5 days)</option>
                <option value="Flexible (1 - 2 weeks)">Flexible (1 - 2 weeks)</option>
                <option value="Event / Exhibition">Event / Exhibition</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-foreground/80 font-bold mb-1">
              Project Requirements / Dimensions / Quantities *
            </label>
            <textarea 
              rows={2}
              required
              placeholder="e.g. Dimensions (3m x 2m), materials preferred, quantity, delivery location..."
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              className="w-full bg-background/80 border border-border rounded-lg px-3.5 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary placeholder:text-muted-foreground"
            />
          </div>

          {/* Math Verification */}
          <div className="p-2.5 bg-muted/30 border border-border/80 rounded-lg flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold text-foreground/75">
                Verification:
              </span>
              <span className="font-mono text-xs px-2 py-0.5 bg-background border border-border rounded text-primary font-bold">
                {num1} + {num2} = ?
              </span>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="text-muted-foreground hover:text-primary transition-colors p-0.5"
                title="Change numbers"
              >
                <RefreshCw size={12} />
              </button>
            </div>

            <input 
              type="number"
              required
              placeholder="Answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-20 bg-background border border-border rounded px-2 py-1 text-xs text-center focus:outline-none focus:border-primary"
            />
          </div>

          {errorMsg && (
            <div className="p-2 bg-red-500/10 border border-red-500/30 rounded text-red-500 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25 cursor-pointer disabled:opacity-50"
          >
            <Send size={14} />
            <span>{isSubmitting ? 'Sending Request...' : 'Get Instant Quote'}</span>
          </button>

          {/* Quick Direct Actions */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-foreground/70 border-t border-border/60">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-primary" /> ISO 9001 DIP-1 Press
            </span>
            <a 
              href="https://wa.me/971526935456" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1 text-green-600 hover:text-green-500 font-semibold"
            >
              <FaWhatsapp size={14} /> WhatsApp Now
            </a>
          </div>

        </form>
      )}
    </div>
  );
}
