// Footer – 12-column grid: About+socials | Services | Quick links | Get in touch, then copyright bar.
import { con, heading, iconList, image, socialIcons, w, C, F, h, p, lc, asset, home } from '../lib/parts.mjs';

const FSOCIALS = [
  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/profile.php?id=100063650510124', label: 'Facebook' },
  { icon: 'fab fa-twitter', href: 'https://x.com/TrinityMediaUAE', label: 'X (Twitter)' },
  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/trinitymediallc/', label: 'Instagram' },
  { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/trinity-media-uae/', label: 'LinkedIn' },
  { icon: 'fab fa-youtube', href: 'https://www.youtube.com/@TrinityMediaDIP', label: 'YouTube' },
  { icon: 'fab fa-whatsapp', href: 'https://wa.me/971526935456', label: 'WhatsApp' },
];

const colHeading = (t) => heading({
  t, tag: 'h4', cls: 'tm-footer__h', color: C.tm_heading, family: F.b, weight: 700, tt: 'uppercase', size: 14, lh: 1.4286, ls: 0.05, lsUnit: 'em',
});

export function buildFooter() {
  const col1 = con({ name: 'About column', cls: 'tm-footer__col tm-footer__col--about', dir: 'column', gap: 0 }, [
    con({ name: 'Logo', dir: 'row', cls: 'tm-logo-wrap tm-footer__logo' }, [
      image({ src: asset('logo/trinity-logo-white.png'), alt: 'Trinity Media UAE', h: 44, fit: 'contain', cls: 'tm-logo tm-logo--dark', href: home('/'), name: 'Logo (dark theme)' }),
      image({ src: asset('logo/trinity-logo-original.png'), alt: 'Trinity Media UAE', h: 44, fit: 'contain', cls: 'tm-logo tm-logo--light', href: home('/'), name: 'Logo (light theme)' }),
    ]),
    heading({ t: 'About Us', tag: 'h4', cls: 'tm-footer__about-h', color: C.primary, family: F.b, weight: 700, tt: 'uppercase', size: 12, lh: 1.3333, ls: 0.05, lsUnit: 'em', mar: [24, 0, 12, 0] }),
    p('Trinity Media LLC is a premier Large Format Printing &amp; Fabrication Company in Dubai specializing in all digital printing formats. From conception to delivery, we guarantee exceptional quality and engineering precision.', { fs: 'sm', lh: 1.625, color: C.tm_muted_fg, mar: [0, 0, 24, 0], pad: [0, 16, 0, 0], cls: 'tm-footer__about' }),
    socialIcons({ name: 'Social links', cls: 'tm-footer__social', items: FSOCIALS, size: 13, gap: 12, shape: 'circle', align: 'left' }),
  ]);

  const col2 = con({ name: 'Services column', cls: 'tm-footer__col', dir: 'column', gap: 0 }, [
    colHeading('Services'),
    w('wp-widget-nav_menu', { wp: { title: '', nav_menu: '{{menuid:footer-services}}' } }, { cls: 'tm-footer__menu', name: 'Footer menu – Services' }),
  ]);
  const col3 = con({ name: 'Quick links column', cls: 'tm-footer__col', dir: 'column', gap: 0 }, [
    colHeading('Quick Links'),
    w('wp-widget-nav_menu', { wp: { title: '', nav_menu: '{{menuid:footer-links}}' } }, { cls: 'tm-footer__menu', name: 'Footer menu – Quick links' }),
  ]);
  const col4 = con({ name: 'Contact column', cls: 'tm-footer__col', dir: 'column', gap: 0 }, [
    colHeading('Get in Touch'),
    iconList({
      name: 'Contact details', cls: 'tm-footer__contact', items: [
        { t: 'Warehouse No. 4, Plot 194-0, Near Aiko Mall, Opp. BSL Gulf LLC, Dubai Investment park 1, Dubai UAE', icon: lc('map-pin') },
        { t: '+971 52 693 5456 (Mob)', icon: lc('phone'), href: 'tel:+971526935456' },
        { t: '+971 4 340 9377 (Tel)', icon: lc('phone'), href: 'tel:+97143409377' },
        { t: '+971 52 693 5456 (WhatsApp)', icon: 'fab fa-whatsapp', href: 'https://wa.me/971526935456', ext: true },
        { t: 'inquiry@trinitymediauae.com', icon: lc('mail'), href: 'mailto:inquiry@trinitymediauae.com' },
      ],
      iconSize: 14, indent: 10, between: 14, iconColor: C.primary, color: C.tm_heading, hcolor: C.primary, family: F.b, size: 12, lh: 1.3333, vAlign: 'start', iconTop: 2,
    }),
  ]);

  const bottom = con({ name: 'Bottom bar', cls: 'tm-footer__bottom', dir: ['row', 'row', 'column'], jc: 'space-between', ai: 'center', gap: 16, pad: [24, 0, 0, 0] }, [
    p('Copyrights © 2026 <strong>Trinity Media LLC</strong>. Designed by CEZCON | <a href="' + home('/contact/') + '">Privacy &amp; Contact</a>', { raw: false, fs: 'xs', color: C.tm_muted_fg, cls: 'tm-footer__copy' }),
    iconList({
      name: 'Back to top', cls: 'tm-footer__top', items: [{ t: 'Back to top', icon: lc('arrow-up'), href: '#' }],
      iconAlign: 'row-reverse', iconSize: 13, indent: 6, iconColor: C.primary, color: C.primary, family: F.b, weight: 600, size: 12, lh: 1.3333,
    }),
  ]);

  return [con({ name: 'Footer', cls: 'tm-footer', tag: 'footer', pad: { d: [80, 32, 32], t: [80, 32, 32], m: [80, 16, 32] }, dir: 'column' }, [
    con({ name: 'Footer inner', boxed: 1296, dir: 'column', gap: 64 }, [
      con({ name: 'Footer grid', cls: 'tm-footer__grid', grid: { cols: [12, 2, 1], gap: { d: 32, t: 40, m: 40 } } }, [col1, col2, col3, col4]),
      bottom,
    ]),
  ])];
}
