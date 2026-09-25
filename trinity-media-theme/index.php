<?php get_header(); ?>

<main class="site-main">
	<div class="trinity-container">
		<header class="archive-header">
			<h1 class="archive-title"><?php the_archive_title(); ?></h1>
			<?php if ( get_the_archive_description() ) : ?>
			<div class="archive-description"><?php the_archive_description(); ?></div>
			<?php endif; ?>
		</header>

		<?php if ( have_posts() ) : ?>
		<div class="archive-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article id="post-<?php the_ID(); ?>" <?php post_class( 'archive-item' ); ?>>
					<?php if ( has_post_thumbnail() ) : ?>
					<a href="<?php the_permalink(); ?>" class="item-thumbnail">
						<?php the_post_thumbnail( 'medium_large' ); ?>
					</a>
					<?php endif; ?>

					<div class="item-content">
						<h2 class="item-title">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</h2>
						<div class="item-excerpt">
							<?php the_excerpt(); ?>
						</div>
						<a href="<?php the_permalink(); ?>" class="read-more-link">Read More</a>
					</div>
				</article>
				<?php
			endwhile;
			?>
		</div>

		<?php
		the_posts_pagination(
			array(
				'mid_size'  => 2,
				'prev_text' => '&laquo; Previous',
				'next_text' => 'Next &raquo;',
			)
		);
		?>

		<?php else : ?>
		<div class="no-results">
			<h2>Nothing Found</h2>
			<p>Sorry, no posts matched your criteria.</p>
		</div>
		<?php endif; ?>
	</div>
</main>

<?php get_footer(); ?>
