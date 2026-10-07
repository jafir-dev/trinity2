<?php
/**
 * Pages – full-width canvas. Content is the Elementor document.
 *
 * @package trinity-media
 */

get_header();
?>
<main id="primary" class="site-main tm-main">
	<?php
	while ( have_posts() ) :
		the_post();
		if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'single' ) ) {
			the_content();
		}
	endwhile;
	?>
</main>
<?php
get_footer();
