/**
 * Trinity Media - Main JavaScript
 * Mobile menu, scroll effects, smooth scrolling
 */

(function() {
	'use strict';

	/**
	 * Mobile Menu Toggle
	 */
	function initMobileMenu() {
		const toggle = document.querySelector('.mobile-menu-toggle');
		const drawer = document.querySelector('.mobile-menu-drawer');
		const body = document.body;

		if (!toggle || !drawer) return;

		toggle.addEventListener('click', function() {
			const isActive = drawer.classList.contains('active');

			if (isActive) {
				drawer.classList.remove('active');
				toggle.classList.remove('active');
				body.style.overflow = '';
			} else {
				drawer.classList.add('active');
				toggle.classList.add('active');
				body.style.overflow = 'hidden';
			}
		});

		// Close on link click
		const menuLinks = drawer.querySelectorAll('a');
		menuLinks.forEach(link => {
			link.addEventListener('click', () => {
				drawer.classList.remove('active');
				toggle.classList.remove('active');
				body.style.overflow = '';
			});
		});

		// Close on escape
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && drawer.classList.contains('active')) {
				drawer.classList.remove('active');
				toggle.classList.remove('active');
				body.style.overflow = '';
			}
		});
	}

	/**
	 * Mobile Menu Accordion
	 */
	function initMobileAccordion() {
		const toggles = document.querySelectorAll('.mobile-menu-accordion-toggle');

		toggles.forEach(toggle => {
			toggle.addEventListener('click', function(e) {
				e.stopPropagation();

				const parent = this.closest('li');
				const submenu = parent.querySelector('.mobile-menu-submenu');

				if (!submenu) return;

				const isActive = submenu.classList.contains('active');

				// Close all other submenus
				document.querySelectorAll('.mobile-menu-submenu').forEach(menu => {
					menu.classList.remove('active');
				});
				document.querySelectorAll('.mobile-menu-accordion-toggle').forEach(btn => {
					btn.classList.remove('active');
				});

				// Toggle current
				if (!isActive) {
					submenu.classList.add('active');
					this.classList.add('active');
				}
			});
		});
	}

	/**
	 * Scroll Effects
	 */
	function initScrollEffects() {
		const header = document.querySelector('.site-header');
		const backToTop = document.querySelector('.back-to-top');
		let lastScroll = 0;

		window.addEventListener('scroll', () => {
			const currentScroll = window.pageYOffset;

			// Header shadow on scroll
			if (header) {
				if (currentScroll > 50) {
					header.classList.add('scrolled');
				} else {
					header.classList.remove('scrolled');
				}
			}

			// Back to top button
			if (backToTop) {
				if (currentScroll > 300) {
					backToTop.classList.add('show');
				} else {
					backToTop.classList.remove('show');
				}
			}

			lastScroll = currentScroll;
		});

		// Back to top click
		if (backToTop) {
			backToTop.addEventListener('click', () => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			});
		}
	}

	/**
	 * Smooth Scroll for Anchor Links
	 */
	function initSmoothScroll() {
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function(e) {
				const href = this.getAttribute('href');

				// Skip empty hash
				if (href === '#' || href === '#!') return;

				const target = document.querySelector(href);
				if (!target) return;

				e.preventDefault();

				const headerOffset = 80;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});

				// Update URL without jumping
				history.pushState(null, null, href);
			});
		});
	}

	/**
	 * Intersection Observer for Animations
	 */
	function initScrollAnimations() {
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');

					// Optional: unobserve after animation
					// observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		// Observe elements with animation classes
		const animatedElements = document.querySelectorAll(
			'.fade-in, .slide-up, .slide-down, .slide-left, .slide-right, .scale-in'
		);

		animatedElements.forEach(el => {
			el.style.opacity = '0';
			observer.observe(el);
		});
	}

	/**
	 * Active Menu Item on Scroll
	 */
	function initActiveMenuOnScroll() {
		const sections = document.querySelectorAll('section[id]');
		const menuLinks = document.querySelectorAll('.navbar-menu a[href^="#"]');

		if (sections.length === 0 || menuLinks.length === 0) return;

		window.addEventListener('scroll', () => {
			let current = '';
			const scrollPos = window.pageYOffset + 100;

			sections.forEach(section => {
				const sectionTop = section.offsetTop;
				const sectionHeight = section.offsetHeight;

				if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
					current = section.getAttribute('id');
				}
			});

			menuLinks.forEach(link => {
				link.parentElement.classList.remove('active');
				const href = link.getAttribute('href');

				if (href === '#' + current) {
					link.parentElement.classList.add('active');
				}
			});
		});
	}

	/**
	 * External Links - Open in New Tab
	 */
	function initExternalLinks() {
		const links = document.querySelectorAll('a[href^="http"]');

		links.forEach(link => {
			const isInternal = link.hostname === window.location.hostname;

			if (!isInternal) {
				link.setAttribute('target', '_blank');
				link.setAttribute('rel', 'noopener noreferrer');
			}
		});
	}

	/**
	 * Form Validation Helper
	 */
	function initFormValidation() {
		const forms = document.querySelectorAll('form[data-validate]');

		forms.forEach(form => {
			form.addEventListener('submit', function(e) {
				let isValid = true;
				const requiredFields = form.querySelectorAll('[required]');

				requiredFields.forEach(field => {
					if (!field.value.trim()) {
						isValid = false;
						field.classList.add('error');

						// Show error message
						let errorMsg = field.nextElementSibling;
						if (!errorMsg || !errorMsg.classList.contains('error-message')) {
							errorMsg = document.createElement('span');
							errorMsg.className = 'error-message';
							errorMsg.textContent = 'This field is required';
							errorMsg.style.cssText = 'color: var(--error); font-size: 14px; margin-top: 4px; display: block;';
							field.parentNode.insertBefore(errorMsg, field.nextSibling);
						}
					} else {
						field.classList.remove('error');
						const errorMsg = field.nextElementSibling;
						if (errorMsg && errorMsg.classList.contains('error-message')) {
							errorMsg.remove();
						}
					}
				});

				if (!isValid) {
					e.preventDefault();
				}
			});

			// Clear error on input
			const fields = form.querySelectorAll('[required]');
			fields.forEach(field => {
				field.addEventListener('input', function() {
					this.classList.remove('error');
					const errorMsg = this.nextElementSibling;
					if (errorMsg && errorMsg.classList.contains('error-message')) {
						errorMsg.remove();
					}
				});
			});
		});
	}

	/**
	 * Lazy Load Images
	 */
	function initLazyLoad() {
		const images = document.querySelectorAll('img[data-src]');

		if ('IntersectionObserver' in window) {
			const imageObserver = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const img = entry.target;
						img.src = img.dataset.src;
						img.removeAttribute('data-src');
						imageObserver.unobserve(img);
					}
				});
			});

			images.forEach(img => imageObserver.observe(img));
		} else {
			// Fallback for older browsers
			images.forEach(img => {
				img.src = img.dataset.src;
				img.removeAttribute('data-src');
			});
		}
	}

	/**
	 * Initialize All
	 */
	function init() {
		initMobileMenu();
		initMobileAccordion();
		initScrollEffects();
		initSmoothScroll();
		initScrollAnimations();
		initActiveMenuOnScroll();
		initExternalLinks();
		initFormValidation();
		initLazyLoad();
	}

	// DOM Ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// Expose utilities
	window.TrinityUtils = {
		scrollTo: (selector, offset = 80) => {
			const target = document.querySelector(selector);
			if (!target) return;

			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		},
		closeMobileMenu: () => {
			const drawer = document.querySelector('.mobile-menu-drawer');
			const toggle = document.querySelector('.mobile-menu-toggle');
			if (drawer) drawer.classList.remove('active');
			if (toggle) toggle.classList.remove('active');
			document.body.style.overflow = '';
		}
	};
})();
