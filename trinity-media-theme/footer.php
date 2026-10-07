<?php
/**
 * Footer. Visible footer is an Elementor document (see header.php).
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
</div><!-- #content -->
<?php
if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'footer' ) ) {
	trinity_fallback_footer();
}
?>
<?php wp_footer(); ?>
</body>
</html>
