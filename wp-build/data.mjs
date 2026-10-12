// Pull the REAL content out of the React project so nothing is retyped by hand.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '../artifacts/trinity-media/src');

const mod = await import(pathToFileURL(path.join(src, 'data/services.ts')).href);
export const SERVICES = mod.SERVICES;

// blog posts live inside BlogPage.tsx (cards) and BlogPostPage.tsx (full content)
function extractArray(file) {
  const t = fs.readFileSync(path.join(src, file), 'utf8');
  const i = t.indexOf('const POSTS');
  const start = t.indexOf('[', i);
  let depth = 0, inStr = null, esc = false, end = -1;
  for (let k = start; k < t.length; k++) {
    const ch = t[k];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = ch; continue; }
    if (ch === '[') depth++;
    if (ch === ']') { depth--; if (depth === 0) { end = k; break; } }
  }
  // eslint-disable-next-line no-new-func
  return new Function(`return ${t.slice(start, end + 1)}`)();
}
const cards = extractArray('pages/BlogPage.tsx');
const full = extractArray('pages/BlogPostPage.tsx');
export const POSTS = cards.map((c) => ({ ...c, content: (full.find((f) => f.slug === c.slug) || {}).content || '' }));
