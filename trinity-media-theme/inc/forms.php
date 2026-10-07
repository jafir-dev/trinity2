<?php
/**
 * Enquiry forms.
 *
 * Elementor Free has no Form widget, and the original design submits to WhatsApp behind a maths
 * captcha, so the three form variants are provided as shortcodes (placed with Elementor's native
 * Shortcode widget inside the glass-card containers that are built from native widgets):
 *
 *   [trinity_form type="quote"]     – Industries section "Get your quote"
 *   [trinity_form type="contact"]   – Contact page "Send us a message"
 *   [trinity_form type="service" service="Acrylic Fabrication"]  – service page / popup "Request a fast quote"
 *
 * On submit: (1) the visitor is sent to WhatsApp with the pre-filled message exactly like the original,
 * (2) the lead is e-mailed to the site recipient via admin-ajax.
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function trinity_service_options() {
	return array(
		'Large Format Digital Printing',
		'Exhibition Stands & Display Units',
		'Signage & Acrylic Works',
		'Wallpaper & Custom Murals',
		'Canvas & Fine Art Printing',
		'Flag & Fabric Printing',
		'Flatbed UV Printing on Rigid Substrates',
		'Vehicle & Fleet Branding',
		'Retail, POSM & Mall Branding',
		'Other Custom Fabrication',
	);
}

function trinity_icon( $name, $extra = '' ) {
	return '<i class="tm-lucide tm-lucide-' . esc_attr( $name ) . ' ' . esc_attr( $extra ) . '" aria-hidden="true"></i>';
}

function trinity_captcha_markup( $variant ) {
	ob_start();
	if ( 'service' === $variant ) {
		?>
		<div class="tm-captcha tm-captcha--inline">
			<div class="tm-captcha__left">
				<span class="tm-captcha__label"><?php esc_html_e( 'Verification:', 'trinity-media' ); ?></span>
				<span class="tm-captcha__sum" data-tm-sum>4 + 3 = ?</span>
				<button type="button" class="tm-captcha__refresh" data-tm-refresh title="<?php esc_attr_e( 'Change numbers', 'trinity-media' ); ?>"><?php echo trinity_icon( 'refresh-cw' ); // phpcs:ignore ?></button>
			</div>
			<input class="tm-captcha__answer" type="number" required placeholder="<?php esc_attr_e( 'Answer', 'trinity-media' ); ?>" data-tm-answer />
		</div>
		<?php
	} else {
		?>
		<div class="tm-captcha tm-captcha--box">
			<div class="tm-captcha__row">
				<label class="tm-captcha__check">
					<input type="checkbox" data-tm-robot />
					<span><?php esc_html_e( "I'm not a robot", 'trinity-media' ); ?></span>
				</label>
				<div class="tm-captcha__sec"><?php echo trinity_icon( 'shield-check' ); // phpcs:ignore ?><span><?php echo 'contact' === $variant ? esc_html__( 'Security Verification', 'trinity-media' ) : esc_html__( 'Security', 'trinity-media' ); ?></span></div>
			</div>
			<div class="tm-captcha__row tm-captcha__row--sum">
				<span class="tm-captcha__sum" data-tm-sum><?php echo 'contact' === $variant ? 'Security Code: 5 + 4 = ?' : '4 + 3 = ?'; ?></span>
				<input class="tm-captcha__answer" type="number" placeholder="<?php esc_attr_e( 'Answer', 'trinity-media' ); ?>" data-tm-answer />
				<button type="button" class="tm-captcha__refresh" data-tm-refresh title="<?php esc_attr_e( 'New question', 'trinity-media' ); ?>"><?php echo trinity_icon( 'refresh-cw' ); // phpcs:ignore ?></button>
			</div>
		</div>
		<?php
	}
	return ob_get_clean();
}

function trinity_form_shortcode( $atts ) {
	$atts = shortcode_atts(
		array(
			'type'    => 'quote',
			'service' => '',
			'button'  => '',
		),
		$atts,
		'trinity_form'
	);
	$type = in_array( $atts['type'], array( 'quote', 'contact', 'service' ), true ) ? $atts['type'] : 'quote';

	ob_start();
	?>
	<div class="tm-form-wrap tm-form-wrap--<?php echo esc_attr( $type ); ?>">
		<form class="tm-form tm-form--<?php echo esc_attr( $type ); ?>" method="post" novalidate data-tm-form="<?php echo esc_attr( $type ); ?>" data-service="<?php echo esc_attr( $atts['service'] ); ?>">
			<div class="tm-hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off" /></label></div>

			<?php if ( 'quote' === $type ) : ?>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Your Name *', 'trinity-media' ); ?></span><input class="tm-input" type="text" name="name" required placeholder="e.g. John Walter" /></label>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Phone / WhatsApp *', 'trinity-media' ); ?></span><input class="tm-input" type="tel" name="phone" required placeholder="+971 5X XXX XXXX" /></label>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Email Address', 'trinity-media' ); ?></span><input class="tm-input" type="email" name="email" placeholder="name@company.ae" /></label>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Select Service Required', 'trinity-media' ); ?></span>
					<select class="tm-input tm-select" name="service">
						<?php foreach ( trinity_service_options() as $opt ) : ?>
							<option value="<?php echo esc_attr( $opt ); ?>"><?php echo esc_html( $opt ); ?></option>
						<?php endforeach; ?>
					</select>
				</label>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Project Details / Sizes / Quantity', 'trinity-media' ); ?></span><textarea class="tm-input tm-textarea" name="message" rows="2" placeholder="Describe your dimensions, material, or deadline..."></textarea></label>
			<?php elseif ( 'contact' === $type ) : ?>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Name *', 'trinity-media' ); ?></span><input class="tm-input" type="text" name="name" required placeholder="Your full name" /></label>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Email *', 'trinity-media' ); ?></span><input class="tm-input" type="email" name="email" required placeholder="Your email address" /></label>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Phone *', 'trinity-media' ); ?></span><input class="tm-input" type="tel" name="phone" required placeholder="+971 5X XXX XXXX" /></label>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Your Message *', 'trinity-media' ); ?></span><textarea class="tm-input tm-textarea" name="message" rows="4" required placeholder="Specify your project requirements, quantities, sizes, or timeline..."></textarea></label>
			<?php else : ?>
				<div class="tm-grid-2">
					<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Name *', 'trinity-media' ); ?></span><input class="tm-input" type="text" name="name" required placeholder="Your name" /></label>
					<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Phone Number *', 'trinity-media' ); ?></span><input class="tm-input" type="tel" name="phone" required placeholder="+971 5X XXX XXXX" /></label>
				</div>
				<div class="tm-grid-2">
					<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Work Email *', 'trinity-media' ); ?></span><input class="tm-input" type="email" name="email" required placeholder="name@company.com" /></label>
					<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Timeline', 'trinity-media' ); ?></span>
						<select class="tm-input tm-select" name="timeline">
							<option value="Urgent (24 - 48 hours)">Urgent (24 - 48 hrs)</option>
							<option value="Standard (3 - 5 days)" selected>Standard (3 - 5 days)</option>
							<option value="Flexible (1 - 2 weeks)">Flexible (1 - 2 weeks)</option>
							<option value="Event / Exhibition">Event / Exhibition</option>
						</select>
					</label>
				</div>
				<label class="tm-field"><span class="tm-label"><?php esc_html_e( 'Project Requirements / Dimensions / Quantities *', 'trinity-media' ); ?></span><textarea class="tm-input tm-textarea" name="message" rows="2" required placeholder="e.g. Dimensions (3m x 2m), materials preferred, quantity, delivery location..."></textarea></label>
			<?php endif; ?>

			<?php echo trinity_captcha_markup( $type ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

			<div class="tm-form__error" role="alert" hidden></div>

			<?php
			$label = $atts['button'];
			if ( ! $label ) {
				$label = 'quote' === $type ? 'REQUEST QUOTE' : ( 'contact' === $type ? 'SEND NOW' : 'Get Instant Quote' );
			}
			?>
			<button type="submit" class="tm-submit tm-submit--<?php echo esc_attr( $type ); ?>">
				<?php echo trinity_icon( 'send' ); // phpcs:ignore ?>
				<span data-tm-submit-label data-label="<?php echo esc_attr( $label ); ?>"><?php echo esc_html( $label ); ?></span>
			</button>

			<?php if ( 'service' === $type ) : ?>
				<div class="tm-quick">
					<span class="tm-quick__iso"><?php echo trinity_icon( 'shield-check' ); // phpcs:ignore ?> ISO 9001 DIP-1 Press</span>
					<a class="tm-quick__wa" href="https://wa.me/971526935456" target="_blank" rel="noreferrer"><i class="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp Now</a>
				</div>
			<?php endif; ?>
		</form>

		<div class="tm-form__success" hidden>
			<div class="tm-success__icon"><?php echo trinity_icon( 'check-circle-2' ); // phpcs:ignore ?></div>
			<h4 class="tm-success__title"><?php echo 'contact' === $type ? esc_html__( 'Thank You For Your Message!', 'trinity-media' ) : ( 'service' === $type ? esc_html__( 'Quote Request Sent!', 'trinity-media' ) : esc_html__( 'Inquiry Transmitted!', 'trinity-media' ) ); ?></h4>
			<p class="tm-success__text">
				<?php
				if ( 'contact' === $type ) {
					esc_html_e( 'Your inquiry has been relayed to our team at Dubai Investment Park 1. We will respond swiftly.', 'trinity-media' );
				} elseif ( 'service' === $type ) {
					esc_html_e( 'Our estimating team at Dubai Investment Park has received your specifications. WhatsApp has opened for direct chat.', 'trinity-media' );
				} else {
					esc_html_e( 'Your project specifications were sent to our WhatsApp desk (+971 52 693 5456).', 'trinity-media' );
				}
				?>
			</p>
			<button type="button" class="tm-success__again" data-tm-again>
				<?php echo 'contact' === $type ? esc_html__( 'Send Another Message', 'trinity-media' ) : ( 'service' === $type ? esc_html__( 'Submit Another Inquiry', 'trinity-media' ) : esc_html__( 'Send Another Request', 'trinity-media' ) ); ?>
			</button>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
add_shortcode( 'trinity_form', 'trinity_form_shortcode' );

/**
 * AJAX lead e-mail (the browser also opens WhatsApp, as in the original design).
 */
function trinity_handle_form() {
	if ( ! empty( $_POST['website'] ) ) { // honeypot.
		wp_send_json_success();
	}
	$ip   = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'x';
	$key  = 'trinity_form_' . md5( $ip );
	$hits = (int) get_transient( $key );
	if ( $hits > 8 ) {
		wp_send_json_error( array( 'message' => 'Too many requests.' ), 429 );
	}
	set_transient( $key, $hits + 1, HOUR_IN_SECONDS );

	$type    = isset( $_POST['type'] ) ? sanitize_key( wp_unslash( $_POST['type'] ) ) : 'quote';
	$fields  = array( 'name', 'phone', 'email', 'service', 'timeline', 'message' );
	$data    = array();
	foreach ( $fields as $f ) {
		$data[ $f ] = isset( $_POST[ $f ] ) ? sanitize_textarea_field( wp_unslash( $_POST[ $f ] ) ) : '';
	}
	if ( '' === $data['name'] ) {
		wp_send_json_error( array( 'message' => 'Name required.' ), 400 );
	}

	$to      = apply_filters( 'trinity_form_recipient', get_option( 'trinity_form_recipient', get_option( 'admin_email' ) ) );
	$subject = sprintf( '[%s] New %s enquiry from %s', wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ), $type, $data['name'] );
	$lines   = array();
	foreach ( $data as $k => $v ) {
		if ( '' !== $v ) {
			$lines[] = ucfirst( $k ) . ': ' . $v;
		}
	}
	$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
	if ( is_email( $data['email'] ) ) {
		$headers[] = 'Reply-To: ' . $data['name'] . ' <' . $data['email'] . '>';
	}
	wp_mail( $to, $subject, implode( "\n", $lines ), $headers );
	wp_send_json_success();
}
add_action( 'wp_ajax_trinity_form', 'trinity_handle_form' );
add_action( 'wp_ajax_nopriv_trinity_form', 'trinity_handle_form' );
