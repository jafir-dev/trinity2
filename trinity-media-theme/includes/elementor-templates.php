<?php
/**
 * Elementor Templates Registration and Creation
 *
 * Registers and creates Elementor page templates using free widgets only
 * Pixel-perfect replication of React design with Elementor free containers
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Create Elementor homepage template
 */
function trinity_create_elementor_homepage() {
	// Check if homepage already exists
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'homepage',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	// Create homepage page
	$homepage_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'Home',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $homepage_id ) ) {
		update_post_meta( $homepage_id, '_trinity_template_type', 'homepage' );
		update_option( 'page_on_front', $homepage_id );
		update_option( 'show_on_front', 'page' );

		// Set as Elementor page
		update_post_meta( $homepage_id, '_elementor_edit_mode', 'builder' );

		// Build homepage sections
		trinity_build_homepage_sections( $homepage_id );
	}
}

/**
 * Build homepage sections with Elementor free widgets
 */
function trinity_build_homepage_sections( $page_id ) {
	$document = \Elementor\Plugin::$instance->documents->get( $page_id );

	if ( ! $document ) {
		return;
	}

	$sections = array(
		trinity_build_hero_section(),
		trinity_build_marquee_section(),
		trinity_build_services_section(),
		trinity_build_portfolio_section(),
		trinity_build_testimonials_section(),
		trinity_build_cta_section(),
	);

	$elements_data = array(
		'id'       => 'page-' . $page_id,
		'elType'   => 'document',
		'type'     => 'wp-page',
		'children' => $sections,
	);

	$document->save( array( 'elements' => json_encode( array( $elements_data ) ) );
}

/**
 * Build hero section with gradient background
 */
function trinity_build_hero_section() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'Transform Your Digital Presence',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family' => 'Bebas Neue',
						'font_size'   => array( 'size' => 72, 'unit' => 'px' ),
						'font_weight' => '700',
						'text_transform' => 'uppercase',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor' => 'We create digital experiences that drive growth and engagement. Strategic design, cutting-edge development, and measurable results.',
				),
				'style' => array(
					'typography' => array(
						'font_size' => array( 'size' => 24, 'unit' => 'px' ),
						'color'     => '#cbd5e1',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'button',
				'settings' => array(
					'text'       => 'Get Started',
					'link'       => array( 'url' => '#contact' ),
					'button_type' => 'primary',
				),
				'style' => array(
					'button' => array(
						'background_color' => '#7C3AED',
						'text_color'       => '#ffffff',
						'padding'          => '16px 48px',
						'border_radius'    => '4px',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(0deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
			'padding'               => array( 'top' => 100, 'bottom' => 100, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
			'min_height'            => array( 'size' => 90, 'unit' => 'vh' ),
		),
	);
}

/**
 * Build marquee clients section
 */
function trinity_build_marquee_section() {
	$clients = array(
		'Client 1', 'Client 2', 'Client 3', 'Client 4',
		'Client 5', 'Client 6', 'Client 7', 'Client 8',
	);

	$marquee_html = '<div class="trinity-marquee" style="display: flex; overflow: hidden; width: 100%;">';
	foreach ( $clients as $client ) {
		$marquee_html .= '<div class="marquee-item" style="flex-shrink: 0; padding: 0 20px;"><img src="https://via.placeholder.com/150x50/7C3AED/FFFFFF?text=' . urlencode( $client ) . '" alt="' . esc_attr( $client ) . '" style="height: 50px;"></div>';
	}
	$marquee_html .= '</div>';

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor' => $marquee_html,
				),
			),
		),
		'settings' => array(
			'background_background' => 'classic',
			'background_color'      => '#1e293b',
			'padding'               => array( 'top' => 60, 'bottom' => 60, 'left' => 0, 'right' => 0, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build services section with grid
 */
function trinity_build_services_section() {
	$services = trinity_get_services_for_elementor();

	$service_widgets = array();
	foreach ( $services as $service ) {
		$service_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'image',
					'settings' => array(
						'image' => array( 'url' => 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=' . urlencode( $service['title'] ) ),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $service['title'],
						'header_size' => 'h3',
					),
					'style' => array(
						'typography' => array(
							'font_size' => array( 'size' => 22, 'unit' => 'px' ),
							'color'     => '#ffffff',
						),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => $service['description'],
					),
					'style' => array(
						'typography' => array(
							'color' => '#cbd5e1',
						),
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'OUR SERVICES',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $service_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#1e293b',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build portfolio section
 */
function trinity_build_portfolio_section() {
	$portfolio = trinity_get_portfolio_for_elementor();

	$portfolio_widgets = array();
	foreach ( $portfolio as $item ) {
		$portfolio_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'image',
					'settings' => array(
						'image' => array( 'url' => 'https://via.placeholder.com/800x600/7C3AED/FFFFFF?text=' . urlencode( $item['title'] ) ),
						'link'  => array( 'url' => get_permalink( $item['id'] ) ),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $item['title'],
						'header_size' => 'h3',
						'link'        => array( 'url' => get_permalink( $item['id'] ) ),
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'OUR PORTFOLIO',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $portfolio_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#0f172a',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build testimonials section
 */
function trinity_build_testimonials_section() {
	$testimonials = trinity_get_testimonials_for_elementor();

	$testimonial_widgets = array();
	foreach ( $testimonials as $testimonial ) {
		$testimonial_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => '"' . $testimonial['quote'] . '"',
					),
					'style' => array(
						'typography' => array(
							'color'     => '#cbd5e1',
							'font_size' => array( 'size' => 18, 'unit' => 'px' ),
							'font_style' => 'italic',
						),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $testimonial['name'],
						'header_size' => 'h4',
					),
					'style' => array(
						'typography' => array(
							'font_size' => array( 'size' => 16, 'unit' => 'px' ),
							'color'     => '#ffffff',
							'margin'    => array( 'top' => 20, 'unit' => 'px' ),
						),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => $testimonial['role'] . ' at ' . $testimonial['company'],
					),
					'style' => array(
						'typography' => array(
							'color'     => '#94a3b8',
							'font_size' => array( 'size' => 14, 'unit' => 'px' ),
						),
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'WHAT CLIENTS SAY',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $testimonial_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#1e293b',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build CTA section
 */
function trinity_build_cta_section() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'READY TO START YOUR PROJECT?',
					'header_size'     => 'h2',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'button',
				'settings' => array(
					'text'       => 'Get in Touch',
					'link'       => array( 'url' => '#contact' ),
					'button_type' => 'primary',
				),
				'style' => array(
					'button' => array(
						'background_color' => '#ffffff',
						'text_color'       => '#7C3AED',
						'padding'          => '20px 60px',
						'border_radius'    => '4px',
						'font_weight'      => '700',
						'font_size'        => '20px',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(0deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 100, 'bottom' => 100, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
			'text_align'            => 'center',
		),
	);
}

/**
 * Get services for Elementor from demo data
 */
function trinity_get_services_for_elementor() {
	$services = get_posts( array(
		'post_type'      => 'service',
		'posts_per_page' => 8,
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );

	$formatted = array();
	foreach ( $services as $service ) {
		$formatted[] = array(
			'id'          => $service->ID,
			'title'       => $service->post_title,
			'description' => wp_trim_words( $service->post_content, 15 ),
		);
	}

	return $formatted;
}

/**
 * Get portfolio items for Elementor from demo data
 */
function trinity_get_portfolio_for_elementor() {
	$portfolio = get_posts( array(
		'post_type'      => 'portfolio',
		'posts_per_page' => 6,
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );

	$formatted = array();
	foreach ( $portfolio as $item ) {
		$formatted[] = array(
			'id'    => $item->ID,
			'title' => $item->post_title,
		);
	}

	return $formatted;
}

/**
 * Get testimonials for Elementor from demo data
 */
function trinity_get_testimonials_for_elementor() {
	$testimonials = get_posts( array(
		'post_type'      => 'testimonial',
		'posts_per_page' => 3,
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );

	$formatted = array();
	foreach ( $testimonials as $testimonial ) {
		$name    = get_post_meta( $testimonial->ID, 'testimonial_author_name', true );
		$role    = get_post_meta( $testimonial->ID, 'testimonial_author_role', true );
		$company = get_post_meta( $testimonial->ID, 'testimonial_author_company', true );
		$quote   = $testimonial->post_content;

		$formatted[] = array(
			'name'    => $name,
			'role'    => $role,
			'company' => $company,
			'quote'   => $quote,
		);
	}

	return $formatted;
}

/**
 * Create service detail template for single service pages
 */
function trinity_create_elementor_service_detail_template() {
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'service-detail',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$page_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'Service Detail',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $page_id ) ) {
		update_post_meta( $page_id, '_trinity_template_type', 'service-detail' );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );
		update_post_meta( $page_id, '_elementor_template_type', 'single' );

		// Build service detail sections
		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_service_detail_sections(),
		);

		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $page_id;
}

/**
 * Build service detail page sections
 */
function trinity_build_service_detail_sections() {
	$sections = array();

	// Hero section
	$sections[] = trinity_build_service_detail_hero();

	// Content section
	$sections[] = trinity_build_service_detail_content();

	// Features section
	$sections[] = trinity_build_service_detail_features();

	// Process section
	$sections[] = trinity_build_service_detail_process();

	// Related services
	$sections[] = trinity_build_service_detail_related();

	// CTA section
	$sections[] = trinity_build_cta_section();

	return $sections;
}

/**
 * Build service detail hero section
 */
function trinity_build_service_detail_hero() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'SERVICE TITLE',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 64, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'Service description goes here',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 20, 'unit' => 'px' ),
						'font_weight'    => '400',
						'color'          => '#cbd5e1',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 120, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build service detail content section
 */
function trinity_build_service_detail_content() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'Comprehensive Service Overview',
					'header_size'     => 'h2',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor' => '<p>Detailed service content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 18, 'unit' => 'px' ),
						'font_weight'    => '400',
						'line_height'    => '1.6',
						'color'          => '#475569',
					),
				),
			),
		),
		'settings' => array(
			'padding' => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build service detail features section
 */
function trinity_build_service_detail_features() {
	$features = array(
		'Feature 1',
		'Feature 2',
		'Feature 3',
		'Feature 4',
		'Feature 5',
		'Feature 6',
	);

	$feature_widgets = array();
	foreach ( $features as $feature ) {
		$feature_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'image',
					'settings' => array(
						'image' => array( 'url' => 'https://via.placeholder.com/64/7C3AED/FFFFFF' ),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $feature,
						'header_size' => 'h3',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => 'Feature description goes here.',
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'KEY FEATURES',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $feature_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#f8fafc',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build service detail process section
 */
function trinity_build_service_detail_process() {
	$steps = array(
		'Discovery',
		'Planning',
		'Execution',
		'Delivery',
	);

	$step_widgets = array();
	foreach ( $steps as $index => $step ) {
		$step_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => 'Step ' . ($index + 1),
						'header_size' => 'h4',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $step,
						'header_size' => 'h3',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => 'Process description goes here.',
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'OUR PROCESS',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $step_widgets ),
		'settings'      => array(
			'padding' => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build service detail related services section
 */
function trinity_build_service_detail_related() {
	$services = trinity_get_services_for_elementor();

	// Limit to 3
	$services = array_slice( $services, 0, 3 );

	$service_widgets = array();
	foreach ( $services as $service ) {
		$service_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'image',
					'settings' => array(
						'image' => array( 'url' => 'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=' . urlencode( $service['title'] ) ),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $service['title'],
						'header_size' => 'h3',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => $service['description'],
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'button',
					'settings' => array(
						'text'       => 'Learn More',
						'link'       => array( 'url' => get_permalink( $service['id'] ) ),
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'RELATED SERVICES',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $service_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#f8fafc',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Create service archive template
 */
function trinity_create_elementor_service_archive_template() {
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'service-archive',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$page_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'Services',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $page_id ) ) {
		update_post_meta( $page_id, '_trinity_template_type', 'service-archive' );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );

		// Build service archive sections
		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_service_archive_sections(),
		);

		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $page_id;
}

/**
 * Build service archive page sections
 */
function trinity_build_service_archive_sections() {
	$sections = array();

	// Hero section
	$sections[] = trinity_build_service_archive_hero();

	// Services grid
	$sections[] = trinity_build_service_archive_grid();

	// CTA section
	$sections[] = trinity_build_cta_section();

	return $sections;
}

/**
 * Build service archive hero section
 */
function trinity_build_service_archive_hero() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'OUR SERVICES',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 72, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'Comprehensive digital solutions tailored to your business needs',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 24, 'unit' => 'px' ),
						'font_weight'    => '400',
						'color'          => '#cbd5e1',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 120, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build service archive grid section
 */
function trinity_build_service_archive_grid() {
	$services = get_posts( array(
		'post_type'      => 'service',
		'posts_per_page' => -1,
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );

	$service_widgets = array();
	foreach ( $services as $service ) {
		$description = wp_trim_words( $service->post_content, 15 );

		$service_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'image',
					'settings' => array(
						'image' => array( 'url' => 'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=' . urlencode( $service->post_title ) ),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $service->post_title,
						'header_size' => 'h3',
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Bebas Neue',
							'font_size'      => array( 'size' => 32, 'unit' => 'px' ),
							'font_weight'    => '700',
							'text_transform' => 'uppercase',
						),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => $description,
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Inter',
							'font_size'      => array( 'size' => 16, 'unit' => 'px' ),
							'color'          => '#94a3b8',
						),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'button',
					'settings' => array(
						'text'       => 'Learn More',
						'link'       => array( 'url' => get_permalink( $service->ID ) ),
					),
					'style' => array(
						'button' => array(
							'background_color' => '#7C3AED',
							'text_color'       => '#ffffff',
							'padding'          => '12px 32px',
							'border_radius'    => '4px',
							'font_weight'      => '600',
						),
					),
				),
			),
		);
	}

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => $service_widgets,
		'settings'      => array(
			'padding' => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Create portfolio archive template
 */
function trinity_create_elementor_portfolio_archive_template() {
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'portfolio-archive',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$page_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'Our Work',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $page_id ) ) {
		update_post_meta( $page_id, '_trinity_template_type', 'portfolio-archive' );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );

		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_portfolio_archive_sections(),
		);

		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $page_id;
}

/**
 * Build portfolio archive page sections
 */
function trinity_build_portfolio_archive_sections() {
	$sections = array();

	$sections[] = trinity_build_portfolio_archive_hero();
	$sections[] = trinity_build_portfolio_archive_grid();
	$sections[] = trinity_build_cta_section();

	return $sections;
}

/**
 * Build portfolio archive hero section
 */
function trinity_build_portfolio_archive_hero() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'OUR WORK',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 72, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'Explore our portfolio of successful projects',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 24, 'unit' => 'px' ),
						'font_weight'    => '400',
						'color'          => '#cbd5e1',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 120, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build portfolio archive grid section
 */
function trinity_build_portfolio_archive_grid() {
	$portfolio = get_posts( array(
		'post_type'      => 'portfolio',
		'posts_per_page' => -1,
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );

	$portfolio_widgets = array();
	foreach ( $portfolio as $item ) {
		$categories = get_the_terms( $item->ID, 'portfolio_category' );
		$category_names = $categories ? wp_list_pluck( $categories, 'name' ) : array();

		$portfolio_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'image',
					'settings' => array(
						'image' => array( 'url' => 'https://via.placeholder.com/800x600/7C3AED/FFFFFF?text=' . urlencode( $item->post_title ) ),
						'link'  => array( 'url' => get_permalink( $item->ID ) ),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $item->post_title,
						'header_size' => 'h3',
						'link'        => array( 'url' => get_permalink( $item->ID ) ),
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Bebas Neue',
							'font_size'      => array( 'size' => 28, 'unit' => 'px' ),
							'font_weight'    => '700',
							'text_transform' => 'uppercase',
						),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => implode( ', ', $category_names ),
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Inter',
							'font_size'      => array( 'size' => 14, 'unit' => 'px' ),
							'color'          => '#7C3AED',
							'font_weight'    => '600',
						),
					),
				),
			),
		);
	}

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => $portfolio_widgets,
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#0f172a',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Create portfolio detail template
 */
function trinity_create_elementor_portfolio_detail_template() {
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'portfolio-detail',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$page_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'Portfolio Detail',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $page_id ) ) {
		update_post_meta( $page_id, '_trinity_template_type', 'portfolio-detail' );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );
		update_post_meta( $page_id, '_elementor_template_type', 'single' );

		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_portfolio_detail_sections(),
		);

		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $page_id;
}

/**
 * Build portfolio detail page sections
 */
function trinity_build_portfolio_detail_sections() {
	$sections = array();

	$sections[] = trinity_build_portfolio_detail_hero();
	$sections[] = trinity_build_portfolio_detail_content();
	$sections[] = trinity_build_portfolio_detail_gallery();
	$sections[] = trinity_build_portfolio_detail_related();
	$sections[] = trinity_build_cta_section();

	return $sections;
}

/**
 * Build portfolio detail hero section
 */
function trinity_build_portfolio_detail_hero() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'PROJECT TITLE',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 64, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'Project category',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 18, 'unit' => 'px' ),
						'font_weight'    => '600',
						'color'          => '#cbd5e1',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 120, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build portfolio detail content section
 */
function trinity_build_portfolio_detail_content() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'image',
				'settings' => array(
					'image' => array( 'url' => 'https://via.placeholder.com/1200x800/7C3AED/FFFFFF?text=Main+Image' ),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'Project Overview',
					'header_size'     => 'h2',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor' => '<p>Detailed project description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 18, 'unit' => 'px' ),
						'font_weight'    => '400',
						'line_height'    => '1.6',
						'color'          => '#475569',
					),
				),
			),
		),
		'settings' => array(
			'padding' => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build portfolio detail gallery section
 */
function trinity_build_portfolio_detail_gallery() {
	$gallery_widgets = array();
	for ( $i = 1; $i <= 4; $i++ ) {
		$gallery_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'image',
			'settings' => array(
				'image' => array( 'url' => 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=Image+' . $i ),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'PROJECT GALLERY',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $gallery_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#f8fafc',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build portfolio detail related section
 */
function trinity_build_portfolio_detail_related() {
	$portfolio = trinity_get_portfolio_for_elementor();
	$portfolio = array_slice( $portfolio, 0, 3 );

	$portfolio_widgets = array();
	foreach ( $portfolio as $item ) {
		$portfolio_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'image',
					'settings' => array(
						'image' => array( 'url' => 'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=' . urlencode( $item['title'] ) ),
						'link'  => array( 'url' => get_permalink( $item['id'] ) ),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $item['title'],
						'header_size' => 'h3',
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'RELATED PROJECTS',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $portfolio_widgets ),
		'settings'      => array(
			'padding' => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Create about page template
 */
function trinity_create_elementor_about_template() {
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'about',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$page_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'About Us',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $page_id ) ) {
		update_post_meta( $page_id, '_trinity_template_type', 'about' );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );

		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_about_sections(),
		);

		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $page_id;
}

/**
 * Build about page sections
 */
function trinity_build_about_sections() {
	$sections = array();

	$sections[] = trinity_build_about_hero();
	$sections[] = trinity_build_about_content();
	$sections[] = trinity_build_about_stats();
	$sections[] = trinity_build_about_team();
	$sections[] = trinity_build_cta_section();

	return $sections;
}

/**
 * Build about hero section
 */
function trinity_build_about_hero() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'ABOUT US',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 72, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'Trusted by industry leaders for exceptional results',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 24, 'unit' => 'px' ),
						'font_weight'    => '400',
						'color'          => '#cbd5e1',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 120, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build about content section
 */
function trinity_build_about_content() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'image',
				'settings' => array(
					'image' => array( 'url' => 'https://via.placeholder.com/600x600/7C3AED/FFFFFF?text=About+Image' ),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'column',
				'elements' => array(
					array(
						'id'       => uniqid(),
						'elType'   => 'widget',
						'type'     => 'heading',
						'settings' => array(
							'title'           => 'WHO WE ARE',
							'header_size'     => 'h2',
						),
						'style' => array(
							'typography' => array(
								'font_family'    => 'Bebas Neue',
								'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
								'font_weight'    => '700',
								'text_transform' => 'uppercase',
							),
						),
					),
					array(
						'id'       => uniqid(),
						'elType'   => 'widget',
						'type'     => 'text-editor',
						'settings' => array(
							'editor' => '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>',
						),
						'style' => array(
							'typography' => array(
								'font_family'    => 'Inter',
								'font_size'      => array( 'size' => 18, 'unit' => 'px' ),
								'font_weight'    => '400',
								'line_height'    => '1.6',
								'color'          => '#475569',
							),
						),
					),
				),
			),
		),
		'settings' => array(
			'padding' => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build about stats section
 */
function trinity_build_about_stats() {
	$stats = array(
		array( 'number' => '150+', 'label' => 'Projects' ),
		array( 'number' => '98%', 'label' => 'Satisfaction' ),
		array( 'number' => '50+', 'label' => 'Team Members' ),
		array( 'number' => '10+', 'label' => 'Years' ),
	);

	$stat_widgets = array();
	foreach ( $stats as $stat ) {
		$stat_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'           => $stat['number'],
						'header_size'     => 'h2',
						'text_align'      => 'center',
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Bebas Neue',
							'font_size'      => array( 'size' => 64, 'unit' => 'px' ),
							'font_weight'    => '700',
							'text_transform' => 'uppercase',
							'color'          => '#7C3AED',
						),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor'          => $stat['label'],
						'text_align'      => 'center',
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Inter',
							'font_size'      => array( 'size' => 18, 'unit' => 'px' ),
							'font_weight'    => '600',
							'color'          => '#94a3b8',
						),
					),
				),
			),
		);
	}

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => $stat_widgets,
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#f8fafc',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build about team section
 */
function trinity_build_about_team() {
	$team = array(
		array( 'name' => 'John Doe', 'role' => 'CEO', 'image' => 'CEO' ),
		array( 'name' => 'Jane Smith', 'role' => 'Creative Director', 'image' => 'Director' ),
		array( 'name' => 'Bob Johnson', 'role' => 'Project Manager', 'image' => 'Manager' ),
	);

	$team_widgets = array();
	foreach ( $team as $member ) {
		$team_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'image',
					'settings' => array(
						'image' => array( 'url' => 'https://via.placeholder.com/300x300/7C3AED/FFFFFF?text=' . urlencode( $member['image'] ) ),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $member['name'],
						'header_size' => 'h3',
						'text_align'  => 'center',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor'          => $member['role'],
						'text_align'      => 'center',
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Inter',
							'font_size'      => array( 'size' => 16, 'unit' => 'px' ),
							'color'          => '#7C3AED',
						),
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'MEET OUR TEAM',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $team_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#0f172a',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Create journey page template
 */
function trinity_create_elementor_journey_template() {
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'journey',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$page_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'Journey',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $page_id ) ) {
		update_post_meta( $page_id, '_trinity_template_type', 'journey' );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );

		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_journey_sections(),
		);

		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $page_id;
}

/**
 * Build journey page sections
 */
function trinity_build_journey_sections() {
	$sections = array();

	$sections[] = trinity_build_journey_hero();
	$sections[] = trinity_build_journey_timeline();
	$sections[] = trinity_build_cta_section();

	return $sections;
}

/**
 * Build journey hero section
 */
function trinity_build_journey_hero() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'OUR JOURNEY',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 72, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'From humble beginnings to industry leadership',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 24, 'unit' => 'px' ),
						'font_weight'    => '400',
						'color'          => '#cbd5e1',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 120, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build journey timeline section
 */
function trinity_build_journey_timeline() {
	$timeline = array(
		array( 'year' => '2014', 'title' => 'Founded', 'description' => 'Company founded with vision for excellence' ),
		array( 'year' => '2016', 'title' => 'First Major Client', 'description' => 'Secured first enterprise client' ),
		array( 'year' => '2018', 'title' => 'National Expansion', 'description' => 'Expanded operations across the country' ),
		array( 'year' => '2020', 'title' => 'Digital Transformation', 'description' => 'Full digital transformation completed' ),
		array( 'year' => '2024', 'title' => 'Industry Leader', 'description' => 'Recognized as industry leader' ),
	);

	$timeline_widgets = array();
	foreach ( $timeline as $item ) {
		$timeline_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $item['year'],
						'header_size' => 'h2',
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Bebas Neue',
							'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
							'font_weight'    => '700',
							'color'          => '#7C3AED',
						),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $item['title'],
						'header_size' => 'h3',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => $item['description'],
					),
				),
			),
		);
	}

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => $timeline_widgets,
		'settings'      => array(
			'padding' => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Create facilities page template
 */
function trinity_create_elementor_facilities_template() {
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'facilities',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$page_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'Manufacturing',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $page_id ) ) {
		update_post_meta( $page_id, '_trinity_template_type', 'facilities' );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );

		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_facilities_sections(),
		);

		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $page_id;
}

/**
 * Build facilities page sections
 */
function trinity_build_facilities_sections() {
	$sections = array();

	$sections[] = trinity_build_facilities_hero();
	$sections[] = trinity_build_facilities_features();
	$sections[] = trinity_build_facilities_gallery();
	$sections[] = trinity_build_cta_section();

	return $sections;
}

/**
 * Build facilities hero section
 */
function trinity_build_facilities_hero() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'OUR MANUFACTURING',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 64, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'State-of-the-art facilities with precision engineering',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 24, 'unit' => 'px' ),
						'font_weight'    => '400',
						'color'          => '#cbd5e1',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 120, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build facilities features section
 */
function trinity_build_facilities_features() {
	$features = array(
		array( 'title' => 'Advanced Machinery', 'description' => 'Modern equipment for precision manufacturing' ),
		array( 'title' => 'Quality Control', 'description' => 'Rigorous quality assurance processes' ),
		array( 'title' => 'Sustainable Practices', 'description' => 'Eco-friendly manufacturing methods' ),
		array( 'title' => 'Expert Team', 'description' => 'Skilled professionals with decades of experience' ),
	);

	$feature_widgets = array();
	foreach ( $features as $feature ) {
		$feature_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'image',
					'settings' => array(
						'image' => array( 'url' => 'https://via.placeholder.com/200/7C3AED/FFFFFF?text=' . urlencode( $feature['title'] ) ),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $feature['title'],
						'header_size' => 'h3',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => $feature['description'],
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'FEATURES',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $feature_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#f8fafc',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build facilities gallery section
 */
function trinity_build_facilities_gallery() {
	$gallery_widgets = array();
	for ( $i = 1; $i <= 4; $i++ ) {
		$gallery_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'image',
			'settings' => array(
				'image' => array( 'url' => 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=Facility+' . $i ),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'FACILITY TOUR',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $gallery_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#0f172a',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Create awards page template
 */
function trinity_create_elementor_awards_template() {
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'awards',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$page_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'Awards',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $page_id ) ) {
		update_post_meta( $page_id, '_trinity_template_type', 'awards' );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );

		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_awards_sections(),
		);

		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $page_id;
}

/**
 * Build awards page sections
 */
function trinity_build_awards_sections() {
	$sections = array();

	$sections[] = trinity_build_awards_hero();
	$sections[] = trinity_build_awards_grid();
	$sections[] = trinity_build_cta_section();

	return $sections;
}

/**
 * Build awards hero section
 */
function trinity_build_awards_hero() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'AWARDS & RECOGNITION',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 64, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'Industry recognition for excellence and innovation',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 24, 'unit' => 'px' ),
						'font_weight'    => '400',
						'color'          => '#cbd5e1',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 120, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build awards grid section
 */
function trinity_build_awards_grid() {
	$awards = array(
		array( 'title' => 'Best Digital Agency 2024', 'year' => '2024', 'issuer' => 'Digital Awards' ),
		array( 'title' => 'Innovation Excellence', 'year' => '2023', 'issuer' => 'Tech Excellence' ),
		array( 'title' => 'Customer Choice Award', 'year' => '2023', 'issuer' => 'Industry Report' ),
		array( 'title' => 'Sustainability Leader', 'year' => '2022', 'issuer' => 'Green Business' ),
		array( 'title' => 'Top Designer 2022', 'year' => '2022', 'issuer' => 'Design Weekly' ),
		array( 'title' => 'Best UX/UI', 'year' => '2021', 'issuer' => 'UX Awards' ),
	);

	$award_widgets = array();
	foreach ( $awards as $award ) {
		$award_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $award['title'],
						'header_size' => 'h3',
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor' => '<p>' . $award['year'] . ' | ' . $award['issuer'] . '</p>',
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Inter',
							'font_size'      => array( 'size' => 16, 'unit' => 'px' ),
							'color'          => '#7C3AED',
						),
					),
				),
			),
		);
	}

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => $award_widgets,
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#f8fafc',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Create registration popup modal
 */
function trinity_create_elementor_registration_modal() {
	$args = array(
		'post_type'      => 'elementor_library',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_modal_type',
				'value' => 'registration',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$modal_id = wp_insert_post( array(
		'post_type'    => 'elementor_library',
		'post_title'   => 'Registration Modal',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $modal_id ) ) {
		update_post_meta( $modal_id, '_trinity_modal_type', 'registration' );
		update_post_meta( $modal_id, '_elementor_template_type', 'popup' );
		update_post_meta( $modal_id, '_elementor_edit_mode', 'builder' );

		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_registration_modal_sections(),
		);

		update_post_meta( $modal_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $modal_id;
}

/**
 * Build registration modal sections
 */
function trinity_build_registration_modal_sections() {
	return array(
		trinity_build_registration_modal_container(),
	);
}

/**
 * Build registration modal container
 */
function trinity_build_registration_modal_container() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'JOIN OUR COMMUNITY',
					'header_size'     => 'h2',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 36, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'Get exclusive updates and offers delivered to your inbox',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 16, 'unit' => 'px' ),
						'font_weight'    => '400',
						'color'          => '#cbd5e1',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor' => '<form class="trinity-registration-form"><div class="form-group"><input type="text" name="name" placeholder="Full Name" required style="width: 100%; padding: 12px 16px; margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-family: Inter; font-size: 16px; color: #0f172a;"></div><div class="form-group"><input type="email" name="email" placeholder="Email Address" required style="width: 100%; padding: 12px 16px; margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-family: Inter; font-size: 16px; color: #0f172a;"></div><div class="form-group"><input type="tel" name="phone" placeholder="Phone Number" style="width: 100%; padding: 12px 16px; margin-bottom: 16px; border: 1px solid #e2e8f0; border-radius: 6px; font-family: Inter; font-size: 16px; color: #0f172a;"></div><button type="submit" style="width: 100%; padding: 12px 32px; background-color: #7C3AED; color: white; border: none; border-radius: 6px; font-family: Inter; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease;">Register Now</button></form>',
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
			'padding'               => array( 'top' => 48, 'bottom' => 48, 'left' => 32, 'right' => 32, 'unit' => 'px', 'isLinked' => false ),
			'border_border'         => 'solid',
			'border_width'          => array( 'top' => 2, 'right' => 2, 'bottom' => 2, 'left' => 2, 'unit' => 'px', 'isLinked' => true ),
			'border_color'          => '#7C3AED',
			'border_radius'         => array( 'top' => 12, 'right' => 12, 'bottom' => 12, 'left' => 12, 'unit' => 'px', 'isLinked' => true ),
		),
	);
}

/**
 * Create contact page template
 */
function trinity_create_elementor_contact_template() {
	$args = array(
		'post_type'      => 'page',
		'posts_per_page' => 1,
		'meta_query'     => array(
			array(
				'key'   => '_trinity_template_type',
				'value' => 'contact',
			),
		),
	);

	$existing = get_posts( $args );
	if ( ! empty( $existing ) ) {
		return;
	}

	$page_id = wp_insert_post( array(
		'post_type'    => 'page',
		'post_title'   => 'Contact Us',
		'post_status'  => 'publish',
		'post_content' => '',
	) );

	if ( ! is_wp_error( $page_id ) ) {
		update_post_meta( $page_id, '_trinity_template_type', 'contact' );
		update_post_meta( $page_id, '_elementor_edit_mode', 'builder' );

		$document_data = array(
			'version' => '0.4',
			'elements' => trinity_build_contact_sections(),
		);

		update_post_meta( $page_id, '_elementor_data', wp_slash( wp_json_encode( $document_data ) ) );
	}

	return $page_id;
}

/**
 * Build contact page sections
 */
function trinity_build_contact_sections() {
	$sections = array();

	$sections[] = trinity_build_contact_hero();
	$sections[] = trinity_build_contact_form_section();
	$sections[] = trinity_build_contact_info();

	return $sections;
}

/**
 * Build contact hero section
 */
function trinity_build_contact_hero() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'GET IN TOUCH',
					'header_size'     => 'h1',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 72, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
						'color'          => '#ffffff',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor'          => 'We\'d love to hear from you. Get in touch with our team today.',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Inter',
						'font_size'      => array( 'size' => 24, 'unit' => 'px' ),
						'font_weight'    => '400',
						'color'          => '#cbd5e1',
					),
				),
			),
		),
		'settings' => array(
			'background_background' => 'gradient',
			'background_gradient_gradient' => 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
			'padding'               => array( 'top' => 120, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build contact form section
 */
function trinity_build_contact_form_section() {
	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array(
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'heading',
				'settings' => array(
					'title'           => 'SEND US A MESSAGE',
					'header_size'     => 'h2',
					'text_align'      => 'center',
				),
				'style' => array(
					'typography' => array(
						'font_family'    => 'Bebas Neue',
						'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
						'font_weight'    => '700',
						'text_transform' => 'uppercase',
					),
				),
			),
			array(
				'id'       => uniqid(),
				'elType'   => 'widget',
				'type'     => 'text-editor',
				'settings' => array(
					'editor' => '<p style="text-align: center; font-size: 16px; color: #475569;">Install Contact Form 7 plugin and place shortcode [contact-form-7 id="1"] here</p>',
				),
			),
		),
		'settings' => array(
			'padding' => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

/**
 * Build contact info section
 */
function trinity_build_contact_info() {
	$info = array(
		array( 'label' => 'Email', 'value' => 'hello@trinitymedia.com' ),
		array( 'label' => 'Phone', 'value' => '+1 (555) 123-4567' ),
		array( 'label' => 'Address', 'value' => '123 Business Street, Suite 100, City, State 12345' ),
	);

	$info_widgets = array();
	foreach ( $info as $item ) {
		$info_widgets[] = array(
			'id'       => uniqid(),
			'elType'   => 'widget',
			'type'     => 'column',
			'elements' => array(
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'heading',
					'settings' => array(
						'title'       => $item['label'],
						'header_size' => 'h3',
						'text_align'  => 'center',
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Bebas Neue',
							'font_size'      => array( 'size' => 24, 'unit' => 'px' ),
							'font_weight'    => '700',
							'color'          => '#7C3AED',
						),
					),
				),
				array(
					'id'       => uniqid(),
					'elType'   => 'widget',
					'type'     => 'text-editor',
					'settings' => array(
						'editor'          => $item['value'],
						'text_align'      => 'center',
					),
					'style' => array(
						'typography' => array(
							'font_family'    => 'Inter',
							'font_size'      => array( 'size' => 18, 'unit' => 'px' ),
							'font_weight'    => '400',
							'color'          => '#475569',
						),
					),
				),
			),
		);
	}

	$heading_widget = array(
		'id'       => uniqid(),
		'elType'   => 'widget',
		'type'     => 'heading',
		'settings' => array(
			'title'           => 'CONTACT INFORMATION',
			'header_size'     => 'h2',
			'text_align'      => 'center',
		),
		'style' => array(
			'typography' => array(
				'font_family'    => 'Bebas Neue',
				'font_size'      => array( 'size' => 48, 'unit' => 'px' ),
				'font_weight'    => '700',
				'text_transform' => 'uppercase',
			),
		),
	);

	return array(
		'id'            => uniqid(),
		'elType'        => 'section',
		'type'          => 'container',
		'elements'      => array_merge( array( $heading_widget ), $info_widgets ),
		'settings'      => array(
			'background_background' => 'classic',
			'background_color'      => '#f8fafc',
			'padding'               => array( 'top' => 80, 'bottom' => 80, 'left' => 20, 'right' => 20, 'unit' => 'px', 'isLinked' => false ),
		),
	);
}

// Initialize templates on theme activation
add_action( 'after_switch_theme', 'trinity_create_elementor_homepage' );
add_action( 'after_switch_theme', 'trinity_create_elementor_service_detail_template' );
add_action( 'after_switch_theme', 'trinity_create_elementor_service_archive_template' );
add_action( 'after_switch_theme', 'trinity_create_elementor_portfolio_archive_template' );
add_action( 'after_switch_theme', 'trinity_create_elementor_portfolio_detail_template' );
add_action( 'after_switch_theme', 'trinity_create_elementor_about_template' );
add_action( 'after_switch_theme', 'trinity_create_elementor_journey_template' );
add_action( 'after_switch_theme', 'trinity_create_elementor_facilities_template' );
add_action( 'after_switch_theme', 'trinity_create_elementor_awards_template' );
add_action( 'after_switch_theme', 'trinity_create_elementor_contact_template' );
add_action( 'after_switch_theme', 'trinity_create_elementor_registration_modal' );

// Also run on demand
add_action( 'wp_loaded', function() {
	if ( current_user_can( 'manage_options' ) && isset( $_GET['trinity_build_templates'] ) ) {
		trinity_create_elementor_homepage();
		wp_safe_remote_get( remove_query_arg( 'trinity_build_templates' ) );
	}
} );
