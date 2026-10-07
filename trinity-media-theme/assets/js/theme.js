/*!
 * Trinity Media – supporting interactions.
 * Everything visual is built from native Elementor containers/widgets; this file only adds the behaviours
 * that Elementor does not ship natively (theme toggle, hero crossfade, mega-menu hover, filters, lightbox,
 * WhatsApp forms, popup, cursor).  No dependencies.
 */
(function () {
	'use strict';

	var doc = document;
	var root = doc.documentElement;
	var $ = function (s, c) { return (c || doc).querySelector(s); };
	var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
	var on = function (el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt); };
	var isEditor = function () { return doc.body.classList.contains('elementor-editor-active'); };

	/* ------------------------------------------------------------------ theme toggle */
	function setTheme(t) {
		root.classList.remove('dark', 'light');
		root.classList.add(t);
		try { localStorage.setItem('trinity-theme', t); } catch (e) {}
		$$('.tm-theme-toggle a').forEach(function (a) { a.setAttribute('title', t === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'); a.setAttribute('aria-label', 'Toggle light and dark mode'); });
	}
	function initTheme() {
		setTheme(root.classList.contains('light') ? 'light' : 'dark');
		doc.addEventListener('click', function (e) {
			var t = e.target.closest && e.target.closest('.tm-theme-toggle');
			if (!t) return;
			e.preventDefault();
			setTheme(root.classList.contains('dark') ? 'light' : 'dark');
		});
	}

	/* ------------------------------------------------------------------ header */
	function initHeader() {
		var header = $('.tm-header');
		if (!header) return;
		var onScroll = function () { header.classList.toggle('tm-scrolled', window.scrollY > 40); };
		on(window, 'scroll', onScroll, { passive: true });
		onScroll();

		// mobile drawer
		var drawer = $('.tm-drawer', header);
		var burger = $('.tm-hamburger', header);
		var closeDrawer = function () {
			if (!drawer) return;
			drawer.classList.remove('is-open');
			if (burger) burger.classList.remove('is-open');
			doc.body.classList.remove('tm-drawer-open');
		};
		if (burger) {
			on(burger, 'click', function (e) {
				e.preventDefault();
				var open = !drawer.classList.contains('is-open');
				drawer.classList.toggle('is-open', open);
				burger.classList.toggle('is-open', open);
				doc.body.classList.toggle('tm-drawer-open', open);
			});
		}
		if (drawer) {
			$$('.tm-drawer__acc-head', drawer).forEach(function (h) {
				on(h, 'click', function () { h.closest('.tm-drawer__acc').classList.toggle('is-open'); });
			});
			on(drawer, 'click', function (e) { if (e.target.closest('a')) closeDrawer(); });
		}
		on(window, 'resize', function () { if (window.innerWidth >= 1280) closeDrawer(); });

		// mega menu (desktop)
		var mega = $('.tm-mega', header);
		var trigger = $('.tm-mega-trigger', header);
		if (mega && trigger) {
			var timer;
			var place = function () {
				var bar = mega.offsetParent || header;
				var br = bar.getBoundingClientRect();
				var tr = trigger.getBoundingClientRect();
				mega.style.left = (tr.left - br.left - 320) + 'px';
				mega.style.top = (tr.bottom - br.top) + 'px';
			};
			var open = function () { clearTimeout(timer); place(); mega.classList.add('is-open'); trigger.classList.add('tm-mega-open'); };
			var close = function () { timer = setTimeout(function () { mega.classList.remove('is-open'); trigger.classList.remove('tm-mega-open'); }, 140); };
			on(trigger, 'mouseenter', open); on(trigger, 'mouseleave', close);
			on(mega, 'mouseenter', open); on(mega, 'mouseleave', close);
			on(mega, 'click', function (e) { if (e.target.closest('a')) { mega.classList.remove('is-open'); trigger.classList.remove('tm-mega-open'); } });
			on(window, 'resize', place);
		}
	}

	/* ------------------------------------------------------------------ scroll reveal */
	function initReveal() {
		var els = $$('.tm-rv');
		if (!els.length) return;
		if (isEditor() || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
		}, { rootMargin: '0px 0px -50px 0px', threshold: 0.05 });
		els.forEach(function (e) { io.observe(e); });
		// rect-based fallback (full-page captures / resized viewports where IntersectionObserver may not fire)
		var pend = els.slice();
		function sweep() {
			var vh = window.innerHeight || doc.documentElement.clientHeight;
			pend = pend.filter(function (e) { var r = e.getBoundingClientRect(); if (r.top < vh - 50 && r.bottom > 0) { e.classList.add('is-in'); io.unobserve(e); return false; } return true; });
			if (!pend.length) { window.removeEventListener('scroll', sweep); window.removeEventListener('resize', sweep); }
		}
		window.addEventListener('scroll', sweep, { passive: true }); window.addEventListener('resize', sweep); window.addEventListener('load', sweep); sweep();
	}

	/* ------------------------------------------------------------------ hero crossfade slider */
	function initHero() {
		var hero = $('.tm-hero');
		if (!hero || isEditor()) return;
		var slides = $$('.tm-slide', hero);
		var bgs = $$('.tm-hero__bgslide', hero);
		var dots = $$('.tm-hero__dot', hero);
		var count = $('.tm-hero__count', hero);
		var n = slides.length;
		if (!n) return;
		var cur = 0, paused = false, timer, busy = false;
		var pad = function (v) { return (v < 10 ? '0' : '') + v; };

		function show(next) {
			if (busy || next === cur) return;
			busy = true;
			var prev = cur;
			cur = (next + n) % n;
			// content: fade old out quickly, then animate new in
			slides[prev].classList.remove('is-active');
			slides[cur].classList.add('is-active');
			// background crossfade
			if (bgs[prev]) { bgs[prev].classList.add('is-leaving'); bgs[prev].classList.remove('is-active'); }
			if (bgs[cur]) {
				bgs[cur].classList.remove('is-leaving');
				bgs[cur].style.display = 'block';
				// force reflow so transition runs from the initial state
				void bgs[cur].offsetWidth;
				bgs[cur].classList.add('is-active');
			}
			setTimeout(function () { if (bgs[prev]) { bgs[prev].classList.remove('is-leaving'); bgs[prev].style.display = ''; } busy = false; }, 1000);
			dots.forEach(function (d, i) { d.classList.toggle('is-active', i === cur); });
			if (count) { var t = count.querySelector('.elementor-heading-title') || count; t.textContent = pad(cur + 1) + ' / ' + pad(n); }
			// warm the next background
			var nx = bgs[(cur + 1) % n]; if (nx) { var im = nx.querySelector('img'); if (im) im.loading = 'eager'; }
		}
		function start() { stop(); timer = setInterval(function () { if (!paused) show(cur + 1); }, 5000); }
		function stop() { clearInterval(timer); }

		on($('.tm-hero__prev', hero), 'click', function (e) { e.preventDefault(); show(cur - 1); start(); });
		on($('.tm-hero__next', hero), 'click', function (e) { e.preventDefault(); show(cur + 1); start(); });
		dots.forEach(function (d, i) { on(d, 'click', function () { show(i); start(); }); });
		on(hero, 'mouseenter', function () { paused = true; });
		on(hero, 'mouseleave', function () { paused = false; });
		start();
	}

	/* ------------------------------------------------------------------ logo marquee: duplicate set for a seamless loop */
	function initMarquee() {
		if (isEditor()) return;
		$$('.tm-marquee__track').forEach(function (track) {
			var kids = Array.prototype.slice.call(track.children);
			kids.forEach(function (k) { var c = k.cloneNode(true); c.setAttribute('aria-hidden', 'true'); c.removeAttribute('data-id'); track.appendChild(c); });
		});
	}

	/* ------------------------------------------------------------------ portfolio filter */
	function initFilters() {
		$$('.tm-filters').forEach(function (bar) {
			var scope = bar.closest('.e-con-inner, .e-con') || doc;
			var grid = scope.parentElement ? scope.parentElement.querySelector('.tm-portfolio__grid, .tm-works__grid') : null;
			if (!grid) {
				var sec = bar.closest('.tm-section') || doc;
				grid = $('.tm-portfolio__grid, .tm-works__grid', sec);
			}
			if (!grid) return;
			on(bar, 'click', function (e) {
				var btn = e.target.closest('.tm-filter');
				if (!btn) return;
				e.preventDefault();
				var f = (btn.querySelector('a') || btn).getAttribute('data-filter') || btn.textContent.trim();
				$$('.tm-filter', bar).forEach(function (b) { b.classList.toggle('is-active', b === btn); });
				$$('.tm-proj', grid).forEach(function (card) {
					var show = f === 'All' || card.classList.contains('tm-cat-' + f.toLowerCase());
					card.classList.toggle('is-hidden', !show);
				});
			});
		});
	}

	/* ------------------------------------------------------------------ lightbox (service galleries) */
	function initLightbox() {
		var items = $$('.tm-lb');
		if (!items.length) return;
		var srcs = items.map(function (it) { var im = it.querySelector('.tm-lb-img img') || it.querySelector('img'); return im ? (im.currentSrc || im.src) : ''; });
		var idx = 0, ov;
		function build() {
			ov = doc.createElement('div');
			ov.className = 'tm-lightbox';
			ov.innerHTML = '<button type="button" class="tm-lightbox__close" aria-label="Close image viewer"><i class="tm-lucide tm-lucide-x"></i></button>' +
				'<div class="tm-lightbox__count"></div><img class="tm-lightbox__img" alt="" />' +
				'<button type="button" class="tm-lightbox__prev" aria-label="Previous image"><i class="tm-lucide tm-lucide-chevron-left"></i></button>' +
				'<button type="button" class="tm-lightbox__next" aria-label="Next image"><i class="tm-lucide tm-lucide-chevron-right"></i></button>';
			doc.body.appendChild(ov);
			on(ov, 'click', function (e) { if (e.target === ov || e.target.closest('.tm-lightbox__close')) close(); });
			on($('.tm-lightbox__prev', ov), 'click', function (e) { e.stopPropagation(); go(-1); });
			on($('.tm-lightbox__next', ov), 'click', function (e) { e.stopPropagation(); go(1); });
			on($('.tm-lightbox__img', ov), 'click', function (e) { e.stopPropagation(); });
		}
		function paint() {
			$('.tm-lightbox__img', ov).src = srcs[idx];
			$('.tm-lightbox__count', ov).textContent = (idx + 1) + ' / ' + srcs.length;
			ov.classList.toggle('is-single', srcs.length < 2);
		}
		function open(i) { if (!ov) build(); idx = i; paint(); ov.classList.add('is-open'); doc.body.classList.add('tm-popup-open'); }
		function close() { if (ov) ov.classList.remove('is-open'); doc.body.classList.remove('tm-popup-open'); }
		function go(d) { idx = (idx + d + srcs.length) % srcs.length; paint(); }
		items.forEach(function (it, i) {
			on(it, 'click', function (e) { e.preventDefault(); open(i); });
			it.style.cursor = 'zoom-in';
		});
		on(doc, 'keydown', function (e) {
			if (!ov || !ov.classList.contains('is-open')) return;
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowLeft') go(-1);
			if (e.key === 'ArrowRight') go(1);
		});
	}

	/* ------------------------------------------------------------------ enquiry forms */
	function initForms() {
		var wa = (window.TrinityMedia && TrinityMedia.whatsapp) || '971526935456';
		$$('[data-tm-form]').forEach(function (form) {
			var type = form.getAttribute('data-tm-form');
			var wrap = form.closest('.tm-form-wrap');
			var success = $('.tm-form__success', wrap);
			var err = $('.tm-form__error', form);
			var sumEl = $('[data-tm-sum]', form);
			var ans = $('[data-tm-answer]', form);
			var robot = $('[data-tm-robot]', form);
			var label = $('[data-tm-submit-label]', form);
			var n1 = 4, n2 = 3;
			var rnd = function (m, a) { return Math.floor(Math.random() * m) + a; };
			function refresh() {
				if (type === 'contact') { n1 = rnd(9, 2); n2 = rnd(8, 1); } else if (type === 'service') { n1 = rnd(8, 2); n2 = rnd(7, 1); } else { n1 = rnd(8, 2); n2 = rnd(8, 1); }
				if (sumEl) sumEl.textContent = (type === 'contact' ? 'Security Code: ' : '') + n1 + ' + ' + n2 + ' = ?';
				if (ans) ans.value = '';
				err.hidden = true;
			}
			refresh();
			on($('[data-tm-refresh]', form), 'click', refresh);
			var fail = function (m) { err.textContent = m; err.hidden = false; };
			var val = function (name) { var f = form.elements[name]; return f ? String(f.value || '').trim() : ''; };

			on(form, 'submit', function (e) {
				e.preventDefault();
				err.hidden = true;
				var name = val('name'), email = val('email'), phone = val('phone'), message = val('message');
				var msg;
				if (type === 'quote') {
					if (!name || !phone) return fail('Please provide your name and phone number.');
					if (robot && !robot.checked) return fail('Please check the verification box to proceed.');
					if (parseInt(ans.value.trim(), 10) !== n1 + n2) return fail('Incorrect security answer. Please solve: ' + n1 + ' + ' + n2 + ' = ?');
					msg = '*NEW QUOTE REQUEST - TRINITY MEDIA LLC*\n----------------------------------\n👤 *Name:* ' + name + '\n📧 *Email:* ' + (email || 'Not specified') + '\n📱 *Phone:* ' + phone + '\n🛠️ *Service Needed:* ' + val('service') + '\n📝 *Project Scope / Notes:* ' + (message || 'Requesting standard quote & consultation') + '\n----------------------------------\n*Location:* Dubai Investment Park - 1\n*Source:* Quote Form (Trinity Media UAE)';
				} else if (type === 'contact') {
					if (!name || !email || !phone || !message) return fail('Please fill in all required fields.');
					if (robot && !robot.checked) return fail('Please check the verification box to proceed.');
					if (parseInt(ans.value.trim(), 10) !== n1 + n2) return fail('Incorrect security calculation. Please solve: ' + n1 + ' + ' + n2 + ' = ?');
					msg = '*INQUIRY FROM TRINITY MEDIA CONTACT DESK*\n----------------------------------\n👤 *Name:* ' + name + '\n📧 *Email:* ' + email + '\n📱 *Phone:* ' + phone + '\n💬 *Message:* ' + message + '\n----------------------------------\n*Facility:* Warehouse No. 4, Plot 194-0, DIP-1, Dubai UAE\n*Status:* Direct Inquire Now Submission';
				} else {
					if (!name || !email || !phone || !message) return fail('Please complete all required fields (*)');
					if (parseInt(ans.value.trim(), 10) !== n1 + n2) return fail('Calculation incorrect. Please solve: ' + n1 + ' + ' + n2 + ' = ?');
					msg = '*NEW HIGH-CONVERSION QUOTE REQUEST*\n----------------------------------\n🎯 *Service:* ' + (form.getAttribute('data-service') || '') + '\n👤 *Name:* ' + name + '\n📧 *Email:* ' + email + '\n📱 *Phone:* ' + phone + '\n⏱️ *Timeline:* ' + val('timeline') + '\n📝 *Specifications / Dimensions:*\n' + message + '\n----------------------------------\n*Location:* DIP-1 Production Press, Dubai';
				}
				var btn = $('.tm-submit', form);
				btn.disabled = true;
				label.textContent = type === 'quote' ? 'Submitting...' : 'Sending Request...';

				// e-mail copy to the site recipient (best effort)
				try {
					var fd = new FormData(form);
					fd.append('action', 'trinity_form'); fd.append('type', type);
					if (type === 'service') fd.append('service', form.getAttribute('data-service') || '');
					fetch((window.TrinityMedia && TrinityMedia.ajaxUrl) || '/wp-admin/admin-ajax.php', { method: 'POST', body: fd, credentials: 'same-origin' });
				} catch (x) {}

				setTimeout(function () {
					btn.disabled = false;
					label.textContent = label.getAttribute('data-label');
					form.hidden = true; success.hidden = false;
					window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
				}, 400);
			});
			on($('[data-tm-again]', wrap), 'click', function () { success.hidden = true; form.hidden = false; form.reset(); refresh(); });
		});
	}

	/* ------------------------------------------------------------------ registration popup */
	function initPopup() {
		var pop = $('#tm-popup');
		if (!pop) return;
		var last;
		function open(e) { if (e) e.preventDefault(); last = doc.activeElement; pop.hidden = false; void pop.offsetWidth; pop.classList.add('is-open'); doc.body.classList.add('tm-popup-open'); var f = $('input,select,textarea,button', pop); if (f) setTimeout(function () { f.focus(); }, 50); }
		function close() { pop.classList.remove('is-open'); doc.body.classList.remove('tm-popup-open'); setTimeout(function () { pop.hidden = true; }, 300); if (last && last.focus) last.focus(); }
		on(doc, 'click', function (e) {
			var t = e.target.closest && e.target.closest('a[href="#tm-popup"], .tm-open-popup');
			if (t) open(e);
			if (e.target.closest && e.target.closest('[data-tm-close]') && pop.contains(e.target)) close();
		});
		on(doc, 'keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) close(); });
		if (location.hash === '#tm-popup') open();
		window.TrinityPopup = { open: open, close: close };
	}

	/* ------------------------------------------------------------------ custom cursor */
	function initCursor() {
		if (window.innerWidth < 1024 || isEditor()) return;
		var c = doc.createElement('div');
		c.className = 'tm-cursor';
		doc.body.appendChild(c);
		var x = -100, y = -100, hover = false;
		var paint = function () { c.style.transform = 'translate3d(' + (x - 12) + 'px,' + (y - 12) + 'px,0) scale(' + (hover ? 2.5 : 1) + ')'; };
		paint();
		on(window, 'mousemove', function (e) { x = e.clientX; y = e.clientY; paint(); });
		on(window, 'mouseover', function (e) { var t = e.target; hover = !!(t.closest && (t.closest('a') || t.closest('button'))); paint(); });
	}

	/* ------------------------------------------------------------------ misc */
	function initMisc() {
		// back to top
		on(doc, 'click', function (e) {
			var a = e.target.closest && e.target.closest('.tm-footer__top a');
			if (a) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
		});
		// share
		$$('[data-tm-share]').forEach(function (b) {
			on(b, 'click', function () { if (navigator.share) navigator.share({ title: b.getAttribute('data-title'), url: location.href }); });
		});
		// blog filtering / search
		var grid = $('[data-tm-grid]');
		if (grid) {
			var cards = $$('.tm-card-post', grid);
			var feat = $('[data-tm-featured]');
			var search = $('[data-tm-blog-search]');
			var label = $('[data-tm-grid-label]');
			var count = $('[data-tm-count]');
			var empty = $('[data-tm-empty]');
			var cat = 'all', q = '';
			var apply = function () {
				var shown = 0;
				var all = cat === 'all' && q === '';
				if (feat) feat.hidden = !all;
				cards.forEach(function (c) {
					var okCat = cat === 'all' || (c.getAttribute('data-cats') || '').split(' ').indexOf(cat) > -1;
					var okQ = !q || (c.getAttribute('data-search') || '').indexOf(q) > -1;
					var isFeat = c.classList.contains('is-featured');
					var ok = okCat && okQ && (!isFeat || !all);
					c.hidden = !ok; if (ok) shown++;
				});
				if (label) label.textContent = all && feat ? 'More Articles' : 'Articles';
				if (count) count.textContent = shown + ' article' + (shown !== 1 ? 's' : '');
				if (empty) empty.hidden = shown !== 0;
			};
			$$('[data-tm-cat]').forEach(function (b) {
				on(b, 'click', function () { cat = b.getAttribute('data-tm-cat'); $$('[data-tm-cat]').forEach(function (x) { x.classList.toggle('is-active', x === b); }); apply(); });
			});
			if (search) {
				on(search, 'input', function () { q = search.value.toLowerCase().trim(); apply(); });
				on(search.form, 'submit', function (e) { e.preventDefault(); });
			}
			on($('[data-tm-clear]'), 'click', function () { cat = 'all'; q = ''; if (search) search.value = ''; $$('[data-tm-cat]').forEach(function (x) { x.classList.toggle('is-active', x.getAttribute('data-tm-cat') === 'all'); }); apply(); });
			apply();
		}
		$$('[data-tm-newsletter]').forEach(function (f) { on(f, 'submit', function (e) { e.preventDefault(); var b = f.querySelector('button'); b.textContent = 'Subscribed ✓'; b.disabled = true; }); });
	}

	function initEager() { $$('.tm-logo img, .tm-hero__bgslide.is-active img').forEach(function (i) { i.loading = 'eager'; i.decoding = 'sync'; }); }

	function init() {
		initEager(); initTheme(); initHeader(); initReveal(); initHero(); initMarquee(); initFilters(); initLightbox(); initForms(); initPopup(); initCursor(); initMisc();
	}
	if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init); else init();
}());
