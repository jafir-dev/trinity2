// Home hero: 14 native "slides" (background Image + content containers) rotated by theme.js, crossfade like the React Hero.
import { con, heading, iconList, icon, image, w, C, F, h, p, lc, asset, home, btn } from '../lib/parts.mjs';

export const SLIDES = [
  { image: 'hero/hero-slide-1.jpg', badge: "DUBAI'S PREMIER DIGITAL PRINTING PRESS", top: 'WE BUILD', hl: 'BRAND', bottom: 'EXPERIENCES.', desc: 'World-class digital printing, exhibition fabrication & bespoke signage across the UAE.', stat: '2000+', label: 'Projects Delivered' },
  { image: 'hero/hero-slide-2.jpg', badge: '18,000 SQFT PRODUCTION FACILITY IN DIP-1', top: 'PRECISION', hl: 'UV FLATBED', bottom: '& FABRICATION.', desc: 'UV Flatbed, HP Latex, CNC cutting & acrylic fabrication on wood, glass, metal & textiles.', stat: '18,000', label: 'Sqft Production Press' },
  { image: 'hero/hero-slide-3.jpg', badge: 'EXHIBITIONS • RETAIL • CORPORATE BRANDING', top: 'CREATIVE', hl: 'LARGE FORMAT', bottom: 'SOLUTIONS.', desc: 'Powering corporate brands, retail chains, and international exhibitions with premium print quality.', stat: '100%', label: 'Client Satisfaction' },
  { image: 'hero/banners/imag5.jpg', badge: 'BESPOKE EXHIBITION STAND FABRICATION', top: 'EXHIBITION', hl: 'STANDS', bottom: '& DISPLAYS.', desc: 'Custom exhibition booths, display units & retail POSM fabricated for DWTC and events across the GCC.', stat: '500+', label: 'Exhibitions Built' },
  { image: 'hero/banners/image4.jpg', badge: 'RETAIL & MALL BRANDING SPECIALISTS', top: 'RETAIL', hl: 'VISUAL', bottom: 'BRANDING.', desc: 'Backlit acrylic displays, illuminated signage & POSM solutions for premium retail and mall environments.', stat: '250+', label: 'Retail Brands Served' },
  { image: 'hero/banners/image5.jpg', badge: 'FLEET & VEHICLE BRANDING ACROSS UAE', top: 'VEHICLE', hl: 'FLEET', bottom: 'BRANDING.', desc: 'Full fleet wraps, partial vehicle graphics, and corporate branding solutions delivered across all 7 Emirates.', stat: '1000+', label: 'Vehicles Wrapped' },
  { image: 'hero/banners/image6.jpg', badge: 'ARCHITECTURAL SIGNAGE & ILLUMINATED DISPLAYS', top: 'PREMIUM', hl: 'SIGNAGE', bottom: 'SOLUTIONS.', desc: 'Architectural illuminated signage, LED channel letters & wayfinding systems for corporate headquarters.', stat: '11+', label: 'Years of Excellence' },
  { image: 'hero/banners/image7.jpg', badge: 'LARGE FORMAT DIGITAL PRINTING', top: 'HIGH RES', hl: 'DIGITAL', bottom: 'PRINT.', desc: 'HP Latex, UV Flatbed and Swiss-grade printing on canvas, vinyl, fabric, glass, wood and metal substrates.', stat: 'ISO', label: '9001 • 14001 • 18001' },
  { image: 'hero/banners/image8.jpg', badge: 'TURNKEY 360° ADVERTISING SOLUTIONS', top: '360°', hl: 'BRAND', bottom: 'ACTIVATION.', desc: 'End-to-end brand strategy, fabrication, printing, logistics and on-site installation across the UAE.', stat: 'DIP-1', label: 'Dubai Facility' },
  { image: 'hero/banners/image9.jpg', badge: 'WALLPAPER, MURALS & CUSTOM PRINTS', top: 'CUSTOM', hl: 'MURALS', bottom: '& WALLPAPER.', desc: 'Bespoke custom murals, fine art prints, wallpaper installations for hospitality, retail & corporate spaces.', stat: '2000+', label: 'Projects Delivered' },
  { image: 'hero/banners/image10.jpg', badge: 'ACRYLIC & CNC FABRICATION', top: 'ACRYLIC', hl: '& CNC', bottom: 'ENGINEERING.', desc: 'Premium acrylic fabrication, CNC routing, laser cutting and 3D lettering for luxury displays.', stat: '100%', label: 'Client Satisfaction' },
  { image: 'hero/banners/image11.jpg', badge: 'CANVAS & FINE ART PRINTING', top: 'FINE ART', hl: 'CANVAS', bottom: 'PRINTS.', desc: 'Gallery-quality canvas and fine art printing with fade-resistant inks for hotels, restaurants & studios.', stat: '18,000', label: 'Sqft Production' },
  { image: 'hero/banners/image12.jpg', badge: 'FLAG & FABRIC PRINTING SPECIALISTS', top: 'FLAGS', hl: '& FABRIC', bottom: 'PRINTING.', desc: 'Dye-sublimation flag & fabric printing for events, exhibitions, hotels & corporate campaigns across the GCC.', stat: '250+', label: 'Corporate Clients' },
  { image: 'hero/banners/image13.jpg', badge: 'CORPORATE & OUTDOOR BILLBOARD BRANDING', top: 'OUTDOOR', hl: 'BILLBOARD', bottom: 'BRANDING.', desc: 'Large format outdoor billboards, hoardings and corporate signage solutions for maximum brand visibility.', stat: 'UAE & GCC', label: 'Coverage' },
];

const esc = (s) => s.replace(/&/g, '&amp;');

function slideContent(s, i) {
  const badge = iconList({
    name: 'Badge', cls: 'tm-hero__badge tm-badge', mar: { d: [0, 0, 16, 0], m: [0, 0, 12, 0] }, items: [{ t: s.badge, icon: lc('sparkles') }],
    iconSize: 13, indent: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 600, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.1, lsUnit: 'em',
  });
  const title = heading({
    t: `${esc(s.top)} <span class="tm-hl">${esc(s.hl)}</span><br>${esc(s.bottom)}`, tag: 'h1', name: 'Headline', cls: 'tm-hero__title',
    color: C.tm_heading, family: F.d, weight: 400, tt: 'uppercase', size: [96, 72, 36], lh: 0.9, ls: -0.05, lsUnit: 'em', mar: [0, 0, 12, 0],
  });
  const desc = p(esc(s.desc), { name: 'Description', cls: 'tm-hero__desc', fs: ['lg', 'lg', 'sm'], lh: 1.625, color: C.tm_heading });
  const stat = (num, label, cls, color) => con({ name: `Stat – ${label}`, cls: `tm-hero__stat ${cls || ''}`, dir: 'column', gap: 0 }, [
    heading({ t: num, tag: 'div', cls: 'tm-hero__stat-num', color, family: F.d, weight: 400, size: [36, 36, 30], lh: [1.1111, 1.1111, 1.2] }),
    heading({ t: label, tag: 'div', cls: 'tm-hero__stat-label', color: C.tm_muted_fg, family: F.b, weight: 600, tt: 'uppercase', size: 11, lh: 1.5, ls: 0.05, lsUnit: 'em' }),
  ]);
  const sep = () => con({ name: 'Divider', cls: 'tm-hero__sep', w: 1 }, []);
  const stats = con({ name: 'Stats strip', cls: 'tm-hero__stats', dir: 'row', ai: 'center', gap: { d: 32, m: 16 }, wrap: true, mar: [20, 0, 0, 0], pad: [16, 0, 0, 0] }, [
    stat(esc(s.stat), esc(s.label), '', C.tm_heading), sep(),
    stat('ISO Certified', '9001 • 14001 • 18001', 'tm-hero__stat--primary', C.primary), sep(),
    stat('Dubai, UAE', 'DIP-1 Warehouse 4', '', C.tm_heading),
  ]);
  const ctas = con({ name: 'Buttons', cls: 'tm-hero__ctas', dir: 'row', ai: 'center', gap: 14, wrap: true, mar: [20, 0, 0, 0] }, [
    w('button', {
      text: 'Contact Now', link: { url: '#quote-form', is_external: '', nofollow: '', custom_attributes: '' },
      selected_icon: { value: 'fab fa-whatsapp', library: 'fa-brands' }, icon_align: 'row', icon_indent: { unit: 'px', size: 8, sizes: [] },
      typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase',
      typography_font_size: { unit: 'px', size: 14, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
      button_text_color: '#ffffff', background_background: 'classic', background_color: '#16a34a', __globals__: { background_color: 'globals/colors?id=tm_whatsapp' },
      border_radius: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true }, text_padding: { unit: 'px', top: '12', right: '24', bottom: '12', left: '24', isLinked: false },
      typography_font_size_mobile: { unit: 'px', size: 12, sizes: [] },
    }, { cls: 'tm-btn tm-btn--wa', name: 'Contact Now (WhatsApp)' }),
    w('button', {
      text: 'Explore Services', link: { url: '#services', is_external: '', nofollow: '', custom_attributes: '' },
      typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase',
      typography_font_size: { unit: 'px', size: 14, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
      button_text_color: C.tm_heading[1], __globals__: { button_text_color: 'globals/colors?id=tm_heading' },
      border_border: 'solid', border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true }, border_color: C.tm_border[1], __globals_: undefined,
      border_radius: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true }, text_padding: { unit: 'px', top: '12', right: '24', bottom: '12', left: '24', isLinked: false },
      typography_font_size_mobile: { unit: 'px', size: 12, sizes: [] },
    }, { cls: 'tm-btn tm-btn--ghost', name: 'Explore Services' }),
  ]);
  return con({ name: `Slide ${String(i + 1).padStart(2, '0')} – ${s.top} ${s.hl}`, cls: `tm-slide${i === 0 ? ' is-active' : ''}`, dir: 'column', gap: 0 }, [badge, title, desc, stats, ctas]);
}

export function buildHero() {
  const bg = con({ name: 'Background slider', cls: 'tm-hero__bg', fill: true, z: 0, overflow: 'hidden' },
    SLIDES.map((s, i) => con({ name: `Background ${i + 1}`, cls: `tm-hero__bgslide${i === 0 ? ' is-active' : ''}`, fill: true }, [
      image({ src: `{{theme}}/assets/images/${s.image}`, alt: `${s.top} ${s.hl} ${s.bottom}`, fit: 'cover', cls: 'tm-hero__img', extra: { image_size: 'full' } }),
    ])));

  const controls = con({ name: 'Slide controls', cls: 'tm-hero__controls', dir: 'row', ai: 'center', gap: 12, wrap: true, mar: [20, 0, 0, 0] }, [
    icon({ icon: lc('chevron-left'), size: 20, href: '#', cls: 'tm-hero__prev', name: 'Previous slide' }),
    con({ name: 'Dots', cls: 'tm-hero__dots', dir: 'row', ai: 'center', gap: 6, wrap: true }, SLIDES.map((s, i) => con({ name: `Dot ${i + 1}`, cls: `tm-hero__dot${i === 0 ? ' is-active' : ''}` }, []))),
    icon({ icon: lc('chevron-right'), size: 20, href: '#', cls: 'tm-hero__next', name: 'Next slide' }),
    heading({ t: `01 / ${String(SLIDES.length).padStart(2, '0')}`, tag: 'span', cls: 'tm-hero__count', color: C.tm_muted_fg, family: F.b, weight: 400, size: 12, lh: 1.3333, mar: [0, 0, 0, 4] }),
  ]);

  const scroll = con({ name: 'Scroll down', cls: 'tm-hero__scroll', pos: 'absolute', off: { b: 16 }, z: 20, dir: 'column', ai: 'center', gap: 6, link: { url: '#about', is_external: '', nofollow: '', custom_attributes: '' } }, [
    heading({ t: 'Scroll Down', tag: 'span', color: C.tm_muted_fg, family: F.b, weight: 700, tt: 'uppercase', size: 10, lh: 1.5, ls: 0.1, lsUnit: 'em' }),
    icon({ icon: lc('arrow-down'), size: 14, color: C.primary, cls: 'tm-hero__arrow' }),
  ]);

  const content = con({ name: 'Hero content', cls: 'tm-hero__content', boxed: 1296, dir: 'column', ai: 'flex-start', gap: 32, z: 20, extra: { z_index: 20 } }, [
    con({ name: 'Slides', cls: 'tm-hero__col', dir: 'column', gap: 0 }, [
      con({ name: 'Slide stack', cls: 'tm-hero__slides', dir: 'column', gap: 0 }, SLIDES.map(slideContent)),
      controls,
    ]),
  ]);

  return con({
    name: 'Hero', cid: 'home', cls: 'tm-hero', tag: 'section', pad: { d: [112, 32, 48], t: [112, 32, 48], m: [96, 16, 32] }, ai: 'center', jc: 'center', dir: 'column',
    minh: ['90vh', '85vh', '85vh'], overflow: 'hidden',
  }, [bg, content, scroll]);
}
