// Concatenate css/*.css into the theme + generate tokens (dark default, light override, Elementor global colour flip).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DARK, LIGHT, GLOBAL_COLORS } from './lib/tokens.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

function vars(map) {
  return Object.entries(map).map(([k, v]) => `--${k}:${v};`).join('');
}

export function buildCss(theme) {
  const out = path.join(theme, 'assets/css');
  const light = GLOBAL_COLORS.map((g) => `--e-global-color-${g.id}:${g.light};`).join('');
  const dark = GLOBAL_COLORS.map((g) => `--e-global-color-${g.id}:${g.dark};`).join('');
  const tokens = `/* Generated – design tokens copied from the React site (index.css). Dark is the default theme. */
:root,html.dark{${vars(DARK)}--radius:.25rem;}
html.light{${vars(LIGHT)}--radius:.25rem;}
html.dark body[class*="elementor-kit-"],html:not(.light) body[class*="elementor-kit-"]{${dark}}
html.light body[class*="elementor-kit-"]{${light}}
`;
  const dir = path.join(here, 'css');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.css')).sort();
  const main = files.filter((f) => !f.startsWith('7')).map((f) => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
  const blog = files.filter((f) => f.startsWith('7')).map((f) => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
  fs.writeFileSync(path.join(out, 'theme.css'), tokens + '\n' + main);
  fs.writeFileSync(path.join(out, 'blog.css'), blog || '/* blog */');
  const jsDir = path.join(here, 'js');
  fs.mkdirSync(path.join(theme, 'assets/js'), { recursive: true });
  fs.copyFileSync(path.join(jsDir, 'theme.js'), path.join(theme, 'assets/js/theme.js'));
  return { css: files.length };
}
