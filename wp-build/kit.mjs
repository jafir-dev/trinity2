// Elementor Kit (Site Settings): Global Colors, Global Fonts, layout, breakpoints, default element styling.
import { GLOBAL_COLORS, FONT_DISPLAY, FONT_BODY, MAXW } from './lib/tokens.mjs';
import { px } from './lib/dsl.mjs';

const typo = (id, title, family, weight, size, lh, ls, tt) => ({
  _id: id, title,
  typography_typography: 'custom',
  typography_font_family: family,
  typography_font_weight: String(weight),
  ...(size ? { typography_font_size: px(size) } : {}),
  ...(lh ? { typography_line_height: px(lh, 'em') } : {}),
  ...(ls !== undefined ? { typography_letter_spacing: px(ls, 'px') } : {}),
  ...(tt ? { typography_text_transform: tt } : {}),
});

export function kitSettings() {
  const sys = GLOBAL_COLORS.slice(0, 4);
  const custom = GLOBAL_COLORS.slice(4);
  const dark = Object.fromEntries(GLOBAL_COLORS.map((g) => [g.id, g.dark]));

  const s = {
    // ---------------------------------------------------------------- Global colours
    system_colors: sys.map((g) => ({ _id: g.id, title: g.title, color: g.dark })),
    custom_colors: custom.map((g) => ({ _id: g.id, title: g.title, color: g.dark })),

    // ---------------------------------------------------------------- Global fonts
    system_typography: [
      typo('primary', 'Primary – Inter Semibold', FONT_BODY, 600),
      typo('secondary', 'Secondary – Bebas Neue', FONT_DISPLAY, 400),
      typo('text', 'Text – Inter Regular', FONT_BODY, 400, 16, 1.5),
      typo('accent', 'Accent – Inter Bold', FONT_BODY, 700),
    ],
    custom_typography: [
      typo('tm_display', 'Display / Headings – Bebas Neue', FONT_DISPLAY, 400, 60, 1, -1.5, 'uppercase'),
      typo('tm_nav', 'Navigation – Inter Medium', FONT_BODY, 500, 14, 1.43),
      typo('tm_button', 'Button – Inter Bold Caps', FONT_BODY, 700, 14, 1.43, 1.4, 'uppercase'),
      typo('tm_eyebrow', 'Eyebrow – Inter Bold Caps', FONT_BODY, 700, 12, 1.33, 1.8, 'uppercase'),
      typo('tm_body', 'Body – Inter', FONT_BODY, 400, 16, 1.625),
      typo('tm_small', 'Small / Meta – Inter', FONT_BODY, 400, 12, 1.33),
    ],

    // ---------------------------------------------------------------- Body & headings
    body_typography_typography: 'custom',
    body_typography_font_family: FONT_BODY,
    body_typography_font_size: px(16),
    body_typography_font_weight: '400',
    body_typography_line_height: px(1.5, 'em'),
    body_background_background: 'classic',
    body_background_color: dark.tm_bg,
    __globals__: {
      body_background_color: 'globals/colors?id=tm_bg',
      body_typography_typography: 'globals/typography?id=text',
      h1_color: 'globals/colors?id=tm_heading', h2_color: 'globals/colors?id=tm_heading', h3_color: 'globals/colors?id=tm_heading',
      h4_color: 'globals/colors?id=tm_heading', h5_color: 'globals/colors?id=tm_heading', h6_color: 'globals/colors?id=tm_heading',
      link_normal_color: 'globals/colors?id=primary',
    },
    link_normal_color: dark.primary,
    link_hover_color: dark.accent,

    // ---------------------------------------------------------------- Layout
    container_width: px(MAXW),
    container_padding: { unit: 'px', top: '0', right: '0', bottom: '0', left: '0', isLinked: true },
    space_between_widgets: { unit: 'px', column: '0', row: '0', isLinked: true },
    page_title_selector: 'h1.entry-title',
    default_generic_fonts: 'sans-serif',
    stretched_section_container: '',

    // ---------------------------------------------------------------- Breakpoints (Tailwind: md = 768, lg = 1024)
    viewport_mobile: 767,
    viewport_tablet: 1023,

  };

  // headings: Bebas Neue
  for (const h of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
    s[`${h}_typography_typography`] = 'custom';
    s[`${h}_typography_font_family`] = FONT_DISPLAY;
    s[`${h}_typography_font_weight`] = '400';
    s[`${h}_typography_text_transform`] = 'uppercase';
    s[`${h}_typography_line_height`] = px(1, 'em');
    s[`${h}_color`] = dark.tm_heading;
  }
  return s;
}
