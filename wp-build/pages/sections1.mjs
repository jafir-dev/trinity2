// Home sections 1/2: Trusted-by marquee, Industries + quote form, Services grid, Portfolio.
import { con, heading, iconList, icon, image, w, shortcode, C, F, h, p, lc, asset, home, btn, section, eyebrow, ty } from '../lib/parts.mjs';
import { SERVICES } from '../data.mjs';

const link = (url, ext) => ({ url, is_external: ext ? 'on' : '', nofollow: ext ? 'on' : '', custom_attributes: '' });

/* ----------------------------------------------------------------- Trusted by */
export function buildTrustedBy() {
  const logos = Array.from({ length: 16 }, (_, i) => image({
    src: asset(`client-logos/L${i + 1}.png`), alt: `Client logo ${i + 1}`, h: [48, 40, 32], fit: 'contain', cls: 'tm-marquee__logo', name: `Client logo ${i + 1}`,
  }));
  return con({
    name: 'Trusted by', cls: 'tm-trusted', tag: 'section', dir: 'column', ai: 'center', pad: { d: [32, 0], m: [24, 0] }, overflow: 'hidden', gap: 0, z: 20,
    border: { w: { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false }, global: C.tm_border },
  }, [
    heading({
      t: 'Trusted By Industry Leaders', tag: 'h3', cls: 'tm-trusted__title', color: C.tm_muted_fg, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.3, lsUnit: 'em', mar: [0, 0, 16, 0], align: 'center',
    }),
    con({ name: 'Marquee', cls: 'tm-marquee', w: 100, overflow: 'hidden', dir: 'row', ai: 'center' }, [
      con({ name: 'Marquee track', cls: 'tm-marquee__track', dir: 'row', ai: 'center', gap: 48, wrap: 'nowrap' }, logos),
    ]),
  ]);
}

/* ----------------------------------------------------------------- Industries + quote form */
export const INDUSTRIES = [
  ['Retail', 'shopping-bag'], ['Luxury', 'diamond'], ['Healthcare', 'heart-pulse'], ['Education', 'graduation-cap'],
  ['Government', 'landmark'], ['Corporate', 'building-2'], ['Hospitality', 'utensils'], ['Museums', 'library'],
  ['Real Estate', 'home'], ['Events', 'ticket'], ['Construction', 'hammer'], ['Automotive', 'car-front'],
];

export function buildQuoteCard(o = {}) {
  return con({ name: 'Quote card (glass)', cls: 'tm-glass tm-quote', dir: 'column', pad: 32, radius: 24, gap: 0, overflow: 'hidden' }, [
    con({ name: 'Card header', cls: 'tm-quote__head', dir: 'row', jc: 'space-between', ai: 'center', pad: [0, 0, 20, 0], mar: [0, 0, 24, 0],
      border: { w: { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false }, global: C.tm_border } }, [
      con({ name: 'Card titles', dir: 'column', gap: 2 }, [
        heading({ t: 'Fast Turnaround', tag: 'span', color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 11, lh: 1.5, ls: 0.1, lsUnit: 'em' }),
        heading({ t: 'GET YOUR QUOTE', tag: 'h3', color: C.tm_heading, family: F.d, weight: 400, size: 24, lh: 1.3333, ls: 0.025, lsUnit: 'em' }),
      ]),
      icon({ icon: 'fab fa-whatsapp', size: 24, color: '#22c55e', cls: 'tm-quote__wa' }),
    ]),
    shortcode({ sc: '[trinity_form type="quote"]', name: 'Quote form' }),
  ]);
}

export function buildIndustries() {
  const cards = INDUSTRIES.map(([name, ic], i) => con({
    name, cls: `tm-ind tm-rv tm-rv-scale tm-d${i}`, dir: 'column', ai: 'center', jc: 'center', gap: 16, pad: 32, radius: 12,
    border: { w: 1, global: C.tm_border }, bgg: C.tm_card, overflow: 'hidden', shadow: { v: 1, blur: 2, color: 'rgba(0,0,0,.05)' },
  }, [
    icon({ icon: lc(ic), size: 32, color: C.tm_muted_fg, cls: 'tm-ind__icon', align: 'center' }),
    heading({ t: name, tag: 'h3', cls: 'tm-ind__name', color: C.tm_heading, family: F.b, weight: 700, tt: 'uppercase', size: 14, lh: 1.4286, ls: 0.05, lsUnit: 'em', align: 'center' }),
  ]));
  return section({ name: 'Industries', cid: 'industries', cls: 'tm-industries', py: { d: 96, t: 96, m: 96 }, gutter: { d: 32, t: 32, m: 24 }, overflow: 'hidden', bgg: C.tm_bg }, [
    con({ name: 'Heading block', cls: 'tm-section-head', dir: 'column', gap: 8, mar: [0, 0, 64, 0] }, [
      eyebrow('Sectors We Empower'),
      h('Industries We Serve', { fs: ['6xl', '6xl', '5xl'], track: 'tight' }),
    ]),
    con({ name: 'Form + industries', cls: 'tm-industries__grid', grid: { cols: ['450px 1fr', 1, 1], gap: 32 } }, [
      con({ name: 'Quote form wrapper', cid: 'quote-form', cls: 'tm-quote-wrap tm-rv tm-rv-pop', dir: 'column' }, [buildQuoteCard()]),
      con({ name: 'Industry cards', cls: 'tm-industries__cards', grid: { cols: [2, 2, 2], gap: 16 } }, cards),
    ]),
  ]);
}

/* ----------------------------------------------------------------- Services (19 cards) */
export function serviceCard(s, i) {
  return con({
    name: `${s.num} ${s.title}`, cls: `tm-svc tm-rv tm-rv-up tm-d${i % 2}`, link: link(home(`/services/${s.slug}/`)), dir: 'column', gap: 0, radius: 16, overflow: 'hidden',
    border: { w: 1, global: C.tm_border },
  }, [
    con({ name: 'Image', cls: 'tm-svc__media', pos: 'relative', minh: [336, 336, 288], overflow: 'hidden' }, [
      image({ src: asset(s.image.replace(/^\//, '')), alt: s.title, fit: 'cover', cls: 'tm-svc__img', h: [336, 336, 288], name: 'Service image' }),
      heading({ t: s.num, tag: 'span', cls: 'tm-svc__num', color: '#ffffff', family: F.d, weight: 400, size: 96, lh: 1, pos: 'absolute', off: { b: 8, r: 16 } }),
    ]),
    con({ name: 'Content', cls: 'tm-svc__body', dir: 'column', jc: 'space-between', gap: 24, pad: { d: 32, m: 24 } }, [
      con({ name: 'Text', dir: 'column', gap: 12 }, [
        h(s.title, { tag: 'h3', cls: 'tm-svc__title', fs: ['3xl', '3xl', '2xl'], lh: 1.25, track: 'wide' }),
        p(s.short.replace(/&/g, '&amp;'), { cls: 'tm-svc__text', fs: ['base', 'base', 'sm'], lh: 1.625 }),
      ]),
      iconList({
        name: 'Explore link', cls: 'tm-svc__more', items: [{ t: 'Explore Service Gallery', icon: lc('arrow-right') }], iconAlign: 'row-reverse', iconSize: 16, indent: 8,
        iconColor: C.primary, color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 14, lh: 1.4286, ls: 0.05, lsUnit: 'em',
      }),
    ]),
  ]);
}

export function buildServices() {
  return con({
    name: 'Services', cid: 'services', cls: 'tm-services', tag: 'section', dir: 'column', pad: { d: [128, 32], t: [128, 32], m: [96, 24] }, overflow: 'hidden',
    border: { w: { unit: 'px', top: '1', right: '0', bottom: '1', left: '0', isLinked: false }, global: C.tm_border },
  }, [
    heading({ t: 'SERVICES', tag: 'div', cls: 'tm-bgword tm-bgword--services', color: C.tm_heading, family: F.d, weight: 400, size: [400, 400, 240], lh: 1, pos: 'absolute', off: { t: 0, l: 0 }, align: 'center' }),
    con({ name: 'Services inner', boxed: 1296, dir: 'column', gap: 0, z: 10 }, [
      con({ name: 'Heading block', cls: 'tm-section-head tm-section-head--narrow', dir: 'column', gap: 0, mar: { d: [0, 0, 80, 0], m: [0, 0, 64, 0] } }, [
        eyebrow('Our Core Capabilities', { cls: 'tm-eyebrow--lav', mar: [0, 0, 12, 0] }),
        h('WHAT WE DO', { fs: ['7xl', '7xl', '5xl'], track: 'tight', mar: [0, 0, 16, 0] }),
        p('Nineteen specialised turnkey services under one roof — from large-scale exhibition stands to bespoke retail signage, UV flatbed printing, and vehicle branding.', { fs: ['lg', 'lg', 'base'], lh: 1.625 }),
      ]),
      con({ name: 'Service cards', cls: 'tm-services__grid', grid: { cols: [2, 2, 1], gap: 24 } }, SERVICES.map(serviceCard)),
    ]),
  ]);
}

/* ----------------------------------------------------------------- Portfolio */
export const FILTERS = ['All', 'Exhibitions', 'Retail', 'Signage', 'Fabrication', 'Events', 'Vehicles'];
export const PROJECTS = [
  { title: 'Bespoke Exhibition Stand', cat: 'Exhibitions', image: 'portfolio/exhibition-stand.jpg', loc: 'Dubai World Trade Centre (DWTC)', span: 'tm-span-22', desc: 'Custom double-deck exhibition stand designed and fabricated for Gitex Global at DWTC.' },
  { title: 'Luxury Retail Display & POSM', cat: 'Retail', image: 'portfolio/retail-display.jpg', loc: 'The Dubai Mall', span: 'tm-span-11', desc: 'High-gloss acrylic display podiums with integrated LED edge lighting for luxury fragrance brands.' },
  { title: 'Architectural Illuminated Neon Signage', cat: 'Signage', image: 'portfolio/led-neon.jpg', loc: 'Downtown Dubai', span: 'tm-span-11', desc: 'Precision CNC-cut 3D illuminated letters with Samsung LED modules for exterior high-rise exposure.' },
  { title: 'Custom Interactive Mall Kiosk', cat: 'Fabrication', image: 'portfolio/kiosk-fabrication.jpg', loc: 'Mall of the Emirates', span: 'tm-span-21', desc: 'Turnkey retail kiosk featuring premium joinery, Corian countertops, and concealed power cable management.' },
  { title: 'Corporate Event Stage & Activation', cat: 'Events', image: 'portfolio/event-activation.jpg', loc: 'Madinat Jumeirah, Dubai', span: 'tm-span-11', desc: 'Full stage backdrop, AV surrounds, printed acoustic fabric panels, and VIP photo op activations.' },
  { title: 'Commercial Fleet Vehicle Branding', cat: 'Vehicles', image: 'portfolio/vehicle-branding.jpg', loc: 'Dubai Investment Park (DIP)', span: 'tm-span-11', desc: 'Full 3M cast vinyl vehicle wraps engineered with UV-resistant overlaminate for extreme Gulf weather.' },
];

export function filterButtons(cls = '', gap) {
  return con({ name: 'Filters', cls: `tm-filters ${cls}`, dir: 'row', wrap: true, gap: gap ?? { d: 16, m: 8 }, z: 10 }, FILTERS.map((f, i) => w('button', {
    text: f, link: { url: '#', is_external: '', nofollow: '', custom_attributes: `data-filter|${f}` },
    typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase',
    typography_font_size: { unit: 'px', size: 14, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
    text_padding: { unit: 'px', top: '8', right: '16', bottom: '8', left: '16', isLinked: false },
    border_radius: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true },
  }, { cls: `tm-filter${i === 0 ? ' is-active' : ''}`, name: `Filter – ${f}` })));
}

export function projectCard(pj, cls = '') {
  return con({
    name: pj.title, cls: `tm-proj tm-cat-${pj.cat.toLowerCase()} ${pj.span} ${cls}`, dir: 'column', jc: 'flex-end', radius: 12, overflow: 'hidden', border: { w: 1, global: C.tm_border }, bgg: C.tm_card,
    shadow: { v: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,.1)' }, extra: {}, gap: 0,
    // data attributes for the filter
    ...{},
  }, [
    image({ src: asset(pj.image), alt: pj.title, fit: 'cover', cls: 'tm-proj__img', name: 'Project image' }),
    con({ name: 'Hover overlay', cls: 'tm-proj__over', dir: 'column', jc: 'flex-end', pad: 32, gap: 0, fill: true }, [
      heading({ t: pj.cat, tag: 'span', cls: 'tm-proj__cat', color: C.tm_pink, family: F.b, weight: 700, tt: 'uppercase', size: 14, lh: 1.4286, ls: 0.1, lsUnit: 'em', mar: [0, 0, 8, 0] }),
      h(pj.title.replace(/&/g, '&amp;'), { tag: 'h4', cls: 'tm-proj__title', fs: '2xl', lh: 1.3333, track: 'wide', color: C.tm_white, tt: 'none', mar: [0, 0, 4, 0] }),
      iconList({ name: 'Location', cls: 'tm-proj__loc', items: [{ t: pj.loc }], iconSize: 6, indent: 8, color: '#d1d5db', family: F.b, size: 14, lh: 1.4286, mar: [0, 0, 24, 0] }),
      heading({ t: 'View Project Details →', tag: 'span', cls: 'tm-proj__cta', color: C.tm_white, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.05, lsUnit: 'em' }),
    ]),
  ]);
}

export function buildPortfolio() {
  return section({ name: 'Portfolio', cid: 'portfolio', cls: 'tm-portfolio', py: { d: 128, m: 96 }, gutter: { d: 32, m: 24 }, bgg: C.tm_bg }, [
    con({ name: 'Heading row', cls: 'tm-portfolio__head', dir: ['row', 'row', 'column'], jc: 'space-between', ai: ['flex-end', 'flex-end', 'flex-start'], gap: 32, mar: [0, 0, 64, 0], z: 10 }, [
      con({ name: 'Titles', cls: 'tm-portfolio__titles', dir: 'column', gap: 0 }, [
        heading({ t: 'PORTFOLIO', tag: 'div', cls: 'tm-bgword tm-bgword--portfolio', color: C.tm_heading, family: F.d, weight: 400, size: [128, 128, 96], lh: 1.5, pos: 'absolute', off: { t: -40, l: 0 } }),
        h('OUR WORK', { tag: 'h3', fs: ['6xl', '6xl', '5xl'], z: 10 }),
      ]),
      filterButtons(),
    ]),
    con({ name: 'Projects grid', cls: 'tm-portfolio__grid', grid: { cols: [3, 3, 1], gap: 16 } }, PROJECTS.map((x) => projectCard(x))),
    con({ name: 'CTA', dir: 'row', jc: 'center', mar: [64, 0, 0, 0] }, [
      w('button', {
        text: 'Explore All Project Services', link: link('#services'),
        typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase', typography_font_size: { unit: 'px', size: 14, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
        text_padding: { unit: 'px', top: '16', right: '32', bottom: '16', left: '32', isLinked: false }, border_radius: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true },
      }, { cls: 'tm-btn tm-btn--outline', name: 'Explore All Project Services' }),
    ]),
  ]);
}
