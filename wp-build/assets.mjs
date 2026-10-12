// Copies every image referenced by the generated Elementor JSON / theme templates into the theme.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const pub = path.join(root, 'artifacts/trinity-media/public/images');
const att = path.join(root, 'attached_assets');

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (f.name === 'images' && dir.endsWith('assets')) continue;
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, out); else if (/\.(php|json|js|css|mjs)$/.test(f.name)) out.push(p);
  }
  return out;
}

function resolveSource(rel) {
  if (rel.startsWith('logo/')) return path.join(att, rel.replace('logo/', ''));
  if (rel.startsWith('generated/')) return path.join(att, 'generated_images', rel.replace('generated/', ''));
  return path.join(pub, rel);
}

function resizeWithDrawing(src, dst, maxW) {
  const ps = `Add-Type -AssemblyName System.Drawing; $i=[System.Drawing.Image]::FromFile('${src.replace(/'/g, "''")}'); $r=[double]$i.Width/[double]$i.Height; $w=[Math]::Min(${maxW},$i.Width); $h=[int]($w/$r); $b=New-Object System.Drawing.Bitmap($w,$h); $g=[System.Drawing.Graphics]::FromImage($b); $g.InterpolationMode='HighQualityBicubic'; $g.SmoothingMode='HighQuality'; $g.DrawImage($i,0,0,$w,$h); $b.Save('${dst.replace(/'/g, "''")}',[System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose();$b.Dispose();$i.Dispose()`;
  execFileSync('powershell', ['-NoProfile', '-Command', ps], { stdio: 'pipe' });
}

export function copyAssets(theme) {
  const refs = new Set();
  for (const f of [...walk(path.join(theme, 'demo')), ...walk(theme).filter((x) => /\.(php|css|js)$/.test(x))]) {
    const s = fs.readFileSync(f, 'utf8');
    for (const m of s.matchAll(/assets\/images\/([A-Za-z0-9_\-./ %]+?\.(?:jpe?g|png|svg|webp|gif))/gi)) refs.add(decodeURIComponent(m[1]));
  }
  const missing = [];
  let copied = 0;
  for (const rel of refs) {
    const dst = path.join(theme, 'assets/images', rel);
    if (fs.existsSync(dst)) continue;
    const src = resolveSource(rel);
    if (!fs.existsSync(src)) { missing.push(rel); continue; }
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    if (rel === 'logo/trinity-logo-original.png') resizeWithDrawing(src, dst, 900);
    else fs.copyFileSync(src, dst);
    copied++;
  }
  // about video (kept outside /images)
  const vid = path.join(pub, 'about/about-video.mp4');
  const vdst = path.join(theme, 'assets/media/about-video.mp4');
  if (!process.env.SKIP_VIDEO && fs.existsSync(vid) && !fs.existsSync(vdst)) { fs.mkdirSync(path.dirname(vdst), { recursive: true }); fs.copyFileSync(vid, vdst); }
  return { referenced: refs.size, copied, missing };
}
