// Single service page (ServiceDetail.tsx) – identical Elementor structure for each of the 19 services.
import { con, heading, iconList, icon, image, w, shortcode, text, C, F, h, p, lc, asset, home, section, eyebrow, badge } from '../lib/parts.mjs';
import { SERVICES } from '../data.mjs';

const link = (url, ext) => ({ url, is_external: ext ? 'on' : '', nofollow: ext ? 'on' : '', custom_attributes: '' });
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const imgPath = (p) => asset(p.replace(/^\//, ''));

export function quoteCard(title, extraCls = '') {
  return con({ name: 'Quote card (glass)', cls: `tm-glass tm-sq ${extraCls}`, dir: 'column', pad: { d: 28, m: 24 }, radius: 16, gap: 16, overflow: 'hidden' }, [
    con({ name: 'Card header', dir: 'column', gap: 0, cls: 'tm-sq__head', z: 10 }, [
      iconList({
        name: 'Badge', cls: 'tm-badge tm-badge--sm', items: [{ t: 'Get instant Quote', icon: lc('sparkles') }], iconSize: 12, indent: 6, iconColor: C.primary, color: C.primary,
        family: F.b, weight: 700, tt: 'uppercase', size: 11, lh: 1.5, ls: 0.1, lsUnit: 'em', mar: [0, 0, 8, 0],
      }),
      heading({
        t: 'Request A <span class="tm-hl">Fast Quote</span>', tag: 'h3', color: C.tm_heading, family: F.d, weight: 400, tt: 'uppercase', size: [30, 30, 24], lh: 1.25, ls: -0.025, lsUnit: 'em',
      }),
      text({
        t: `<p>Direct in-house pricing for <strong>${esc(title)}</strong> from our DIP-1 press.</p>`, color: C.tm_muted_fg, family: F.b, size: 12, lh: 1.3333, mar: [4, 0, 0, 0], space: 0,
      }),
    ]),
    shortcode({ sc: `[trinity_form type="service" service="${title.replace(/"/g, '')}"]`, name: 'Quote form' }),
  ]);
}

export function buildCtaTemplate() {
  const pattern = con({ name: 'Dot pattern', cls: 'tm-cta__pattern', fill: true }, []);
  return [con({
    name: 'Contact CTA', cid: 'contact', cls: 'tm-cta', tag: 'section', dir: 'column', ai: 'center', pad: { d: [144, 32], t: [144, 32], m: [112, 24] }, overflow: 'hidden',
    grad: { a: '#b63ecc', b: '#300E3A', angle: 135 },
  }, [
    pattern,
    con({ name: 'CTA inner', boxed: 1296, dir: 'column', ai: 'center', gap: 0, z: 10, cls: 'tm-cta__inner' }, [
      heading({ t: "Partner With Dubai's Premier Print & Fabrication Press", tag: 'span', cls: 'tm-cta__eyebrow tm-rv tm-rv-up', color: C.tm_pink, family: F.b, weight: 700, tt: 'uppercase', size: [14, 14, 12], lh: 1.4286, ls: 0.25, lsUnit: 'em', align: 'center', mar: [0, 0, 16, 0] }),
      heading({ t: "LET'S BUILD<br>YOUR NEXT<br>BIG IDEA.", tag: 'h2', cls: 'tm-cta__title tm-rv tm-rv-up', color: '#ffffff', family: F.d, weight: 400, tt: 'uppercase', size: [128, 72, 48], lh: 0.88, ls: -0.05, lsUnit: 'em', align: 'center', mar: [0, 0, 40, 0] }),
      con({ name: 'Buttons', cls: 'tm-cta__btns tm-rv tm-rv-up', dir: ['row', 'row', 'column'], jc: 'center', ai: 'center', gap: 20, maxw: 576 }, [
        w('button', {
          text: 'Get Proposal', link: link(home('/contact/')), selected_icon: { value: lc('file-text'), library: 'tm-lucide' }, icon_align: 'row', icon_indent: { unit: 'px', size: 10, sizes: [] },
          typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase', typography_font_size: { unit: 'px', size: 14, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
          typography_font_size_mobile: { unit: 'px', size: 12, sizes: [] },
          button_text_color: C.primary[1], __globals__: { button_text_color: 'globals/colors?id=primary' }, background_background: 'classic', background_color: '#ffffff',
          border_radius: { unit: 'px', top: '8', right: '8', bottom: '8', left: '8', isLinked: true }, text_padding: { unit: 'px', top: '20', right: '36', bottom: '20', left: '36', isLinked: false },
          text_padding_mobile: { unit: 'px', top: '16', right: '36', bottom: '16', left: '36', isLinked: false }, align_mobile: 'justify',
        }, { cls: 'tm-btn tm-btn--white', name: 'Get Proposal' }),
        w('button', {
          text: 'Schedule Meeting', link: link('https://wa.me/971526935456?text=Hi%20Trinity%20Media,%20I%20would%20like%20to%20schedule%20a%20meeting%20with%20your%20team%20to%20discuss%20our%20project.', true), selected_icon: { value: lc('calendar'), library: 'tm-lucide' }, icon_align: 'row', icon_indent: { unit: 'px', size: 10, sizes: [] },
          typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase', typography_font_size: { unit: 'px', size: 14, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
          typography_font_size_mobile: { unit: 'px', size: 12, sizes: [] },
          button_text_color: '#ffffff', border_border: 'solid', border_width: { unit: 'px', top: '2', right: '2', bottom: '2', left: '2', isLinked: true }, border_color: 'rgba(255,255,255,0.9)',
          border_radius: { unit: 'px', top: '8', right: '8', bottom: '8', left: '8', isLinked: true }, text_padding: { unit: 'px', top: '18', right: '36', bottom: '18', left: '36', isLinked: false },
          text_padding_mobile: { unit: 'px', top: '14', right: '36', bottom: '14', left: '36', isLinked: false }, align_mobile: 'justify',
        }, { cls: 'tm-btn tm-btn--outline-white', name: 'Schedule Meeting' }),
      ]),
    ]),
  ])];
}

export function buildServicePage(s) {
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 4);
  const images = (s.images && s.images.length ? s.images : s.image ? [s.image] : []).map(imgPath);
  const hero = images[0];
  const rest = images.slice(1);

  // 1 ── header + breadcrumb
  const top = con({
    name: 'Service header', cls: 'tm-svc-top', tag: 'section', dir: 'column', pad: { d: [144, 32, 40], t: [144, 32, 40], m: [128, 16, 32] },
    border: { w: { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false }, global: C.tm_border },
  }, [
    con({ name: 'Top inner', boxed: 1296, dir: 'column', gap: 0 }, [
      iconList({
        name: 'Breadcrumb', cls: 'tm-crumb', view: 'inline', items: [
          { t: 'Home', href: home('/') }, { t: 'Services', href: home('/#services') }, { t: s.title.replace(/&/g, '&amp;') },
        ], between: 8, color: C.tm_muted_fg, hcolor: C.primary, family: F.b, size: [14, 14, 12], lh: 1.4286, tt: 'uppercase', ls: 0.1, lsUnit: 'em', mar: [0, 0, 24, 0],
      }),
      con({ name: 'Title block', dir: 'column', gap: 0, cls: 'tm-svc-top__title', mar: [0, 0, 24, 0] }, [
        iconList({
          name: 'Badge', cls: 'tm-badge', items: [{ t: `Service ${s.num}`, icon: lc('sparkles') }], iconSize: 14, indent: 8, iconColor: C.primary, color: C.primary,
          family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.1, lsUnit: 'em', mar: [0, 0, 12, 0],
        }),
        h(s.title.replace(/&/g, '&amp;'), { tag: 'h1', fs: ['7xl', '6xl', '4xl'], lh: 0.95, track: 'tight', mar: [0, 0, 16, 0] }),
        p(esc(s.short), { fs: ['xl', 'lg', 'base'], lh: 1.625, color: C.tm_heading, cls: 'tm-svc-top__lead' }),
      ]),
      con({ name: 'Actions', dir: 'row', ai: 'center', gap: 16, wrap: true }, [
        w('button', {
          text: 'Inquire For This Service', link: link('#contact'), background_background: 'classic', background_color: C.primary[1], __globals__: { background_color: 'globals/colors?id=primary' }, button_text_color: '#ffffff',
          typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase', typography_font_size: { unit: 'px', size: 14, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
          typography_font_size_mobile: { unit: 'px', size: 12, sizes: [] },
          border_radius: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true }, text_padding: { unit: 'px', top: '12', right: '24', bottom: '12', left: '24', isLinked: false },
        }, { cls: 'tm-btn tm-btn--primary', name: 'Inquire' }),
        w('button', {
          text: 'WhatsApp Consultation', link: link('https://wa.me/971526935456', true), selected_icon: { value: lc('message-circle'), library: 'tm-lucide' }, icon_align: 'row', icon_indent: { unit: 'px', size: 8, sizes: [] },
          typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase', typography_font_size: { unit: 'px', size: 14, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] },
          typography_font_size_mobile: { unit: 'px', size: 12, sizes: [] },
          button_text_color: C.tm_heading[1], __globals__: { button_text_color: 'globals/colors?id=tm_heading' },
          border_radius: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true }, text_padding: { unit: 'px', top: '12', right: '24', bottom: '12', left: '24', isLinked: false },
        }, { cls: 'tm-btn tm-btn--card tm-btn--wa-icon', name: 'WhatsApp' }),
      ]),
    ]),
  ]);

  // 2 ── hero image + quote form
  const heroRow = section({ name: 'Hero image + quote', cls: 'tm-svc-hero', py: { d: 32, t: 32, m: 32 }, pad: { d: [32, 32, 48], t: [32, 32, 48], m: [32, 16, 48] }, gutter: { d: 32, m: 16 } }, [
    con({ name: 'Hero row', cls: 'tm-svc-hero__grid', grid: { cols: [12, 1, 1], gap: 32 }, ai: 'center' }, [
      con({ name: 'Featured image', cls: 'tm-svc-hero__media tm-lb tm-s7', dir: 'column', jc: 'flex-end', radius: 16, overflow: 'hidden', border: { w: 1, global: C.tm_border }, minh: [520, 500, 460], gap: 0 }, [
        image({ src: hero, alt: `${s.title} Hero Showcase`, fit: 'cover', cls: 'tm-svc-hero__img tm-lb-img', name: 'Hero image' }),
        icon({ icon: lc('maximize-2'), size: 18, href: '#', cls: 'tm-svc-hero__zoom tm-lb-open', name: 'View fullscreen' }),
        con({ name: 'Bottom label', cls: 'tm-svc-hero__label', dir: 'row', jc: 'space-between', ai: 'center', gap: 12, wrap: true, pos: 'absolute', off: { b: 24, l: 24 }, z: 10 }, [
          heading({ t: `${esc(s.title)} • Featured Build`, tag: 'span', cls: 'tm-svc-hero__tag', color: '#ffffff', family: F.d, weight: 400, tt: 'uppercase', size: [20, 20, 18], lh: [1.4, 1.4, 1.5556], ls: 0.025, lsUnit: 'em' }),
          heading({ t: 'Click to enlarge', tag: 'span', cls: 'tm-svc-hero__hint', color: '#ffffff', family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.05, lsUnit: 'em' }),
        ]),
      ]),
      quoteCard(s.title, 'tm-s5'),
    ]),
  ]);

  // 3 ── overview + capabilities
  const paras = s.overview.split('\n\n').map((t) => `<p>${esc(t)}</p>`).join('');
  const li = (txt, ic) => ({ t: txt.replace(/&/g, '&amp;'), icon: ic });
  const overview = section({ name: 'Overview', cls: 'tm-svc-overview', pad: { d: [0, 32, 64], t: [0, 32, 64], m: [0, 16, 64] }, gutter: { d: 32, m: 16 } }, [
    con({ name: 'Overview grid', cls: 'tm-svc-overview__grid', grid: { cols: [12, 1, 1], gap: { d: 48, t: 40, m: 40 } }, ai: 'flex-start' }, [
      con({ name: 'Overview text', cls: 'tm-s7', dir: 'column', gap: 32 }, [
        con({ name: 'Overview copy', dir: 'column', gap: 0 }, [
          eyebrow('Service Scope & Engineering', { mar: [0, 0, 8, 0] }),
          h('OVERVIEW', { fs: ['4xl', '4xl', '3xl'], track: 'tight', mar: [0, 0, 24, 0] }),
          text({ t: paras, cls: 'tm-svc-overview__text', color: C.tm_heading, family: F.b, size: [16, 16, 14], lh: 1.625, space: 0 }),
        ]),
        con({ name: 'Why choose callout', cls: 'tm-callout', dir: 'column', gap: 8, pad: 24, radius: 12, border: { w: 1, color: 'rgba(182,62,204,.3)' }, bgg: C.tm_card, shadow: { v: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,.1)' } }, [
          h(`Why Choose Trinity Media For ${esc(s.title)}?`, { tag: 'h3', fs: ['xl', 'xl', 'xl'], lh: 1.4 }),
          p('With our state-of-the-art 18,000 sq.ft facility at Dubai Investment Park-1, premium materials, and experienced production engineers, we guarantee fast turnaround, strict ISO quality control, and flawless on-site installation.', { fs: ['sm', 'sm', 'xs'], lh: 1.625 }),
        ]),
      ]),
      con({ name: 'Capabilities', cls: 'tm-s5', dir: 'column', gap: 24 }, [
        con({ name: 'Capabilities card', cls: 'tm-listcard', dir: 'column', gap: 24, pad: { d: 32, m: 24 }, radius: 16, border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,.1)' } }, [
          con({ name: 'Card title', dir: 'row', ai: 'center', gap: 8, cls: 'tm-listcard__title' }, [
            con({ name: 'Dot', cls: 'tm-dot', w: 10 }, []),
            h('Capabilities', { tag: 'h3', fs: '2xl', track: 'wide' }),
          ]),
          iconList({ name: 'Capabilities list', cls: 'tm-list tm-list--dot', items: s.capabilities.map((c) => li(c, '')), indent: 10, between: 12, color: C.tm_heading, family: F.b, size: [14, 12, 12], lh: 1.4286, vAlign: 'start' }),
        ]),
        con({ name: 'Deliverables card', cls: 'tm-listcard', dir: 'column', gap: 24, pad: { d: 32, m: 24 }, radius: 16, border: { w: 1, global: C.tm_border }, bgg: C.tm_card, shadow: { v: 4, blur: 6, spread: -1, color: 'rgba(0,0,0,.1)' } }, [
          con({ name: 'Card title', dir: 'row', ai: 'center', gap: 8, cls: 'tm-listcard__title' }, [
            icon({ icon: lc('check'), size: 20, color: C.primary }),
            h('Deliverables', { tag: 'h3', fs: '2xl', track: 'wide' }),
          ]),
          iconList({ name: 'Deliverables list', cls: 'tm-list', items: s.deliverables.map((c) => li(c, lc('check'))), iconSize: 15, indent: 10, between: 12, iconColor: C.primary, color: C.tm_heading, family: F.b, size: [14, 12, 12], lh: 1.4286, vAlign: 'start' }),
        ]),
        con({ name: 'Quick contact', cls: 'tm-quickcard', dir: 'column', ai: 'center', gap: 8, pad: 24, radius: 16, border: { w: 1, global: C.tm_border } }, [
          h('Need a Custom Quote?', { tag: 'h4', fs: 'lg', lh: 1.5556, align: 'center' }),
          p('Our project managers are ready to assist with sizing, materials and budget estimates.', { fs: 'xs', align: 'center', mar: [0, 0, 8, 0] }),
          w('button', {
            text: 'Call +971 52 693 5456', link: link('tel:+971526935456'), align: 'justify', selected_icon: { value: lc('phone'), library: 'tm-lucide' }, icon_align: 'row', icon_indent: { unit: 'px', size: 8, sizes: [] },
            background_background: 'classic', background_color: C.primary[1], __globals__: { background_color: 'globals/colors?id=primary' }, button_text_color: '#ffffff',
            typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase', typography_font_size: { unit: 'px', size: 12, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] }, typography_line_height: { unit: 'em', size: 1.3333, sizes: [] },
            border_radius: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true }, text_padding: { unit: 'px', top: '12', right: '16', bottom: '12', left: '16', isLinked: false },
          }, { cls: 'tm-btn tm-btn--primary tm-btn--block', name: 'Call button' }),
        ]),
      ]),
    ]),
  ]);

  // 4 ── gallery
  let gallery = null;
  if (rest.length) {
    gallery = section({ name: 'Gallery', cls: 'tm-svc-gallery', pad: { d: [0, 32, 64], t: [0, 32, 64], m: [0, 16, 64] }, gutter: { d: 32, m: 16 } }, [
      con({ name: 'Gallery wrap', cls: 'tm-svc-gallery__wrap', dir: 'column', gap: 32, pad: [48, 0, 0, 0], border: { w: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false }, global: C.tm_border }, mar: [32, 0, 0, 0] }, [
        con({ name: 'Gallery head', dir: ['row', 'row', 'column'], jc: 'space-between', ai: ['flex-end', 'flex-end', 'flex-start'], gap: 16 }, [
          con({ name: 'Gallery titles', dir: 'column', gap: 0 }, [
            eyebrow('Project Portfolio & Gallery', { mar: [0, 0, 4, 0] }),
            h(`${esc(s.title)} Gallery`, { tag: 'h3', fs: ['5xl', '5xl', '3xl'], track: 'tight' }),
          ]),
          p('Explore high-resolution fabrication photos from our Dubai projects. Click any card to inspect full-screen detail.', { fs: 'xs', cls: 'tm-svc-gallery__note' }),
        ]),
        con({ name: 'Gallery grid', cls: 'tm-svc-gallery__grid tm-lb-group', grid: { cols: [3, 2, 1], gap: 24 } }, rest.map((src, i) => con({
          name: `Gallery ${i + 2}`, cls: `tm-gcard tm-lb tm-rv tm-rv-up tm-d${i % 3}`, dir: 'column', gap: 0, radius: 12, overflow: 'hidden', border: { w: 1, global: C.tm_border }, bgg: C.tm_card,
        }, [
          con({ name: 'Image', cls: 'tm-gcard__media', minh: [288, 288, 256], overflow: 'hidden' }, [
            image({ src, alt: `${s.title} project view ${i + 2}`, fit: 'cover', cls: 'tm-gcard__img tm-lb-img', name: 'Gallery image' }),
            icon({ icon: lc('maximize-2'), size: 15, href: '#', cls: 'tm-gcard__zoom tm-lb-open', name: 'View fullscreen' }),
            con({ name: 'Caption', dir: 'column', gap: 0, pos: 'absolute', off: { b: 12, l: 12 }, z: 10, cls: 'tm-gcard__cap' }, [
              heading({ t: `Project ${i + 2} of ${images.length}`, tag: 'span', color: C.tm_pink, family: F.b, weight: 700, tt: 'uppercase', size: 10, lh: 1.5, ls: 0.1, lsUnit: 'em' }),
              heading({ t: esc(s.title), tag: 'span', color: '#ffffff', family: F.d, weight: 400, tt: 'uppercase', size: 18, lh: 1.5556, ls: 0.025, lsUnit: 'em' }),
            ]),
          ]),
          con({ name: 'Footer', cls: 'tm-gcard__foot', dir: 'row', jc: 'center', ai: 'center', pad: 14, border: { w: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false }, color: 'rgba(0,0,0,0)' } }, [
            iconList({ items: [{ t: 'Full View', icon: lc('arrow-right') }], iconAlign: 'row-reverse', iconSize: 13, indent: 6, iconColor: C.primary, color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.05, lsUnit: 'em' }),
          ]),
        ]))),
      ]),
    ]);
  }

  // 5 ── other services
  const otherCards = others.map((o) => con({
    name: `${o.num} ${o.title}`, cls: 'tm-ocard tm-rv tm-rv-up', link: link(home(`/services/${o.slug}/`)), dir: 'column', gap: 0, pad: 24, radius: 12, border: { w: 1, global: C.tm_border }, bgg: C.tm_card,
    shadow: { v: 1, blur: 2, color: 'rgba(0,0,0,.05)' },
  }, [
    heading({ t: o.num, tag: 'span', color: C.primary, family: F.d, weight: 400, size: 24, lh: 1.3333, mar: [0, 0, 8, 0] }),
    h(o.title.replace(/&/g, '&amp;'), { tag: 'h3', cls: 'tm-ocard__title', fs: 'xl', lh: 1.25, track: 'wide', mar: [0, 0, 12, 0] }),
    p(esc(o.short), { cls: 'tm-ocard__text', fs: 'xs', lh: 1.625, mar: [0, 0, 16, 0] }),
    iconList({ name: 'Know more', cls: 'tm-ocard__more', items: [{ t: 'Know More', icon: lc('arrow-right') }], iconAlign: 'row-reverse', iconSize: 13, indent: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.05, lsUnit: 'em' }),
  ]));
  const othersSec = con({
    name: 'Other services', cls: 'tm-others', tag: 'section', dir: 'column', pad: { d: [80, 32], t: [80, 32], m: [80, 16] },
    border: { w: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0', isLinked: false }, global: C.tm_border },
  }, [
    con({ name: 'Others inner', boxed: 1296, dir: 'column', gap: 40 }, [
      con({ name: 'Others head', dir: 'row', jc: 'space-between', ai: 'center' }, [
        con({ name: 'Titles', dir: 'column', gap: 0 }, [eyebrow('Explore More Solutions', { mar: [0, 0, 4, 0] }), h('OTHER SERVICES', { fs: ['4xl', '4xl', '3xl'], track: 'tight' })]),
        iconList({ name: 'View all', cls: 'tm-others__all', items: [{ t: 'View All 19 Services', icon: lc('arrow-right'), href: home('/#services') }], iconAlign: 'row-reverse', iconSize: 14, indent: 8, iconColor: C.primary, color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.05, lsUnit: 'em' }),
      ]),
      con({ name: 'Other service cards', cls: 'tm-others__grid', grid: { cols: [4, 2, 1], gap: 20 } }, otherCards),
    ]),
  ]);

  return [top, heroRow, overview, ...(gallery ? [gallery] : []), othersSec, con({ name: 'Contact CTA (reusable template)', dir: 'column', gap: 0 }, [shortcode({ sc: '[trinity_template id="{{id:cta}}"]', name: 'Contact CTA (reusable template)' })])];
}
