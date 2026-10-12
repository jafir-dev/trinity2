# Trinity Media – WordPress + Elementor theme

Pixel-matched WordPress conversion of the React/Vite site in `artifacts/trinity-media`.
Every page, the header, footer, mega menu and popup are **native Elementor Containers + widgets** –
no Inner Sections, no HTML widgets, no Atomic-editor elements.

## Requirements

| Needed | Why |
|---|---|
| WordPress 6.4+, PHP 7.4+ | theme |
| **Elementor** (free, 3.30+ / 4.x) | all page content (Flexbox + Grid containers) |
| **XPRO Theme Builder** + **XPRO Elementor Addons** | header & footer (Theme Builder) + the Horizontal Menu widget – *used when Elementor Pro is not installed* |
| *or* Elementor Pro | if Pro is active the importer builds Header/Footer as Pro Theme Builder templates instead (XPRO is then not needed) |

## Install

1. Upload `trinity-media-theme.zip` → Appearance → Themes → Add New → Upload → **Activate**.
2. Make sure Elementor (+ XPRO Theme Builder / XPRO Elementor Addons, or Elementor Pro) are active.
3. Appearance → **Trinity Demo Import** → *Import / Re-import Demo Content*  
   (it also runs automatically the first time the theme is activated while Elementor is active).  
   WP-CLI: `wp trinity import`.

The importer creates, from `demo/*.json` (generated from the React source by `wp-build/`):

* **Global design system** – Elementor Kit: global colours (brand purple, platinum, lavender, surfaces, borders, WhatsApp green …),
  global fonts (Bebas Neue display + Inter), container width 1360, breakpoints (tablet ≤ 1023, mobile ≤ 767), heading defaults.
* **Pages** – Home, About Us, Our Journey, Why Choose Us, Our Works, Awards & Sponsorships, Our Facilities, Contact Us, Blog.
* **19 Services** (custom post type, `/services/<slug>/`), each an Elementor document with the same structure.
* **6 blog posts** + categories + tags (blog index / single / 404 are dynamic WordPress templates styled to match).
* **Library templates** (Templates → Saved Templates): *Trinity – Header*, *Trinity – Footer*, *Trinity – Mega Menu (Services)*,
  *Trinity – Registration Popup*, *Trinity – Contact CTA (reusable)*.  
  With XPRO the header & footer live in **XPRO Theme Builder** (post type `xpro-themer`, display rule *Entire Website*).
* **Menus** – Primary (Services item carries the 19 services), Footer – Services, Footer – Quick Links.

## What is editable where

| Item | Edit with |
|---|---|
| Any page / service | Elementor (Containers → widgets; each container is named in the Navigator) |
| Header & footer | XPRO Theme Builder (or Elementor Pro Theme Builder) → open in Elementor |
| Mega menu (desktop) | Edit the *Header* – container **Mega menu – Services** (and the saved template of the same content) |
| Menu items | Appearance → Menus (Primary Menu). Give an item the CSS class `tm-mega-trigger` to make it open the mega panel |
| Registration popup | Templates → Saved Templates → *Trinity – Registration Popup* |
| Forms | `[trinity_form type="quote|contact|service"]` shortcode widgets (labels live in `inc/forms.php`); leads go to WhatsApp **and** e-mail (`trinity_form_recipient` option) |
| Colours / fonts | Elementor → Site Settings → Global Colors / Global Fonts (Light mode re-points the same variables, see below) |

### Registration popup (never auto-shown)

The popup template is rendered once, hidden, in the footer. It opens **only** when something triggers it:

* a link / button whose URL is `#tm-popup`, or
* any element with the CSS class `tm-open-popup`.

Disable the shell entirely with `add_filter( 'trinity_enable_popup', '__return_false' );`.

### Dark / Light

The original site defaults to **dark** with a toggle (stored in `localStorage` as `trinity-theme`). Design tokens are copied 1:1
from the React `index.css` into `assets/css/theme.css`; under `html.light` the Elementor global colour variables
(`--e-global-color-*`) are re-pointed to the light palette so every native widget follows the toggle.

## Theme structure

```
style.css, functions.php, header.php, footer.php, page.php, single-service.php, home.php, single.php, 404.php, …
inc/            setup · assets · cpt · elementor (header/footer fallback, locations) · popup · forms · importer · template-tags
assets/css      theme.css (tokens + all component CSS) · blog.css · lucide.css (Lucide icons as CSS masks)
assets/js       theme.js  (theme toggle, hero crossfade, mega-menu hover, filters, lightbox, forms, popup, cursor – no dependencies)
assets/images   every image used by the demo
demo/           manifest.json + Elementor JSON for pages / services / library
```

Header/footer fallback chain: Elementor Pro location → XPRO Theme Builder → library template (*Trinity – Header/Footer*) → plain markup.

## Rebuilding the demo JSON from the React source

```bash
cd wp-build
node build.mjs        # reads artifacts/trinity-media/src (services, posts, …) and regenerates demo/*, assets/css/*, assets/js/*
```

Requires Node 22+ (it imports the TypeScript data file directly) and the project's `node_modules` (Lucide icon paths).
