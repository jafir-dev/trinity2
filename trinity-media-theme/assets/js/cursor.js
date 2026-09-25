/**
 * Trinity Media - Custom Cursor
 * Replaces default cursor with animated custom cursor
 */

(function() {
	const CURSOR_SIZE = 24;
	const TRAIL_SIZE = 8;
	const TRAIL_COUNT = 8;
	const DELAY = 50;

	let mouseX = 0;
	let mouseY = 0;
	let isHovering = false;
	let lastTrailTime = 0;

	// Trail particles state
	const trails = [];

	/**
	 * Create main cursor element
	 */
	function createCursor() {
		const cursor = document.createElement('div');
		cursor.id = 'custom-cursor';
		cursor.innerHTML = `
			<svg viewBox="0 0 ${CURSOR_SIZE} ${CURSOR_SIZE}" xmlns="http://www.w3.org/2000/svg">
				<circle cx="${CURSOR_SIZE / 2}" cy="${CURSOR_SIZE / 2}" r="${CURSOR_SIZE / 2 - 2}"
					fill="none" stroke="currentColor" stroke-width="2" opacity="0.8"/>
				<circle cx="${CURSOR_SIZE / 2}" cy="${CURSOR_SIZE / 2}" r="3" fill="currentColor"/>
			</svg>
		`;
		cursor.style.cssText = `
			position: fixed;
			width: ${CURSOR_SIZE}px;
			height: ${CURSOR_SIZE}px;
			pointer-events: none;
			z-index: 9999;
			transform: translate(-50%, -50%);
			color: var(--primary);
			opacity: 0;
			transition: opacity 0.3s ease;
		`;
		document.body.appendChild(cursor);
		return cursor;
	}

	/**
	 * Create trail particle
	 */
	function createTrailParticle(x, y) {
		const particle = document.createElement('div');
		particle.className = 'cursor-trail';
		particle.style.cssText = `
			position: fixed;
			width: ${TRAIL_SIZE}px;
			height: ${TRAIL_SIZE}px;
			border: 1px solid var(--primary);
			border-radius: 50%;
			pointer-events: none;
			z-index: 9998;
			transform: translate(-50%, -50%);
			opacity: 0.5;
			left: ${x}px;
			top: ${y}px;
		`;
		document.body.appendChild(particle);

		// Animate out and remove
		let opacity = 0.5;
		const interval = setInterval(() => {
			opacity -= 0.05;
			particle.style.opacity = Math.max(0, opacity).toString();
			if (opacity <= 0) {
				clearInterval(interval);
				particle.remove();
			}
		}, 30);
	}

	/**
	 * Update cursor position
	 */
	function updateCursor(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;

		const cursor = document.getElementById('custom-cursor');
		if (!cursor) return;

		cursor.style.left = mouseX + 'px';
		cursor.style.top = mouseY + 'px';

		// Create trail particles
		const now = Date.now();
		if (now - lastTrailTime > DELAY) {
			createTrailParticle(mouseX, mouseY);
			lastTrailTime = now;
		}
	}

	/**
	 * Hide default cursor
	 */
	function hideCursor() {
		document.body.style.cursor = 'none';
	}

	/**
	 * Show custom cursor on mouse enter
	 */
	function showCustomCursor() {
		const cursor = document.getElementById('custom-cursor');
		if (cursor) {
			cursor.style.opacity = '1';
		}
	}

	/**
	 * Hide custom cursor on mouse leave
	 */
	function hideCustomCursor() {
		const cursor = document.getElementById('custom-cursor');
		if (cursor) {
			cursor.style.opacity = '0';
		}
	}

	/**
	 * Handle interactive elements hover
	 */
	function handleHoverElement(e) {
		const cursor = document.getElementById('custom-cursor');
		if (!cursor) return;

		const isClickable = e.target.closest('a, button, [role="button"], input, textarea, .clickable');

		if (isClickable) {
			cursor.classList.add('hover-active');
			cursor.style.color = 'var(--primary)';
		} else {
			cursor.classList.remove('hover-active');
		}
	}

	/**
	 * Initialize
	 */
	function init() {
		// Create cursor
		createCursor();
		hideCursor();

		// Event listeners
		document.addEventListener('mousemove', updateCursor);
		document.addEventListener('mouseenter', showCustomCursor);
		document.addEventListener('mouseleave', hideCustomCursor);
		document.addEventListener('mouseover', handleHoverElement);

		// Hide on input
		const inputs = document.querySelectorAll('input, textarea');
		inputs.forEach(input => {
			input.addEventListener('focus', hideCustomCursor);
			input.addEventListener('blur', showCustomCursor);
		});

		// Mobile: disable custom cursor
		if (window.innerWidth < 768) {
			document.body.style.cursor = 'auto';
			const cursor = document.getElementById('custom-cursor');
			if (cursor) cursor.remove();
		}
	}

	// Start on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// Expose API
	window.TrinityCursor = {
		show: showCustomCursor,
		hide: hideCustomCursor
	};
})();
