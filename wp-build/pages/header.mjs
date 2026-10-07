// Header: top bar + main bar (logo, menu, theme toggle, CTA) + 19-service mega menu + mobile drawer.
// Built with native Elementor containers + widgets.  Desktop menu = XPRO "Horizontal Menu" (WP menu driven) or
// Elementor Pro "Nav Menu" when Pro is installed.
import { con, heading, iconList, icon, image, socialIcons, w, C, F, h, p, lc, asset, home, ty } from '../lib/parts.mjs';
import { SERVICES } from '../data.mjs';

export const SOCIALS = [
  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/profile.php?id=100063650510124', label: 'Facebook' },
  { icon: 'fab fa-twitter', href: 'https://x.com/TrinityMediaUAE', label: 'X (Twitter)' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/trinitymediallc/', label: 'Instagram' },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/trinity-media-uae/', label: 'LinkedIn' },
  { icon: 'fab fa-youtube', href: 'https://www.youtube.com/@TrinityMediaDIP', label: 'YouTube' },
];

const LOGO_DARK = asset('logo/trinity-logo-white.png');   // shown on dark theme (original: white logo in dark mode)
const LOGO_LIGHT = asset('logo/trinity-logo-original.png'); // shown on light theme

function topBar() {
  const left = iconList({
    name: 'Contact info', cls: 'tm-topbar__info', view: 'inline',
    items: [
      { t: 'DIP-1, Dubai, UAE', icon: lc('map-pin') },
      { t: 'inquiry@trinitymediauae.com', icon: lc('mail'), href: 'mailto:inquiry@trinitymediauae.com' },
      { t: 'Mon - Sat: 9:00 AM - 6:00 PM', icon: lc('clock') },
    ],
    iconSize: 13, indent: 6, between: 24, iconColor: C.primary, color: C.tm_muted_fg,
    family: F.b, weight: 400, size: [12, 12, 11], lh: 1.3333,
  });
  const socials = socialIcons({
    name: 'Social links', cls: 'tm-topbar__social', items: SOCIALS, size: 12, gap: 12, shape: 'rounded', align: 'left',
  });
  const sep = heading({ t: '|', tag: 'span', cls: 'tm-topbar__sep', color: C.tm_border, family: F.b, size: 12, lh: 1.3333 });
  const contact = iconList({
    name: 'Contact Now', cls: 'tm-topbar__cta',
    items: [{ t: 'Contact Now', icon: lc('message-circle'), href: 'https://wa.me/971526935456', ext: true }],
    iconSize: 13, indent: 6, iconColor: C.primary, color: C.primary, hcolor: C.primary,
    family: F.b, weight: 600, tt: 'uppercase', size: [12, 12, 11], lh: 1.3333, ls: 0.05, lsUnit: 'em',
  });
  return con({
    name: 'Top bar', cls: 'tm-topbar', pad: { d: [8, 32], t: [8, 32], m: [8, 16] },
    border: { w: { unit: 'px', top: '0', right: '0', bottom: '1', left: '0', isLinked: false }, global: C.tm_border },
  }, [
    con({ name: 'Top bar inner', boxed: 1360, dir: 'row', jc: 'space-between', ai: 'center', gap: 16 }, [
      left,
      con({ name: 'Top bar right', dir: 'row', ai: 'center', gap: 16, cls: 'tm-topbar__right' }, [socials, sep, contact]),
    ]),
  ]);
}

function megaPanel() {
  const head = con({ name: 'Mega header', dir: 'row', jc: 'space-between', ai: 'center', cls: 'tm-mega__head' }, [
    con({ name: 'Mega title', dir: 'row', ai: 'center', gap: 10, cls: 'tm-mega__title' }, [
      con({ name: 'Dot', cls: 'tm-dot', w: 10, extra: {} }, []),
      h('All 19 Specialised Services', { tag: 'div', fs: 'lg', track: 'wide', color: C.tm_heading }),
    ]),
    iconList({
      name: 'Explore link', cls: 'tm-mega__all',
      items: [{ t: 'Explore Services Section', icon: lc('arrow-right'), href: home('/#services') }],
      iconAlign: 'row-reverse', iconSize: 13, indent: 6, iconColor: C.primary, color: C.primary,
      family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.05, lsUnit: 'em',
    }),
  ]);
  const items = SERVICES.map((s) => con({
    name: `Service ${s.num}`, cls: 'tm-mega__item', link: { url: home(`/services/${s.slug}/`), is_external: '', nofollow: '', custom_attributes: '' },
    dir: 'row', ai: 'flex-start', gap: 10, pad: 10,
  }, [
    heading({ t: s.num, tag: 'span', cls: 'tm-mega__num', color: C.primary, family: F.d, weight: 700, size: 14, lh: 1.4286, mar: [2, 0, 0, 0] }),
    heading({ t: s.title, tag: 'span', cls: 'tm-mega__name', color: C.tm_heading, family: F.b, weight: 500, size: 12, lh: 1.375 }),
  ]));
  return con({
    name: 'Mega menu – Services', cls: 'tm-mega', dir: 'column', pad: 24, gap: 0, pos: 'absolute', z: 50,
  }, [head, con({ name: 'Mega grid', cls: 'tm-mega__grid', grid: { cols: [4, 4, 4], gap: 16 } }, items)]);
}

function drawer() {
  const link = (t, href) => heading({ t, tag: 'a', href, cls: 'tm-drawer__link', color: C.tm_heading, family: F.d, weight: 400, size: 18, lh: 1.5556, ls: 0.05, lsUnit: 'em' });
  const svc = SERVICES.map((s) => con({
    name: `Service ${s.num}`, cls: 'tm-drawer__svc', link: { url: home(`/services/${s.slug}/`), is_external: '', nofollow: '', custom_attributes: '' }, dir: 'row', ai: 'center', gap: 8,
  }, [
    heading({ t: s.num, tag: 'span', color: C.primary, family: F.b, weight: 700, size: 12, lh: 1.3333 }),
    heading({ t: s.title, tag: 'span', color: C.tm_muted_fg, family: F.b, weight: 400, size: 12, lh: 1.3333 }),
  ]));
  const servicesRow = con({ name: 'Services accordion', cls: 'tm-drawer__acc', dir: 'column', gap: 12 }, [
    con({ name: 'Services toggle', cls: 'tm-drawer__acc-head', dir: 'row', jc: 'space-between', ai: 'center' }, [
      heading({ t: 'Services', tag: 'span', cls: 'tm-drawer__link', color: C.tm_heading, family: F.d, size: 18, lh: 1.5556, ls: 0.05, lsUnit: 'em' }),
      icon({ icon: lc('chevron-down'), size: 16, color: C.tm_heading, cls: 'tm-drawer__chev' }),
    ]),
    con({ name: 'Services list', cls: 'tm-drawer__acc-body', dir: 'column', gap: 8, pad: [0, 0, 0, 12] }, svc),
  ]);
  const inquiries = con({ name: 'Direct inquiries', cls: 'tm-drawer__inq', dir: 'column', gap: 12 }, [
    heading({ t: 'Direct Inquiries', tag: 'div', color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.1, lsUnit: 'em' }),
    iconList({
      name: 'Phones & mail', items: [
        { t: '+971 52 693 5456', icon: lc('phone'), href: 'tel:+971526935456' },
        { t: '+971 4 340 9377', icon: lc('phone'), href: 'tel:+97143409377' },
        { t: 'inquiry@trinitymediauae.com', icon: lc('mail'), href: 'mailto:inquiry@trinitymediauae.com' },
      ],
      iconSize: 14, indent: 8, between: 12, iconColor: C.primary, color: C.tm_heading, family: F.b, size: 14, lh: 1.4286,
    }),
  ]);
  const cta = w('button', {
    text: 'GET IN TOUCH / REQUEST QUOTE', link: { url: home('/contact/'), is_external: '', nofollow: '', custom_attributes: '' }, align: 'justify',
    background_background: 'classic', background_color: C.primary[1], __globals__: { background_color: 'globals/colors?id=primary' },
    button_text_color: '#ffffff', border_radius: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true },
    text_padding: { unit: 'px', top: '14', right: '24', bottom: '14', left: '24', isLinked: false },
    typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase',
    typography_font_size: { unit: 'px', size: 16, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] },
  }, { cls: 'tm-btn tm-drawer__cta' });
  return con({
    name: 'Mobile menu', cls: 'tm-drawer', dir: 'column', gap: 24, pad: [32, 24], pos: 'fixed', z: 40,
  }, [
    con({ name: 'Mobile nav links', cls: 'tm-drawer__nav', dir: 'column', gap: 16 }, [
      link('Home', home('/')), link('About Us', home('/about/')), servicesRow, link('Our Works', home('/our-works/')), link('Blog', home('/blog/')), link('Contact Us', home('/contact/')),
    ]),
    inquiries, cta,
  ]);
}

/** mode: 'xpro' | 'pro' | 'free' */
export function buildHeader(mode = 'xpro') {
  const logoDark = image({ src: LOGO_DARK, alt: 'Trinity Media UAE', h: [48, 48, 40], fit: 'contain', cls: 'tm-logo tm-logo--dark', href: home('/'), name: 'Logo (dark theme)' });
  const logoLight = image({ src: LOGO_LIGHT, alt: 'Trinity Media UAE', h: [48, 48, 40], fit: 'contain', cls: 'tm-logo tm-logo--light', href: home('/'), name: 'Logo (light theme)' });

  let nav;
  if (mode === 'pro') {
    nav = w('nav-menu', { layout: 'horizontal', menu: '{{menuslug:primary}}', submenu_icon: { value: 'fas fa-chevron-down', library: 'fa-solid' }, toggle: 'none' }, { cls: 'tm-nav', name: 'Main menu' });
  } else {
    nav = w('xpro-horizontal-menu', {
      nav_menu: '{{menuslug:primary}}', align: 'left', responsive_show: 'none', menu_style: 'fade',
      menu_typography_typography: 'custom', menu_typography_font_family: F.b, menu_typography_font_weight: '500',
      menu_typography_font_size: { unit: 'px', size: 14, sizes: [] },
    }, { cls: 'tm-nav', name: 'Main menu (WordPress menu: Primary)' });
  }

  const toggle = (cls) => icon({ icon: 'fas fa-sun', size: 18, href: '#', cls: `tm-theme-toggle ${cls}`, name: 'Light / dark toggle' });
  const cta = w('button', {
    text: 'GET IN TOUCH', link: { url: home('/contact/'), is_external: '', nofollow: '', custom_attributes: '' },
    background_background: 'classic', background_color: C.primary[1], __globals__: { background_color: 'globals/colors?id=primary' },
    button_text_color: '#ffffff', border_radius: { unit: 'px', top: '4', right: '4', bottom: '4', left: '4', isLinked: true },
    text_padding: { unit: 'px', top: '10', right: '24', bottom: '10', left: '24', isLinked: false },
    typography_typography: 'custom', typography_font_family: F.b, typography_font_weight: '700', typography_text_transform: 'uppercase',
    typography_font_size: { unit: 'px', size: 14, sizes: [] }, typography_line_height: { unit: 'em', size: 1.4286, sizes: [] }, typography_letter_spacing: { unit: 'em', size: 0.05, sizes: [] },
  }, { cls: 'tm-btn tm-cta', name: 'CTA – Get in touch' });
  const burger = icon({ icon: lc('menu'), size: 26, href: '#', cls: 'tm-hamburger', color: C.tm_heading, name: 'Mobile menu button' });

  const navbar = con({ name: 'Main bar', cls: 'tm-navbar', pad: { d: [16, 32], t: [16, 32], m: [16, 16] } }, [
    con({ name: 'Main bar inner', boxed: 1296, dir: 'row', jc: 'space-between', ai: 'center', gap: 16, cls: 'tm-navbar__inner' }, [
      con({ name: 'Logo', dir: 'row', ai: 'center', cls: 'tm-logo-wrap' }, [logoDark, logoLight]),
      con({ name: 'Menu', dir: 'row', ai: 'center', cls: 'tm-nav-wrap' }, [nav]),
      con({ name: 'Actions (lg)', dir: 'row', ai: 'center', gap: 12, cls: 'tm-actions-lg' }, [toggle('tm-theme-toggle--lg'), cta]),
      con({ name: 'Actions (mobile)', dir: 'row', ai: 'center', gap: 8, cls: 'tm-actions-sm' }, [toggle('tm-theme-toggle--sm'), burger]),
    ]),
    megaPanel(),
  ]);

  return [con({ name: 'Header', cls: 'tm-header', dir: 'column', gap: 0 }, [topBar(), navbar, drawer()])];
}

export function buildMegaTemplate() {
  // reusable copy of the mega panel (Elementor library > container template)
  const panel = megaPanel();
  panel.settings.position = undefined;
  panel.settings.css_classes = 'tm-mega tm-mega--static';
  delete panel.settings.position;
  delete panel.settings.z_index;
  return [panel];
}
