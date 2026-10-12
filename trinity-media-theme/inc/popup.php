<?php
/**
 * Registration / Quote popup.
 *
 * The popup *content* is an Elementor library template ("Trinity – Registration Popup") built with
 * native containers & widgets. This file only provides the lightweight modal shell.
 *
 * It is NEVER shown automatically. Open it from anything with:
 *   - a link / button URL of  #tm-popup           (Elementor Button -> Link: #tm-popup)
 *   - or the CSS class  tm-open-popup             (Advanced -> CSS Classes)
 *
 * Disable the shell completely with:  add_filter( 'trinity_enable_popup', '__return_false' );
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function trinity_render_popup_shell() {
	if ( ! apply_filters( 'trinity_enable_popup', true ) ) {
		return;
	}
	$id = (int) get_option( 'trinity_popup_template_id' );
	if ( ! $id || ! function_exists( 'trinity_elementor_active' ) || ! trinity_elementor_active() ) {
		return;
	}
	?>
	<div id="tm-popup" class="tm-popup" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Request a quote', 'trinity-media' ); ?>" hidden>
		<div class="tm-popup__overlay" data-tm-close></div>
		<div class="tm-popup__dialog">
			<button type="button" class="tm-popup__close" data-tm-close aria-label="<?php esc_attr_e( 'Close', 'trinity-media' ); ?>">
				<i class="tm-lucide tm-lucide-x" aria-hidden="true"></i>
			</button>
			<div class="tm-popup__body" data-popup-template="<?php echo esc_attr( $id ); ?>">
				<?php
				// Rendered lazily-in-DOM (hidden) so Elementor enqueues the template CSS.
				trinity_render_library_template( $id );
				?>
			</div>
		</div>
	</div>
	<?php
}
add_action( 'wp_footer', 'trinity_render_popup_shell', 20 );
