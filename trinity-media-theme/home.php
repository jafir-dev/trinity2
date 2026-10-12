<?php
/**
 * Blog & Insights index (posts page). Mirrors BlogPage.tsx.
 *
 * @package trinity-media
 */

get_header();

$cats     = get_categories( array( 'hide_empty' => true, 'orderby' => 'name' ) );
$sticky   = get_option( 'sticky_posts' );
$featured = null;
$posts    = array();
global $wp_query;
foreach ( $wp_query->posts as $p ) {
	$posts[] = $p;
}
if ( ! empty( $sticky ) && is_home() ) {
	foreach ( $posts as $p ) {
		if ( in_array( $p->ID, $sticky, true ) ) {
			$featured = $p;
			break;
		}
	}
}
if ( ! $featured && is_home() && $posts ) {
	$featured = $posts[0];
}
?>
<main id="primary" class="site-main tm-main tm-blog">
	<section class="tm-blog-hero">
		<div class="tm-blog-hero__orb"></div>
		<div class="tm-wrap tm-blog-hero__inner">
			<div class="tm-pill"><?php echo trinity_icon( 'rss' ); // phpcs:ignore ?><span>Insights &amp; Resources</span></div>
			<h1 class="tm-blog-hero__title"><?php echo is_search() ? esc_html( sprintf( 'Search: %s', get_search_query() ) ) : ( is_archive() ? wp_kses_post( get_the_archive_title() ) : 'BLOG &amp; <span>INSIGHTS</span>' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></h1>
			<p class="tm-blog-hero__lead">Expert articles on exhibition design, large format printing, signage, fabrication, and visual branding from Trinity Media's production floor in Dubai.</p>
			<form class="tm-blog-search" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<?php echo trinity_icon( 'search' ); // phpcs:ignore ?>
				<input type="search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="Search articles, topics, tags..." data-tm-blog-search />
				<input type="hidden" name="post_type" value="post" />
			</form>
		</div>
	</section>

	<section class="tm-blog-cats">
		<div class="tm-wrap">
			<div class="tm-blog-cats__row">
				<button type="button" class="tm-chip is-active" data-tm-cat="all">All</button>
				<?php foreach ( $cats as $c ) : ?>
					<button type="button" class="tm-chip" data-tm-cat="<?php echo esc_attr( $c->slug ); ?>"><?php echo esc_html( $c->name ); ?></button>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<div class="tm-wrap tm-blog-body">
		<?php if ( $featured ) : ?>
			<div class="tm-blog-featured" data-tm-featured>
				<div class="tm-eyebrow-row"><?php echo trinity_icon( 'sparkles' ); // phpcs:ignore ?><span>Featured Article</span></div>
				<a class="tm-feature" href="<?php echo esc_url( get_permalink( $featured ) ); ?>">
					<div class="tm-feature__media">
						<img src="<?php echo esc_url( trinity_post_image_url( 'large', $featured->ID ) ); ?>" alt="<?php echo esc_attr( get_the_title( $featured ) ); ?>" loading="lazy" />
						<span class="tm-feature__fade"></span>
						<span class="tm-feature__cat"><?php echo esc_html( trinity_post_category_name( $featured->ID ) ); ?></span>
					</div>
					<div class="tm-feature__body">
						<div class="tm-meta"><span><?php echo trinity_icon( 'clock' ); // phpcs:ignore ?><?php echo esc_html( trinity_read_time( $featured->ID ) ); ?></span><span><?php echo esc_html( get_the_date( 'F j, Y', $featured ) ); ?></span></div>
						<h2><?php echo esc_html( get_the_title( $featured ) ); ?></h2>
						<p><?php echo esc_html( get_the_excerpt( $featured ) ); ?></p>
						<div class="tm-tags"><?php trinity_tag_chips( $featured->ID, 3, 'tm-tag' ); ?></div>
						<span class="tm-readmore">Read Full Article <?php echo trinity_icon( 'arrow-right' ); // phpcs:ignore ?></span>
					</div>
				</a>
			</div>
		<?php endif; ?>

		<div class="tm-blog-grid-wrap">
			<div class="tm-blog-grid-head">
				<div class="tm-eyebrow-row"><?php echo trinity_icon( 'book-open' ); // phpcs:ignore ?><span data-tm-grid-label><?php echo $featured ? 'More Articles' : 'Articles'; ?></span></div>
				<span class="tm-count" data-tm-count></span>
			</div>
			<div class="tm-blog-grid" data-tm-grid>
				<?php
				foreach ( $posts as $p ) :
					$is_feat   = $featured && $p->ID === $featured->ID;
					$cat_slugs = wp_list_pluck( (array) get_the_category( $p->ID ), 'slug' );
					$tag_names = wp_list_pluck( (array) get_the_tags( $p->ID ), 'name' );
					?>
					<a class="tm-card-post<?php echo $is_feat ? ' is-featured' : ''; ?>" href="<?php echo esc_url( get_permalink( $p ) ); ?>" data-cats="<?php echo esc_attr( implode( ' ', $cat_slugs ) ); ?>" data-search="<?php echo esc_attr( strtolower( get_the_title( $p ) . ' ' . get_the_excerpt( $p ) . ' ' . implode( ' ', $tag_names ) ) ); ?>">
						<div class="tm-card-post__media">
							<img src="<?php echo esc_url( trinity_post_image_url( 'trinity-card', $p->ID ) ); ?>" alt="<?php echo esc_attr( get_the_title( $p ) ); ?>" loading="lazy" />
							<span class="tm-card-post__shade"></span>
							<span class="tm-card-post__cat"><?php echo esc_html( trinity_post_category_name( $p->ID ) ); ?></span>
						</div>
						<div class="tm-card-post__body">
							<div class="tm-meta tm-meta--sm"><span><?php echo trinity_icon( 'clock' ); // phpcs:ignore ?><?php echo esc_html( trinity_read_time( $p->ID ) ); ?></span><span><?php echo esc_html( get_the_date( 'F j, Y', $p ) ); ?></span></div>
							<h3><?php echo esc_html( get_the_title( $p ) ); ?></h3>
							<p><?php echo esc_html( get_the_excerpt( $p ) ); ?></p>
							<div class="tm-tags tm-tags--sm"><?php trinity_tag_chips( $p->ID, 2, 'tm-tag tm-tag--sm' ); ?></div>
							<span class="tm-readmore tm-readmore--sm">Read More <?php echo trinity_icon( 'arrow-right' ); // phpcs:ignore ?></span>
						</div>
					</a>
				<?php endforeach; ?>
			</div>
			<div class="tm-blog-empty" data-tm-empty hidden>
				<?php echo trinity_icon( 'search' ); // phpcs:ignore ?>
				<p>No articles found</p>
				<button type="button" data-tm-clear>Clear search</button>
			</div>
			<?php the_posts_pagination(); ?>
		</div>

		<div class="tm-newsletter">
			<div class="tm-newsletter__orb"></div>
			<div class="tm-newsletter__inner">
				<div class="tm-pill"><?php echo trinity_icon( 'rss' ); // phpcs:ignore ?><span>Stay Updated</span></div>
				<h2>Get Expert Insights<br><span>Delivered to You</span></h2>
				<p>Subscribe to receive the latest articles on printing, fabrication, signage, and branding from Trinity Media's team of specialists.</p>
				<form class="tm-newsletter__form" data-tm-newsletter>
					<input type="email" placeholder="your@email.com" required />
					<button type="submit">Subscribe</button>
				</form>
			</div>
		</div>
	</div>
</main>
<?php
get_footer();
