<?php
/**
 * Trinity Media Theme Functions
 */

define( 'TRINITY_THEME_VERSION', '1.0.0' );
define( 'TRINITY_THEME_DIR', get_template_directory() );
define( 'TRINITY_THEME_URI', get_template_directory_uri() );
define( 'TRINITY_ASSETS_DIR', TRINITY_THEME_URI . '/assets' );

/**
 * 1. Theme Setup - Translations, Menus, Support
 */
function trinity_theme_setup() {
	// Text domain for translations
	load_theme_textdomain( 'trinity-media', TRINITY_THEME_DIR . '/languages' );

	// Add theme support
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	) );
	add_theme_support( 'custom-header' );
	add_theme_support( 'custom-background' );

	// Register menus
	register_nav_menus( array(
		'primary_menu' => esc_html__( 'Primary Menu', 'trinity-media' ),
		'footer_menu' => esc_html__( 'Footer Menu', 'trinity-media' ),
	) );
}
add_action( 'after_setup_theme', 'trinity_theme_setup' );

/**
 * 2. Enqueue Styles & Scripts
 */
function trinity_enqueue_assets() {
	// Google Fonts: Inter & Bebas Neue
	wp_enqueue_style(
		'trinity-fonts',
		'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap',
		array(),
		TRINITY_THEME_VERSION
	);

	// Main theme stylesheet
	wp_enqueue_style(
		'trinity-style',
		get_stylesheet_uri(),
		array(),
		TRINITY_THEME_VERSION
	);

	// Theme CSS files
	wp_enqueue_style(
		'trinity-dark-light',
		TRINITY_ASSETS_DIR . '/css/dark-light-theme.css',
		array(),
		TRINITY_THEME_VERSION
	);

	wp_enqueue_style(
		'trinity-animations',
		TRINITY_ASSETS_DIR . '/css/animations.css',
		array(),
		TRINITY_THEME_VERSION
	);

	wp_enqueue_style(
		'trinity-main',
		TRINITY_ASSETS_DIR . '/css/theme.css',
		array(),
		TRINITY_THEME_VERSION
	);

	wp_enqueue_style(
		'trinity-elementor',
		TRINITY_ASSETS_DIR . '/css/elementor-sections.css',
		array(),
		TRINITY_THEME_VERSION
	);

	wp_enqueue_style(
		'trinity-modal',
		TRINITY_ASSETS_DIR . '/css/modal.css',
		array(),
		TRINITY_THEME_VERSION
	);

	// Scripts
	wp_enqueue_script(
		'trinity-theme-toggle',
		TRINITY_ASSETS_DIR . '/js/theme-toggle.js',
		array(),
		TRINITY_THEME_VERSION,
		true
	);

	wp_enqueue_script(
		'trinity-cursor',
		TRINITY_ASSETS_DIR . '/js/cursor.js',
		array(),
		TRINITY_THEME_VERSION,
		true
	);

	wp_enqueue_script(
		'trinity-main',
		TRINITY_ASSETS_DIR . '/js/main.js',
		array(),
		TRINITY_THEME_VERSION,
		true
	);

	wp_enqueue_script(
		'trinity-modal',
		TRINITY_ASSETS_DIR . '/js/modal.js',
		array(),
		TRINITY_THEME_VERSION,
		true
	);

	// Localize script for AJAX
	wp_localize_script( 'trinity-main', 'trinitySettings', array(
		'siteUrl' => site_url(),
		'themeUrl' => TRINITY_ASSETS_DIR,
		'ajaxUrl' => admin_url( 'admin-ajax.php' ),
	) );

	// Localize modal script
	wp_localize_script( 'trinity-modal', 'Trinity_Modal', array(
		'ajaxUrl' => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'trinity_registration_nonce' ),
	) );

	// WordPress comment reply script
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'trinity_enqueue_assets' );

/**
 * 3. Elementor Support
 */
function trinity_elementor_support() {
	// Check if Elementor is installed
	if ( ! did_action( 'elementor/loaded' ) ) {
		return;
	}

	// Add Elementor theme support
	add_theme_support( 'elementor' );
	add_theme_support( 'elementor-pro' );
}
add_action( 'after_setup_theme', 'trinity_elementor_support' );

/**
 * 4. Custom Admin CSS for Elementor
 */
function trinity_elementor_custom_colors() {
	if ( ! did_action( 'elementor/loaded' ) ) {
		return;
	}

	\Elementor\Plugin::$instance->documents->get_document_or_auto_save( get_the_ID() );
}
add_action( 'wp_head', 'trinity_elementor_custom_colors' );

/**
 * 5. Register Custom Post Types
 */
function trinity_register_post_types() {
	// Services Post Type
	register_post_type( 'service', array(
		'label'       => esc_html__( 'Services', 'trinity-media' ),
		'public'      => true,
		'has_archive' => true,
		'supports'    => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
		'rewrite'     => array( 'slug' => 'services' ),
		'menu_icon'   => 'dashicons-hammer',
	) );

	// Portfolio Post Type
	register_post_type( 'portfolio', array(
		'label'       => esc_html__( 'Portfolio', 'trinity-media' ),
		'public'      => true,
		'has_archive' => true,
		'supports'    => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
		'rewrite'     => array( 'slug' => 'portfolio' ),
		'menu_icon'   => 'dashicons-images-alt2',
	) );

	// Testimonials Post Type
	register_post_type( 'testimonial', array(
		'label'       => esc_html__( 'Testimonials', 'trinity-media' ),
		'public'      => false,
		'has_archive' => false,
		'supports'    => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
		'menu_icon'   => 'dashicons-testimonial',
	) );

	// Registrations Post Type
	register_post_type( 'registration', array(
		'label'       => esc_html__( 'Registrations', 'trinity-media' ),
		'public'      => false,
		'has_archive' => false,
		'supports'    => array( 'title', 'custom-fields' ),
		'menu_icon'   => 'dashicons-clipboard',
	) );
}
add_action( 'init', 'trinity_register_post_types' );

/**
 * 6. Sidebar / Widget Area Support
 */
function trinity_register_sidebars() {
	register_sidebar( array(
		'name'          => esc_html__( 'Primary Sidebar', 'trinity-media' ),
		'id'            => 'primary-sidebar',
		'description'   => esc_html__( 'Main sidebar', 'trinity-media' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}
add_action( 'widgets_init', 'trinity_register_sidebars' );

/**
 * 7. Theme Customizer - Dark/Light Mode Toggle
 */
function trinity_customize_register( $wp_customize ) {
	// Theme Mode Section
	$wp_customize->add_section( 'trinity_theme_mode', array(
		'title'       => esc_html__( 'Theme Mode', 'trinity-media' ),
		'priority'    => 200,
	) );

	// Default Theme Mode
	$wp_customize->add_setting( 'trinity_default_mode', array(
		'default'           => 'dark',
		'sanitize_callback' => 'sanitize_text_field',
	) );

	$wp_customize->add_control( 'trinity_default_mode', array(
		'label'    => esc_html__( 'Default Theme Mode', 'trinity-media' ),
		'section'  => 'trinity_theme_mode',
		'type'     => 'select',
		'choices'  => array(
			'dark'  => esc_html__( 'Dark', 'trinity-media' ),
			'light' => esc_html__( 'Light', 'trinity-media' ),
		),
	) );

	// Enable Theme Toggle
	$wp_customize->add_setting( 'trinity_enable_toggle', array(
		'default'           => true,
		'sanitize_callback' => 'rest_sanitize_boolean',
	) );

	$wp_customize->add_control( 'trinity_enable_toggle', array(
		'label'   => esc_html__( 'Enable Theme Toggle', 'trinity-media' ),
		'section' => 'trinity_theme_mode',
		'type'    => 'checkbox',
	) );
}
add_action( 'customize_register', 'trinity_customize_register' );

/**
 * 8. Body Classes - Add theme mode class
 */
function trinity_body_classes( $classes ) {
	$default_mode = get_theme_mod( 'trinity_default_mode', 'dark' );
	$classes[]    = 'trinity-' . $default_mode;
	return $classes;
}
add_filter( 'body_class', 'trinity_body_classes' );

/**
 * 9. Custom Excerpt Length
 */
function trinity_excerpt_length( $length ) {
	return 20;
}
add_filter( 'excerpt_length', 'trinity_excerpt_length' );

/**
 * 10. Custom Excerpt Ending
 */
function trinity_excerpt_more( $more ) {
	return ' <a href="' . esc_url( get_the_permalink() ) . '" class="read-more">' . esc_html__( 'Read More', 'trinity-media' ) . '</a>';
}
add_filter( 'excerpt_more', 'trinity_excerpt_more' );

/**
 * 11. Disable Gutenberg for Custom Post Types (Optional - use Elementor)
 */
function trinity_disable_gutenberg( $is_enabled, $post_type ) {
	if ( in_array( $post_type, array( 'service', 'portfolio' ), true ) ) {
		return false;
	}
	return $is_enabled;
}
add_filter( 'use_block_editor_for_post_type', 'trinity_disable_gutenberg', 10, 2 );

/**
 * 12. WP Head Cleanup
 */
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );

/**
 * 13. Register ACF fields (if ACF plugin is installed)
 */
function trinity_register_acf_fields() {
	if ( function_exists( 'acf_add_local_field_group' ) ) {
		// Service Fields
		acf_add_local_field_group( array(
			'key'      => 'group_trinity_service',
			'title'    => 'Service Details',
			'fields'   => array(
				array(
					'key'   => 'field_service_number',
					'label' => 'Service Number',
					'name'  => 'service_number',
					'type'  => 'number',
				),
				array(
					'key'   => 'field_service_slug',
					'label' => 'Service Slug',
					'name'  => 'service_slug',
					'type'  => 'text',
				),
				array(
					'key'   => 'field_service_short_desc',
					'label' => 'Short Description',
					'name'  => 'service_short_desc',
					'type'  => 'text',
				),
			),
			'location' => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'service',
					),
				),
			),
		) );
	}
}
add_action( 'acf/init', 'trinity_register_acf_fields' );

/**
 * 14. AJAX Handler for Registration Form
 */
function trinity_register_user() {
	check_ajax_referer( 'trinity_nonce', 'security' );

	$username = sanitize_user( $_POST['username'] ?? '' );
	$email    = sanitize_email( $_POST['email'] ?? '' );
	$password = sanitize_text_field( $_POST['password'] ?? '' );

	if ( ! $username || ! $email || ! $password ) {
		wp_send_json_error( array( 'message' => 'Missing required fields' ) );
	}

	$user_id = wp_create_user( $username, $password, $email );

	if ( is_wp_error( $user_id ) ) {
		wp_send_json_error( array( 'message' => $user_id->get_error_message() ) );
	}

	wp_send_json_success( array( 'message' => 'User registered successfully' ) );
}
add_action( 'wp_ajax_nopriv_trinity_register_user', 'trinity_register_user' );

/**
 * Handle registration modal form submission
 */
function trinity_registration_submit() {
	// Verify nonce
	if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'trinity_registration_nonce' ) ) {
		wp_send_json_error( 'Invalid security token' );
	}

	// Get form data
	$name  = isset( $_POST['name'] ) ? sanitize_text_field( $_POST['name'] ) : '';
	$email = isset( $_POST['email'] ) ? sanitize_email( $_POST['email'] ) : '';
	$phone = isset( $_POST['phone'] ) ? sanitize_text_field( $_POST['phone'] ) : '';

	// Validate
	if ( empty( $name ) || empty( $email ) || empty( $phone ) ) {
		wp_send_json_error( 'All fields required' );
	}

	if ( ! is_email( $email ) ) {
		wp_send_json_error( 'Invalid email address' );
	}

	// Save registration as custom post type
	$registration_id = wp_insert_post( array(
		'post_type'   => 'registration',
		'post_title'  => $name,
		'post_status' => 'publish',
		'meta_input'  => array(
			'registration_email' => $email,
			'registration_phone' => $phone,
			'registration_date'  => current_time( 'mysql' ),
		),
	) );

	if ( is_wp_error( $registration_id ) ) {
		wp_send_json_error( 'Registration failed. Try again.' );
	}

	// Send notification email to admin
	$admin_email = get_option( 'admin_email' );
	$subject     = 'New Registration: ' . $name;
	$message     = "New registration received:\n\n";
	$message    .= "Name: $name\n";
	$message    .= "Email: $email\n";
	$message    .= "Phone: $phone\n";
	$message    .= "\nDate: " . current_time( 'mysql' );

	wp_mail( $admin_email, $subject, $message );

	wp_send_json_success( 'Registration successful!' );
}
add_action( 'wp_ajax_trinity_registration_submit', 'trinity_registration_submit' );
add_action( 'wp_ajax_nopriv_trinity_registration_submit', 'trinity_registration_submit' );

/**
 * 15. Add nonce for security
 */
function trinity_add_nonce() {
	wp_localize_script( 'trinity-main', 'trinityNonce', array(
		'nonce' => wp_create_nonce( 'trinity_nonce' ),
	) );
}
add_action( 'wp_enqueue_scripts', 'trinity_add_nonce' );

/**
 * 16. Custom Logo Support
 */
function trinity_get_custom_logo() {
	$custom_logo_id = get_theme_mod( 'custom_logo' );
	$html            = sprintf(
		'<a href="%1$s" class="custom-logo-link" rel="home">%2$s</a>',
		esc_url( home_url( '/' ) ),
		wp_get_attachment_image( $custom_logo_id, 'full' )
	);
	return $html;
}

/**
 * 17. Allow SVG Upload
 */
function trinity_allow_svg_upload( $mimes ) {
	$mimes['svg']  = 'image/svg+xml';
	$mimes['svgz'] = 'image/svg+xml';
	return $mimes;
}
add_filter( 'upload_mimes', 'trinity_allow_svg_upload' );

/**
 * 18. Register Custom Taxonomies
 */
function trinity_register_taxonomies() {
	// Service Categories
	register_taxonomy( 'service_category', array( 'service' ), array(
		'label'        => esc_html__( 'Service Categories', 'trinity-media' ),
		'hierarchical' => true,
		'rewrite'      => array( 'slug' => 'service-category' ),
		'show_admin_column' => true,
	) );

	// Portfolio Categories
	register_taxonomy( 'portfolio_category', array( 'portfolio' ), array(
		'label'        => esc_html__( 'Portfolio Categories', 'trinity-media' ),
		'hierarchical' => true,
		'rewrite'      => array( 'slug' => 'portfolio-category' ),
		'show_admin_column' => true,
	) );
}
add_action( 'init', 'trinity_register_taxonomies' );

/**
 * 19. Load Demo Data
 */
require_once TRINITY_THEME_DIR . '/includes/demo-data.php';

/**
 * 20. Load Elementor Templates
 */
require_once TRINITY_THEME_DIR . '/includes/elementor-templates.php';

?>
