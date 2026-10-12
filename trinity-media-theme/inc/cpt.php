<?php
/**
 * Custom post type: Services (the 19 specialised services, URL /services/<slug>/).
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function trinity_register_cpt() {
	register_post_type(
		'service',
		array(
			'labels'       => array(
				'name'          => __( 'Services', 'trinity-media' ),
				'singular_name' => __( 'Service', 'trinity-media' ),
				'add_new_item'  => __( 'Add New Service', 'trinity-media' ),
				'edit_item'     => __( 'Edit Service', 'trinity-media' ),
			),
			'public'       => true,
			'has_archive'  => false,
			'show_in_rest' => true,
			'menu_icon'    => 'dashicons-hammer',
			'menu_position' => 21,
			'rewrite'      => array( 'slug' => 'services', 'with_front' => false ),
			'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes', 'revisions', 'custom-fields' ),
		)
	);
}
add_action( 'init', 'trinity_register_cpt' );

/** Make Elementor available on the Service post type. */
function trinity_elementor_cpt_support( $value ) {
	$value = is_array( $value ) ? $value : array( 'page', 'post' );
	if ( ! in_array( 'service', $value, true ) ) {
		$value[] = 'service';
	}
	return $value;
}
add_filter( 'option_elementor_cpt_support', 'trinity_elementor_cpt_support' );
