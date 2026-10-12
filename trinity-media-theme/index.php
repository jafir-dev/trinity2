<?php
/**
 * Fallback template.
 *
 * @package trinity-media
 */

get_header();
?>
<main id="primary" class="site-main tm-main tm-fallback">
	<div class="tm-wrap">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<article <?php post_class( 'tm-fallback__item' ); ?>>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<div><?php the_excerpt(); ?></div>
				</article>
			<?php endwhile; ?>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'Nothing found.', 'trinity-media' ); ?></p>
		<?php endif; ?>
	</div>
</main>
<?php
get_footer();
