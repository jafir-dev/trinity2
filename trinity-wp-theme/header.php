<?php
/**
 * The header for the theme
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="dark">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
	<script>
		(function() {
			try {
				var t = localStorage.getItem('trinity-theme');
				if (t === 'light') {
					document.documentElement.classList.remove('dark');
					document.documentElement.classList.add('light');
				} else {
					document.documentElement.classList.add('dark');
					document.documentElement.classList.remove('light');
				}
			} catch(e) {
				document.documentElement.classList.add('dark');
			}
		})();
	</script>
	<?php wp_head(); ?>
</head>

<body <?php body_class( 'dark' ); ?>>
	<?php wp_body_open(); ?>
	<div class="trinity-cursor"></div>

	<div id="page" class="site">
		<?php
		// Elementor will render the header template here
		if ( class_exists( '\Elementor\Core\Settings\Manager' ) ) {
			$header_id = \Elementor\Core\Settings\Manager::get_settings_managers( 'post' )->get_model()->get( 'elementor_pro_theme_builder_header' );
			if ( $header_id ) {
				echo \Elementor\Plugin::instance()->frontend->get_builder_content( $header_id, true );
			}
		}
		?>
