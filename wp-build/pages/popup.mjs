// Registration / quote popup – saved as an Elementor library template; shown only when triggered (#tm-popup).
import { con, heading, w, C, F } from '../lib/parts.mjs';
import { quoteCard } from './service.mjs';

export function buildPopup() {
  return [con({ name: 'Registration popup', cls: 'tm-popup-card', dir: 'column', gap: 0 }, [quoteCard('Trinity Media Services')])];
}
