<?php get_header(); ?>

<main class="site-main">
	<div class="trinity-container">
		<div class="error-404-content">
			<h1 class="error-title">404</h1>
			<h2>Page Not Found</h2>
			<p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="cta-button">GO TO HOMEPAGE</a>
		</div>
	</div>
</main>

<?php get_footer(); ?>
