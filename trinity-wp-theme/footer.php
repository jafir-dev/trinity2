<?php
/**
 * The template for displaying the footer
 */
?>
		<?php
		// Elementor will render the footer template here
		if ( class_exists( '\Elementor\Core\Settings\Manager' ) ) {
			$footer_id = \Elementor\Core\Settings\Manager::get_settings_managers( 'post' )->get_model()->get( 'elementor_pro_theme_builder_footer' );
			if ( $footer_id ) {
				echo \Elementor\Plugin::instance()->frontend->get_builder_content( $footer_id, true );
			}
		}
		?>
	</div><!-- #page -->

	<?php wp_footer(); ?>
</body>
</html>
