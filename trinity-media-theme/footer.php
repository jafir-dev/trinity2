<!-- Footer -->
<footer class="trinity-footer">
	<div class="trinity-container">
		<!-- Main Footer Grid -->
		<div class="footer-grid">
			<!-- Column 1: About & Social -->
			<div class="footer-col about-col">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-logo">
					<?php
					if ( has_custom_logo() ) {
						the_custom_logo();
					} else {
						?>
						<img src="<?php echo esc_url( TRINITY_ASSETS_DIR . '/images/trinity-logo-white.png' ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="logo-dark">
						<img src="<?php echo esc_url( TRINITY_ASSETS_DIR . '/images/trinity-logo-original.png' ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="logo-light">
						<?php
					}
					?>
				</a>

				<h4 class="footer-heading">ABOUT US</h4>
				<p class="footer-description">
					Trinity Media LLC is a premier Large Format Printing & Fabrication Company in Dubai specializing in all digital printing formats. From conception to delivery, we guarantee exceptional quality and engineering precision.
				</p>

				<div class="footer-social">
					<a href="https://www.facebook.com/profile.php?id=100063650510124" target="_blank" rel="nofollow noopener" aria-label="Facebook">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
					</a>
					<a href="https://x.com/TrinityMediaUAE" target="_blank" rel="nofollow noopener" aria-label="Twitter">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
					</a>
					<a href="https://www.instagram.com/trinitymediallc/" target="_blank" rel="nofollow noopener" aria-label="Instagram">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
					</a>
					<a href="https://www.linkedin.com/company/trinity-media-uae/" target="_blank" rel="nofollow noopener" aria-label="LinkedIn">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
					</a>
					<a href="https://www.youtube.com/@TrinityMediaDIP" target="_blank" rel="nofollow noopener" aria-label="YouTube">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
					</a>
					<a href="https://wa.me/971526935456" target="_blank" rel="nofollow noopener" aria-label="WhatsApp">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.49C18.18 1.13 15.09 0 12.04 0 5.45 0 .07 5.37.07 11.96c0 2.04.5 4.08 1.47 5.88L0 24l6.38-1.67c1.75.94 3.71 1.44 5.67 1.44 6.59 0 11.97-5.38 11.97-11.97 0-3.05-1.13-5.96-3.5-8.31zm-8.48 18.21c-1.67 0-3.33-.48-4.77-1.4l-.35-.21-3.72.97.99-3.63-.23-.37c-1.01-1.67-1.55-3.62-1.55-5.63 0-5.14 4.18-9.32 9.32-9.32 2.49 0 4.83.97 6.59 2.73 1.77 1.76 2.73 4.1 2.73 6.59 0 5.14-4.18 9.32-9.32 9.32zm5.18-6.95c-.25-.13-1.47-.73-1.7-.81-.24-.08-.41-.12-.59.12-.17.25-.66.81-.81.97-.15.16-.3.18-.56.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.12-.12.25-.31.37-.46.12-.16.17-.25.25-.42.08-.17.04-.31-.02-.46-.06-.15-.59-1.42-.81-1.94-.21-.51-.42-.44-.59-.45-.15-.01-.33-.01-.51-.01-.18 0-.47.07-.71.35-.25.27-.96.94-.96 2.29s.99 2.66 1.13 2.84c.14.18 1.95 2.97 4.74 4.17.66.29 1.18.46 1.58.59.66.21 1.26.18 1.73.11.52-.08 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.24-.16-.49-.29z"/></svg>
					</a>
				</div>
			</div>

			<!-- Column 2: Services List -->
			<div class="footer-col services-col">
				<h4 class="footer-heading">
					<span class="heading-icon"></span>
					SERVICES
				</h4>
				<ul class="footer-list">
					<li><a href="/services/exhibition-stand-design-construction">Exhibition Stand & Construction</a></li>
					<li><a href="/services/event-branding-activation">Event Branding & Activation</a></li>
					<li><a href="/services/custom-kiosk-design-fabrication">Custom Kiosk Fabrication</a></li>
					<li><a href="/services/large-format-digital-printing">Large Format Digital Printing</a></li>
					<li><a href="/services/indoor-outdoor-signage">Indoor & Outdoor Signage</a></li>
					<li><a href="/services/acrylic-fabrication">Acrylic Fabrication</a></li>
					<li><a href="/services/vehicle-branding-fleet-graphics">Vehicle Branding & Fleet</a></li>
				</ul>
			</div>

			<!-- Column 3: Quick Links -->
			<div class="footer-col links-col">
				<h4 class="footer-heading">
					<span class="heading-icon"></span>
					QUICK LINKS
				</h4>
				<ul class="footer-list">
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Home</a></li>
					<li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>">About Us</a></li>
					<li><a href="<?php echo esc_url( home_url( '/our-journey' ) ); ?>">Our Journey</a></li>
					<li><a href="<?php echo esc_url( home_url( '/why-choose-us' ) ); ?>">Why Choose Us</a></li>
					<li><a href="<?php echo esc_url( home_url( '/our-facilities' ) ); ?>">Our Facilities</a></li>
					<li><a href="<?php echo esc_url( home_url( '/awards' ) ); ?>">Awards</a></li>
					<li><a href="<?php echo esc_url( home_url( '/portfolio' ) ); ?>">Portfolio</a></li>
					<li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>">Contact</a></li>
				</ul>
			</div>

			<!-- Column 4: Get in Touch -->
			<div class="footer-col contact-col">
				<h4 class="footer-heading">
					<span class="heading-icon"></span>
					GET IN TOUCH
				</h4>
				<div class="contact-details">
					<div class="contact-item">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
							<circle cx="12" cy="10" r="3"></circle>
						</svg>
						<span>Warehouse No. 4, Plot 194-0, Near Aiko Mall, Opp. BSL Gulf LLC, Dubai Investment park 1, Dubai UAE</span>
					</div>
					<div class="contact-item">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
						</svg>
						<a href="tel:+971526935456">+971 52 693 5456 (Mob)</a>
					</div>
					<div class="contact-item">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
						</svg>
						<a href="tel:+97143409377">+971 4 340 9377 (Tel)</a>
					</div>
					<div class="contact-item">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366" stroke="#25D366" stroke-width="2">
							<path d="M20.52 3.49C18.18 1.13 15.09 0 12.04 0 5.45 0 .07 5.37.07 11.96c0 2.04.5 4.08 1.47 5.88L0 24l6.38-1.67c1.75.94 3.71 1.44 5.67 1.44 6.59 0 11.97-5.38 11.97-11.97 0-3.05-1.13-5.96-3.5-8.31zm-8.48 18.21c-1.67 0-3.33-.48-4.77-1.4l-.35-.21-3.72.97.99-3.63-.23-.37c-1.01-1.67-1.55-3.62-1.55-5.63 0-5.14 4.18-9.32 9.32-9.32 2.49 0 4.83.97 6.59 2.73 1.77 1.76 2.73 4.1 2.73 6.59 0 5.14-4.18 9.32-9.32 9.32zm5.18-6.95c-.25-.13-1.47-.73-1.7-.81-.24-.08-.41-.12-.59.12-.17.25-.66.81-.81.97-.15.16-.3.18-.56.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.12-.12.25-.31.37-.46.12-.16.17-.25.25-.42.08-.17.04-.31-.02-.46-.06-.15-.59-1.42-.81-1.94-.21-.51-.42-.44-.59-.45-.15-.01-.33-.01-.51-.01-.18 0-.47.07-.71.35-.25.27-.96.94-.96 2.29s.99 2.66 1.13 2.84c.14.18 1.95 2.97 4.74 4.17.66.29 1.18.46 1.58.59.66.21 1.26.18 1.73.11.52-.08 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.24-.16-.49-.29z"/>
						</svg>
						<a href="https://wa.me/971526935456" class="whatsapp-link">+971 52 693 5456 (WhatsApp)</a>
					</div>
					<div class="contact-item">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
						<a href="mailto:inquiry@trinitymediauae.com">inquiry@trinitymediauae.com</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="footer-bottom">
			<p class="copyright">
				Copyrights © <?php echo date( 'Y' ); ?> <strong>Trinity Media LLC</strong>. Designed by CEZCON | <a href="<?php echo esc_url( home_url( '/contact' ) ); ?>">Privacy & Contact</a>
			</p>
			<button class="back-to-top" id="backToTop" aria-label="Back to Top">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 15l-6-6-6 6"></path>
				</svg>
				<span>Back to top</span>
			</button>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
