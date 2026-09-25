<?php get_header(); ?>

<main class="site-main">
	<?php
	while ( have_posts() ) :
		the_post();
		?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<div class="trinity-container">
				<div class="page-content">
					<?php the_content(); ?>
				</div>
			</div>
		</article>

		<?php
	endwhile;
	?>
</main>

<?php get_footer(); ?>
