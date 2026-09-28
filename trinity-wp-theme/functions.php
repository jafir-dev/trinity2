<?php
/**
 * Trinity Media Theme Functions
 */

define( 'TRINITY_THEME_VERSION', '1.0.0' );
define( 'TRINITY_THEME_DIR', get_template_directory() );
define( 'TRINITY_THEME_URI', get_template_directory_uri() );

// Include Elementor template generator
require_once TRINITY_THEME_DIR . '/inc/elementor-templates.php';
require_once TRINITY_THEME_DIR . '/inc/demo-content.php';

/**
 * Add theme support
 */
function trinity_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'custom-logo' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'script',
		'style',
	) );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'elementor' );
	add_theme_support( 'wp-block-styles' );

	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'trinity-media' ),
		'footer'  => esc_html__( 'Footer Menu', 'trinity-media' ),
	) );
}
add_action( 'after_setup_theme', 'trinity_setup' );

/**
 * Enqueue styles and scripts
 */
function trinity_enqueue_assets() {
	wp_enqueue_style( 'trinity-style', TRINITY_THEME_URI . '/style.css', array(), TRINITY_THEME_VERSION );
	wp_enqueue_style( 'inter-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), TRINITY_THEME_VERSION );
	wp_enqueue_style( 'bebas-neue-font', 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap', array(), TRINITY_THEME_VERSION );

	wp_enqueue_script( 'trinity-cursor', TRINITY_THEME_URI . '/assets/js/custom-cursor.js', array(), TRINITY_THEME_VERSION, true );
	wp_enqueue_script( 'trinity-main', TRINITY_THEME_URI . '/assets/js/main.js', array(), TRINITY_THEME_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'trinity_enqueue_assets' );

/**
 * Disable Elementor default colors
 */
add_filter( 'elementor/colors/disable_default_colors', '__return_true' );

/**
 * Register Elementor locations
 */
function trinity_register_elementor_locations( $elementor_theme_manager ) {
	$elementor_theme_manager->register_all_core_location();
}
add_action( 'elementor/theme/register_locations', 'trinity_register_elementor_locations' );

/**
 * Customize Elementor settings
 */
function trinity_elementor_settings( $settings ) {
	$settings['container_width'] = 1280;
	return $settings;
}
add_filter( 'elementor/theme/get_elementor_theme_settings', 'trinity_elementor_settings' );

/**
 * Add custom post types for portfolio and testimonials
 */
function trinity_register_post_types() {
	register_post_type( 'portfolio', array(
		'labels' => array(
			'name'          => _x( 'Portfolio', 'post type general name', 'trinity-media' ),
			'singular_name' => _x( 'Portfolio Item', 'post type singular name', 'trinity-media' ),
		),
		'public'       => true,
		'show_in_rest' => true,
		'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		'rewrite'      => array( 'slug' => 'portfolio' ),
		'menu_icon'    => 'dashicons-images-alt2',
	) );

	register_post_type( 'testimonial', array(
		'labels' => array(
			'name'          => _x( 'Testimonials', 'post type general name', 'trinity-media' ),
			'singular_name' => _x( 'Testimonial', 'post type singular name', 'trinity-media' ),
		),
		'public'       => true,
		'show_in_rest' => true,
		'supports'     => array( 'title', 'editor', 'thumbnail' ),
		'rewrite'      => array( 'slug' => 'testimonials' ),
		'menu_icon'    => 'dashicons-format-quote',
	) );
}
add_action( 'init', 'trinity_register_post_types' );

/**
 * Custom logo class
 */
function trinity_custom_logo_class( $html ) {
	$html = str_replace( 'class="custom-logo"', 'class="custom-logo h-12 w-auto"', $html );
	return $html;
}
add_filter( 'get_custom_logo', 'trinity_custom_logo_class' );

/**
 * Remove Elementor default colors/typography
 */
add_filter( 'elementor/editor/localize_settings', function( $config ) {
	return $config;
} );

/**
 * Add custom color palette
 */
function trinity_register_color_palette() {
	$palette = array(
		array(
			'name'  => __( 'Primary Purple', 'trinity-media' ),
			'slug'  => 'primary-purple',
			'color' => '#7b2d8e',
		),
		array(
			'name'  => __( 'Secondary Gray', 'trinity-media' ),
			'slug'  => 'secondary-gray',
			'color' => '#666666',
		),
		array(
			'name'  => __( 'Background', 'trinity-media' ),
			'slug'  => 'background',
			'color' => '#f8f8f8',
		),
		array(
			'name'  => __( 'Foreground', 'trinity-media' ),
			'slug'  => 'foreground',
			'color' => '#1a1a1a',
		),
		array(
			'name'  => __( 'Dark Background', 'trinity-media' ),
			'slug'  => 'dark-background',
			'color' => '#0a0e1a',
		),
	);

	if ( function_exists( 'add_theme_support' ) ) {
		add_theme_support( 'editor-color-palette', $palette );
	}
}
add_action( 'after_setup_theme', 'trinity_register_color_palette' );

/**
 * Add custom fonts
 */
function trinity_register_fonts() {
	if ( function_exists( 'add_theme_support' ) ) {
		add_theme_support( 'editor-font-sizes', array(
			array(
				'name'      => _x( 'Small', 'Font size', 'trinity-media' ),
				'shortName' => _x( 'S', 'Font size', 'trinity-media' ),
				'size'      => 12,
				'slug'      => 'small',
			),
			array(
				'name'      => _x( 'Normal', 'Font size', 'trinity-media' ),
				'shortName' => _x( 'N', 'Font size', 'trinity-media' ),
				'size'      => 16,
				'slug'      => 'normal',
			),
			array(
				'name'      => _x( 'Large', 'Font size', 'trinity-media' ),
				'shortName' => _x( 'L', 'Font size', 'trinity-media' ),
				'size'      => 24,
				'slug'      => 'large',
			),
			array(
				'name'      => _x( 'Larger', 'Font size', 'trinity-media' ),
				'shortName' => _x( 'XL', 'Font size', 'trinity-media' ),
				'size'      => 36,
				'slug'      => 'larger',
			),
		) );
	}
}
add_action( 'after_setup_theme', 'trinity_register_fonts' );
