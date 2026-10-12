// Inner pages: About, Journey, Why Choose Us, Our Works, Awards, Facilities, Contact (+ shared sub-header banner).
import { con, heading, iconList, icon, image, w, shortcode, googleMap, C, F, h, p, text, lc, asset, home, section, eyebrow, px } from '../lib/parts.mjs';
import { buildAbout, buildJourney, buildCeo, buildAwards } from './sections2.mjs';
import { FILTERS, PROJECTS, filterButtons } from './sections1.mjs';

const WORKS_PROJECTS = PROJECTS.map((x) => (x.title === 'Architectural Illuminated Neon Signage' ? { ...x, title: 'Architectural Illuminated Signage' } : x));

const link = (url, ext) => ({ url, is_external: ext ? 'on' : '', nofollow: ext ? 'on' : '', custom_attributes: '' });
const bw = (t, r, b, l) => ({ unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false });
const BTN = (size = 14, sm = 12) => ({
  typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase',
  typography_font_size: { unit: 'px', size, sizes: [] }, typography_font_size_mobile: { unit: 'px', size: sm, sizes: [] },
  typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
});
const rad = (n) => ({ unit: 'px', top: String(n), right: String(n), bottom: String(n), left: String(n), isLinked: true });
const pad = (v, h2) => ({ unit: 'px', top: String(v), right: String(h2), bottom: String(v), left: String(h2), isLinked: false });

/** Sub-header banner used on Journey / Why / Works / Awards / Facilities / Contact */
export function subheader({ title, hl, crumb, bg, pill }) {
  const crumbs = iconList({
    name: 'Breadcrumb', cls: 'tm-crumb tm-crumb--center', view: 'inline', items: [{ t: 'Home', href: home('/') }, { t: crumb }], between: 8, color: C.tm_muted_fg, family: F.b, size: [14, 14, 12], lh: 1.4286, tt: 'uppercase', ls: 0.1, lsUnit: 'em', mar: [16, 0, 0, 0], self: 'center',
  });
  return con({
    name: 'Sub-header', cls: 'tm-subhead', tag: 'section', dir: 'column', ai: 'center', pad: { d: [160, 32, 80], t: [160, 32, 80], m: [160, 16, 80] }, overflow: 'hidden', bgimg: bg, bgpos: 'center center',
    border: { w: bw(0, 0, 1, 0), global: C.tm_border },
  }, [
    con({ name: 'Sub-header inner', boxed: 1296, dir: 'column', ai: 'center', gap: 0, z: 10, cls: 'tm-subhead__inner' }, [
      ...(pill ? [iconList({ name: 'Eyebrow', cls: 'tm-eyebrow-inline', items: [{ t: pill, icon: lc('sparkles') }], iconSize: 15, indent: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.2, lsUnit: 'em', mar: [0, 0, 12, 0] })] : []),
      h(`${title} <span class="tm-hl">${hl}</span>`, { tag: 'h1', fs: ['8xl', '8xl', '5xl'], track: 'tight', align: 'center', cls: 'tm-subhead__title' }),
      crumbs,
    ]),
  ]);
}

const sectionWrap = (name, kids, o = {}) => section({ name, cls: o.cls, py: o.py || { d: 112, t: 112, m: 80 }, gutter: { d: 32, m: 16 } }, kids);

/* ----------------------------------------------------------------------- About page */
export function buildAboutPage() {
  const stat = (n, l, color) => con({ name: l, cls: 'tm-vstat', dir: 'column', ai: 'center', gap: 0 }, [
    heading({ t: n, tag: 'div', color, family: F.d, weight: 400, size: [30, 30, 24], lh: [1.2, 1.2, 1.3333], align: 'center' }),
    heading({ t: l, tag: 'div', color: '#d1d5db', family: F.b, weight: 400, tt: 'uppercase', size: 11, lh: 1.5, ls: 0.05, lsUnit: 'em', align: 'center' }),
  ]);
  const sep = () => con({ name: 'Divider', cls: 'tm-vsep', w: px(1) }, []);
  const hero = con({
    name: 'About video hero', cls: 'tm-vhero', tag: 'section', dir: 'column', ai: 'center', jc: 'center', pad: { d: [128, 32, 64], t: [128, 32, 64], m: [128, 16, 64] }, overflow: 'hidden', minh: ['62vh', '62vh', '55vh'],
    border: { w: bw(0, 0, 1, 0), global: C.tm_border }, bg: '#000000',
    extra: { background_background: 'video', background_video_link: '{{theme}}/assets/media/about-video.mp4', background_play_on_mobile: 'yes', background_privacy_mode: '', background_video_fallback: { url: '{{theme}}/assets/images/about/main-cover.png', id: '' }, background_play_once: '' },
  }, [
    con({ name: 'Hero content', boxed: 1296, dir: 'column', ai: 'center', gap: 0, z: 10, cls: 'tm-vhero__inner' }, [
      iconList({ name: 'Badge', cls: 'tm-vbadge', items: [{ t: '360° Advertising & Visual Fabrication Hub', icon: lc('sparkles') }], iconSize: 14, indent: 8, iconColor: C.primary, color: C.tm_pink, family: F.b, weight: 600, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.1, lsUnit: 'em', mar: [0, 0, 16, 0], self: 'center' }),
      h('ABOUT <span class="tm-hl">TRINITY MEDIA</span>', { tag: 'h1', fs: ['8xl', '8xl', '5xl'], track: 'tight', color: '#ffffff', align: 'center', cls: 'tm-vhero__title' }),
      p("Dubai's premier full-spectrum advertising partner — delivering high-impact print engineering, bespoke exhibition builds, and commercial fleet branding.", { fs: ['lg', 'lg', 'sm'], color: '#e5e7eb', align: 'center', mar: [16, 0, 0, 0], lh: 1.625, cls: 'tm-vhero__lead' }),
      iconList({ name: 'Breadcrumb', cls: 'tm-crumb tm-crumb--center tm-crumb--onvideo', view: 'inline', items: [{ t: 'Home', href: home('/') }, { t: 'About Us' }], between: 8, color: '#d1d5db', family: F.b, size: [14, 14, 12], lh: 1.4286, tt: 'uppercase', ls: 0.1, lsUnit: 'em', mar: [24, 0, 0, 0], self: 'center' }),
      con({ name: 'Quick metrics', cls: 'tm-vmetrics', dir: 'row', jc: 'center', ai: 'center', wrap: true, gap: { d: 32, m: 16 }, pad: [24, 0, 0, 0], mar: [32, 0, 0, 0], border: { w: bw(1, 0, 0, 0), color: 'rgba(255,255,255,.15)' } }, [
        stat('2010', 'Established in UAE', '#ffffff'), sep(), stat('2,000+', 'Projects Delivered', C.primary), sep(), stat('18,000 Sq.Ft', 'DIP-1 Facility', '#ffffff'),
      ]),
    ]),
  ]);
  return [hero, buildAbout(), buildJourney(), buildCeo()];
}

export const buildJourneyPage = () => [
  subheader({ title: 'OUR', hl: 'JOURNEY', crumb: 'Our Journey', bg: asset('generated/manufacturing.jpg') }),
  buildJourney(),
];

/* ----------------------------------------------------------------------- Why choose us */
const BENTO = [
  { img: 'why-choose-us/exhibition.jpg', label: 'EXHIBITION STANDS', sub: 'World-class bespoke booths for DWTC', span: 'tm-bento-22', badge: '2,000+ builds' },
  { img: 'why-choose-us/retail.jpg', label: 'RETAIL & MALL SIGNAGE', sub: 'Backlit acrylic, LED & POSM displays', span: 'tm-bento-11', badge: '250+ brands' },
  { img: 'why-choose-us/vehicle.jpg', label: 'VEHICLE BRANDING', sub: 'Full fleet wraps & partial graphics', span: 'tm-bento-11', badge: 'Dubai based' },
  { img: 'manufacturing/facility.jpg', label: '18,000 SQFT FACILITY', sub: 'UV flatbed, HP Latex & CNC in-house', span: 'tm-bento-21', badge: 'ISO Certified' },
];
function bento(items, big = false) {
  return con({ name: 'Bento mosaic', cls: `tm-bento ${big ? 'tm-bento--lg' : ''}`, grid: { cols: [3, 3, 1], gap: 16 } }, items.map((c, i) => con({
    name: c.label, cls: `tm-bcell ${c.span} tm-rv tm-rv-pop tm-d${i * 2}`, dir: 'column', jc: 'flex-end', radius: 16, overflow: 'hidden', border: { w: 1, global: C.tm_border }, shadow: { v: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,.1)' }, gap: 0,
  }, [
    image({ src: asset(c.img), alt: c.label, fit: 'cover', cls: 'tm-bcell__img', name: 'Image' }),
    heading({ t: c.badge, tag: 'span', cls: 'tm-bcell__badge', color: '#ffffff', family: F.b, weight: 700, tt: 'uppercase', size: 10, lh: 1.5, ls: 0.1, lsUnit: 'em', pos: 'absolute', off: { t: 16, l: 16 }, z: 5 }),
    con({ name: 'Label', cls: 'tm-bcell__label', dir: 'row', jc: 'space-between', ai: 'flex-end', gap: 12, pad: big ? 24 : 20, pos: 'absolute', off: { b: 0, l: 0 }, z: 5 }, [
      con({ name: 'Text', dir: 'column', gap: 2 }, [
        h(c.label.replace(/&/g, '&amp;'), { tag: 'h4', fs: big ? '2xl' : 'xl', lh: 1.25, track: 'wide', color: '#ffffff' }),
        heading({ t: c.sub, tag: 'p', color: big ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.75)', family: F.b, size: 12, lh: 1.3333, mar: [big ? 4 : 2, 0, 0, 0] }),
      ]),
      con({ name: 'Check', cls: 'tm-bcell__check', w: px(big ? 40 : 36), dir: 'row', ai: 'center', jc: 'center', radius: 9999, minh: big ? 40 : 36 }, [icon({ icon: lc('circle-check'), size: big ? 18 : 16, color: '#ffffff' })]),
    ]),
  ])));
}

export function buildWhyPage() {
  const stats = [['11+', 'Years in UAE', 'Since 2011'], ['2,000+', 'Projects Delivered', 'On schedule'], ['250+', 'Corporate Clients', 'Across all 7 Emirates'], ['18,000', 'Sqft Production', 'DIP-1 Dubai']].map(([v, l, s], i) => con({
    name: l, cls: `tm-wstat tm-rv tm-rv-up tm-d${i}`, dir: 'column', ai: 'center', gap: 0, pad: 24, radius: 12, border: { w: 1, color: 'rgba(182,62,204,.25)' }, bgg: C.tm_card, shadow: { v: 1, blur: 2, color: 'rgba(0,0,0,.05)' },
  }, [
    heading({ t: v, tag: 'div', cls: 'tm-wstat__v', color: C.primary, family: F.d, weight: 400, size: [48, 48, 36], lh: 1, align: 'center' }),
    heading({ t: l, tag: 'div', color: C.tm_heading, family: F.d, weight: 400, tt: 'uppercase', size: 16, lh: 1.5, ls: 0.025, lsUnit: 'em', align: 'center', mar: [4, 0, 0, 0] }),
    heading({ t: s, tag: 'div', color: C.tm_muted_fg, family: F.b, size: 12, lh: 1.3333, align: 'center', mar: [2, 0, 0, 0] }),
  ]));
  const trust = [['🖨️', 'Best Machinery', 'UV Flatbed, HP Latex & CNC cutters'], ['👷', 'Expert Team', 'Skilled fabrication engineers & artisans'], ['💰', 'Competitive Pricing', 'Direct in-house, no middleman markup'], ['⚡', 'On-Time Delivery', '24/7 production, strict deadlines met'], ['😊', 'Friendly Service', 'Dedicated project managers, end-to-end'], ['🛡️', 'ISO Certified Quality', 'Premium inks, European substrates'], ['👍', '100% Satisfaction', 'From concept to on-site handover']].map(([e, t, d], i) => con({
    name: t, cls: `tm-trust tm-rv tm-rv-up tm-d${i}`, dir: 'column', ai: 'center', gap: 0, pad: 16, radius: 12, border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 1, blur: 2, color: 'rgba(0,0,0,.05)' },
  }, [
    heading({ t: e, tag: 'div', color: C.tm_heading, family: F.b, size: 30, lh: 1.2, align: 'center', mar: [0, 0, 12, 0] }),
    heading({ t, tag: 'h4', color: C.tm_heading, family: F.b, weight: 700, tt: 'uppercase', size: 14, lh: 1.4286, ls: 0.025, lsUnit: 'em', align: 'center', mar: [0, 0, 4, 0] }),
    p(d, { fs: '11', lh: 1.625, align: 'center' }),
  ]));
  const body = section({ name: 'Why choose us', cid: 'why-us', cls: 'tm-why', py: { d: 128, t: 128, m: 80 }, gutter: { d: 32, m: 16 }, overflow: 'hidden', bgg: C.tm_bg }, [
    con({ name: 'Heading row', cls: 'tm-why-head', dir: ['row', 'row', 'column'], jc: 'space-between', ai: ['flex-end', 'flex-end', 'flex-start'], gap: 24, mar: [0, 0, 56, 0] }, [
      con({ name: 'Titles', dir: 'column', gap: 0 }, [
        iconList({ name: 'Eyebrow', cls: 'tm-eyebrow-inline', items: [{ t: 'Printing simplified since 2011', icon: lc('sparkles') }], iconSize: 15, indent: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.2, lsUnit: 'em', mar: [0, 0, 12, 0] }),
        h('WHY CHOOSE <span class="tm-hl">TRINITY MEDIA</span>', { tag: 'h2', fs: ['7xl', '7xl', '4xl'], track: 'tight' }),
      ]),
      p('Devoted to brilliance. Every product printed with perfection — quality that speaks when words fail.', { fs: 'base', lh: 1.625, color: C.tm_heading, cls: 'tm-why-head__note', align: ['right', 'right', 'left'] }),
    ]),
    con({ name: 'Bento wrap', mar: [0, 0, 64, 0], dir: 'column' }, [bento(BENTO)]),
    con({ name: 'Stats bar', cls: 'tm-wstats', grid: { cols: [4, 4, 2], gap: 16 }, mar: [0, 0, 80, 0] }, stats),
    con({ name: 'Trust factors', dir: 'column', gap: 40, mar: [0, 0, 80, 0] }, [
      con({ name: 'Heading', cls: 'tm-center-head', dir: 'column', ai: 'center', gap: 4 }, [
        eyebrow('Choose the right partner', { align: 'center' }),
        h('EXPERTISE YOU CAN TRUST', { fs: ['4xl', '4xl', '3xl'], align: 'center', mar: [4, 0, 0, 0] }),
      ]),
      con({ name: 'Trust grid', cls: 'tm-trust__grid', grid: { cols: [7, 4, 2], gap: 16 } }, trust),
    ]),
    askBanner({ eyebrow: 'Direct Consultation', title: 'HAVE A QUESTION? ASK OUR EXPERT NOW.', text: 'Our senior print engineers and estimators in DIP-1 are available to assist with custom dimensions, material samples, and expedited deadlines.', waText: 'Hi%20Trinity%20Media%2C%20I%20have%20an%20urgent%20question%20regarding%20a%20project.', tel: true, big: false }),
  ]);
  return [subheader({ title: 'WHY', hl: 'CHOOSE US', crumb: 'Why Choose Us', bg: asset('generated/services.jpg') }), body];
}

/** purple gradient banner with white + WhatsApp buttons (Why page & Works page) */
function askBanner(o) {
  const left = con({ name: 'Text', cls: 'tm-ask__text', dir: 'column', gap: 0, maxw: 576 }, [
    heading({ t: o.eyebrow, tag: 'span', color: C.tm_pink, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.1, lsUnit: 'em', mar: [0, 0, 4, 0] }),
    h(o.title, { tag: 'h3', fs: ['5xl', '5xl', '3xl'], color: '#ffffff' }),
    p(o.text, { fs: ['sm', 'sm', 'xs'], color: 'rgba(252,231,243,.9)', mar: [8, 0, 0, 0] }),
  ]);
  const white = o.tel
    ? w('button', { text: '+971 52 693 5456', link: link('tel:+971526935456'), selected_icon: { value: lc('phone'), library: 'tm-lucide' }, icon_align: 'row', icon_indent: { unit: 'px', size: 10, sizes: [] }, background_background: 'classic', background_color: '#ffffff', button_text_color: C.primary[1], __globals__: { button_text_color: 'globals/colors?id=primary' }, ...BTN(14, 12), border_radius: rad(4), text_padding: pad(16, 32) }, { cls: 'tm-btn tm-btn--white', name: 'Call' })
    : w('button', { text: 'Request Proposal', link: link(home('/contact/')), selected_icon: { value: lc('arrow-right'), library: 'tm-lucide' }, icon_align: 'row-reverse', icon_indent: { unit: 'px', size: 10, sizes: [] }, background_background: 'classic', background_color: '#ffffff', button_text_color: C.primary[1], __globals__: { button_text_color: 'globals/colors?id=primary' }, ...BTN(14, 12), border_radius: rad(4), text_padding: pad(16, 32) }, { cls: 'tm-btn tm-btn--white', name: 'Request Proposal' });
  const wa = w('button', {
    text: 'WhatsApp Chat', link: link(`https://wa.me/971526935456?text=${o.waText}`, true), selected_icon: { value: 'fab fa-whatsapp', library: 'fa-brands' }, icon_align: 'row', icon_indent: { unit: 'px', size: 10, sizes: [] }, background_background: 'classic', background_color: '#16a34a', __globals__: { background_color: 'globals/colors?id=tm_whatsapp' }, button_text_color: '#ffffff', ...BTN(14, 12),
    border_radius: rad(4), text_padding: pad(16, 32),
  }, { cls: 'tm-btn tm-btn--wa tm-btn--wa-lg', name: 'WhatsApp Chat' });
  return con({
    name: 'Consultation banner', cls: 'tm-ask', dir: ['row', 'row', 'column'], jc: 'space-between', ai: 'center', gap: 32, pad: { d: o.big ? 56 : 48, m: 32 }, radius: 16, overflow: 'hidden',
    grad: { a: '#4d195a', b: '#200727', angle: 90 }, border: { w: 1, color: 'rgba(182,62,204,.5)' }, shadow: { v: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,.25)' },
  }, [left, con({ name: 'Buttons', dir: 'row', ai: 'center', gap: 16, wrap: true }, [white, wa])]);
}

/* ----------------------------------------------------------------------- Our works */
export function buildWorksPage() {
  const body = con({ name: 'Works', cls: 'tm-works', tag: 'section', dir: 'column', pad: { d: [112, 32], t: [112, 32], m: [80, 16] } }, [
    con({ name: 'Works inner', boxed: 1296, dir: 'column', gap: 96 }, [
      con({ name: 'Featured projects', dir: 'column', gap: 48 }, [
        con({ name: 'Heading row', cls: 'tm-works-head', dir: ['row', 'row', 'column'], jc: 'space-between', ai: ['flex-end', 'flex-end', 'flex-start'], gap: 24 }, [
          con({ name: 'Titles', dir: 'column', gap: 8 }, [
            eyebrow('Portfolio Highlights'),
            h('FEATURED <span class="tm-hl">PROJECTS</span>', { tag: 'h2', fs: ['6xl', '6xl', '4xl'], track: 'tight' }),
          ]),
          p('Explore a curated selection of our high-impact exhibition builds, mall retail signage, and commercial vehicle fleet transformations delivered across Dubai and the UAE.', { fs: 'sm', lh: 1.625, cls: 'tm-works-head__note', align: ['right', 'right', 'left'] }),
        ]),
        bento(BENTO.map((b, i) => (i === 3 ? { ...b, label: '18,000 SQFT PRODUCTION' } : b)), true),
      ]),
      con({ name: 'Project archive', dir: 'column', gap: 48 }, [
        con({ name: 'Heading row', dir: ['row', 'row', 'column'], jc: 'space-between', ai: ['flex-end', 'flex-end', 'flex-start'], gap: 24 }, [
          con({ name: 'Titles', dir: 'column', gap: 8 }, [eyebrow('Browse By Category'), h('PROJECT ARCHIVE', { tag: 'h3', fs: ['5xl', '5xl', '4xl'], track: 'tight' })]),
          filterButtons('tm-filters--works', 8),
        ]),
        con({ name: 'Projects grid', cls: 'tm-works__grid', grid: { cols: [3, 3, 1], gap: 20 } }, WORKS_PROJECTS.map((pj) => con({
          name: pj.title, cls: `tm-proj tm-proj--works tm-cat-${pj.cat.toLowerCase()} ${pj.span}`, dir: 'column', jc: 'flex-end', radius: 16, overflow: 'hidden', border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,.1)' }, gap: 0,
        }, [
          image({ src: asset(pj.image), alt: pj.title, fit: 'cover', cls: 'tm-proj__img', name: 'Project image' }),
          con({ name: 'Caption', cls: 'tm-proj__cap', dir: 'column', jc: 'flex-end', pad: 24, gap: 0, fill: true, z: 10 }, [
            heading({ t: pj.cat, tag: 'span', color: C.tm_pink, family: F.b, weight: 700, tt: 'uppercase', size: 11, lh: 1.5, ls: 0.1, lsUnit: 'em', mar: [0, 0, 4, 0] }),
            h(pj.title.replace(/&/g, '&amp;'), { tag: 'h4', fs: ['2xl', 'xl', 'xl'], lh: 1.375, track: 'wide', color: '#ffffff', tt: 'none', mar: [0, 0, 6, 0] }),
            iconList({ name: 'Location', cls: 'tm-proj__loc', items: [{ t: pj.loc }], color: 'rgba(255,255,255,.7)', family: F.b, size: 12, lh: 1.3333, mar: [0, 0, 12, 0] }),
            p(pj.desc, { cls: 'tm-proj__desc', fs: 'xs', color: 'rgba(255,255,255,.85)', lh: 1.625 }),
          ]),
        ]))),
      ]),
      askBanner({ eyebrow: 'Ready to Start Your Project?', title: "Let's Bring Your Vision To Reality.", text: 'Speak directly with our fabrication engineers and estimators in DIP-1 for material samples, custom engineering, and quotation.', waText: 'Hi%20Trinity%20Media%2C%20I%20saw%20your%20portfolio%20of%20works%20and%20would%20like%20to%20discuss%20a%20project.', tel: false, big: true }),
    ]),
  ]);
  return [subheader({ title: 'OUR', hl: 'WORKS', crumb: 'Our Works', bg: asset('generated/services.jpg'), pill: 'Turnkey Visual Fabrication' }), body];
}

export const buildAwardsPage = () => [
  subheader({ title: 'AWARDS &', hl: 'SPONSORSHIPS', crumb: 'Awards & Sponsorships', bg: asset('generated/portfolio1.jpg') }),
  buildAwards(),
];

/* ----------------------------------------------------------------------- Facilities */
export function buildFacilitiesPage() {
  const EQ = [
    ['UV Flatbed & Hybrid Printers', 'Industrial grade flatbeds capable of direct-to-substrate printing on acrylic, wood, glass, metal, stone, leather, and irregular materials up to 100mm thickness with vibrant white ink and spot varnish effects.', ['High-speed Ricoh Gen6 printheads', 'Dual UV-LED curing lamps', 'Max print width: 3.2m seamless']],
    ['HP Latex & Eco-Solvent Roll-to-Roll', 'Odorless, UL ECOLOGO and GREENGUARD Gold certified latex inks engineered for indoor healthcare, hotel wallpapers, retail window graphics, and vehicle fleet wraps with instant drying.', ['True 1200 DPI resolution', 'Scratch-resistant polymer inks', 'Wide spool 3.2m & 1.6m lineup']],
    ['CNC Routing & Laser Profiling', 'Heavy-duty 3-axis CNC router tables and high-precision fiber laser cutting machines for wood fabrication, acrylic letters, metal fascias, display fixtures, and custom exhibition structures.', ['Automatic tool changers (ATC)', '0.05mm precision cutting', 'Large 4m x 2m vacuum bed']],
    ['Finishing, Welding & Fabrication', 'Full in-house carpentry, aluminum welding, acrylic thermoforming, hot-air banner seamers, automated eyelet machines, and laminators ensuring structural stability and longevity.', ['Automatic roll laminators', 'Structural metal welding', 'Dust-controlled spray booth']],
  ];
  const cards = EQ.map(([t, d, specs], i) => con({
    name: t, cls: `tm-eq tm-rv tm-rv-up tm-d${i % 2}`, dir: 'column', jc: 'space-between', gap: 24, pad: 32, radius: 16, border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,.1)' },
  }, [
    con({ name: 'Top', dir: 'column', gap: 0 }, [
      con({ name: 'Title row', dir: 'row', ai: 'center', gap: 12, mar: [0, 0, 16, 0] }, [
        con({ name: 'Icon box', cls: 'tm-eq__ico', w: px(40), dir: 'row', ai: 'center', jc: 'center', radius: 8, minh: 40 }, [icon({ icon: lc('cpu'), size: 22, color: C.primary })]),
        h(t.replace(/&/g, '&amp;'), { tag: 'h4', fs: '2xl', lh: 1.3333 }),
      ]),
      p(d, { fs: 'sm', lh: 1.625 }),
    ]),
    con({ name: 'Specs wrap', cls: 'tm-eq__specswrap', dir: 'column', gap: 0, pad: [16, 0, 0, 0], border: { w: bw(1, 0, 0, 0), global: C.tm_border } }, [iconList({ name: 'Specs', cls: 'tm-eq__specs', items: specs.map((s) => ({ t: s, icon: lc('circle-check') })), iconSize: 13, indent: 8, between: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 500, size: 12, lh: 1.3333 })]),
  ]));
  const intro = con({ name: 'Intro', cls: 'tm-fac-intro', grid: { cols: [2, 1, 1], gap: 48 }, ai: 'center', mar: [0, 0, 80, 0] }, [
    con({ name: 'Text', dir: 'column', gap: 0 }, [
      iconList({ name: 'Eyebrow', cls: 'tm-eyebrow-inline', items: [{ t: 'DIP-1 Manufacturing Powerhouse', icon: lc('sparkles') }], iconSize: 16, indent: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: [14, 14, 12], lh: 1.4286, ls: 0.2, lsUnit: 'em', mar: [0, 0, 12, 0] }),
      h('18,000 SQFT OF ADVANCED PRINTING & FABRICATION', { tag: 'h2', fs: ['6xl', '6xl', '4xl'], mar: [0, 0, 24, 0] }),
      p('Delivering the best printing solutions in and around Dubai, Trinity Media operates a modern manufacturing facility in <strong>Warehouse No. 4, Plot 194-0, Dubai Investment Park 1</strong>.', { fs: ['base', 'base', 'sm'], lh: 1.625, mar: [0, 0, 24, 0] }),
      p('We provide flex printing services, digital flex design, picture printing, fabric printing, canvas printing, roll up banners, car stickers, vehicle printing, digital textile printing, glass printing, material printing, car branding stickers, vinyl printing, vehicle branding, canvas digital printing, large scale vinyl cutting, banner printing, pull up stand banners, and custom POSM displays.', { fs: ['sm', 'sm', 'xs'], lh: 1.625, mar: [0, 0, 32, 0] }),
      w('button', { text: 'Schedule Factory Visit', link: link(home('/contact/')), background_background: 'classic', background_color: C.primary[1], __globals__: { background_color: 'globals/colors?id=primary' }, button_text_color: '#ffffff', align: 'left', ...BTN(14, 12), border_radius: rad(4), text_padding: pad(12, 28) }, { cls: 'tm-btn tm-btn--primary tm-btn--xl', name: 'Schedule Factory Visit' }),
    ]),
    con({ name: 'Photos', cls: 'tm-fac-photos', grid: { cols: [2, 2, 2], gap: 16 } }, [
      con({ name: 'Photo 1', cls: 'tm-fac-photo', radius: 12, overflow: 'hidden', border: { w: 1, global: C.tm_border }, minh: [288, 288, 256] }, [image({ src: asset('services/acrylic-fabrication/01.jpg'), alt: 'Trinity Workshop', fit: 'cover', h: [288, 288, 256], cls: 'tm-fac-photo__img' })]),
      con({ name: 'Photo 2', cls: 'tm-fac-photo tm-fac-photo--2', radius: 12, overflow: 'hidden', border: { w: 1, global: C.tm_border }, minh: [288, 288, 256], mar: [24, 0, 0, 0] }, [image({ src: asset('services/large-format-digital-printing/02.jpg'), alt: 'Printing Press', fit: 'cover', h: [288, 288, 256], cls: 'tm-fac-photo__img' })]),
    ]),
  ]);
  const machinery = con({ name: 'Machinery', dir: 'column', gap: 56, mar: [0, 0, 0, 0] }, [
    con({ name: 'Heading', cls: 'tm-center-head', dir: 'column', ai: 'center', gap: 0 }, [
      eyebrow('Cutting-Edge Infrastructure', { align: 'center' }),
      h('PRODUCTION CAPABILITIES & MACHINERY', { fs: ['5xl', '5xl', '3xl'], align: 'center', mar: [4, 0, 0, 0] }),
    ]),
    con({ name: 'Machinery cards', cls: 'tm-eq__grid', grid: { cols: [2, 2, 1], gap: 24 } }, cards),
  ]);
  const main = con({ name: 'Facilities', cls: 'tm-facilities', tag: 'section', dir: 'column', pad: { d: [112, 32], t: [112, 32], m: [80, 16] } }, [con({ name: 'Facilities inner', boxed: 1296, dir: 'column', gap: 0 }, [intro, machinery])]);
  return [subheader({ title: 'OUR', hl: 'FACILITIES', crumb: 'Our Facilities', bg: asset('services/large-format-digital-printing/01.jpg') }), main];
}

/* ----------------------------------------------------------------------- Contact */
export function buildContactPage() {
  const ch = (label, val, href, ic) => con({ name: label, cls: 'tm-channel', link: link(href), dir: 'row', ai: 'center', gap: 12, pad: 12, radius: 12, border: { w: 1, global: C.tm_border }, bgg: C.tm_muted }, [
    icon({ icon: lc(ic), size: 16, color: C.primary, cls: 'tm-channel__ico' }),
    con({ name: 'Text', dir: 'column', gap: 0 }, [
      heading({ t: label, tag: 'span', color: C.tm_muted_fg, family: F.b, weight: 600, tt: 'uppercase', size: 10, lh: 1.3333, ls: 0.05, lsUnit: 'em' }),
      heading({ t: val, tag: 'span', cls: 'tm-channel__val', color: C.tm_heading, family: F.b, weight: 600, size: 12, lh: 1.3333 }),
    ]),
  ]);
  const hq = con({ name: 'Head quarters', cls: 'tm-hq tm-rv tm-rv-up', dir: ['row', 'row', 'column'], ai: ['flex-start', 'flex-start', 'center'], gap: 32, pad: { d: 40, m: 32 }, radius: 16, overflow: 'hidden', border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,.1)' } }, [
    con({ name: 'Icon badge', cls: 'tm-hq__ico', w: px(80), dir: 'row', ai: 'center', jc: 'center', radius: 16, border: { w: 1, color: 'rgba(182,62,204,.2)' }, minh: 80 }, [icon({ icon: lc('building-2'), size: 40, color: C.primary })]),
    con({ name: 'Details', cls: 'tm-hq__body', dir: 'column', gap: 12, ai: ['flex-start', 'flex-start', 'center'] }, [
      iconList({ name: 'Pill', cls: 'tm-badge tm-badge--solid', items: [{ t: 'Central Operations & Production Facility' }], color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.05, lsUnit: 'em' }),
      h('HEAD <span class="tm-hl">QUARTERS</span>', { tag: 'h3', fs: ['4xl', '4xl', '3xl'], track: 'tight' }),
      iconList({ name: 'Address', cls: 'tm-hq__addr', items: [{ t: 'Warehouse No. 4, Plot 194-0, Near Aiko Mall, Opp. BSL Gulf LLC, Dubai Investment park 1, Dubai UAE.', icon: lc('map-pin') }], iconSize: 18, indent: 8, iconColor: C.primary, color: C.tm_heading, family: F.b, size: 14, lh: 1.625, vAlign: 'start', iconTop: 2 }),
      con({ name: 'Channels', cls: 'tm-hq__channels', grid: { cols: [3, 3, 1], gap: 14 }, pad: [16, 0, 0, 0], border: { w: bw(1, 0, 0, 0), global: C.tm_border } }, [
        ch('Landline', '+971 4 340 9377', 'tel:+97143409377', 'phone'), ch('Mobile / WhatsApp', '+971 52 693 5456', 'tel:+971526935456', 'phone'), ch('Email Desk', 'inquiry@trinitymediauae.com', 'mailto:inquiry@trinitymediauae.com', 'mail'),
      ]),
    ]),
  ]);
  const form = con({ name: 'Contact form card', cls: 'tm-glass tm-glass--contact tm-cf', dir: 'column', gap: 0, pad: { d: 40, m: 32 }, radius: 16 }, [
    h('Send Us A Message', { tag: 'h3', fs: '3xl', lh: 1.2, mar: [0, 0, 8, 0] }),
    p('Fill out the inquiry form below for specifications, print consultations, or requests for proposal.', { fs: 'xs', lh: 1.3333, mar: [0, 0, 24, 0] }),
    shortcode({ sc: '[trinity_form type="contact"]', name: 'Contact form' }),
  ]);
  const map = con({ name: 'Location card', cls: 'tm-loc', dir: 'column', jc: 'space-between', gap: 0, radius: 16, overflow: 'hidden', border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 10, blur: 15, spread: -3, color: 'rgba(0,0,0,.1)' } }, [
    con({ name: 'Location head', cls: 'tm-loc__head', dir: 'row', jc: 'space-between', ai: 'center', gap: 12, pad: 24, border: { w: bw(0, 0, 1, 0), global: C.tm_border } }, [
      con({ name: 'Titles', dir: 'column', gap: 0 }, [eyebrow('Facility Location', { pad: [6, 0, 2, 0] }), h('Trinity Media LLC — DIP 1 Press', { tag: 'h4', fs: '2xl', lh: 1.3333, tt: 'none' })]),
      heading({ t: 'Open Mon - Sat', tag: 'span', cls: 'tm-loc__open', color: C.primary, family: F.b, weight: 600, size: 12, lh: 1.3333 }),
    ]),
    con({ name: 'Map', cls: 'tm-loc__map', dir: 'column', gap: 0 }, [googleMap({ address: 'Warehouse No. 4, Plot 194-0, Near Aiko Mall, Dubai Investment Park 1, Dubai UAE', zoom: 14, h: 380, cls: 'tm-map', name: 'Google Map' })]),
    con({ name: 'Location foot', cls: 'tm-loc__foot', dir: ['row', 'row', 'column'], jc: 'space-between', ai: 'center', gap: 16, pad: 24, bgg: C.tm_muted, border: { w: bw(1, 0, 0, 0), global: C.tm_border } }, [
      iconList({ items: [{ t: 'Warehouse No. 4, Plot 194-0, Near Aiko Mall, Opp. BSL Gulf LLC, DIP 1, Dubai UAE', icon: lc('map-pin') }], iconSize: 16, indent: 8, iconColor: C.primary, color: C.tm_heading, family: F.b, size: 12, lh: 1.3333, vAlign: 'start' }),
      heading({ t: 'Open in Maps →', tag: 'div', href: 'https://maps.google.com/maps?q=Dubai+Investment+Park+1', ext: true, color: C.primary, family: F.b, weight: 600, size: 12, lh: 1.3333, cls: 'tm-loc__link' }),
    ]),
  ]);
  const body = con({
    name: 'Contact', cid: 'contact', cls: 'tm-contact', tag: 'section', dir: 'column', pad: { d: [128, 32], t: [128, 32], m: [80, 16] },
  }, [
    con({ name: 'Contact inner', boxed: 1296, dir: 'column', gap: 0 }, [
      con({ name: 'Heading', cls: 'tm-center-head tm-center-head--wide', dir: 'column', ai: 'center', gap: 0, mar: [0, 0, 64, 0] }, [
        eyebrow('Get in Touch', { align: 'center', mar: [0, 0, 8, 0] }),
        h('INQUIRE <span class="tm-hl">NOW</span>', { tag: 'h2', fs: ['7xl', '7xl', '4xl'], track: 'tight', align: 'center' }),
        p('Connect directly with our Head Quarters and central production team in Dubai Investment Park 1.', { fs: ['base', 'base', 'sm'], align: 'center', mar: [16, 0, 0, 0] }),
      ]),
      con({ name: 'HQ wrap', cls: 'tm-hq-wrap', dir: 'column', mar: [0, 0, 64, 0], maxw: 896 }, [hq]),
      con({ name: 'Form + map', cls: 'tm-contact__grid', grid: { cols: [2, 1, 1], gap: { d: 48, t: 32, m: 32 } }, ai: 'stretch' }, [form, map]),
    ]),
  ]);
  return [subheader({ title: 'CONTACT', hl: 'US', crumb: 'Contact', bg: asset('generated/hero.jpg') }), body];
}
