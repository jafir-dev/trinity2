// Design tokens lifted 1:1 from artifacts/trinity-media/src/index.css  (HSL triples as in the Vite/Tailwind source)

export function hsl2hex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const to = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${to(f(0))}${to(f(8))}${to(f(4))}`;
}
const H = (str) => { const [h, s, l] = str.split(/\s+/).map((v) => parseFloat(v)); return hsl2hex(h, s, l); };

export const DARK = {
  background: '232 18% 10%', foreground: '220 20% 98%', border: '230 13% 21%',
  card: '232 16% 14%', 'card-foreground': '220 20% 98%', 'card-border': '230 14% 24%',
  popover: '232 16% 14%', 'popover-foreground': '220 20% 98%',
  primary: '284 72% 65%', 'primary-foreground': '0 0% 100%',
  secondary: '220 16% 84%', 'secondary-foreground': '232 18% 10%',
  muted: '232 14% 17%', 'muted-foreground': '224 14% 74%',
  accent: '280 78% 70%', 'accent-foreground': '0 0% 100%',
  input: '230 13% 22%', ring: '284 72% 65%',
  surface: '232 18% 10%', 'surface-alt': '232 15% 14.5%', 'surface-elevated': '232 15% 18%',
  'on-surface': '220 20% 98%', 'on-surface-muted': '224 14% 74%',
  'nav-bg': 'rgba(17, 19, 28, 0.86)', 'nav-bg-scrolled': 'rgba(18, 20, 30, 0.96)',
};
export const LIGHT = {
  background: '0 0% 98%', foreground: '0 0% 10%', border: '0 0% 88%',
  card: '0 0% 100%', 'card-foreground': '0 0% 10%', 'card-border': '0 0% 90%',
  popover: '0 0% 100%', 'popover-foreground': '0 0% 10%',
  primary: '289 60% 52%', 'primary-foreground': '0 0% 100%',
  secondary: '0 0% 40%', 'secondary-foreground': '0 0% 10%',
  muted: '0 0% 93%', 'muted-foreground': '0 0% 45%',
  accent: '289 60% 52%', 'accent-foreground': '0 0% 100%',
  input: '0 0% 88%', ring: '289 60% 52%',
  surface: '0 0% 100%', 'surface-alt': '0 0% 96%', 'surface-elevated': '0 0% 100%',
  'on-surface': '0 0% 10%', 'on-surface-muted': '0 0% 50%',
  'nav-bg': 'rgba(255, 255, 255, 0.85)', 'nav-bg-scrolled': 'rgba(255, 255, 255, 0.95)',
};

/** Elementor Global Colors.  hex = dark value (site default). light overrides ship in theme.css */
export const GLOBAL_COLORS = [
  // system slots
  { id: 'primary', title: 'Primary (Brand Purple)', dark: H(DARK.primary), light: H(LIGHT.primary) },
  { id: 'secondary', title: 'Secondary (Platinum)', dark: H(DARK.secondary), light: H(LIGHT.secondary) },
  { id: 'text', title: 'Text', dark: H(DARK.foreground), light: H(LIGHT.foreground) },
  { id: 'accent', title: 'Accent (Lavender)', dark: H(DARK.accent), light: H(LIGHT.accent) },
  // custom slots
  { id: 'tm_bg', title: 'Background', dark: H(DARK.background), light: H(LIGHT.background) },
  { id: 'tm_card', title: 'Card / Surface', dark: H(DARK.card), light: H(LIGHT.card) },
  { id: 'tm_border', title: 'Border', dark: H(DARK.border), light: H(LIGHT.border) },
  { id: 'tm_muted', title: 'Muted Surface', dark: H(DARK.muted), light: H(LIGHT.muted) },
  { id: 'tm_muted_fg', title: 'Muted Text', dark: H(DARK['muted-foreground']), light: H(LIGHT['muted-foreground']) },
  { id: 'tm_heading', title: 'Heading', dark: H(DARK.foreground), light: H(LIGHT.foreground) },
  { id: 'tm_white', title: 'White', dark: '#ffffff', light: '#ffffff' },
  { id: 'tm_whatsapp', title: 'WhatsApp Green', dark: '#16a34a', light: '#16a34a' },
  { id: 'tm_grad_a', title: 'Gradient Purple A', dark: '#4d195a', light: '#4d195a' },
  { id: 'tm_grad_b', title: 'Gradient Purple B', dark: '#35103f', light: '#35103f' },
  { id: 'tm_grad_c', title: 'Gradient Purple C', dark: '#200727', light: '#200727' },
  { id: 'tm_pink', title: 'Pink Accent', dark: '#f9a8d4', light: '#f9a8d4' },
];

// Handy refs for builders: [globalId, hexInDarkMode]
export const C = Object.fromEntries(GLOBAL_COLORS.map((g) => [g.id, [g.id, g.dark]]));

// Rendered hex values of dark & light for CSS generation
export const GLOBAL_LIGHT = Object.fromEntries(GLOBAL_COLORS.map((g) => [g.id, g.light]));

export const FONT_DISPLAY = 'Bebas Neue';
export const FONT_BODY = 'Inter';
export const MAXW = 1360;
