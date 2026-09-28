<?php
/**
 * Elementor Template Generator for Trinity Media
 * Creates header, footer, mega menu, and registration popup
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Create Elementor templates on theme activation
 */
function trinity_create_elementor_templates() {
	// Check if Elementor is active
	if ( ! did_action( 'elementor/loaded' ) ) {
		return;
	}

	// Check if templates already exist
	$existing = get_posts( array(
		'post_type'      => 'elementor_library',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template',
				'value' => 'created',
			),
		),
	) );

	if ( ! empty( $existing ) ) {
		return; // Templates already created
	}

	// Create Header Template
	trinity_create_header_template();

	// Create Footer Template
	trinity_create_footer_template();

	// Create Registration Popup
	trinity_create_registration_popup();
}
add_action( 'after_switch_theme', 'trinity_create_elementor_templates' );

/**
 * Create Header Template
 */
function trinity_create_header_template() {
	$header_content = array(
		array(
			'id'       => uniqid(),
			'elType'   => 'container',
			'settings' => array(
				'content_width' => 'full',
				'background_background' => 'classic',
				'background_color' => '#f5f5f5',
				'padding' => array(
					'unit' => 'px',
					'top' => '8',
					'right' => '20',
					'bottom' => '8',
					'left' => '20',
				),
			),
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'container',
					'settings' => array(
						'content_width' => 'boxed',
						'flex_direction' => 'row',
						'flex_justify_content' => 'space-between',
					),
					'elements' => array(
						// Left side - Contact info
						array(
							'id'       => uniqid(),
							'elType'   => 'widget',
							'widgetType' => 'text-editor',
							'settings' => array(
								'editor' => '<div style="display:flex;gap:20px;font-size:11px;color:#666;">
									<span><i class="fas fa-map-marker-alt" style="color:#7b2d8e;"></i> DIP-1, Dubai, UAE</span>
									<span><i class="fas fa-envelope" style="color:#7b2d8e;"></i> inquiry@trinitymediauae.com</span>
									<span><i class="fas fa-clock" style="color:#7b2d8e;"></i> Mon - Sat: 9:00 AM - 6:00 PM</span>
								</div>',
							),
						),
						// Right side - Social + Contact
						array(
							'id'       => uniqid(),
							'elType'   => 'widget',
							'widgetType' => 'social-icons',
							'settings' => array(
								'social_icon_list' => array(
									array(
										'social' => 'fab fa-facebook-f',
										'link' => array( 'url' => 'https://www.facebook.com/profile.php?id=100063650510124' ),
									),
									array(
										'social' => 'fab fa-twitter',
										'link' => array( 'url' => 'https://x.com/TrinityMediaUAE' ),
									),
									array(
										'social' => 'fab fa-instagram',
										'link' => array( 'url' => 'https://www.instagram.com/trinitymediallc/' ),
									),
									array(
										'social' => 'fab fa-linkedin-in',
										'link' => array( 'url' => 'https://www.linkedin.com/company/trinity-media-uae/' ),
									),
									array(
										'social' => 'fab fa-youtube',
										'link' => array( 'url' => 'https://www.youtube.com/@TrinityMediaDIP' ),
									),
								),
							),
						),
					),
				),
			),
		),
		// Main Navigation Container
		array(
			'id'       => uniqid(),
			'elType'   => 'container',
			'settings' => array(
				'content_width' => 'full',
				'background_background' => 'classic',
				'background_color' => '#ffffff',
				'padding' => array(
					'unit' => 'px',
					'top' => '15',
					'right' => '20',
					'bottom' => '15',
					'left' => '20',
				),
			),
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'container',
					'settings' => array(
						'content_width' => 'boxed',
						'flex_direction' => 'row',
						'flex_justify_content' => 'space-between',
						'flex_align_items' => 'center',
					),
					'elements' => array(
						// Logo
						array(
							'id'       => uniqid(),
							'elType'   => 'widget',
							'widgetType' => 'theme-site-logo',
							'settings' => array(
								'width' => array(
									'unit' => 'px',
									'size' => 180,
								),
							),
						),
						// Navigation Menu
						array(
							'id'       => uniqid(),
							'elType'   => 'widget',
							'widgetType' => 'nav-menu',
							'settings' => array(
								'layout' => 'horizontal',
								'pointer' => 'underline',
								'menu' => 'primary',
							),
						),
						// CTA Button
						array(
							'id'       => uniqid(),
							'elType'   => 'widget',
							'widgetType' => 'button',
							'settings' => array(
								'text' => 'GET IN TOUCH',
								'link' => array( 'url' => '/contact' ),
								'button_type' => 'primary',
								'button_background_color' => '#7b2d8e',
								'button_text_color' => '#ffffff',
							),
						),
					),
				),
			),
		),
	);

	$header_id = wp_insert_post( array(
		'post_title'   => 'Trinity Header Template',
		'post_status'  => 'publish',
		'post_type'    => 'elementor_library',
		'post_content' => '',
	) );

	if ( $header_id ) {
		update_post_meta( $header_id, '_elementor_data', wp_json_encode( $header_content ) );
		update_post_meta( $header_id, '_elementor_edit_mode', 'builder' );
		update_post_meta( $header_id, '_elementor_template_type', 'header' );
		update_post_meta( $header_id, '_trinity_template', 'created' );
		update_post_meta( $header_id, '_elementor_page_settings', wp_json_encode( array(
			'container_width' => array( 'unit' => 'px', 'size' => 1280 ),
		) ) );
	}
}

/**
 * Create Footer Template
 */
function trinity_create_footer_template() {
	$footer_content = array(
		array(
			'id'       => uniqid(),
			'elType'   => 'container',
			'settings' => array(
				'content_width' => 'full',
				'background_background' => 'gradient',
				'background_color' => '#11131c',
				'background_color_b' => '#0c0d14',
				'padding' => array(
					'unit' => 'px',
					'top' => '80',
					'right' => '20',
					'bottom' => '30',
					'left' => '20',
				),
				'border_border' => 'solid',
				'border_width' => array(
					'unit' => 'px',
					'top' => '4',
					'right' => '0',
					'bottom' => '0',
					'left' => '0',
				),
				'border_color' => '#7b2d8e',
			),
			'elements' => array(
				// Main Footer Grid
				array(
					'id'       => uniqid(),
					'elType'   => 'container',
					'settings' => array(
						'content_width' => 'boxed',
						'flex_direction' => 'row',
						'flex_gap' => array( 'column' => '40' ),
					),
					'elements' => array(
						// Column 1: About + Social
						array(
							'id'       => uniqid(),
							'elType'   => 'container',
							'settings' => array(
								'flex_grow' => '1',
								'flex_basis' => '33%',
							),
							'elements' => array(
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'theme-site-logo',
									'settings' => array(
										'width' => array( 'unit' => 'px', 'size' => 160 ),
									),
								),
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'heading',
									'settings' => array(
										'title' => 'ABOUT US',
										'header_size' => 'h6',
										'title_color' => '#7b2d8e',
									),
								),
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'text-editor',
									'settings' => array(
										'editor' => 'Trinity Media LLC is a premier Large Format Printing & Fabrication Company in Dubai specializing in all digital printing formats.',
										'text_color' => '#999999',
									),
								),
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'social-icons',
									'settings' => array(
										'social_icon_list' => array(
											array( 'social' => 'fab fa-facebook-f', 'link' => array( 'url' => 'https://www.facebook.com/profile.php?id=100063650510124' ) ),
											array( 'social' => 'fab fa-twitter', 'link' => array( 'url' => 'https://x.com/TrinityMediaUAE' ) ),
											array( 'social' => 'fab fa-instagram', 'link' => array( 'url' => 'https://www.instagram.com/trinitymediallc/' ) ),
											array( 'social' => 'fab fa-linkedin-in', 'link' => array( 'url' => 'https://www.linkedin.com/company/trinity-media-uae/' ) ),
											array( 'social' => 'fab fa-youtube', 'link' => array( 'url' => 'https://www.youtube.com/@TrinityMediaDIP' ) ),
											array( 'social' => 'fab fa-whatsapp', 'link' => array( 'url' => 'https://wa.me/971526935456' ) ),
										),
									),
								),
							),
						),
						// Column 2: Services
						array(
							'id'       => uniqid(),
							'elType'   => 'container',
							'settings' => array(
								'flex_grow' => '1',
								'flex_basis' => '25%',
							),
							'elements' => array(
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'heading',
									'settings' => array(
										'title' => 'SERVICES',
										'header_size' => 'h6',
										'title_color' => '#ffffff',
									),
								),
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'icon-list',
									'settings' => array(
										'icon_list' => array(
											array( 'text' => 'Exhibition Stand & Construction', 'link' => array( 'url' => '/services/exhibition-stand-design-construction' ) ),
											array( 'text' => 'Event Branding & Activation', 'link' => array( 'url' => '/services/event-branding-activation' ) ),
											array( 'text' => 'Custom Kiosk Fabrication', 'link' => array( 'url' => '/services/custom-kiosk-design-fabrication' ) ),
											array( 'text' => 'Large Format Digital Printing', 'link' => array( 'url' => '/services/large-format-digital-printing' ) ),
											array( 'text' => 'Indoor & Outdoor Signage', 'link' => array( 'url' => '/services/indoor-outdoor-signage' ) ),
											array( 'text' => 'Acrylic Fabrication', 'link' => array( 'url' => '/services/acrylic-fabrication' ) ),
											array( 'text' => 'Vehicle Branding & Fleet', 'link' => array( 'url' => '/services/vehicle-branding-fleet-graphics' ) ),
										),
									),
								),
							),
						),
						// Column 3: Quick Links
						array(
							'id'       => uniqid(),
							'elType'   => 'container',
							'settings' => array(
								'flex_grow' => '1',
								'flex_basis' => '20%',
							),
							'elements' => array(
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'heading',
									'settings' => array(
										'title' => 'QUICK LINKS',
										'header_size' => 'h6',
										'title_color' => '#ffffff',
									),
								),
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'icon-list',
									'settings' => array(
										'icon_list' => array(
											array( 'text' => 'Home', 'link' => array( 'url' => '/' ) ),
											array( 'text' => 'About Us', 'link' => array( 'url' => '/about' ) ),
											array( 'text' => 'Our Journey', 'link' => array( 'url' => '/our-journey' ) ),
											array( 'text' => 'Our Facilities', 'link' => array( 'url' => '/our-facilities' ) ),
											array( 'text' => 'Awards', 'link' => array( 'url' => '/awards' ) ),
											array( 'text' => 'Portfolio', 'link' => array( 'url' => '/#portfolio' ) ),
											array( 'text' => 'Contact', 'link' => array( 'url' => '/contact' ) ),
										),
									),
								),
							),
						),
						// Column 4: Contact
						array(
							'id'       => uniqid(),
							'elType'   => 'container',
							'settings' => array(
								'flex_grow' => '1',
								'flex_basis' => '22%',
							),
							'elements' => array(
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'heading',
									'settings' => array(
										'title' => 'GET IN TOUCH',
										'header_size' => 'h6',
										'title_color' => '#ffffff',
									),
								),
								array(
									'id'       => uniqid(),
									'elType'   => 'widget',
									'widgetType' => 'text-editor',
									'settings' => array(
										'editor' => '<div style="color:#999;font-size:12px;line-height:1.8;">
											<p><i class="fas fa-map-marker-alt" style="color:#7b2d8e;"></i> Warehouse No. 4, Plot 194-0, Near Aiko Mall, DIP-1, Dubai UAE</p>
											<p><i class="fas fa-phone" style="color:#7b2d8e;"></i> <a href="tel:+971526935456" style="color:#999;">+971 52 693 5456</a></p>
											<p><i class="fas fa-phone" style="color:#7b2d8e;"></i> <a href="tel:+97143409377" style="color:#999;">+971 4 340 9377</a></p>
											<p><i class="fab fa-whatsapp" style="color:#25D366;"></i> <a href="https://wa.me/971526935456" style="color:#25D366;">+971 52 693 5456</a></p>
											<p><i class="fas fa-envelope" style="color:#7b2d8e;"></i> <a href="mailto:inquiry@trinitymediauae.com" style="color:#999;">inquiry@trinitymediauae.com</a></p>
										</div>',
									),
								),
							),
						),
					),
				),
				// Bottom Bar
				array(
					'id'       => uniqid(),
					'elType'   => 'container',
					'settings' => array(
						'content_width' => 'boxed',
						'flex_direction' => 'row',
						'flex_justify_content' => 'space-between',
						'border_border' => 'solid',
						'border_width' => array(
							'unit' => 'px',
							'top' => '1',
							'right' => '0',
							'bottom' => '0',
							'left' => '0',
						),
						'border_color' => '#333',
						'padding' => array(
							'unit' => 'px',
							'top' => '25',
						),
					),
					'elements' => array(
						array(
							'id'       => uniqid(),
							'elType'   => 'widget',
							'widgetType' => 'text-editor',
							'settings' => array(
								'editor' => '<p style="color:#999;font-size:11px;">Copyrights © 2026 <strong style="color:#fff;">Trinity Media LLC</strong>. Designed by CEZCON</p>',
							),
						),
						array(
							'id'       => uniqid(),
							'elType'   => 'widget',
							'widgetType' => 'button',
							'settings' => array(
								'text' => 'Back to top ↑',
								'link' => array( 'url' => '#' ),
								'button_type' => 'link',
								'button_text_color' => '#7b2d8e',
							),
						),
					),
				),
			),
		),
	);

	$footer_id = wp_insert_post( array(
		'post_title'   => 'Trinity Footer Template',
		'post_status'  => 'publish',
		'post_type'    => 'elementor_library',
		'post_content' => '',
	) );

	if ( $footer_id ) {
		update_post_meta( $footer_id, '_elementor_data', wp_json_encode( $footer_content ) );
		update_post_meta( $footer_id, '_elementor_edit_mode', 'builder' );
		update_post_meta( $footer_id, '_elementor_template_type', 'footer' );
		update_post_meta( $footer_id, '_trinity_template', 'created' );
	}
}

/**
 * Create Registration Popup
 */
function trinity_create_registration_popup() {
	$popup_content = array(
		array(
			'id'       => uniqid(),
			'elType'   => 'container',
			'settings' => array(
				'background_background' => 'classic',
				'background_color' => '#ffffff',
				'padding' => array(
					'unit' => 'px',
					'top' => '40',
					'right' => '40',
					'bottom' => '40',
					'left' => '40',
				),
			),
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'widgetType' => 'heading',
					'settings' => array(
						'title' => 'Register Your Interest',
						'header_size' => 'h2',
						'title_color' => '#7b2d8e',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'widgetType' => 'text-editor',
					'settings' => array(
						'editor' => '<p>Fill out the form below and our team will get back to you shortly.</p>',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'widgetType' => 'form',
					'settings' => array(
						'form_fields' => array(
							array(
								'field_type' => 'text',
								'field_label' => 'Name',
								'required' => 'true',
							),
							array(
								'field_type' => 'email',
								'field_label' => 'Email',
								'required' => 'true',
							),
							array(
								'field_type' => 'tel',
								'field_label' => 'Phone',
								'required' => 'true',
							),
							array(
								'field_type' => 'textarea',
								'field_label' => 'Message',
								'rows' => '4',
							),
						),
						'button_text' => 'Submit',
						'button_background_color' => '#7b2d8e',
					),
				),
			),
		),
	);

	$popup_id = wp_insert_post( array(
		'post_title'   => 'Trinity Registration Popup',
		'post_status'  => 'publish',
		'post_type'    => 'elementor_library',
		'post_content' => '',
	) );

	if ( $popup_id ) {
		update_post_meta( $popup_id, '_elementor_data', wp_json_encode( $popup_content ) );
		update_post_meta( $popup_id, '_elementor_edit_mode', 'builder' );
		update_post_meta( $popup_id, '_elementor_template_type', 'popup' );
		update_post_meta( $popup_id, '_trinity_template', 'created' );
	}
}
