// Tiny DSL that emits Elementor (flexbox / grid container) JSON.
// Everything produced is native: elType "container" + widgetType of Elementor / XPRO widgets.
// No inner-sections, no HTML widgets, no atomic elements.

let seq = 0;
export function resetIds(seed = 1) { seq = seed * 1000; }
export function eid() {
  seq += 1;
  const n = (Math.imul(seq, 2654435761) >>> 0).toString(16).padStart(8, '0');
  return n.slice(0, 7);
}

export const px = (n, unit = 'px') => ({ unit, size: n, sizes: [] });
export const dim = (t, r = t, b = t, l = r, unit = 'px') => ({
  unit, top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false,
});
export const gapv = (col, row = col, unit = 'px') => ({ column: String(col), row: String(row), isLinked: col === row, unit });

/** Responsive setter: value can be a scalar or [desktop, tablet, mobile] (undefined/null = inherit). */
export function rset(s, key, val, wrap = (v) => v) {
  if (val === undefined || val === null) return;
  if (Array.isArray(val)) {
    const [d, t, m] = val;
    if (d !== undefined && d !== null) s[key] = wrap(d);
    if (t !== undefined && t !== null) s[`${key}_tablet`] = wrap(t);
    if (m !== undefined && m !== null) s[`${key}_mobile`] = wrap(m);
  } else s[key] = wrap(val);
}

/** normalise CSS-like shorthand: n | [v,h] | [t,r,b,l] -> dimensions object */
export function box(v, unit='px'){
  if (v && typeof v==='object' && !Array.isArray(v) && 'top' in v) return v;
  if (typeof v==='number'||typeof v==='string') return dim(v,v,v,v,unit);
  if (v.length===2) return dim(v[0],v[1],v[0],v[1],unit);
  if (v.length===3) return dim(v[0],v[1],v[2],v[1],unit);
  return dim(v[0],v[1],v[2],v[3],unit);
}
/** responsive setter for box values: value | {d,t,m} */
export function bset(s,key,val,unit='px'){
  if (val===undefined||val===null) return;
  const isResp = val && typeof val==='object' && !Array.isArray(val) && !('top' in val) && ('d' in val||'t' in val||'m' in val);
  if (isResp){ if(val.d!==undefined) s[key]=box(val.d,unit); if(val.t!==undefined) s[key+'_tablet']=box(val.t,unit); if(val.m!==undefined) s[key+'_mobile']=box(val.m,unit); }
  else s[key]=box(val,unit);
}
/** responsive setter for gaps: n | [col,row] | {d,t,m} */
export function gset(s,key,val){
  if (val===undefined||val===null) return;
  const g=(v)=>Array.isArray(v)?gapv(v[0],v[1]):gapv(v);
  const isResp = val && typeof val==='object' && !Array.isArray(val) && ('d' in val||'t' in val||'m' in val);
  if (isResp){ if(val.d!==undefined) s[key]=g(val.d); if(val.t!==undefined) s[key+'_tablet']=g(val.t); if(val.m!==undefined) s[key+'_mobile']=g(val.m); }
  else s[key]=g(val);
}

const globalsOf = (s) => (s.__globals__ ||= {});
export function gcolor(s, key, id, hex) {
  s[key] = hex;
  globalsOf(s)[key] = `globals/colors?id=${id}`;
}

// ---------------------------------------------------------------- container
/**
 * con(opts, children)
 *  name   – Navigator title (_title)
 *  cls    – css classes
 *  cid    – css id (anchor)
 *  tag    – html tag (div|section|header|footer|main|article|aside|nav|a)
 *  boxed  – px: use boxed content width (Elementor "Boxed") ; default is full width
 *  w      – width [value, unit] or scalar % (responsive array allowed)  (full-width containers)
 *  maxw   – max width px
 *  dir    – 'row'|'column' (responsive array)
 *  jc / ai – justify-content / align-items (responsive)
 *  gap    – px or [col,row]; responsive array
 *  wrap   – true -> wrap
 *  grid   – {cols:[d,t,m], gap:[col,row]|n, rows}
 *  pad / mar – [t,r,b,l] or responsive array of those
 *  minh   – px / vh string like '90vh' (responsive)
 *  bg     – hex/rgba color ; bgg – [globalId,hex]
 *  bgimg  – url ; bgpos/bgsize
 *  grad   – {a,b,angle,aPos,bPos} (two-stop gradient)
 *  border – {w,color,style,radius}
 *  radius – px or [tl,tr,br,bl]
 *  shadow – {h,v,blur,spread,color}
 *  overflow – 'hidden'
 *  pos    – 'absolute'|'relative'|'fixed' (position) + off:{t,r,b,l} + z
 *  extra  – raw settings merged last
 */
export function con(o = {}, kids = []) {
  const s = {};
  if (o.name) s._title = o.name;
  if (o.cls) s.css_classes = o.cls;
  if (o.cid) s._element_id = o.cid;
  if (o.tag) s.html_tag = o.tag;
  if (o.link) { s.html_tag = 'a'; s.link = o.link; }

  s.content_width = o.boxed ? 'boxed' : 'full';
  if (o.boxed) rset(s, 'boxed_width', o.boxed, (v) => px(v));

  if (o.grid) {
    s.container_type = 'grid';
    s.grid_outline = '';
    rset(s, 'grid_columns_grid', o.grid.cols, (v) => (typeof v === 'string' ? { unit: 'custom', size: v, sizes: [] } : px(v, 'fr')));
    // rows are implicit (auto) – Elementor's default of 2×1fr would add an empty equal-height row
    for (const suf of ['', '_tablet', '_mobile']) s[`grid_rows_grid${suf}`] = { unit: 'custom', size: 'none', sizes: [] };
    gset(s, 'grid_gaps', o.grid.gap);
    if (o.ai) rset(s, 'grid_align_items', o.ai);
    if (o.grid.autoRows) { /* handled in css via cls */ }
  } else {
    if (o.dir) rset(s, 'flex_direction', o.dir);
    if (o.jc) rset(s, 'flex_justify_content', o.jc);
    if (o.ai) rset(s, 'flex_align_items', o.ai);
    gset(s, 'flex_gap', o.gap);
    if (o.wrap) rset(s, 'flex_wrap', o.wrap === true ? 'wrap' : o.wrap);
    if (o.ac) rset(s, 'flex_align_content', o.ac);
  }

  if (o.w !== undefined) rset(s, 'width', o.w, (v) => (typeof v === 'object' ? v : px(v, '%')));
  if (o.maxw) s._element_custom_width = undefined;
  if (o.minh !== undefined) rset(s, 'min_height', o.minh, (v) => (typeof v === 'string' ? { unit: v.replace(/[\d.]/g, ''), size: parseFloat(v), sizes: [] } : px(v)));

  bset(s, 'padding', o.pad);
  bset(s, 'margin', o.mar);

  if (o.bg || o.bgg || o.bgimg || o.grad) {
    if (o.grad) {
      s.background_background = 'gradient';
      s.background_color = o.grad.a; s.background_color_b = o.grad.b;
      s.background_gradient_type = 'linear';
      s.background_gradient_angle = { unit: 'deg', size: o.grad.angle ?? 180, sizes: [] };
      s.background_color_stop = px(o.grad.aPos ?? 0, '%');
      s.background_color_b_stop = px(o.grad.bPos ?? 100, '%');
    } else {
      s.background_background = 'classic';
      if (o.bg) s.background_color = o.bg;
      if (o.bgimg) {
        s.background_image = { url: o.bgimg, id: '', size: '', alt: '', source: 'library' };
        s.background_position = o.bgpos || 'center center';
        s.background_repeat = 'no-repeat';
        s.background_size = o.bgsize || 'cover';
      }
    }
    if (o.bgg) { globalsOf(s).background_color = `globals/colors?id=${o.bgg[0]}`; s.background_color = o.bgg[1]; }
  }

  if (o.border) {
    const b = o.border;
    s.border_border = b.style || 'solid';
    s.border_width = b.w !== undefined && typeof b.w === 'object' ? b.w : dim(b.w ?? 1);
    if (b.color) s.border_color = b.color;
    if (b.global) { globalsOf(s).border_color = `globals/colors?id=${b.global[0]}`; s.border_color = b.global[1]; }
  }
  bset(s, 'border_radius', o.radius);
  if (o.shadow) {
    s.box_shadow_box_shadow_type = 'yes';
    s.box_shadow_box_shadow = { horizontal: o.shadow.h ?? 0, vertical: o.shadow.v ?? 0, blur: o.shadow.blur ?? 0, spread: o.shadow.spread ?? 0, color: o.shadow.color || 'rgba(0,0,0,.2)' };
  }
  if (o.overflow) s.overflow = o.overflow;
  if (o.pos && o.pos !== 'relative') {
    s.position = o.pos;
    const f = o.off || {};
    const map = { t: ['_offset_orientation_v', 'start', '_offset_y'], b: ['_offset_orientation_v', 'end', '_offset_y_end'], l: ['_offset_orientation_h', 'start', '_offset_x'], r: ['_offset_orientation_h', 'end', '_offset_x_end'] };
    for (const k of Object.keys(f)) {
      const [ori, v, key] = map[k];
      s[ori] = v;
      rset(s, key, f[k], (n) => (typeof n === 'object' ? n : px(n)));
    }
  }
  if ((o.fill || (o.pos && o.pos !== 'relative')) && o.w === undefined) s.width = { unit: 'custom', size: 'auto', sizes: [] };
  if (o.fill) { s.position = 'absolute'; s.css_classes = `${s.css_classes || ''} tm-abs-fill`.trim(); }
  if (o.z !== undefined) s.z_index = o.z;
  if (o.hide) s.hide_desktop = o.hide.includes('d') ? 'hidden-desktop' : undefined, s.hide_tablet = o.hide.includes('t') ? 'hidden-tablet' : undefined, s.hide_mobile = o.hide.includes('m') ? 'hidden-mobile' : undefined;
  if (o.anim) { s.animation = o.anim; if (o.animDelay) s.animation_delay = o.animDelay; if (o.animDur) s.animation_duration = o.animDur; }
  if (o.extra) Object.assign(s, o.extra);

  // strip undefined
  for (const k of Object.keys(s)) if (s[k] === undefined) delete s[k];
  const children = kids.flat().filter(Boolean);
  // Elementor gives child containers --width:100%; in a ROW parent they should size to content (like Tailwind flex items).
  if (!o.grid) {
    const dv = Array.isArray(o.dir) ? o.dir : [o.dir];
    const d0 = dv[0] || 'column';
    const t0 = dv[1] || d0;
    const m0 = dv[2] || t0;
    const isRow = (v) => v === 'row' || v === 'row-reverse';
    for (const k of children) {
      if (k.elType !== 'container' || k.settings.width !== undefined) continue;
      const auto = { unit: 'custom', size: 'auto', sizes: [] };
      if (isRow(d0)) k.settings.width = auto;
      if (isRow(d0) && !isRow(t0)) k.settings.width_tablet = { unit: '%', size: 100, sizes: [] };
      if (!isRow(d0) && isRow(t0)) k.settings.width_tablet = auto;
      if (isRow(t0) && !isRow(m0) && k.settings.width_mobile === undefined) k.settings.width_mobile = { unit: '%', size: 100, sizes: [] };
      if (!isRow(t0) && isRow(m0)) k.settings.width_mobile = auto;
    }
  }
  return { id: eid(), elType: 'container', settings: s, elements: children, isInner: false };
}

// ---------------------------------------------------------------- widget helpers
function typo(s, prefix, t) {
  if (!t) return;
  s[`${prefix}_typography`] = 'custom';
  if (t.family) s[`${prefix}_font_family`] = t.family;
  if (t.size !== undefined) rset(s, `${prefix}_font_size`, t.size, (v) => px(v, t.unit || 'px'));
  if (t.weight) s[`${prefix}_font_weight`] = String(t.weight);
  if (t.tt) s[`${prefix}_text_transform`] = t.tt;
  if (t.style) s[`${prefix}_font_style`] = t.style;
  if (t.lh !== undefined) rset(s, `${prefix}_line_height`, t.lh, (v) => px(v, t.lhUnit || 'em'));
  if (t.ls !== undefined) rset(s, `${prefix}_letter_spacing`, t.ls, (v) => px(v, t.lsUnit || 'px'));
}

function common(s, o) {
  if (o.name) s._title = o.name;
  if (o.cls) s._css_classes = o.cls;
  if (o.cid) s._element_id = o.cid;
  bset(s, '_margin', o.mar);
  bset(s, '_padding', o.pad);
  if (o.z !== undefined) s._z_index = o.z;
  if (o.self) rset(s, '_flex_align_self', o.self);
  if (o.grow !== undefined) { s._flex_size = 'custom'; s._flex_grow = o.grow; s._flex_shrink = o.shrink ?? 1; }
  if (o.wid !== undefined) { rset(s, '_element_width', o.wid === 'auto' ? 'auto' : 'initial'); if (o.wid !== 'auto') rset(s, '_element_custom_width', o.wid, (v) => px(v, '%')); }
  if (o.pos && o.pos !== 'relative') {
    s._position = o.pos;
    const f = o.off || {};
    const map = { t: ['_offset_orientation_v', 'start', '_offset_y'], b: ['_offset_orientation_v', 'end', '_offset_y_end'], l: ['_offset_orientation_h', 'start', '_offset_x'], r: ['_offset_orientation_h', 'end', '_offset_x_end'] };
    for (const k of Object.keys(f)) { const [ori, v, key] = map[k]; s[ori] = v; rset(s, key, f[k], (n) => px(n)); }
  }
  if (o.anim) { s._animation = o.anim; if (o.animDelay) s._animation_delay = o.animDelay; if (o.animDur) s.animation_duration = o.animDur; }
  if (o.hide) { s.hide_desktop = o.hide.includes('d') ? 'hidden-desktop' : undefined; s.hide_tablet = o.hide.includes('t') ? 'hidden-tablet' : undefined; s.hide_mobile = o.hide.includes('m') ? 'hidden-mobile' : undefined; }
  if (o.extra) Object.assign(s, o.extra);
  for (const k of Object.keys(s)) if (s[k] === undefined) delete s[k];
  return s;
}

function widget(type, s) {
  return { id: eid(), elType: 'widget', widgetType: type, settings: s, elements: [] };
}

const align = (s, key, v) => { if (v !== undefined) rset(s, key, v); };

/** heading: {t, tag, href, color:[globalId,hex]|hex, size.., family, weight, tt, lh, ls, align} */
export function heading(o) {
  const s = { title: o.t, header_size: !o.tag || o.tag === 'span' ? 'div' : o.tag };
  if (o.href) s.link = { url: o.href, is_external: o.ext ? 'on' : '', nofollow: '', custom_attributes: '' };
  align(s, 'align', o.align);
  if (o.color) { if (Array.isArray(o.color)) gcolor(s, 'title_color', o.color[0], o.color[1]); else s.title_color = o.color; }
  typo(s, 'typography', o);
  return widget('heading', common(s, o));
}

/** text: rich text editor widget */
export function text(o) {
  const s = { editor: o.t };
  align(s, 'align', o.align);
  if (o.color) { if (Array.isArray(o.color)) gcolor(s, 'text_color', o.color[0], o.color[1]); else s.text_color = o.color; }
  if (o.space !== undefined) rset(s, 'paragraph_spacing', o.space, (v) => px(v));
  typo(s, 'typography', o);
  s.drop_cap = '';
  return widget('text-editor', common(s, o));
}

/** button: {t, href, icon:{v,lib}, iconAlign, bg, color, hbg, hcolor, bw, bc, radius, padding, typography.., full} */
export function button(o) {
  const s = { text: o.t, size: o.size || 'md' };
  s.link = { url: o.href || '#', is_external: o.ext ? 'on' : '', nofollow: o.ext ? 'on' : '', custom_attributes: o.attrs || '' };
  align(s, 'align', o.align);
  if (o.icon) { s.selected_icon = { value: o.icon, library: o.iconLib || 'fa-solid' }; s.icon_align = o.iconAlign || 'row'; s.icon_indent = px(o.iconGap ?? 8); }
  if (o.color) { if (Array.isArray(o.color)) gcolor(s, 'button_text_color', o.color[0], o.color[1]); else s.button_text_color = o.color; }
  if (o.bg || o.bgg) {
    s.background_background = 'classic';
    if (o.bgg) { globalsOf(s).background_color = `globals/colors?id=${o.bgg[0]}`; s.background_color = o.bgg[1]; } else s.background_color = o.bg;
  }
  if (o.hcolor) s.hover_color = o.hcolor;
  if (o.hbg) { s.button_background_hover_background = 'classic'; s.button_background_hover_color = o.hbg; }
  if (o.bw !== undefined) { s.border_border = 'solid'; s.border_width = dim(o.bw); if (o.bc) s.border_color = o.bc; if (o.bgc) { globalsOf(s).border_color = `globals/colors?id=${o.bgc[0]}`; s.border_color = o.bgc[1]; } }
  if (o.hbc) s.button_hover_border_color = o.hbc;
  bset(s, 'border_radius', o.radius);
  bset(s, 'text_padding', o.padding);
  if (o.shadow) { s.button_box_shadow_box_shadow_type = 'yes'; s.button_box_shadow_box_shadow = { horizontal: 0, vertical: o.shadow.v ?? 10, blur: o.shadow.blur ?? 15, spread: o.shadow.spread ?? -3, color: o.shadow.color }; }
  typo(s, 'typography', o);
  if (o.bcid) s.button_css_id = o.bcid;
  return widget('button', common(s, o));
}

/** icon-list: items [{t, icon:'tm-lucide tm-lucide-x' | 'fas fa-x', lib, href}] */
export function iconList(o) {
  const items = (o.items || []).map((it, i) => ({
    _id: eid(),
    text: it.t,
    selected_icon: it.icon ? { value: it.icon, library: it.lib || (it.icon.startsWith('tm-') ? 'tm-lucide' : it.icon.startsWith('fab') ? 'fa-brands' : 'fa-solid') } : { value: '', library: '' },
    link: it.href ? { url: it.href, is_external: it.ext ? 'on' : '', nofollow: '', custom_attributes: '' } : { url: '', is_external: '', nofollow: '', custom_attributes: '' },
  }));
  const s = { icon_list: items, view: o.view || 'traditional' };
  if (o.view === 'inline') { /* inline */ }
  rset(s, 'icon_size', o.iconSize, (v) => px(v));
  rset(s, 'text_indent', o.indent, (v) => px(v));
  rset(s, 'space_between', o.between, (v) => px(v));
  if (o.iconColor) { if (Array.isArray(o.iconColor)) gcolor(s, 'icon_color', o.iconColor[0], o.iconColor[1]); else s.icon_color = o.iconColor; }
  if (o.color) { if (Array.isArray(o.color)) gcolor(s, 'text_color', o.color[0], o.color[1]); else s.text_color = o.color; }
  if (o.hcolor) s.text_color_hover = o.hcolor;
  if (o.hicolor) s.icon_color_hover = o.hicolor;
  if (o.selfAlign) s.icon_self_align = o.selfAlign;
  if (o.vAlign) s.icon_self_vertical_align = o.vAlign;
  if (o.iconTop !== undefined) s.icon_vertical_offset = px(o.iconTop);
  typo(s, 'icon_typography', o);
  if (o.iconAlign === 'row-reverse') o = { ...o, cls: `${o.cls || ''} tm-iconr tm-ig${Array.isArray(o.indent) ? o.indent[0] : o.indent ?? 8}`.trim() };
  return widget('icon-list', common(s, o));
}

/** icon widget */
export function icon(o) {
  const s = { selected_icon: { value: o.icon, library: o.lib || (o.icon.startsWith('tm-') ? 'tm-lucide' : o.icon.startsWith('fab') ? 'fa-brands' : 'fa-solid') }, view: 'default' };
  if (o.href) s.link = { url: o.href, is_external: o.ext ? 'on' : '', nofollow: '', custom_attributes: '' };
  rset(s, 'size', o.size ?? 16, (v) => px(v));
  align(s, 'align', o.align);
  if (o.color) { if (Array.isArray(o.color)) gcolor(s, 'primary_color', o.color[0], o.color[1]); else s.primary_color = o.color; }
  if (o.hcolor) s.hover_primary_color = o.hcolor;
  return widget('icon', common(s, o));
}

/** image: {src, alt, w, h, fit, pos, radius, link, align} */
export function image(o) {
  const s = { image: { url: o.src, id: o.id || '', alt: o.alt || '', source: 'library' }, image_size: 'full' };
  if (o.w !== undefined) rset(s, 'width', o.w, (v) => (typeof v === 'object' ? v : px(v, o.wUnit || 'px')));
  if (o.h !== undefined) rset(s, 'height', o.h, (v) => (typeof v === 'object' ? v : px(v, o.hUnit || 'px')));
  if (o.maxw !== undefined) rset(s, 'space', o.maxw, (v) => px(v, o.maxwUnit || 'px'));
  if (o.fit) rset(s, 'object-fit', o.fit);
  if (o.pos) rset(s, 'object-position', o.pos);
  bset(s, 'image_border_radius', o.radius);
  if (o.href) { s.link_to = 'custom'; s.link = { url: o.href, is_external: '', nofollow: '', custom_attributes: '' }; }
  align(s, 'align', o.align);
  if (o.opacity !== undefined) s.opacity = { unit: 'px', size: o.opacity, sizes: [] };
  return widget('image', common(s, o));
}

export function divider(o = {}) {
  const s = { style: o.style || 'solid', weight: px(o.weight ?? 1), width: px(o.width ?? 100, '%'), gap: px(o.gap ?? 0) };
  if (o.color) { if (Array.isArray(o.color)) gcolor(s, 'color', o.color[0], o.color[1]); else s.color = o.color; }
  return widget('divider', common(s, o));
}

export function spacer(o = {}) {
  const s = {}; rset(s, 'space', o.h ?? 20, (v) => px(v));
  return widget('spacer', common(s, o));
}

/** native counter widget */
export function counter(o) {
  const s = { starting_number: o.from ?? 0, ending_number: o.to, prefix: o.prefix || '', suffix: o.suffix || '', duration: o.dur ?? 2000, thousand_separator: o.sep === false ? '' : 'yes', thousand_separator_char: '', title: o.title || '', title_position: 'bottom' };
  s.number_position = 'top';
  if (o.numAlign) rset(s, 'number_alignment', o.numAlign);
  if (o.color) { if (Array.isArray(o.color)) gcolor(s, 'number_color', o.color[0], o.color[1]); else s.number_color = o.color; }
  typo(s, 'typography_number', o);
  return widget('counter', common(s, o));
}

export function socialIcons(o) {
  const list = (o.items || []).map((it) => ({ _id: eid(), social_icon: { value: it.icon, library: 'fa-brands' }, link: { url: it.href, is_external: 'on', nofollow: 'on', custom_attributes: `aria-label|${it.label || ''}` }, item_icon_color: 'default' }));
  const s = { social_icon_list: list, shape: o.shape || 'rounded', columns: '0', columns_tablet: '0', columns_mobile: '0' };
  align(s, 'align', o.align);
  s.icon_color = 'custom';
  if (o.iconColor) s.icon_primary_color = o.iconColor;
  if (o.bgColor) s.icon_secondary_color = o.bgColor;
  rset(s, 'icon_size', o.size, (v) => px(v));
  rset(s, 'icon_padding', o.padding, (v) => px(v, 'em'));
  rset(s, 'icon_spacing', o.gap, (v) => px(v));
  if (o.hcolor) s.hover_primary_color = o.hcolor;
  if (o.hbg) s.hover_secondary_color = o.hbg;
  return widget('social-icons', common(s, o));
}

export function googleMap(o) {
  const s = { address: o.address, zoom: px(o.zoom ?? 14, ''), height: px(o.h ?? 380) };
  s.zoom = { unit: 'px', size: o.zoom ?? 14, sizes: [] };
  return widget('google_maps', common(s, o));
}

export function video(o) {
  const s = { video_type: 'hosted', hosted_url: { url: o.src, id: '' }, autoplay: o.autoplay ? 'yes' : '', mute: 'yes', loop: 'yes', controls: o.controls ? 'yes' : '' };
  return widget('video', common(s, o));
}

/** native shortcode widget – used for the WhatsApp quote forms (rendered by theme) */
export function shortcode(o) { return widget('shortcode', common({ shortcode: o.sc }, o)); }

/** generic widget escape hatch (XPRO widgets, accordion, tabs, ...) */
export function w(type, settings, o = {}) { return widget(type, common({ ...settings }, o)); }

export const T = typo; // exported for builders that need to craft settings by hand
