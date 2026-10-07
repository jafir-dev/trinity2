<?php
/**
 * Template helpers used by the dynamic (non-Elementor) templates: blog index, single post, 404.
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** "5 min read" – stored by the importer, otherwise estimated. */
function trinity_read_time( $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$saved   = get_post_meta( $post_id, '_trinity_read_time', true );
	if ( $saved ) {
		return $saved;
	}
	$words = str_word_count( wp_strip_all_tags( get_post_field( 'post_content', $post_id ) ) );
	return max( 1, (int) ceil( $words / 200 ) ) . ' min read';
}

function trinity_post_category_name( $post_id = 0 ) {
	$cats = get_the_category( $post_id ? $post_id : get_the_ID() );
	return $cats ? $cats[0]->name : '';
}

function trinity_post_image_url( $size = 'large', $post_id = 0 ) {
	$post_id = $post_id ? $post_id : get_the_ID();
	$url     = get_the_post_thumbnail_url( $post_id, $size );
	return $url ? $url : TRINITY_URI . '/assets/images/hero/banners/imag5.jpg';
}

function trinity_tag_chips( $post_id, $limit, $cls ) {
	$tags = get_the_tags( $post_id );
	if ( ! $tags ) {
		return;
	}
	foreach ( array_slice( $tags, 0, $limit ) as $tag ) {
		echo '<span class="' . esc_attr( $cls ) . '">' . trinity_icon( 'tag' ) . esc_html( $tag->name ) . '</span>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
