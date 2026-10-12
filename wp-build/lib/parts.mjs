// Shared building blocks (Tailwind scale → Elementor values) used by every page builder.
import { con, heading, text, button, iconList, icon, image, divider, w, socialIcons } from './dsl.mjs';
import { C, FONT_DISPLAY, FONT_BODY } from './tokens.mjs';

export const F = { d: FONT_DISPLAY, b: FONT_BODY };

/** Tailwind font-size scale -> [px, line-height(em)] */
export const TW = {
  '10': [10, 1.5], '11': [11, 1.5], xs: [12, 1.3333], sm: [14, 1.4286], base: [16, 1.5], lg: [18, 1.5556], xl: [20, 1.4], '2xl': [24, 1.3333],
  '3xl': [30, 1.2], '4xl': [36, 1.1111], '5xl': [48, 1], '6xl': [60, 1], '7xl': [72, 1], '8xl': [96, 1], '9xl': [128, 1],
};
/** fs('sm') or fs(['6xl','5xl','4xl'])  (desktop, tablet, mobile) -> {size, lh} */
export function fs(v, lhOverride) {
  const pick = (k) => (typeof k === 'number' ? [k, 1] : TW[k]);
  if (Array.isArray(v)) {
    const arr = v.map((k) => (k === null || k === undefined ? undefined : pick(k)));
    const o = { size: arr.map((a) => a && a[0]) };
    o.lh = lhOverride !== undefined ? lhOverride : arr.map((a) => a && a[1]);
    return o;
  }
  const [s, l] = pick(v);
  return { size: s, lh: lhOverride !== undefined ? lhOverride : l };
}

export const TRACK = { tighter: -0.05, tight: -0.025, normal: 0, wide: 0.025, wider: 0.05, widest: 0.1 };

/** typography helper object for DSL widgets */
export function ty(o) {
  const out = { ...o };
  if (o.fs !== undefined) { Object.assign(out, fs(o.fs, o.lh)); delete out.fs; }
  if (o.track !== undefined) { out.ls = typeof o.track === 'string' ? TRACK[o.track] : o.track; out.lsUnit = 'em'; delete out.track; }
  return out;
}

export const asset = (p) => `{{theme}}/assets/images/${p.replace(/^\//, '').replace(/^images\//, '')}`;
export const home = (p = '') => `{{home}}${p}`;

/** Standard full-width section with boxed 1296 inner (== Tailwind max-w-[1360px] + px-8). */
export function section(o, kids) {
  const gutter = o.gutter || { d: 32, m: 16 };
  const py = o.py || { d: 96, t: 80, m: 80 };
  const g = (k) => (typeof gutter === 'number' ? gutter : gutter[k] ?? gutter.d);
  const pad = o.pad || {
    d: [py.d, g('d')],
    t: [py.t ?? py.d, g('t')],
    m: [py.m ?? py.t ?? py.d, g('m')],
  };
  return con({
    name: o.name, cls: `tm-section ${o.cls || ''}`.trim(), cid: o.cid, tag: o.tag || 'section',
    pad, boxed: o.boxed ?? 1296, dir: o.dir || 'column', gap: o.gap, ai: o.ai, jc: o.jc, bg: o.bg, bgg: o.bgg, border: o.border,
    overflow: o.overflow, minh: o.minh, extra: o.extra,
  }, kids);
}

export function eyebrow(t, o = {}) {
  return heading({
    t, tag: 'div', cls: `tm-eyebrow ${o.cls || ''}`.trim(), color: o.color || C.primary, align: o.align,
    family: F.b, weight: 700, tt: 'uppercase', size: o.size ?? 12, lh: o.lh ?? 1.3333, ls: o.ls ?? 0.1, lsUnit: 'em', mar: o.mar, pad: o.pad,
  });
}

/** Display (Bebas) heading */
export function h(t, o = {}) {
  const f = ty({ fs: o.fs ?? '5xl', lh: o.lh, track: o.track });
  return heading({
    t, tag: o.tag || 'h2', cls: o.cls, color: o.color || C.tm_heading, align: o.align, family: F.d, weight: 400, tt: o.tt === undefined ? 'uppercase' : o.tt,
    size: f.size, lh: f.lh, ls: f.ls, lsUnit: f.lsUnit, mar: o.mar, pad: o.pad, href: o.href, name: o.name, anim: o.anim, animDelay: o.animDelay, self: o.self, extra: o.extra, wid: o.wid, cid: o.cid,
  });
}

/** Body paragraph / rich text (Inter) */
export function p(t, o = {}) {
  const f = ty({ fs: o.fs ?? 'base', lh: o.lh });
  return text({
    t: o.raw ? t : `<p>${t}</p>`, cls: o.cls, color: o.color || C.tm_muted_fg, align: o.align, family: F.b, weight: o.weight ?? 400,
    size: f.size, lh: f.lh, mar: o.mar, pad: o.pad, space: 0, anim: o.anim, animDelay: o.animDelay, name: o.name, ls: o.ls, lsUnit: o.lsUnit, self: o.self, extra: o.extra, wid: o.wid,
  });
}

export const lc = (name) => `tm-lucide tm-lucide-${name}`;

/** Pill badge: [icon] text  (icon list so it stays one native widget) */
export function badge(t, o = {}) {
  return iconList({
    cls: `tm-badge ${o.cls || ''}`.trim(), items: [o.icon ? { t, icon: lc(o.icon) } : { t }],
    iconSize: o.iconSize ?? 13, indent: o.indent ?? 8, iconColor: o.iconColor || C.primary, color: o.color || C.primary,
    family: F.b, weight: o.weight ?? 600, tt: 'uppercase', size: o.size ?? 12, lh: 1.3333, ls: o.ls ?? 0.1, lsUnit: 'em', mar: o.mar, self: o.self, name: o.name,
  });
}

/** Native primary button */
export function btn(t, href, o = {}) {
  return button({
    t, href, cls: `tm-btn ${o.cls || ''}`.trim(), name: o.name,
    bgg: o.bgg === undefined ? C.primary : o.bgg, bg: o.bg, color: o.color || '#ffffff', hcolor: o.hcolor, hbg: o.hbg,
    bw: o.bw, bc: o.bc, bgc: o.bgc, radius: o.radius ?? 4, padding: o.padding ?? [12, 24], align: o.align, icon: o.icon, iconLib: o.iconLib, iconAlign: o.iconAlign, iconGap: o.iconGap ?? 8,
    family: F.b, weight: o.weight ?? 700, tt: 'uppercase', size: o.size ?? 14, lh: o.lh ?? 1.4286, ls: o.ls ?? 0.05, lsUnit: 'em', shadow: o.shadow, self: o.self, ext: o.ext, mar: o.mar, anim: o.anim, animDelay: o.animDelay,
    attrs: o.attrs, bcid: o.bcid,
  });
}

export * from './dsl.mjs';
export { C };
