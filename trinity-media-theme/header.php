<?php
/**
 * Header. The visible header is an Elementor document (Elementor Pro Theme Builder, XPRO Theme Builder or
 * the "Trinity – Header" library template). XPRO replaces this file entirely when it has a header rule.
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php
if ( ! function_exists( 'elementor_theme_do_location' ) || ! elementor_theme_do_location( 'header' ) ) {
	trinity_fallback_header();
}
?>
<div id="content" class="site-content">
