<?php
/**
 * Elementor compatibility layer.
 *
 * - Registers theme locations (Elementor Pro Theme Builder uses them; harmless otherwise)
 * - Helper to detect Elementor-built content
 * - Header / footer fallback chain:  Elementor Pro location  ->  XPRO Theme Builder  ->  library template  ->  plain markup
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function trinity_elementor_active() {
	return did_action( 'elementor/loaded' ) || defined( 'ELEMENTOR_VERSION' );
}

function trinity_is_elementor_page( $post_id = 0 ) {
	if ( ! trinity_elementor_active() ) {
		return false;
	}
	$post_id = $post_id ? $post_id : get_the_ID();
	if ( ! $post_id ) {
		return false;
	}
	return 'builder' === get_post_meta( $post_id, '_elementor_edit_mode', true );
}

/** Elementor Pro Theme Builder locations. */
function trinity_register_elementor_locations( $manager ) {
	$manager->register_all_core_location();
}
add_action( 'elementor/theme/register_locations', 'trinity_register_elementor_locations' );

/**
 * Render an Elementor library template by id (works with free Elementor).
 */
function trinity_render_library_template( $template_id ) {
	if ( ! $template_id || ! trinity_elementor_active() ) {
		return false;
	}
	if ( ! class_exists( '\Elementor\Plugin' ) ) {
		return false;
	}
	$content = \Elementor\Plugin::$instance->frontend->get_builder_content_for_display( (int) $template_id, true );
	if ( ! $content ) {
		return false;
	}
	echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor output.
	return true;
}

function trinity_fallback_header() {
	$id = (int) get_option( 'trinity_header_template_id' );
	if ( $id && trinity_render_library_template( $id ) ) {
		return;
	}
	?>
	<header class="tm-plain-header site-header">
		<div class="tm-plain-header__inner">
			<a class="tm-plain-header__brand" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => 'nav',
					'fallback_cb'    => false,
					'depth'          => 1,
				)
			);
			?>
		</div>
	</header>
	<?php
}

function trinity_fallback_footer() {
	$id = (int) get_option( 'trinity_footer_template_id' );
	if ( $id && trinity_render_library_template( $id ) ) {
		return;
	}
	?>
	<footer class="tm-plain-footer site-footer">
		<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?></p>
	</footer>
	<?php
}

/** Make the Service CPT editable with Elementor out of the box (free + pro). */
function trinity_default_elementor_cpt_support() {
	$support = get_option( 'elementor_cpt_support' );
	if ( false === $support ) {
		update_option( 'elementor_cpt_support', array( 'page', 'post', 'service' ) );
	}
}
add_action( 'after_switch_theme', 'trinity_default_elementor_cpt_support' );

/**
 * The theme loads Inter + Bebas Neue itself (same css2 request as the original site), so stop Elementor from
 * printing a second, differently-versioned Google Fonts request on the front end.
 */
add_filter( 'elementor/frontend/print_google_fonts', '__return_false' );

/**
 * Menu: custom "#anchor" links (e.g. Services -> /#services) must not receive the current-menu-item class
 * just because the page URL matches once the fragment is stripped.
 */
function trinity_menu_anchor_classes( $classes, $item ) {
	if ( 'custom' === $item->type && false !== strpos( (string) $item->url, '#' ) ) {
		$classes = array_diff( $classes, array( 'current-menu-item', 'current_page_item', 'current-menu-ancestor', 'current-menu-parent', 'active' ) );
	}
	return $classes;
}
add_filter( 'nav_menu_css_class', 'trinity_menu_anchor_classes', 20, 2 );

/** Keep the designer's straight quotes / dashes exactly as authored inside Elementor documents. */
function trinity_disable_texturize_for_elementor() {
	if ( function_exists( 'trinity_is_elementor_page' ) && is_singular() && trinity_is_elementor_page() ) {
		add_filter( 'run_wptexturize', '__return_false' );
	}
}
add_action( 'template_redirect', 'trinity_disable_texturize_for_elementor' );

/** Above-the-fold brand images must not be lazy-loaded (logo, hero slide 1). */
function trinity_eager_images( $content, $widget ) {
	if ( 'image' === $widget->get_name() ) {
		$classes = (string) $widget->get_settings( '_css_classes' );
		if ( false !== strpos( $classes, 'tm-logo' ) ) {
			$content = str_replace( 'loading="lazy"', 'loading="eager" fetchpriority="high"', $content );
		}
	}
	return $content;
}
add_filter( 'elementor/widget/render_content', 'trinity_eager_images', 10, 2 );

/**
 * [trinity_template id="123"] – embed any Elementor library template (the free-Elementor equivalent of the
 * Pro-only [elementor-template] shortcode). Used for the reusable "Contact CTA" block on every service page.
 */
function trinity_template_shortcode( $atts ) {
	$atts = shortcode_atts( array( 'id' => 0 ), $atts, 'trinity_template' );
	ob_start();
	trinity_render_library_template( (int) $atts['id'] );
	return ob_get_clean();
}
add_shortcode( 'trinity_template', 'trinity_template_shortcode' );
