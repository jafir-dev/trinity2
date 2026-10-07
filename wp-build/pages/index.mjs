// Page registry. Each entry: key, title, slug, build() -> Elementor elements (omit build for dynamic pages).
import { buildHero } from './hero.mjs';
import { buildTrustedBy, buildIndustries, buildServices, buildPortfolio } from './sections1.mjs';
import { buildAbout, buildMilestones, buildAwards } from './sections2.mjs';
import { buildAboutPage, buildJourneyPage, buildWhyPage, buildWorksPage, buildAwardsPage, buildFacilitiesPage, buildContactPage } from './inner.mjs';

const homeSections = () => [
  buildHero(), buildTrustedBy(), buildIndustries(), buildServices(), buildPortfolio(), buildAbout(), buildMilestones(), buildAwards(),
];

export const PAGES = [
  { key: 'home', title: 'Home', slug: 'home', order: 0, build: homeSections, seo: 'Trinity Media UAE — Premium exhibition stands, event branding, custom fabrication, printing, and complete branding solutions for businesses.' },
  { key: 'about', title: 'About Us', slug: 'about', order: 1, build: buildAboutPage },
  { key: 'our-journey', title: 'Our Journey', slug: 'our-journey', order: 2, build: buildJourneyPage },
  { key: 'why-choose-us', title: 'Why Choose Us', slug: 'why-choose-us', order: 3, build: buildWhyPage },
  { key: 'our-works', title: 'Our Works', slug: 'our-works', order: 4, build: buildWorksPage },
  { key: 'awards', title: 'Awards & Sponsorships', slug: 'awards', order: 5, build: buildAwardsPage },
  { key: 'our-facilities', title: 'Our Facilities', slug: 'our-facilities', order: 6, build: buildFacilitiesPage },
  { key: 'contact', title: 'Contact Us', slug: 'contact', order: 7, build: buildContactPage },
  { key: 'blog', title: 'Blog', slug: 'blog', order: 8 },
];
