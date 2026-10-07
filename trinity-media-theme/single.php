<?php
/**
 * Single blog post. Mirrors BlogPostPage.tsx.
 *
 * @package trinity-media
 */

get_header();

while ( have_posts() ) :
	the_post();
	$cat     = trinity_post_category_name();
	$related = get_posts(
		array(
			'post_type'      => 'post',
			'posts_per_page' => 2,
			'post__not_in'   => array( get_the_ID() ),
			'category__in'   => wp_list_pluck( (array) get_the_category(), 'term_id' ),
		)
	);
	if ( count( $related ) < 2 ) {
		$extra   = get_posts(
			array(
				'post_type'      => 'post',
				'posts_per_page' => 2 - count( $related ),
				'post__not_in'   => array_merge( array( get_the_ID() ), wp_list_pluck( $related, 'ID' ) ),
			)
		);
		$related = array_merge( $related, $extra );
	}
	$blog_url = get_option( 'page_for_posts' ) ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( '/' );
	?>
<main id="primary" class="site-main tm-main tm-single">
	<section class="tm-single-hero">
		<div class="tm-single-hero__media">
			<img src="<?php echo esc_url( trinity_post_image_url( 'trinity-wide' ) ); ?>" alt="<?php the_title_attribute(); ?>" />
			<span class="tm-single-hero__fade-a"></span>
			<span class="tm-single-hero__fade-b"></span>
		</div>
	</section>

	<article <?php post_class( 'tm-single-article' ); ?>>
		<div class="tm-single-wrap">
			<div class="tm-breadcrumb tm-breadcrumb--post">
				<a href="<?php echo esc_url( $blog_url ); ?>">Blog</a>
				<span class="tm-dot">•</span>
				<span class="is-current"><?php echo esc_html( $cat ); ?></span>
			</div>
			<div class="tm-single-meta">
				<span class="tm-single-meta__cat"><?php echo esc_html( $cat ); ?></span>
				<span><?php echo trinity_icon( 'calendar' ); // phpcs:ignore ?><?php echo esc_html( get_the_date( 'F j, Y' ) ); ?></span>
				<span><?php echo trinity_icon( 'clock' ); // phpcs:ignore ?><?php echo esc_html( trinity_read_time() ); ?></span>
			</div>
			<h1 class="tm-single-title"><?php the_title(); ?></h1>
			<p class="tm-single-lead"><?php echo esc_html( get_the_excerpt() ); ?></p>
			<div class="tm-prose"><?php the_content(); ?></div>

			<div class="tm-single-tags">
				<span class="tm-single-tags__label"><?php echo trinity_icon( 'tag' ); // phpcs:ignore ?> Tags:</span>
				<?php
				$tags = get_the_tags();
				if ( $tags ) {
					foreach ( $tags as $t ) {
						echo '<span class="tm-single-tag">' . esc_html( $t->name ) . '</span>';
					}
				}
				?>
			</div>

			<div class="tm-single-cta">
				<div>
					<p class="tm-single-cta__title">Need Help With Your Project?</p>
					<p class="tm-single-cta__text">Our team is ready to bring your vision to life.</p>
				</div>
				<div class="tm-single-cta__btns">
					<a class="tm-btn tm-btn--primary tm-btn--sm" href="https://wa.me/971526935456" target="_blank" rel="noreferrer"><?php echo trinity_icon( 'message-circle' ); // phpcs:ignore ?> WhatsApp Us</a>
					<button type="button" class="tm-btn tm-btn--card tm-btn--sm" data-tm-share data-title="<?php the_title_attribute(); ?>"><?php echo trinity_icon( 'share-2' ); // phpcs:ignore ?> Share</button>
				</div>
			</div>

			<div class="tm-single-back"><a href="<?php echo esc_url( $blog_url ); ?>"><?php echo trinity_icon( 'arrow-left' ); // phpcs:ignore ?> Back to All Articles</a></div>
		</div>
	</article>

	<?php if ( $related ) : ?>
		<section class="tm-related">
			<div class="tm-wrap">
				<div class="tm-related__eyebrow">Continue Reading</div>
				<h2 class="tm-related__title">Related Articles</h2>
				<div class="tm-related__grid">
					<?php foreach ( $related as $p ) : ?>
						<a class="tm-related__card" href="<?php echo esc_url( get_permalink( $p ) ); ?>">
							<div class="tm-related__thumb"><img src="<?php echo esc_url( trinity_post_image_url( 'trinity-card', $p->ID ) ); ?>" alt="<?php echo esc_attr( get_the_title( $p ) ); ?>" loading="lazy" /></div>
							<div class="tm-related__txt">
								<span class="tm-related__cat"><?php echo esc_html( trinity_post_category_name( $p->ID ) ); ?></span>
								<h3><?php echo esc_html( get_the_title( $p ) ); ?></h3>
								<span class="tm-related__time"><?php echo trinity_icon( 'clock' ); // phpcs:ignore ?><?php echo esc_html( trinity_read_time( $p->ID ) ); ?></span>
							</div>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>
</main>
	<?php
endwhile;

get_footer();
