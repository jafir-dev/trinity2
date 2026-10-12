<?php
/**
 * Single Service – content is an Elementor document (one per service, cloned from the same structure).
 *
 * @package trinity-media
 */

get_header();
?>
<main id="primary" class="site-main tm-main">
	<?php
	while ( have_posts() ) :
		the_post();
		the_content();
	endwhile;
	?>
</main>
<?php
get_footer();
