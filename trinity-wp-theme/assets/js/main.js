/**
 * Trinity Media Main JavaScript
 */

(function() {
	// Theme toggle
	const themeToggle = document.querySelector('[data-theme-toggle]');
	if (themeToggle) {
		themeToggle.addEventListener('click', function() {
			const html = document.documentElement;
			const isDark = html.classList.contains('dark');

			if (isDark) {
				html.classList.remove('dark');
				html.classList.add('light');
				localStorage.setItem('trinity-theme', 'light');
			} else {
				html.classList.remove('light');
				html.classList.add('dark');
				localStorage.setItem('trinity-theme', 'dark');
			}
		});
	}

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			const href = this.getAttribute('href');
			if (href === '#') return;

			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	// Mobile menu toggle (if needed)
	const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
	const mobileMenu = document.querySelector('[data-mobile-menu]');

	if (mobileMenuButton && mobileMenu) {
		mobileMenuButton.addEventListener('click', function() {
			mobileMenu.classList.toggle('hidden');
		});
	}
})();
