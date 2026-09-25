<?php get_header(); ?>

<main class="site-main">
	<?php
	while ( have_posts() ) :
		the_post();
		?>

		<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post' ); ?>>
			<div class="trinity-container">
				<header class="entry-header">
					<h1 class="entry-title"><?php the_title(); ?></h1>
					<div class="entry-meta">
						<span class="posted-on"><?php echo get_the_date(); ?></span>
						<span class="author">by <?php the_author(); ?></span>
					</div>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
				<div class="entry-thumbnail">
					<?php the_post_thumbnail( 'large' ); ?>
				</div>
				<?php endif; ?>

				<div class="entry-content">
					<?php the_content(); ?>
				</div>
			</div>
		</article>

		<?php
	endwhile;
	?>
</main>

<?php get_footer(); ?>
