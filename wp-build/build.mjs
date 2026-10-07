// Build: React site data  ->  Elementor JSON (demo/*.json) + manifest + generated CSS/assets.
//   node build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resetIds } from './lib/dsl.mjs';
import { kitSettings } from './kit.mjs';
import { buildLucide } from './lucide.mjs';
import { SERVICES, POSTS } from './data.mjs';
import { buildHeader, buildMegaTemplate } from './pages/header.mjs';
import { buildFooter } from './pages/footer.mjs';
import { PAGES } from './pages/index.mjs';
import { buildServicePage, buildCtaTemplate } from './pages/service.mjs';
import { buildPopup } from './pages/popup.mjs';
import { copyAssets } from './assets.mjs';
import { buildCss } from './css.mjs';
import { buildEmblems } from './emblems.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const theme = path.resolve(here, '../trinity-media-theme');
const demo = path.join(theme, 'demo');
fs.rmSync(demo, { recursive: true, force: true });
for (const d of ['pages', 'library', 'services']) fs.mkdirSync(path.join(demo, d), { recursive: true });

// nested containers must be flagged isInner so Elementor applies the child-container CSS
const markInner = (els, inner = false) => { for (const e of els) { if (e.elType === 'container') { e.isInner = inner; markInner(e.elements, true); } } return els; };
const write = (rel, data) => fs.writeFileSync(path.join(demo, rel), JSON.stringify(Array.isArray(data) && data[0] && data[0].elType ? markInner(data) : data));

// ---------------------------------------------------------------- library: header / footer / mega / popup
resetIds(1);
write('library/header-xpro.json', buildHeader('xpro'));
write('library/header-pro.json', buildHeader('pro'));
write('library/header.json', buildHeader('xpro'));
resetIds(2);
write('library/footer.json', buildFooter());
resetIds(3);
write('library/mega.json', buildMegaTemplate());
resetIds(4);
write('library/popup.json', buildPopup());
resetIds(5);
write('library/cta.json', buildCtaTemplate());

const library = [
  { key: 'header', slug: 'trinity-header', title: 'Trinity – Header', type: 'header', file: 'library/header.json', file_xpro: 'library/header-xpro.json', file_pro: 'library/header-pro.json' },
  { key: 'footer', slug: 'trinity-footer', title: 'Trinity – Footer', type: 'footer', file: 'library/footer.json' },
  { key: 'mega', slug: 'trinity-mega-menu', title: 'Trinity – Mega Menu (Services)', type: 'container', file: 'library/mega.json' },
  { key: 'cta', slug: 'trinity-contact-cta', title: 'Trinity – Contact CTA (reusable)', type: 'container', file: 'library/cta.json' },
  { key: 'popup', slug: 'trinity-registration-popup', title: 'Trinity – Registration Popup', type: 'container', file: 'library/popup.json' },
];

// ---------------------------------------------------------------- pages
const pages = [];
let seed = 10;
for (const pg of PAGES) {
  resetIds(seed++);
  if (pg.build) write(`pages/${pg.key}.json`, pg.build());
  pages.push({ key: pg.key, title: pg.title, slug: pg.slug, order: pg.order ?? 0, file: pg.build ? `pages/${pg.key}.json` : '', seo_description: pg.seo || '' });
}

// ---------------------------------------------------------------- services (19 CPT entries, same Elementor structure)
const services = SERVICES.map((s, i) => {
  resetIds(100 + i);
  write(`services/${s.slug}.json`, buildServicePage(s));
  return { slug: s.slug, title: s.title, num: s.num, excerpt: s.short, file: `services/${s.slug}.json`, thumb: s.image.replace(/^\/images\//, '') };
});

// ---------------------------------------------------------------- blog
const postDate = (d) => {
  const t = new Date(`${d} 10:00:00 UTC`);
  return t.toISOString().slice(0, 19).replace('T', ' ');
};
const toHtml = (md) => md.split('\n\n').map((para) => {
  const e = para.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  if (/^\*\*[^*]+\*\*$/.test(e.trim())) return `<h2>${e.trim().replace(/\*\*/g, '')}</h2>`;
  return `<p>${e.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')}</p>`;
}).join('\n');
const posts = POSTS.map((x) => ({
  slug: x.slug, title: x.title, excerpt: x.excerpt, content: toHtml(x.content), date: postDate(x.date), category: x.category,
  tags: x.tags, read_time: x.readTime, thumb: x.image.replace(/^\/images\//, ''), featured: !!x.featured,
}));
const categories = ['Exhibition', 'Printing', 'Signage', 'Branding', 'Fabrication', 'Events'];

// ---------------------------------------------------------------- menus
const sv = (slug, title) => ({ title, ref: `service:${slug}` });
const menus = {
  primary: {
    name: 'Primary Menu',
    items: [
      { title: 'Home', ref: 'page:home' },
      { title: 'About Us', ref: 'page:about' },
      { title: 'Services', url: '{{home}}/#services', classes: 'tm-mega-trigger', children: SERVICES.map((s) => ({ title: `${s.num} ${s.title}`, ref: `service:${s.slug}` })) },
      { title: 'Our Works', ref: 'page:our-works' },
      { title: 'Blog', ref: 'page:blog' },
      { title: 'Contact Us', ref: 'page:contact' },
    ],
  },
  'footer-services': {
    name: 'Footer – Services',
    items: [
      sv('exhibition-stand-design-construction', 'Exhibition Stand & Construction'),
      sv('event-branding-activation', 'Event Branding & Activation'),
      sv('custom-kiosk-design-fabrication', 'Custom Kiosk Fabrication'),
      sv('large-format-digital-printing', 'Large Format Digital Printing'),
      sv('indoor-outdoor-signage', 'Indoor & Outdoor Signage'),
      sv('acrylic-fabrication', 'Acrylic Fabrication'),
      sv('vehicle-branding-fleet-graphics', 'Vehicle Branding & Fleet'),
    ],
  },
  'footer-links': {
    name: 'Footer – Quick Links',
    items: [
      { title: 'Home', ref: 'page:home' }, { title: 'About Us', ref: 'page:about' }, { title: 'Our Journey', ref: 'page:our-journey' },
      { title: 'Why Choose Us', ref: 'page:why-choose-us' }, { title: 'Our Facilities', ref: 'page:our-facilities' }, { title: 'Awards', ref: 'page:awards' },
      { title: 'Portfolio', url: '{{home}}/#portfolio' }, { title: 'Contact', ref: 'page:contact' },
    ],
  },
};

fs.writeFileSync(path.join(demo, 'manifest.json'), JSON.stringify({ kit: kitSettings(), library, pages, services, categories, posts, menus }));

// ---------------------------------------------------------------- generated assets
buildEmblems(theme);
console.log('css', buildCss(theme));
console.log('lucide', buildLucide());
console.log('assets', copyAssets(theme));
console.log('built', { pages: pages.length, services: services.length, posts: posts.length });
