<?php
/**
 * Trinity Media – theme bootstrap.
 *
 * Page content is NOT hard-coded here: every page, the header, footer, mega menu and popup are
 * Elementor documents (Containers + native widgets) created by inc/importer.php from demo/*.json.
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TRINITY_VERSION', '1.0.0' );
define( 'TRINITY_DIR', get_template_directory() );
define( 'TRINITY_URI', get_template_directory_uri() );

require_once TRINITY_DIR . '/inc/setup.php';
require_once TRINITY_DIR . '/inc/assets.php';
require_once TRINITY_DIR . '/inc/cpt.php';
require_once TRINITY_DIR . '/inc/elementor.php';
require_once TRINITY_DIR . '/inc/popup.php';
require_once TRINITY_DIR . '/inc/forms.php';
require_once TRINITY_DIR . '/inc/template-tags.php';

if ( is_admin() || ( defined( 'WP_CLI' ) && WP_CLI ) || file_exists( TRINITY_DIR . '/demo/.dev-autoimport' ) ) {
	require_once TRINITY_DIR . '/inc/importer.php';
}
