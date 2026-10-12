<?php
/**
 * 404 – matches the React NotFound page.
 *
 * @package trinity-media
 */

get_header();

$links = array(
	array( 'url' => home_url( '/' ), 'label' => 'Home', 'icon' => 'home', 'desc' => 'Back to the main page' ),
	array( 'url' => home_url( '/#services' ), 'label' => 'Our Services', 'icon' => 'briefcase', 'desc' => 'Explore what we offer' ),
	array( 'url' => home_url( '/blog/' ), 'label' => 'Blog & Insights', 'icon' => 'book-open', 'desc' => 'Read our latest articles' ),
	array( 'url' => home_url( '/contact/' ), 'label' => 'Contact Us', 'icon' => 'mail', 'desc' => 'Get in touch with us' ),
);
?>
<main id="primary" class="site-main tm-main tm-404">
	<div class="tm-404__orb tm-404__orb--a"></div>
	<div class="tm-404__orb tm-404__orb--b"></div>
	<div class="tm-404__inner">
		<div class="tm-404__num" aria-hidden="true"><span>404</span><span class="tm-404__ghost">404</span></div>
		<div class="tm-404__body">
			<div class="tm-pill"><span>Page Not Found</span></div>
			<h1 class="tm-404__title">Oops! This Page<br><span>Does Not Exist</span></h1>
			<p class="tm-404__text">The page you are looking for may have been moved, renamed, or deleted. Let us get you back on track.</p>
			<div class="tm-404__cta">
				<a class="tm-btn tm-btn--primary tm-btn--xl" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php echo trinity_icon( 'home' ); // phpcs:ignore ?>Back to Home</a>
				<a class="tm-btn tm-btn--card tm-btn--xl" href="https://wa.me/971526935456" target="_blank" rel="noreferrer"><?php echo trinity_icon( 'phone' ); // phpcs:ignore ?>WhatsApp Us</a>
			</div>
			<p class="tm-404__or">Or explore these pages:</p>
			<div class="tm-404__links">
				<?php foreach ( $links as $l ) : ?>
					<a class="tm-404__link" href="<?php echo esc_url( $l['url'] ); ?>">
						<span class="tm-404__link-ico"><?php echo trinity_icon( $l['icon'] ); // phpcs:ignore ?></span>
						<span class="tm-404__link-txt"><strong><?php echo esc_html( $l['label'] ); ?></strong><small><?php echo esc_html( $l['desc'] ); ?></small></span>
						<?php echo trinity_icon( 'arrow-right' ); // phpcs:ignore ?>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
</main>
<?php
get_footer();
