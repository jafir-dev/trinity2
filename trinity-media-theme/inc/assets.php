<?php
/**
 * Asset loading. One stylesheet, one script, preconnected Google Fonts.
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Apply the saved colour scheme before first paint (original site defaults to DARK).
 */
function trinity_theme_mode_script() {
	?>
<script>(function(){try{var t=localStorage.getItem('trinity-theme');var r=document.documentElement;r.classList.remove('dark','light');r.classList.add(t==='light'?'light':'dark');}catch(e){document.documentElement.classList.add('dark');}})();</script>
	<?php
}
add_action( 'wp_head', 'trinity_theme_mode_script', 1 );

/** Cache-busting version = theme version + file mtime. */
function trinity_asset_ver( $rel ) {
	$file = TRINITY_DIR . '/' . $rel;
	return file_exists( $file ) ? TRINITY_VERSION . '.' . filemtime( $file ) : TRINITY_VERSION;
}

function trinity_enqueue_assets() {
	wp_enqueue_style(
		'trinity-fonts',
		'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	wp_enqueue_style( 'trinity-lucide', TRINITY_URI . '/assets/css/lucide.css', array(), trinity_asset_ver( 'assets/css/lucide.css' ) );
	wp_enqueue_style( 'trinity-theme', TRINITY_URI . '/assets/css/theme.css', array( 'trinity-fonts', 'trinity-lucide' ), trinity_asset_ver( 'assets/css/theme.css' ) );
	wp_enqueue_style( 'trinity-blog', TRINITY_URI . '/assets/css/blog.css', array( 'trinity-theme' ), trinity_asset_ver( 'assets/css/blog.css' ) );

	wp_enqueue_script( 'trinity-theme', TRINITY_URI . '/assets/js/theme.js', array(), trinity_asset_ver( 'assets/js/theme.js' ), array( 'in_footer' => true, 'strategy' => 'defer' ) );
	wp_localize_script(
		'trinity-theme',
		'TrinityMedia',
		array(
			'homeUrl'  => home_url( '/' ),
			'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
			'whatsapp' => '971526935456',
		)
	);
}
add_action( 'wp_enqueue_scripts', 'trinity_enqueue_assets' );

/** Preconnect for Google Fonts. */
function trinity_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'trinity_resource_hints', 10, 2 );

/** Drop block-library CSS on Elementor-built singular pages (performance). */
function trinity_trim_assets() {
	if ( is_singular( array( 'page', 'service' ) ) && function_exists( 'trinity_is_elementor_page' ) && trinity_is_elementor_page() ) {
		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'wp-block-library-theme' );
		wp_dequeue_style( 'global-styles' );
		wp_dequeue_style( 'classic-theme-styles' );
	}
}
add_action( 'wp_enqueue_scripts', 'trinity_trim_assets', 100 );
