/**
 * Custom Cursor Effect
 * Matches React component behavior exactly
 */

(function() {
	if (window.innerWidth < 1024) return; // disable on mobile/tablet

	const cursor = document.querySelector('.trinity-cursor');
	let position = { x: -100, y: -100 };
	let isHovering = false;

	function moveCursor(e) {
		position.x = e.clientX;
		position.y = e.clientY;
		updateCursor();
	}

	function updateCursor() {
		if (!cursor) return;
		const scale = isHovering ? 2.5 : 1;
		cursor.style.transform = `translate3d(${position.x - 12}px, ${position.y - 12}px, 0) scale(${scale})`;
	}

	function handleMouseOver(e) {
		const target = e.target;
		const isInteractive =
			target.tagName.toLowerCase() === 'button' ||
			target.tagName.toLowerCase() === 'a' ||
			target.closest('button') ||
			target.closest('a') ||
			target.classList.contains('elementor-button') ||
			target.closest('.elementor-button');

		isHovering = isInteractive;
		if (isHovering && cursor) {
			cursor.classList.add('active');
		} else if (cursor) {
			cursor.classList.remove('active');
		}
		updateCursor();
	}

	window.addEventListener('mousemove', moveCursor);
	window.addEventListener('mouseover', handleMouseOver);
})();
