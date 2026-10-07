<?php
/**
 * Theme setup: supports, menus, widget areas, image sizes.
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function trinity_setup() {
	load_theme_textdomain( 'trinity-media', TRINITY_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' )
	);
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 96,
			'width'       => 320,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	register_nav_menus(
		array(
			'primary'         => __( 'Primary Menu (header)', 'trinity-media' ),
			'footer-services' => __( 'Footer – Services', 'trinity-media' ),
			'footer-links'    => __( 'Footer – Quick Links', 'trinity-media' ),
		)
	);

	add_image_size( 'trinity-card', 960, 640, true );
	add_image_size( 'trinity-wide', 1600, 900, true );
}
add_action( 'after_setup_theme', 'trinity_setup' );

function trinity_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Blog Sidebar', 'trinity-media' ),
			'id'            => 'sidebar-blog',
			'description'   => __( 'Optional widgets for blog posts.', 'trinity-media' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'trinity_widgets_init' );

/** Set the content width used by embeds. */
function trinity_content_width() {
	$GLOBALS['content_width'] = 1360;
}
add_action( 'after_setup_theme', 'trinity_content_width', 0 );

/** Body classes used by the design (theme state is toggled client side on <html>). */
function trinity_body_classes( $classes ) {
	$classes[] = 'trinity-media';
	return $classes;
}
add_filter( 'body_class', 'trinity_body_classes' );

/** Accessibility: skip link. */
function trinity_skip_link() {
	echo '<a class="skip-link screen-reader-text" href="#content">' . esc_html__( 'Skip to content', 'trinity-media' ) . '</a>';
}
add_action( 'wp_body_open', 'trinity_skip_link', 5 );
