// Home sections 2/2 (also reused on inner pages): About, Milestones, Awards, Journey timeline, CEO message, Why-Trinity.
import { con, heading, iconList, icon, image, w, counter, C, F, h, p, text, lc, asset, home, section, eyebrow, badge, px, dim } from '../lib/parts.mjs';

const link = (url, ext) => ({ url, is_external: ext ? 'on' : '', nofollow: ext ? 'on' : '', custom_attributes: '' });
const bw = (t, r, b, l) => ({ unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false });
const CARD_SHADOW = { v: 1, blur: 2, color: 'rgba(0,0,0,.05)' };
const BTN_TYPO = (size = 14, sm = 12) => ({
  typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase',
  typography_font_size: { unit: 'px', size, sizes: [] }, typography_font_size_mobile: { unit: 'px', size: sm, sizes: [] },
  typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
});
const btnRadius = (n) => ({ unit: 'px', top: String(n), right: String(n), bottom: String(n), left: String(n), isLinked: true });
const padBtn = (v, hh) => ({ unit: 'px', top: String(v), right: String(hh), bottom: String(v), left: String(hh), isLinked: false });

/* ----------------------------------------------------------------------- About */
export function buildAbout(opts = {}) {
  const media = con({
    name: 'Main image', cls: 'tm-about__media', dir: 'column', jc: 'flex-end', radius: 16, overflow: 'hidden', border: { w: 1, global: C.tm_border }, shadow: { v: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,.25)' }, gap: 0,
  }, [
    image({ src: asset('about/main-cover.png'), alt: 'Trinity Media 360 Advertising and Visual Fabrication Dubai', fit: 'cover', cls: 'tm-about__img', h: [540, 540, 460] }),
    con({ name: 'Floating tag', cls: 'tm-about__tag', dir: 'column', gap: 0, pad: [12, 20], radius: 8, pos: 'absolute', off: { b: 24, l: 24 }, z: 20 }, [
      heading({ t: '360° Creative Agency', tag: 'span', color: C.tm_pink, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.1, lsUnit: 'em' }),
      heading({ t: 'Full-Service Advertising In Dubai, UAE', tag: 'span', color: '#ffffff', family: F.d, weight: 400, size: 24, lh: 1.3333 }),
    ]),
  ]);
  const fleet = con({ name: 'Fleet card', cls: 'tm-about__fleet', dir: 'row', ai: 'center', gap: 12, pad: 10, radius: 12, pos: 'absolute', off: { b: -20, r: -20 }, z: 30 }, [
    image({ src: asset('about/vehicle-1.png'), alt: 'Trinity Media Company Fleet & Rapid Logistics', w: 64, h: 56, fit: 'cover', radius: 8, cls: 'tm-about__fleet-img' }),
    con({ name: 'Fleet text', dir: 'column', gap: 0 }, [
      heading({ t: 'In-House Operations', tag: 'span', color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 10, lh: 1.5, ls: 0.05, lsUnit: 'em' }),
      heading({ t: 'Dedicated Company Fleet', tag: 'span', color: C.tm_heading, family: F.b, weight: 600, size: 12, lh: 1.3333 }),
      heading({ t: 'Logistics & Install Across UAE', tag: 'span', color: C.tm_muted_fg, family: F.b, weight: 400, size: 10, lh: 1.5 }),
    ]),
  ]);
  const left = con({ name: 'Image column', cls: 'tm-about__left tm-rv tm-rv-left', dir: 'column', gap: 0 }, [media, fleet,
    con({ name: 'Corner accent TL', cls: 'tm-corner tm-corner--tl', pos: 'absolute', z: -1 }, []),
    con({ name: 'Corner accent BR', cls: 'tm-corner tm-corner--br', pos: 'absolute', z: -1 }, []),
  ]);

  const badges = [['360° Brand Strategy', 'compass'], ['Large Format & UV Print', 'layers'], ['Bespoke Fabrication', 'lightbulb'], ['Fleet & Signage Install', 'cpu']].map(([t, ic]) => con({
    name: t, cls: 'tm-about__pill', dir: 'column', ai: 'center', jc: 'center', gap: 6, pad: 12, radius: 8, border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: CARD_SHADOW,
  }, [
    icon({ icon: lc(ic), size: 18, color: C.primary, align: 'center', cls: 'tm-about__pill-ico' }),
    heading({ t, tag: 'span', color: C.tm_heading, family: F.b, weight: 600, tt: 'uppercase', size: 11, lh: 1.5, ls: 0.05, lsUnit: 'em', align: 'center' }),
  ]));
  const iso = [['ISO 9001', 'Quality Assurance', 'shield-check'], ['ISO 14001', 'Environmental Mgt.', 'leaf'], ['OHSAS 18001', 'Health & Safety', 'award']].map(([t, s, ic]) => con({
    name: t, cls: 'tm-about__iso', dir: 'row', ai: 'center', gap: 12, pad: 14, radius: 8, border: { w: 1, color: 'rgba(182,62,204,.2)' },
  }, [
    icon({ icon: lc(ic), size: 26, color: C.primary }),
    con({ name: 'ISO text', dir: 'column', gap: 0 }, [
      heading({ t, tag: 'span', color: C.tm_heading, family: F.d, weight: 400, size: 18, lh: 1 }),
      heading({ t: s, tag: 'span', color: C.tm_muted_fg, family: F.b, weight: 400, size: 10, lh: 1.5 }),
    ]),
  ]));

  const right = con({ name: 'Text column', cls: 'tm-about__right', dir: 'column', jc: 'center', gap: 0 }, [
    iconList({
      name: 'Eyebrow', cls: 'tm-eyebrow-inline tm-eyebrow-flex tm-eyebrow--lav tm-rv tm-rv-up', items: [{ t: '360° Advertising & Visual Fabrication Specialists In UAE', icon: lc('sparkles') }], iconSize: 16, indent: 8, iconColor: C.primary, color: C.primary,
      family: F.b, weight: 700, tt: 'uppercase', size: [14, 14, 12], lh: 1.4286, ls: 0.2, lsUnit: 'em', mar: [0, 0, 12, 0],
    }),
    h('TRINITY <span class="tm-hl">MEDIA LLC</span>', { fs: ['7xl', '7xl', '4xl'], lh: 0.92, track: 'tight', mar: [0, 0, 24, 0], cls: 'tm-rv tm-rv-up tm-d2', tag: 'h2' }),
    p('With over a decade of industry-defining mastery, <strong>2000+ completed projects</strong> and <strong>100% satisfied corporate partners</strong>, Trinity Media is Dubai’s premier full-service 360° advertising, visual branding, and fabrication powerhouse. Beyond traditional printing, we engineer complete 360-degree marketing solutions — encompassing large format digital printing, bespoke exhibition stand fabrication, luxury retail POSM displays, architectural illuminated signage, and nationwide commercial fleet branding.', { fs: ['lg', 'lg', 'base'], lh: 1.625, color: C.tm_heading, cls: 'tm-about__lead tm-rv tm-rv-up tm-d4', mar: [0, 0, 24, 0] }),
    p('Operating from our 18,000 sqft centralized production facility in Dubai Investment Park 1, we combine creative conceptualization, Swiss-grade UV flatbed and latex printing, advanced CNC routing, acrylic engineering, and end-to-end turnkey installation across the UAE and GCC.', { fs: 'sm', lh: 1.625, cls: 'tm-rv tm-rv-up tm-d5', mar: [0, 0, 32, 0] }),
    con({ name: 'Process badges', cls: 'tm-about__pills', grid: { cols: [4, 4, 2], gap: 12 }, mar: [0, 0, 32, 0] }, badges),
    con({ name: 'Certifications', cls: 'tm-about__certs', dir: 'column', gap: 16, pad: [24, 0, 0, 0], border: { w: bw(1, 0, 0, 0), global: C.tm_border } }, [
      heading({ t: 'International Standard Certifications', tag: 'div', color: C.tm_muted_fg, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.1, lsUnit: 'em' }),
      con({ name: 'ISO cards', grid: { cols: [3, 3, 1], gap: 12 } }, iso),
    ]),
  ]);

  const top = con({ name: 'About overview', cls: 'tm-about__top', grid: { cols: [2, 1, 1], gap: { d: 64, t: 48, m: 48 } }, ai: 'center', mar: [0, 0, 96, 0] }, [left, right]);

  const mvv = [['compass', 'Our Mission', 'As unique as your thoughts, we make every print an unparalleled visual experience through precision engineering.'],
    ['sparkles', 'Our Vision', 'To make high-end printing, bespoke fabrication, and architectural displays universally accessible across the MENA region.'],
    ['shield-check', 'Core Values', '<strong>Quality, Speed and Integrity</strong> — backed by transparent client partnerships and strict deadline adherence.']].map(([ic, t, d]) => con({
    name: t, cls: 'tm-mvv', dir: 'column', gap: 0, pad: 32, radius: 12, border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: CARD_SHADOW,
  }, [
    con({ name: 'Icon box', cls: 'tm-mvv__ico', w: px(48), dir: 'row', ai: 'center', jc: 'center', radius: 8, mar: [0, 0, 24, 0], minh: 48 }, [icon({ icon: lc(ic), size: 24, color: C.primary })]),
    h(t, { tag: 'h4', fs: '2xl', lh: 1.3333, mar: [0, 0, 8, 0] }),
    p(d, { fs: 'sm', lh: 1.625 }),
  ]));
  const mvvBlock = con({ name: 'Why we are at the top', cls: 'tm-about__mvv', dir: 'column', gap: 48, mar: [0, 0, 96, 0] }, [
    con({ name: 'Heading', cls: 'tm-center-head', dir: 'column', ai: 'center', gap: 0 }, [
      eyebrow('Modern Printing Technology', { align: 'center', pad: [6, 0, 2, 0] }),
      h('WHY WE ARE AT THE TOP', { fs: ['5xl', '5xl', '4xl'], mar: [4, 0, 0, 0], align: 'center' }),
    ]),
    con({ name: 'Mission / Vision / Values', cls: 'tm-mvv__grid', grid: { cols: [3, 3, 1], gap: 24 } }, mvv),
  ]);

  const glass = (t, d, extraNode) => con({ name: t, cls: 'tm-banner__card', dir: extraNode ? 'row' : 'column', ai: extraNode ? 'center' : 'flex-start', gap: extraNode ? 12 : 0, pad: 16, radius: 12 }, extraNode
    ? [extraNode, con({ name: 'Text', dir: 'column', gap: 2 }, [h(t, { tag: 'div', fs: 'lg', lh: 1.5556, color: C.primary, tt: 'none', mar: [0, 0, 2, 0] }), p(d, { fs: '11', color: '#d1d5db', lh: 1.5 })])]
    : [h(t, { tag: 'div', fs: 'lg', lh: 1.5556, color: C.primary, tt: 'none', mar: [0, 0, 4, 0] }), p(d, { fs: 'xs', color: '#d1d5db', lh: 1.3333 })]);
  const banner = con({
    name: 'Facility banner', cls: 'tm-banner', dir: 'column', radius: 16, overflow: 'hidden', border: { w: 1, global: C.tm_border }, bgimg: asset('generated/manufacturing.jpg'), gap: 0, shadow: { v: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,.25)' },
    mar: [0, 0, 48, 0],
  }, [
    con({ name: 'Banner content', cls: 'tm-banner__inner', dir: 'column', ai: 'center', gap: 0, pad: { d: 56, m: 32 }, maxw: 1024, z: 10 }, [
      heading({ t: '360° Advertising & Turnkey Production Hub', tag: 'span', color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.1, lsUnit: 'em', align: 'center', pad: [6, 0, 2, 0] }),
      h('18,000 SQFT 360° ADVERTISING & FABRICATION FACILITY', { fs: ['5xl', '5xl', '3xl'], color: '#ffffff', align: 'center', mar: [8, 0, 16, 0] }),
      p('Operating as a full-service 360-degree advertising agency in Dubai Investment Park 1, we combine creative strategy, 3D retail POSM fabrication, bespoke exhibition stands, illuminated architectural signage, and our own dedicated installation fleet across the UAE.', { fs: ['base', 'base', 'xs'], color: '#e5e7eb', lh: 1.625, align: 'center', mar: [0, 0, 32, 0], cls: 'tm-banner__text' }),
      con({ name: 'Pillars', cls: 'tm-banner__pillars', grid: { cols: [3, 3, 1], gap: 16 }, mar: [0, 0, 32, 0] }, [
        glass('360° Brand Activations', 'Bespoke Exhibition Booths, Retail POSM & Illuminated Signage'),
        glass('Precision In-House Press', 'Swiss UV Flatbed, Latex Systems, CNC Routers & Joinery'),
        glass('Our Dedicated Fleet', 'Company transport & 24/7 on-site installation across UAE', image({ src: asset('about/vehicle-2.png'), alt: 'Trinity Media In-House Company Fleet', w: 56, h: 48, fit: 'cover', radius: 8, cls: 'tm-banner__fleet' })),
      ]),
      w('button', {
        text: 'CONTACT NOW', link: link(home('/contact/')), selected_icon: { value: lc('arrow-right'), library: 'tm-lucide' }, icon_align: 'row-reverse', icon_indent: { unit: 'px', size: 8, sizes: [] },
        background_background: 'classic', background_color: C.primary[1], __globals__: { background_color: 'globals/colors?id=primary' }, button_text_color: '#ffffff', ...BTN_TYPO(14, 12),
        border_radius: btnRadius(4), text_padding: padBtn(14, 32),
      }, { cls: 'tm-btn tm-btn--primary tm-btn--xl', name: 'Contact now' }),
    ]),
  ]);

  return section({
    name: 'About', cid: 'about', cls: 'tm-about', py: { d: 128, t: 128, m: 80 }, gutter: { d: 32, m: 16 }, overflow: 'hidden', bgg: C.tm_bg,
  }, [top, ...(opts.noMvv ? [] : [mvvBlock]), ...(opts.noBanner ? [] : [banner])]);
}

/* ----------------------------------------------------------------------- Milestones */
export function buildMilestones() {
  const STATS = [[15, '+', 'Years in UAE', 'Established 2010 in Dubai'], [2000, '+', 'Completed Builds', 'Exhibitions, retail & signage'], [250, '+', 'Corporate Clients', 'Across UAE and GCC'], [18000, ' sqft', 'In-House Production', 'DIP-1 facility & CNC workshop']];
  const MS = [['2010', 'Inception in Dubai', 'Founded Trinity Media LLC with high-precision digital printing and outdoor branding.', 'Foundation'],
    ['2018', 'Best Printing Award', 'Recognized with prestigious industry awards for color accuracy, finish, and turnaround speed.', 'Excellence'],
    ['2022', '18,000 Sq.Ft DIP-1 Expansion', 'Consolidated large-format UV flatbed, HP Latex, CNC routers, and carpentry workshop.', 'Infrastructure'],
    ['2024+', 'Pan-GCC Brand Activations', 'Delivering mega turnkey exhibition pavilions and enterprise fleet transformations across UAE.', 'Innovation']];
  const stats = STATS.map(([n, suf, label, sub], i) => con({
    name: label, cls: `tm-stat tm-rv tm-rv-up tm-d${i}`, dir: 'column', ai: 'center', gap: 0, pad: { d: 32, m: 24 }, radius: 16, border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,.1)' },
  }, [
    counter({ to: n, suffix: suf, color: C.primary, family: F.d, weight: 700, size: [60, 48, 36], lh: 1, numAlign: 'center', cls: 'tm-stat__num', dur: 2000 }),
    heading({ t: label, tag: 'div', color: C.tm_heading, family: F.d, weight: 400, tt: 'uppercase', size: [18, 18, 16], lh: [1.5556, 1.5556, 1.5], ls: 0.025, lsUnit: 'em', mar: [8, 0, 0, 0], align: 'center' }),
    heading({ t: sub, tag: 'div', color: C.tm_muted_fg, family: F.b, size: 12, lh: 1.3333, mar: [4, 0, 0, 0], align: 'center' }),
  ]));
  const cards = MS.map(([y, t, d, b], i) => con({
    name: `${y} ${t}`, cls: `tm-ms tm-rv tm-rv-up tm-d${i}`, dir: 'column', jc: 'space-between', gap: 24, pad: 24, radius: 16, border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: CARD_SHADOW,
  }, [
    con({ name: 'Top', dir: 'column', gap: 0 }, [
      con({ name: 'Year row', dir: 'row', jc: 'space-between', ai: 'center', mar: [0, 0, 16, 0] }, [
        heading({ t: y, tag: 'span', cls: 'tm-ms__year', color: C.primary, family: F.d, weight: 700, size: 30, lh: 1.2 }),
        heading({ t: b, tag: 'span', cls: 'tm-ms__badge', color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 10, lh: 1.5, ls: 0.05, lsUnit: 'em' }),
      ]),
      h(t.replace(/&/g, '&amp;'), { tag: 'h4', cls: 'tm-ms__title', fs: 'xl', lh: 1.4, mar: [0, 0, 8, 0] }),
      p(d, { fs: 'xs', lh: 1.625 }),
    ]),
    con({ name: 'Verified', cls: 'tm-ms__foot', dir: 'row', ai: 'center', pad: [16, 0, 0, 0], border: { w: bw(1, 0, 0, 0), color: 'rgba(0,0,0,0)' } }, [
      iconList({ items: [{ t: 'Verified Milestone', icon: lc('circle-check') }], iconSize: 14, indent: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 600, size: 11, lh: 1.5 }),
    ]),
  ]));
  return section({ name: 'Milestones', cid: 'milestones', cls: 'tm-milestones', py: { d: 128, t: 128, m: 80 }, gutter: { d: 32, m: 16 }, overflow: 'hidden', border: { w: bw(1, 0, 0, 0), global: C.tm_border }, bgg: C.tm_bg }, [
    con({ name: 'Heading row', cls: 'tm-ms-head', dir: ['row', 'row', 'column'], jc: 'space-between', ai: ['flex-end', 'flex-end', 'flex-start'], gap: 24, mar: [0, 0, 64, 0] }, [
      con({ name: 'Titles', dir: 'column', gap: 0 }, [
        iconList({ name: 'Eyebrow', cls: 'tm-eyebrow-inline', items: [{ t: 'Proven Track Record', icon: lc('sparkles') }], iconSize: 15, indent: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.2, lsUnit: 'em', mar: [0, 0, 12, 0] }),
        h('OUR <span class="tm-hl">MILESTONES</span>', { fs: ['7xl', '7xl', '4xl'], track: 'tight', tag: 'h2' }),
      ]),
      p('Over a decade and a half of engineering perfection, setting benchmarks for large-format printing and bespoke fabrication in the UAE.', { fs: ['base', 'base', 'sm'], lh: 1.625, cls: 'tm-ms-head__note', align: ['right', 'right', 'left'] }),
    ]),
    con({ name: 'Key stats', cls: 'tm-stats', grid: { cols: [4, 2, 2], gap: { d: 24, t: 16, m: 16 } }, mar: [0, 0, 64, 0] }, stats),
    con({ name: 'Timeline cards', cls: 'tm-ms__grid', grid: { cols: [4, 2, 1], gap: 24 }, mar: [0, 0, 64, 0] }, cards),
    con({ name: 'CTA', dir: 'row', jc: 'center' }, [
      w('button', {
        text: 'Learn More About Our Evolution', link: link(home('/about/')), selected_icon: { value: lc('arrow-right'), library: 'tm-lucide' }, icon_align: 'row-reverse', icon_indent: { unit: 'px', size: 8, sizes: [] }, ...BTN_TYPO(14, 12),
        border_radius: btnRadius(12), text_padding: padBtn(16, 32),
      }, { cls: 'tm-btn tm-btn--outline', name: 'Learn more' }),
    ]),
  ]);
}

/* ----------------------------------------------------------------------- Awards */
export const AWARDS = [
  { n: 1, title: 'UMM AL QUWAIN INNOVATIONS AWARD', subtitle: 'Muse Creative Awards 2021 • Gold & Silver Winner', category: 'Creative Branding & Large Format Innovation', year: '2021', desc: 'Honored with the prestigious Umm Al Quwain Innovations Award and Gold & Silver recognition at the Muse Creative Awards 2021 for transformative brand makeovers and large-scale architectural branding installations.' },
  { n: 2, title: 'PHILIPS HEALTH CARE', subtitle: 'Excellence in Precision Fabrication & Corporate Signage', category: 'Crystal Partner Award', year: '2021', desc: 'Awarded crystal recognition by Philips Health Care for exemplary delivery of specialized, high-durability hospital, clinic, and corporate healthcare environment branding and signage across the region.' },
  { n: 3, title: 'EUROPEAN PRESS ASSOCIATION', subtitle: 'EDP Awards 2021 Winner', category: 'Digital Printing & Print Quality Recognition', year: '2021', desc: 'Recognized internationally by the European Digital Press (EDP) Association for outstanding large format digital print reproduction, color accuracy, and innovative UV flatbed substrate printing techniques.' },
];

export function buildAwards(o = {}) {
  const cards = AWARDS.map((a, i) => con({
    name: a.title, cls: `tm-award tm-rv tm-rv-up tm-d${i * 3}`, dir: 'column', jc: 'space-between', gap: 0, radius: 16, overflow: 'hidden', border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 10, blur: 15, spread: -3, color: 'rgba(0,0,0,.1)' },
  }, [
    con({ name: 'Emblem', cls: `tm-emblem tm-emblem--${a.n}`, dir: 'row', ai: 'center', jc: 'center', gap: 0, minh: 256, border: { w: bw(0, 0, 1, 0), color: 'rgba(255,255,255,.1)' } }, [
      image({ src: asset(`awards/emblem-${a.n}.svg`), alt: a.title, w: 192, h: 192, cls: 'tm-emblem__img', name: 'Emblem' }),
      iconList({ name: 'Year', cls: 'tm-award__year', items: [{ t: a.year, icon: lc('trophy') }], iconSize: 13, indent: 6, iconColor: '#fde047', color: '#ffffff', family: F.b, weight: 700, tt: 'uppercase', size: 11, lh: 1.5, ls: 0.05, lsUnit: 'em', pos: 'absolute', off: { t: 16, r: 16 }, z: 5 }),
      heading({ t: a.category, tag: 'span', cls: 'tm-award__cat', color: '#fbcfe8', family: F.b, weight: 700, tt: 'uppercase', size: 10, lh: 1.5, ls: 0.1, lsUnit: 'em', pos: 'absolute', off: { b: 16, l: 16 }, z: 5 }),
    ]),
    con({ name: 'Details', cls: 'tm-award__body', dir: 'column', jc: 'space-between', gap: 24, pad: { d: 32, m: 24 } }, [
      con({ name: 'Text', dir: 'column', gap: 0 }, [
        h(a.title, { tag: 'h3', cls: 'tm-award__title', fs: '2xl', lh: 1.3333, track: 'wide', mar: [0, 0, 8, 0] }),
        heading({ t: a.subtitle, tag: 'div', color: C.primary, family: F.b, weight: 600, size: 12, lh: 1.3333, mar: [0, 0, 16, 0] }),
        p(a.desc, { fs: ['sm', 'sm', 'xs'], lh: 1.625 }),
      ]),
      con({ name: 'Footer', cls: 'tm-award__foot', dir: 'row', jc: 'space-between', ai: 'center', pad: [16, 0, 0, 0], border: { w: bw(1, 0, 0, 0), global: C.tm_border } }, [
        iconList({ items: [{ t: 'Winner Distinction', icon: lc('star') }], iconSize: 13, indent: 6, iconColor: C.primary, color: C.primary, family: F.b, weight: 600, size: 12, lh: 1.3333 }),
        heading({ t: 'Dubai, UAE', tag: 'span', color: C.tm_muted_fg, family: F.b, size: 12, lh: 1.3333 }),
      ]),
    ]),
  ]));
  return section({ name: 'Awards', cid: 'awards', cls: 'tm-awards', py: { d: 128, t: 128, m: 80 }, gutter: { d: 32, m: 16 }, overflow: 'hidden', border: { w: bw(0, 0, 1, 0), global: C.tm_border }, bgg: C.tm_bg }, [
    con({ name: 'Heading', cls: 'tm-center-head tm-center-head--wide', dir: 'column', ai: 'center', gap: 0, mar: [0, 0, 64, 0] }, [
      eyebrow('Excellence & Industry Recognition', { align: 'center', mar: [0, 0, 8, 0], cls: 'tm-rv tm-rv-up' }),
      h('AWARDS & <span class="tm-hl">SPONSORSHIPS</span>', { fs: ['7xl', '7xl', '4xl'], track: 'tight', align: 'center', tag: 'h2', cls: 'tm-rv tm-rv-up tm-d1' }),
      p('Recognized by international bodies and Fortune 500 partners for extraordinary print fidelity and innovative fabrication.', { fs: ['base', 'base', 'sm'], align: 'center', mar: [16, 0, 0, 0], cls: 'tm-rv tm-rv-up tm-d2' }),
    ]),
    con({ name: 'Award cards', cls: 'tm-awards__grid', grid: { cols: [3, 3, 1], gap: 32 } }, cards),
  ]);
}

/* ----------------------------------------------------------------------- Journey timeline */
export function buildJourney() {
  const STEPS = [
    { year: '2010', badge: 'Foundation & Inception', title: 'Started Our Journey in Dubai', desc: 'Dedicated to the pursuit of excellence, we founded Trinity Media LLC in 2010 to bring a revolution to the digital printing and branding sector in Dubai.', hi: 'Incorporation of Trinity Media LLC in Dubai, UAE', icon: 'rocket' },
    { year: '2018', badge: 'Industry Recognition', title: 'Award For Best Printing & Quality', desc: 'By invariably delivering high-precision printing solutions with zero compromise on quality, we were honored with the prestigious Award for Best Printing in 2018, cementing our reputation as a market leader.', hi: 'Honored with Industry Best Printing Award', icon: 'award' },
    { year: '2022', badge: 'Facility Expansion', title: '18,000 Sq.Ft State-of-the-Art Press in DIP-1', desc: 'Over a decade of relentless dedication culminated in the establishment of our premier manufacturing hub in Dubai Investment Park-1, bringing large format, UV flatbed, and joinery under one roof.', hi: 'Expanded Press & Fabrication Workshop in DIP-1', icon: 'building-2' },
    { year: '2024+', badge: 'Innovation & Future', title: 'Advanced Fabrication & GCC Regional Reach', desc: 'Operating with advanced HP Latex, Flatbed UV, high-speed CNC routers, and our own dedicated logistics & installation fleet, Trinity Media delivers 360-degree advertising activations, luxury exhibition stands, and multi-asset retail rollouts across the UAE and GCC.', hi: '360° Advertising Activations & Dedicated In-House Fleet', icon: 'cpu' },
  ];
  const steps = STEPS.map((s, i) => {
    const even = i % 2 === 0;
    return con({
      name: `${s.year} – ${s.title}`, cls: `tm-step tm-step--${even ? 'even' : 'odd'} tm-rv tm-rv-up tm-d${i}`, dir: [even ? 'row' : 'row-reverse', even ? 'row' : 'row-reverse', 'column'], ai: 'flex-start', gap: 32,
    }, [
      con({ name: 'Node', cls: 'tm-step__node', w: px(48), dir: 'row', ai: 'center', jc: 'center', pos: 'absolute', z: 20, radius: 9999 }, [icon({ icon: lc(s.icon), size: 20, color: C.primary })]),
      con({ name: 'Card holder', cls: 'tm-step__side', dir: 'column', gap: 0 }, [
        con({ name: 'Card', cls: 'tm-step__card', dir: 'column', gap: 0, pad: { d: 32, m: 24 }, radius: 16, border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,.1)' } }, [
          con({ name: 'Year', cls: 'tm-step__year-row', dir: 'row', ai: 'center', gap: 12, mar: [0, 0, 16, 0], jc: even ? 'flex-end' : 'flex-start' }, [
            heading({ t: s.year, tag: 'span', cls: 'tm-step__year', color: C.primary, family: F.d, weight: 700, size: [48, 48, 36], lh: 1, ls: -0.025, lsUnit: 'em' }),
            heading({ t: s.badge, tag: 'span', cls: 'tm-step__badge', color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 11, lh: 1.5, ls: 0.1, lsUnit: 'em' }),
          ]),
          h(s.title.replace(/&/g, '&amp;'), { tag: 'h3', fs: '2xl', lh: 1.375, track: 'wide', mar: [0, 0, 12, 0], align: [even ? 'right' : 'left', even ? 'right' : 'left', 'left'] }),
          p(s.desc, { fs: 'sm', lh: 1.625, mar: [0, 0, 20, 0], align: [even ? 'right' : 'left', even ? 'right' : 'left', 'left'] }),
          con({ name: 'Highlight', cls: 'tm-step__hi', dir: 'row', ai: 'center', gap: 8, pad: [16, 0, 0, 0], jc: even ? 'flex-end' : 'flex-start', border: { w: bw(1, 0, 0, 0), color: 'rgba(0,0,0,0)' } }, [
            iconList({ items: [{ t: s.hi, icon: lc('circle-check') }], iconSize: 15, indent: 8, iconColor: C.primary, color: C.tm_muted_fg, family: F.b, weight: 600, size: 12, lh: 1.3333, ls: 0.025, lsUnit: 'em' }),
          ]),
        ]),
      ]),
      con({ name: 'Spacer', cls: 'tm-step__spacer', dir: 'column' }, []),
    ]);
  });
  return section({ name: 'Our Journey', cid: 'journey', cls: 'tm-journey', py: { d: 128, t: 128, m: 80 }, gutter: { d: 32, m: 16 }, overflow: 'hidden', border: { w: bw(1, 0, 1, 0), global: C.tm_border }, bgg: C.tm_bg }, [
    heading({ t: 'JOURNEY', tag: 'div', cls: 'tm-bgword tm-bgword--journey', color: C.tm_heading, family: F.d, weight: 400, size: [352, 352, 224], lh: 1, pos: 'absolute', off: { t: 40, l: 0 }, align: 'center' }),
    con({ name: 'Journey head', cls: 'tm-center-head tm-center-head--wide', dir: 'column', ai: 'center', gap: 0, mar: [0, 0, 80, 0], z: 10 }, [
      iconList({ name: 'Eyebrow', cls: 'tm-eyebrow-inline', items: [{ t: 'Milestones & Evolution', icon: lc('sparkles') }], iconSize: 15, indent: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.1, lsUnit: 'em', mar: [0, 0, 12, 0] }),
      h('OUR <span class="tm-hl">JOURNEY</span>', { fs: ['7xl', '7xl', '4xl'], track: 'tight', align: 'center', tag: 'h2' }),
      p('From our founding in 2010 to operating an 18,000 sq.ft press in Dubai Investment Park, our journey represents relentless innovation and craftsmanship.', { fs: ['base', 'base', 'sm'], align: 'center', mar: [16, 0, 0, 0], cls: 'tm-center-head__p' }),
    ]),
    con({ name: 'Timeline', cls: 'tm-timeline', dir: 'column', gap: { d: 64, t: 64, m: 48 }, z: 10, mar: [0, 0, 64, 0] }, steps),
  ]);
}

/* ----------------------------------------------------------------------- CEO message */
export function buildCeo() {
  return section({ name: 'CEO message', cid: 'ceo-message', cls: 'tm-ceo', py: { d: 96, t: 96, m: 64 }, gutter: { d: 32, m: 16 }, overflow: 'hidden', bgg: C.tm_bg }, [
    con({ name: 'CEO card', cls: 'tm-ceo__card tm-rv tm-rv-up', grid: { cols: [12, 1, 1], gap: { d: 48, t: 32, m: 32 } }, ai: 'center', pad: { d: 48, t: 40, m: 24 }, radius: 16, overflow: 'hidden', border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 20, blur: 25, spread: -5, color: 'rgba(0,0,0,.1)' } }, [
      con({ name: 'Message', cls: 'tm-s7 tm-xs8', dir: 'column', jc: 'center', gap: 0, z: 10 }, [
        con({ name: 'Header', dir: 'row', ai: 'center', gap: 14, mar: [0, 0, 24, 0] }, [
          con({ name: 'Quote icon', cls: 'tm-ceo__q', w: px(40), dir: 'row', ai: 'center', jc: 'center', radius: 9999, border: { w: 1, color: 'rgba(182,62,204,.4)' }, minh: 40 }, [icon({ icon: lc('quote'), size: 20, color: C.primary })]),
          con({ name: 'Titles', dir: 'column', gap: 2 }, [
            heading({ t: 'LEADERSHIP VISION', tag: 'span', color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 11, lh: 1.25, ls: 0.2, lsUnit: 'em' }),
            h("CEO'S MESSAGE", { tag: 'h3', fs: ['4xl', '4xl', '3xl'], lh: 1, track: 'tight' }),
          ]),
        ]),
        con({ name: 'Quotes', cls: 'tm-ceo__quotes', dir: 'column', gap: 16, pad: [0, 0, 0, 20], mar: [8, 0, 8, 0], border: { w: bw(0, 0, 0, 2), global: C.primary } }, [
          p('"It gives me immense pleasure to welcome you all. As we grow bigger, I would like to take this opportunity to express my profound gratitude to all our respectful clients and business partners for their valuable support and cooperative contributions to the smooth functioning."', { fs: ['base', 'base', 'sm'], lh: 1.625, color: C.tm_heading, cls: 'tm-ceo__quote' }),
          p('"Today, change is everywhere but one thing we as a company keep constant is our client satisfaction and to ensure their mission objectives are achieved with the highest level of capability and quality. Whether you are a potential customer, a small business partner, or a future employee, we always look forward to finding out how we can work together to bring service to life."', { fs: ['base', 'base', 'sm'], lh: 1.625, color: C.tm_heading, cls: 'tm-ceo__quote' }),
        ]),
        con({ name: 'Signature', dir: 'row', ai: 'center', gap: 14, pad: [24, 0, 0, 0], mar: [32, 0, 0, 0], border: { w: bw(1, 0, 0, 0), global: C.tm_border } }, [
          con({ name: 'Initials', cls: 'tm-ceo__ini', w: px(44), dir: 'row', ai: 'center', jc: 'center', radius: 9999, border: { w: 1, color: 'rgba(182,62,204,.4)' }, minh: 44 }, [heading({ t: 'SW', tag: 'span', color: C.primary, family: F.d, weight: 700, size: 16, lh: 1.5 })]),
          con({ name: 'Name', dir: 'column', gap: 2 }, [
            h('MR. SURAJ WALTER', { tag: 'h4', fs: 'xl', lh: 1.25, track: 'wide' }),
            heading({ t: 'MANAGING DIRECTOR — TRINITY MEDIA LLC', tag: 'p', color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: [12, 12, 11], lh: 1.3333, ls: 0.1, lsUnit: 'em' }),
          ]),
        ]),
      ]),
      con({ name: 'Portrait', cls: 'tm-ceo__portrait tm-s5 tm-xs4', dir: 'column', ai: 'center', jc: 'center' }, [
        con({ name: 'Portrait card', cls: 'tm-ceo__pcard', dir: 'column', jc: 'flex-end', radius: 12, overflow: 'hidden', border: { w: 1, color: 'rgba(255,255,255,.15)' }, bg: '#000000', gap: 0, shadow: { v: 25, blur: 50, spread: -12, color: 'rgba(0,0,0,.25)' } }, [
          image({ src: asset('generated/md_image.jpg'), alt: 'Mr. Suraj Walter - Managing Director', fit: 'cover', pos: 'top center', h: [384, 384, 320], cls: 'tm-ceo__img' }),
          con({ name: 'Label', cls: 'tm-ceo__label', dir: 'column', ai: 'center', gap: 2, pad: 14, radius: 8, pos: 'absolute', off: { b: 12, l: 12 }, z: 10 }, [
            heading({ t: 'MR. SURAJ WALTER', tag: 'div', color: '#ffffff', family: F.d, weight: 700, tt: 'uppercase', size: [20, 20, 18], lh: 1.25, ls: 0.025, lsUnit: 'em', align: 'center' }),
            heading({ t: 'MANAGING DIRECTOR', tag: 'div', color: '#f9a8d4', family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.05, lsUnit: 'em', align: 'center' }),
            heading({ t: 'Trinity Media LLC • Dubai, UAE', tag: 'div', color: '#9ca3af', family: F.b, weight: 500, size: 11, lh: 1.5, align: 'center' }),
          ]),
        ]),
      ]),
    ]),
  ]);
}
