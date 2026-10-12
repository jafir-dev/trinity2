// Awards emblems: the three vector illustrations from Awards.tsx exported as standalone SVG files,
// plus the CSS for their gradient backgrounds + ray/geometry overlays.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

const star = (x, y) => `${x},${y - 3} ${x + 1},${y - 1} ${x + 3},${y - 1} ${x + 1.5},${y + 0.8} ${x + 2},${y + 3} ${x},${y + 1.5} ${x - 2},${y + 3} ${x - 1.5},${y + 0.8} ${x - 3},${y - 1} ${x - 1},${y - 1}`;

const EMBLEM_1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
<defs>
<linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFBEB"/><stop offset="30%" stop-color="#FCD34D"/><stop offset="70%" stop-color="#D97706"/><stop offset="100%" stop-color="#78350F"/></linearGradient>
<linearGradient id="goldGrad2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#B45309"/><stop offset="50%" stop-color="#FBBF24"/><stop offset="100%" stop-color="#FFFBEB"/></linearGradient>
<radialGradient id="sunGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FDE68A" stop-opacity="0.8"/><stop offset="100%" stop-color="#B45309" stop-opacity="0.2"/></radialGradient>
</defs>
<g stroke="url(#goldGrad1)" stroke-width="2.5" stroke-linecap="round">
<path d="M 40 135 C 28 100 35 60 70 36" fill="none"/>
<path d="M 38 126 C 28 120 26 108 34 104 C 38 112 40 118 38 126 Z" fill="url(#goldGrad1)"/>
<path d="M 32 100 C 22 94 22 82 30 78 C 34 86 35 93 32 100 Z" fill="url(#goldGrad1)"/>
<path d="M 36 74 C 28 68 30 56 39 53 C 41 62 40 68 36 74 Z" fill="url(#goldGrad1)"/>
<path d="M 48 50 C 42 42 48 32 58 31 C 58 40 54 46 48 50 Z" fill="url(#goldGrad1)"/>
<path d="M 68 34 C 64 24 74 18 84 20 C 81 29 75 33 68 34 Z" fill="url(#goldGrad1)"/>
<path d="M 160 135 C 172 100 165 60 130 36" fill="none"/>
<path d="M 162 126 C 172 120 174 108 166 104 C 162 112 160 118 162 126 Z" fill="url(#goldGrad1)"/>
<path d="M 168 100 C 178 94 178 82 170 78 C 166 86 165 93 168 100 Z" fill="url(#goldGrad1)"/>
<path d="M 164 74 C 172 68 170 56 161 53 C 159 62 160 68 164 74 Z" fill="url(#goldGrad1)"/>
<path d="M 152 50 C 158 42 152 32 142 31 C 142 40 146 46 152 50 Z" fill="url(#goldGrad1)"/>
<path d="M 132 34 C 136 24 126 18 116 20 C 119 29 125 33 132 34 Z" fill="url(#goldGrad1)"/>
</g>
<circle cx="100" cy="95" r="42" fill="#1b0c2e" stroke="url(#goldGrad1)" stroke-width="3"/>
<circle cx="100" cy="95" r="36" fill="url(#sunGlow)" stroke="url(#goldGrad2)" stroke-width="1.5" stroke-dasharray="3 2"/>
<polygon points="100,64 106,86 128,95 106,104 100,126 94,104 72,95 94,86" fill="url(#goldGrad1)"/>
<polygon points="100,64 100,95 128,95" fill="url(#goldGrad2)" opacity="0.9"/>
<polygon points="100,126 100,95 72,95" fill="url(#goldGrad2)" opacity="0.9"/>
<circle cx="100" cy="95" r="7" fill="#FFFBEB"/>
<path d="M 50 152 L 150 152 L 140 168 L 60 168 Z" fill="url(#goldGrad1)" stroke="#78350F" stroke-width="1"/>
<text x="100" y="163" text-anchor="middle" fill="#521d03" font-size="8" font-weight="900" font-family="sans-serif" letter-spacing="1.5">GOLD WINNER</text>
</svg>`;

const EMBLEM_2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
<defs>
<linearGradient id="crystalFacet1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="40%" stop-color="#BAE6FD"/><stop offset="100%" stop-color="#0284C7"/></linearGradient>
<linearGradient id="crystalFacet2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#E0F2FE"/><stop offset="60%" stop-color="#38BDF8"/><stop offset="100%" stop-color="#0369A1"/></linearGradient>
<linearGradient id="crystalFacet3" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#0284C7"/></linearGradient>
<linearGradient id="platBase" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#334155"/><stop offset="50%" stop-color="#94A3B8"/><stop offset="100%" stop-color="#1E293B"/></linearGradient>
</defs>
<polygon points="100,24 135,70 100,140 65,70" fill="url(#crystalFacet1)" opacity="0.9"/>
<polygon points="100,24 65,70 100,140" fill="url(#crystalFacet2)" opacity="0.85"/>
<polygon points="100,24 125,50 100,75 75,50" fill="#FFFFFF" opacity="0.6"/>
<polygon points="100,75 125,50 135,70" fill="url(#crystalFacet3)" opacity="0.95"/>
<circle cx="100" cy="85" r="22" fill="#04182b" stroke="#7DD3FC" stroke-width="2"/>
<path d="M 96 74 L 104 74 L 104 81 L 111 81 L 111 89 L 104 89 L 104 96 L 96 96 L 96 89 L 89 89 L 89 81 L 96 81 Z" fill="url(#crystalFacet1)"/>
<circle cx="100" cy="24" r="3.5" fill="#FFFFFF"/><circle cx="65" cy="70" r="2" fill="#E0F2FE"/><circle cx="135" cy="70" r="2" fill="#E0F2FE"/>
<polygon points="68,145 132,145 142,165 58,165" fill="url(#platBase)" stroke="#475569" stroke-width="1"/>
<polygon points="58,165 142,165 138,172 62,172" fill="#0F172A"/>
<text x="100" y="159" text-anchor="middle" fill="#E0F2FE" font-size="7.5" font-weight="800" font-family="sans-serif" letter-spacing="1.2">CRYSTAL PARTNER</text>
</svg>`;

const stars = Array.from({ length: 12 }, (_, i) => {
  const a = (i * 30 * Math.PI) / 180;
  return `<polygon points="${star(100 + 35 * Math.sin(a), 108 - 35 * Math.cos(a))}" fill="#FBBF24"/>`;
}).join('');
const EMBLEM_3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
<defs>
<linearGradient id="edpGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FEF3C7"/><stop offset="40%" stop-color="#F59E0B"/><stop offset="80%" stop-color="#D97706"/><stop offset="100%" stop-color="#92400E"/></linearGradient>
<linearGradient id="euRibbon" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1E40AF"/><stop offset="100%" stop-color="#1D4ED8"/></linearGradient>
</defs>
<polygon points="76,20 100,50 85,75 62,20" fill="url(#euRibbon)" stroke="#F59E0B" stroke-width="1.2"/>
<polygon points="124,20 100,50 115,75 138,20" fill="url(#euRibbon)" stroke="#F59E0B" stroke-width="1.2"/>
<circle cx="100" cy="108" r="48" fill="url(#edpGold)" stroke="#78350F" stroke-width="2"/>
<circle cx="100" cy="108" r="43" fill="#08142c" stroke="#FDE68A" stroke-width="1.5"/>
${stars}
<circle cx="100" cy="108" r="23" fill="url(#edpGold)"/>
<circle cx="100" cy="108" r="20" fill="#08142c"/>
<circle cx="95" cy="103" r="5" fill="#06B6D4" opacity="0.9"/><circle cx="105" cy="103" r="5" fill="#EC4899" opacity="0.9"/><circle cx="100" cy="112" r="5" fill="#FACC15" opacity="0.9"/><circle cx="100" cy="106" r="2.5" fill="#FFFFFF"/>
<path d="M 54 158 L 146 158 L 138 172 L 62 172 Z" fill="url(#edpGold)" stroke="#78350F" stroke-width="1"/>
<text x="100" y="168" text-anchor="middle" fill="#451a03" font-size="8" font-weight="900" font-family="sans-serif" letter-spacing="1.2">EDP AWARDS 2021</text>
</svg>`;

// background overlays (400x300 viewBox, drawn "contain" like the React <svg className="absolute inset-0 w-full h-full">)
const rays = Array.from({ length: 24 }, (_, i) => `<line x1="200" y1="150" x2="${200 + 220 * Math.cos((i * Math.PI) / 12)}" y2="${150 + 220 * Math.sin((i * Math.PI) / 12)}"/>`).join('');
const BG_1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none"><defs><linearGradient id="goldRays" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FDE68A"/><stop offset="100%" stop-color="#D97706" stop-opacity="0"/></linearGradient></defs><g opacity="0.15" stroke="url(#goldRays)" stroke-width="0.8">${rays}</g></svg>`;
const BG_2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none"><g opacity="0.2"><polygon points="200,40 280,120 200,240 120,120" stroke="#38BDF8" stroke-width="0.8"/><polygon points="200,70 250,130 200,210 150,130" stroke="#0284C7" stroke-width="0.6" stroke-dasharray="4 3"/><line x1="120" y1="120" x2="280" y2="120" stroke="#38BDF8" stroke-width="0.5"/><line x1="200" y1="40" x2="200" y2="240" stroke="#38BDF8" stroke-width="0.5"/></g></svg>`;
const BG_3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none"><g opacity="0.15"><circle cx="200" cy="150" r="110" stroke="#FBBF24" stroke-width="1" stroke-dasharray="6 4"/><circle cx="200" cy="150" r="80" stroke="#38BDF8" stroke-width="0.8"/><circle cx="200" cy="150" r="50" stroke="#F43F5E" stroke-width="0.8"/></g></svg>`;

export function buildEmblems(theme) {
  const dir = path.join(theme, 'assets/images/awards');
  fs.mkdirSync(dir, { recursive: true });
  [[1, EMBLEM_1, BG_1], [2, EMBLEM_2, BG_2], [3, EMBLEM_3, BG_3]].forEach(([n, e, b]) => {
    fs.writeFileSync(path.join(dir, `emblem-${n}.svg`), e);
    fs.writeFileSync(path.join(dir, `bg-${n}.svg`), b);
  });
  const css = `/* Generated by wp-build/emblems.mjs */
.tm-emblem { position: relative; overflow: hidden; background-repeat: no-repeat; }
.tm-emblem--1 { background: radial-gradient(circle at center, rgb(245 158 11 / .2), rgb(147 51 234 / .1), transparent 100%), linear-gradient(to bottom right, #1d112e, #120820, #0a0312); }
.tm-emblem--2 { background: radial-gradient(circle at center, rgb(6 182 212 / .2), rgb(2 132 199 / .1), transparent 100%), linear-gradient(to bottom right, #06192d, #04111f, #02070e); }
.tm-emblem--3 { background: radial-gradient(circle at center, rgb(59 130 246 / .2), rgb(79 70 229 / .1), transparent 100%), linear-gradient(to bottom right, #0c1c38, #071124, #040814); }
.tm-emblem::before { content: ''; position: absolute; inset: 0; background-position: center; background-size: contain; background-repeat: no-repeat; pointer-events: none; display: block !important; opacity: 1 !important; width: auto; height: auto; }
.tm-emblem--1::before { background-image: url(../images/awards/bg-1.svg); }
.tm-emblem--2::before { background-image: url(../images/awards/bg-2.svg); }
.tm-emblem--3::before { background-image: url(../images/awards/bg-3.svg); }
.tm-emblem > .elementor-widget-image { position: relative; z-index: 1; }
`;
  fs.writeFileSync(path.join(here, 'css/60-awards-generated.css'), css);
}
