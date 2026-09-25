/**
 * Trinity Media - Theme Toggle
 * Dark/Light mode switching with localStorage persistence
 */

(function() {
	const STORAGE_KEY = 'trinity-theme-mode';
	const THEME_CLASS = 'trinity-dark';

	/**
	 * Initialize theme on page load
	 */
	function initTheme() {
		const savedTheme = localStorage.getItem(STORAGE_KEY);
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

		applyTheme(isDark);
		updateToggleButton(isDark);
	}

	/**
	 * Apply theme to document
	 */
	function applyTheme(isDark) {
		const html = document.documentElement;
		const body = document.body;

		if (isDark) {
			html.classList.add(THEME_CLASS);
			body.classList.add(THEME_CLASS);
			html.style.colorScheme = 'dark';
			localStorage.setItem(STORAGE_KEY, 'dark');
		} else {
			html.classList.remove(THEME_CLASS);
			body.classList.remove(THEME_CLASS);
			html.style.colorScheme = 'light';
			localStorage.setItem(STORAGE_KEY, 'light');
		}

		// Dispatch custom event for other scripts
		window.dispatchEvent(new CustomEvent('themechange', { detail: { isDark } }));
	}

	/**
	 * Toggle theme
	 */
	function toggleTheme() {
		const isDark = document.documentElement.classList.contains(THEME_CLASS);
		applyTheme(!isDark);
		updateToggleButton(!isDark);
	}

	/**
	 * Update toggle button icon
	 */
	function updateToggleButton(isDark) {
		const button = document.querySelector('.theme-toggle');
		if (!button) return;

		if (isDark) {
			button.innerHTML = '☀️';
			button.setAttribute('aria-label', 'Switch to light mode');
		} else {
			button.innerHTML = '🌙';
			button.setAttribute('aria-label', 'Switch to dark mode');
		}
	}

	/**
	 * Set up event listeners
	 */
	function setupListeners() {
		const toggleButton = document.querySelector('.theme-toggle');
		if (toggleButton) {
			toggleButton.addEventListener('click', toggleTheme);
		}

		// Listen for system theme changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			// Only apply if no manual preference stored
			if (!localStorage.getItem(STORAGE_KEY)) {
				applyTheme(e.matches);
				updateToggleButton(e.matches);
			}
		});
	}

	// Initialize on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			initTheme();
			setupListeners();
		});
	} else {
		initTheme();
		setupListeners();
	}

	// Expose to global for manual control
	window.TrinityTheme = {
		toggle: toggleTheme,
		set: applyTheme,
		isDark: () => document.documentElement.classList.contains(THEME_CLASS)
	};
})();
