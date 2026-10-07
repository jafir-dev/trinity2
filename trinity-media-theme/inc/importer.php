<?php
/**
 * Demo importer.
 *
 * Reads demo/manifest.json (generated from the original React site by wp-build/) and creates:
 *   - Elementor Kit: Global Colors + Global Fonts + container width + breakpoints
 *   - Library templates (Header, Footer, Mega Menu, Registration Popup, reusable components)
 *   - Header + Footer in the right system:  Elementor Pro Theme Builder  ->  XPRO Theme Builder  ->  library
 *   - All pages, the 19 services, blog posts + categories + tags
 *   - Menus (primary / footer), static front page, posts page, permalinks
 *
 * Run from  Appearance -> Trinity Demo Import,  automatically on theme activation,
 * or:  wp trinity import [--force]
 *
 * Everything is idempotent: content is matched by slug / stored key and updated, never duplicated.
 *
 * @package trinity-media
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ------------------------------------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------------------------------------- */

function trinity_import_json( $relative ) {
	$file = TRINITY_DIR . '/demo/' . ltrim( $relative, '/' );
	if ( ! file_exists( $file ) ) {
		return null;
	}
	$raw = file_get_contents( $file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	return json_decode( $raw, true );
}

/** Replace {{theme}} / {{home}} / {{tpl:key}} placeholders inside the encoded JSON string. */
function trinity_import_tokens( $data, $ids, $extra = array() ) {
	$json = wp_json_encode( $data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
	$map  = array(
		'{{theme}}' => untrailingslashit( TRINITY_URI ),
		'{{home}}'  => untrailingslashit( home_url() ),
	);
	foreach ( $ids as $key => $id ) {
		$map[ '{{id:' . $key . '}}' ] = (string) $id;
	}
	$map  = array_merge( $map, $extra );
	$json = strtr( $json, $map );
	return json_decode( $json, true );
}

function trinity_hf_mode() {
	if ( defined( 'ELEMENTOR_PRO_VERSION' ) ) {
		return 'pro';
	}
	if ( defined( 'XPRO_THEME_BUILDER_VER' ) ) {
		return 'xpro';
	}
	return 'library';
}

function trinity_find_post_by_key( $key, $post_type = 'any' ) {
	$q = get_posts(
		array(
			'post_type'      => $post_type,
			'post_status'    => array( 'publish', 'draft', 'private' ),
			'meta_key'       => '_trinity_demo_key', // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			'meta_value'     => $key, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);
	return $q ? (int) $q[0] : 0;
}

function trinity_save_elementor_data( $post_id, $elements, $template_type, $page_settings = array() ) {
	update_post_meta( $post_id, '_elementor_data', wp_slash( wp_json_encode( $elements ) ) );
	update_post_meta( $post_id, '_elementor_edit_mode', 'builder' );
	update_post_meta( $post_id, '_elementor_template_type', $template_type );
	update_post_meta( $post_id, '_elementor_version', defined( 'ELEMENTOR_VERSION' ) ? ELEMENTOR_VERSION : '3.0.0' );
	if ( ! get_post_meta( $post_id, '_wp_page_template', true ) ) {
		update_post_meta( $post_id, '_wp_page_template', 'default' );
	}
	if ( ! empty( $page_settings ) ) {
		update_post_meta( $post_id, '_elementor_page_settings', $page_settings );
	}
	delete_post_meta( $post_id, '_elementor_css' );
}

/** Copy a theme image into the Media Library once and return the attachment id. */
function trinity_sideload( $relative ) {
	$src = TRINITY_DIR . '/assets/images/' . ltrim( $relative, '/' );
	if ( ! file_exists( $src ) ) {
		return 0;
	}
	$existing = get_posts(
		array(
			'post_type'      => 'attachment',
			'post_status'    => 'inherit',
			'meta_key'       => '_trinity_src', // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			'meta_value'     => $relative, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
			'posts_per_page' => 1,
			'fields'         => 'ids',
		)
	);
	if ( $existing ) {
		return (int) $existing[0];
	}
	require_once ABSPATH . 'wp-admin/includes/image.php';
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';

	$upload = wp_upload_bits( wp_basename( $src ), null, file_get_contents( $src ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	if ( ! empty( $upload['error'] ) ) {
		return 0;
	}
	$filetype = wp_check_filetype( $upload['file'] );
	$att_id   = wp_insert_attachment(
		array(
			'post_mime_type' => $filetype['type'],
			'post_title'     => sanitize_file_name( pathinfo( $src, PATHINFO_FILENAME ) ),
			'post_content'   => '',
			'post_status'    => 'inherit',
		),
		$upload['file']
	);
	if ( is_wp_error( $att_id ) || ! $att_id ) {
		return 0;
	}
	wp_update_attachment_metadata( $att_id, wp_generate_attachment_metadata( $att_id, $upload['file'] ) );
	update_post_meta( $att_id, '_trinity_src', $relative );
	return (int) $att_id;
}

/* ------------------------------------------------------------------------------------------------
 * 1. Elementor Kit (global colours / fonts / layout)
 * ---------------------------------------------------------------------------------------------- */

function trinity_import_kit( $kit_settings ) {
	if ( ! class_exists( '\Elementor\Plugin' ) ) {
		return;
	}
	$kits_manager = \Elementor\Plugin::$instance->kits_manager;
	$kit_id       = (int) $kits_manager->get_active_id();
	if ( ! $kit_id ) {
		$kit_id = (int) get_option( \Elementor\Core\Kits\Manager::OPTION_ACTIVE );
	}
	if ( ! $kit_id ) {
		$kit    = \Elementor\Core\Kits\Documents\Kit::create( array( 'post_title' => 'Trinity Media Kit', 'post_status' => 'publish' ) ); // phpcs:ignore
		$kit_id = $kit_id ? $kit_id : ( is_object( $kit ) && method_exists( $kit, 'get_main_id' ) ? $kit->get_main_id() : 0 );
		if ( $kit_id ) {
			update_option( \Elementor\Core\Kits\Manager::OPTION_ACTIVE, $kit_id );
		}
	}
	if ( ! $kit_id ) {
		return;
	}
	// Replace (not merge) so a re-import always lands on the exact design system shipped with the theme.
	update_post_meta( $kit_id, '_elementor_page_settings', $kit_settings );
	update_post_meta( $kit_id, '_elementor_edit_mode', 'builder' );
	update_post_meta( $kit_id, '_elementor_template_type', 'kit' );
	delete_post_meta( $kit_id, '_elementor_css' );
	wp_update_post( array( 'ID' => $kit_id, 'post_title' => 'Trinity Media – Global Design System' ) );
}

/* ------------------------------------------------------------------------------------------------
 * 2. Library templates + Header / Footer
 * ---------------------------------------------------------------------------------------------- */

function trinity_import_library_post( $def ) {
	$key      = 'lib:' . $def['key'];
	$post_id  = trinity_find_post_by_key( $key, 'any' );
	$hf_mode  = trinity_hf_mode();
	$type     = $def['type'];
	$post_type = 'elementor_library';

	if ( 'header' === $type || 'footer' === $type ) {
		if ( 'xpro' === $hf_mode ) {
			$post_type = 'xpro-themer';
		}
	}

	$args = array(
		'post_type'   => $post_type,
		'post_title'  => $def['title'],
		'post_status' => 'publish',
		'post_name'   => sanitize_title( $def['slug'] ?? $def['key'] ),
	);
	if ( $post_id ) {
		$args['ID'] = $post_id;
		wp_update_post( $args );
	} else {
		$post_id = wp_insert_post( $args );
		update_post_meta( $post_id, '_trinity_demo_key', $key );
	}
	return array( (int) $post_id, $post_type );
}

function trinity_finish_library_post( $post_id, $post_type, $def, $elements ) {
	$type = $def['type'];

	if ( 'xpro-themer' === $post_type ) {
		trinity_save_elementor_data( $post_id, $elements, 'xpro-themer' );
		update_post_meta( $post_id, 'xpro_theme_builder_template_type', 'header' === $type ? 'type_header' : 'type_footer' );
		update_post_meta( $post_id, 'xpro_theme_builder_sticky', '' ); // header is position:fixed by theme CSS.
		update_post_meta(
			$post_id,
			'xpro_theme_builder_target_include_locations',
			array(
				'rule'     => array( 'basic-global' ),
				'specific' => array(),
			)
		);
		update_post_meta( $post_id, 'xpro_theme_builder_target_exclude_locations', array() );
		update_post_meta( $post_id, 'xpro_theme_builder_target_user_roles', array() );
		return;
	}

	$elementor_type = in_array( $type, array( 'header', 'footer' ), true ) ? $type : 'container';
	if ( 'header' === $type || 'footer' === $type ) {
		if ( 'pro' !== trinity_hf_mode() ) {
			$elementor_type = 'container'; // free: reusable container template, rendered by header.php / footer.php fallbacks.
		}
	}
	trinity_save_elementor_data( $post_id, $elements, $elementor_type );
	wp_set_object_terms( $post_id, $elementor_type, 'elementor_library_type' );

	if ( 'pro' === trinity_hf_mode() && in_array( $type, array( 'header', 'footer' ), true ) ) {
		update_post_meta( $post_id, '_elementor_conditions', array( 'include/general' ) );
	}
}

/* ------------------------------------------------------------------------------------------------
 * 3. Menus
 * ---------------------------------------------------------------------------------------------- */

function trinity_import_menu( $slug, $def, $refs ) {
	$menu = wp_get_nav_menu_object( $def['name'] );
	if ( $menu ) {
		$menu_id = (int) $menu->term_id;
		$old     = wp_get_nav_menu_items( $menu_id );
		if ( $old ) {
			foreach ( $old as $item ) {
				wp_delete_post( $item->ID, true );
			}
		}
	} else {
		$menu_id = wp_create_nav_menu( $def['name'] );
		if ( is_wp_error( $menu_id ) ) {
			return 0;
		}
	}

	$add = function ( $items, $parent_id ) use ( &$add, $menu_id, $refs ) {
		foreach ( $items as $it ) {
			$args = array(
				'menu-item-title'     => $it['title'],
				'menu-item-status'    => 'publish',
				'menu-item-parent-id' => $parent_id,
				'menu-item-classes'   => isset( $it['classes'] ) ? $it['classes'] : '',
			);
			if ( isset( $it['ref'] ) && isset( $refs[ $it['ref'] ] ) ) {
				$ref                       = $refs[ $it['ref'] ];
				$args['menu-item-type']    = 'post_type';
				$args['menu-item-object']  = $ref['type'];
				$args['menu-item-object-id'] = $ref['id'];
			} else {
				$url = isset( $it['url'] ) ? str_replace( '{{home}}', untrailingslashit( home_url() ), $it['url'] ) : '#';
				$args['menu-item-type'] = 'custom';
				$args['menu-item-url']  = $url;
			}
			$item_id = wp_update_nav_menu_item( $menu_id, 0, $args );
			if ( ! is_wp_error( $item_id ) && ! empty( $it['children'] ) ) {
				$add( $it['children'], $item_id );
			}
		}
	};
	$add( $def['items'], 0 );
	return $menu_id;
}

/* ------------------------------------------------------------------------------------------------
 * Main
 * ---------------------------------------------------------------------------------------------- */

function trinity_run_import( $force = false ) {
	if ( ! function_exists( 'trinity_elementor_active' ) || ! trinity_elementor_active() ) {
		return new WP_Error( 'trinity_no_elementor', __( 'Elementor must be active before importing the demo.', 'trinity-media' ) );
	}
	$manifest = trinity_import_json( 'manifest.json' );
	if ( ! $manifest ) {
		return new WP_Error( 'trinity_no_manifest', __( 'demo/manifest.json is missing.', 'trinity-media' ) );
	}

	@set_time_limit( 600 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
	$log = array();
	$ids = array();

	// -- permalinks first so rewrite works for the CPT.
	update_option( 'permalink_structure', '/%postname%/' );
	trinity_register_cpt();

	// -- kit.
	trinity_import_kit( $manifest['kit'] );
	$log[] = 'Global design system (colours, fonts, container width, breakpoints) applied.';

	// -- logo.
	$logo_id = trinity_sideload( 'logo/trinity-logo-original.png' );
	if ( $logo_id ) {
		set_theme_mod( 'custom_logo', $logo_id );
	}

	// -- pass 1: create shells so cross-references ({{id:key}}) resolve.
	$lib_defs = array();
	foreach ( $manifest['library'] as $def ) {
		list( $pid, $ptype ) = trinity_import_library_post( $def );
		$ids[ $def['key'] ]  = $pid;
		$lib_defs[]          = array( $def, $pid, $ptype );
	}
	$page_ids = array();
	foreach ( $manifest['pages'] as $def ) {
		$key = 'page:' . $def['key'];
		$pid = trinity_find_post_by_key( $key, 'page' );
		$arr = array(
			'post_type'   => 'page',
			'post_title'  => $def['title'],
			'post_name'   => $def['slug'],
			'post_status' => 'publish',
			'menu_order'  => isset( $def['order'] ) ? $def['order'] : 0,
		);
		if ( $pid ) {
			$arr['ID'] = $pid;
			wp_update_post( $arr );
		} else {
			$pid = wp_insert_post( $arr );
			update_post_meta( $pid, '_trinity_demo_key', $key );
		}
		$page_ids[ $def['key'] ] = (int) $pid;
		$ids[ 'page_' . $def['key'] ] = (int) $pid;
	}
	$service_ids = array();
	foreach ( $manifest['services'] as $def ) {
		$key = 'service:' . $def['slug'];
		$pid = trinity_find_post_by_key( $key, 'service' );
		$arr = array(
			'post_type'    => 'service',
			'post_title'   => $def['title'],
			'post_name'    => $def['slug'],
			'post_excerpt' => $def['excerpt'],
			'post_status'  => 'publish',
			'menu_order'   => (int) $def['num'],
		);
		if ( $pid ) {
			$arr['ID'] = $pid;
			wp_update_post( $arr );
		} else {
			$pid = wp_insert_post( $arr );
			update_post_meta( $pid, '_trinity_demo_key', $key );
		}
		$service_ids[ $def['slug'] ] = (int) $pid;
		$ids[ 'service_' . $def['slug'] ] = (int) $pid;
	}

	// -- menus.
	$refs = array();
	foreach ( $page_ids as $k => $id ) {
		$refs[ 'page:' . $k ] = array( 'type' => 'page', 'id' => $id );
	}
	foreach ( $service_ids as $k => $id ) {
		$refs[ 'service:' . $k ] = array( 'type' => 'service', 'id' => $id );
	}
	$locations = array();
	foreach ( $manifest['menus'] as $loc => $def ) {
		$mid = trinity_import_menu( $loc, $def, $refs );
		if ( $mid ) {
			$locations[ $loc ] = $mid;
		}
	}
	set_theme_mod( 'nav_menu_locations', $locations );
	update_option( 'trinity_menu_ids', $locations );
	$extra = array();
	foreach ( $locations as $loc => $mid ) {
		$term = get_term( $mid, 'nav_menu' );
		$extra[ '{{menuid:' . $loc . '}}' ]   = (string) $mid;
		$extra[ '{{menuslug:' . $loc . '}}' ] = $term && ! is_wp_error( $term ) ? $term->slug : '';
	}
	$log[] = 'Menus created and assigned.';


	// -- pass 2: fill library templates.
	foreach ( $lib_defs as $row ) {
		list( $def, $pid, $ptype ) = $row;
		$file = 'pro' === trinity_hf_mode() && ! empty( $def['file_pro'] ) ? $def['file_pro'] : ( 'xpro' === $ptype && ! empty( $def['file_xpro'] ) ? $def['file_xpro'] : $def['file'] );
		$data = trinity_import_json( $file );
		if ( ! $data ) {
			$log[] = 'Skipped (missing JSON): ' . $def['title'];
			continue;
		}
		$data = trinity_import_tokens( $data, $ids, $extra );
		trinity_finish_library_post( $pid, $ptype, $def, $data );
		$log[] = 'Template saved: ' . $def['title'] . ' (#' . $pid . ', ' . $ptype . ')';
	}
	update_option( 'trinity_header_template_id', isset( $ids['header'] ) ? $ids['header'] : 0 );
	update_option( 'trinity_footer_template_id', isset( $ids['footer'] ) ? $ids['footer'] : 0 );
	update_option( 'trinity_popup_template_id', isset( $ids['popup'] ) ? $ids['popup'] : 0 );
	update_option( 'trinity_mega_template_id', isset( $ids['mega'] ) ? $ids['mega'] : 0 );

	// -- pages.
	foreach ( $manifest['pages'] as $def ) {
		$pid  = $page_ids[ $def['key'] ];
		if ( empty( $def['file'] ) ) {
			continue;
		}
		$data = trinity_import_json( $def['file'] );
		if ( ! $data ) {
			continue;
		}
		$data = trinity_import_tokens( $data, $ids, $extra );
		trinity_save_elementor_data( $pid, $data, 'wp-page' );
		update_post_meta( $pid, '_wp_page_template', 'default' );
		if ( ! empty( $def['seo_description'] ) ) {
			update_post_meta( $pid, '_trinity_meta_description', $def['seo_description'] );
		}
	}
	$log[] = count( $page_ids ) . ' pages built with Elementor containers.';

	// -- services.
	foreach ( $manifest['services'] as $def ) {
		$pid  = $service_ids[ $def['slug'] ];
		$data = trinity_import_json( $def['file'] );
		if ( ! $data ) {
			continue;
		}
		$data = trinity_import_tokens( $data, $ids, $extra );
		trinity_save_elementor_data( $pid, $data, 'wp-post' );
		if ( ! empty( $def['thumb'] ) ) {
			$att = trinity_sideload( $def['thumb'] );
			if ( $att ) {
				set_post_thumbnail( $pid, $att );
			}
		}
	}
	$log[] = count( $service_ids ) . ' services created (Services post type).';

	// -- blog.
	foreach ( $manifest['categories'] as $cat ) {
		if ( ! term_exists( $cat, 'category' ) ) {
			wp_insert_term( $cat, 'category' );
		}
	}
	foreach ( $manifest['posts'] as $p ) {
		$key = 'post:' . $p['slug'];
		$pid = trinity_find_post_by_key( $key, 'post' );
		$arr = array(
			'post_type'    => 'post',
			'post_title'   => $p['title'],
			'post_name'    => $p['slug'],
			'post_excerpt' => $p['excerpt'],
			'post_content' => $p['content'],
			'post_status'  => 'publish',
			'post_date'    => $p['date'],
		);
		if ( $pid ) {
			$arr['ID'] = $pid;
			wp_update_post( $arr );
		} else {
			$pid = wp_insert_post( $arr );
			update_post_meta( $pid, '_trinity_demo_key', $key );
		}
		$cat = get_term_by( 'name', $p['category'], 'category' );
		if ( $cat ) {
			wp_set_post_categories( $pid, array( (int) $cat->term_id ) );
		}
		wp_set_post_tags( $pid, $p['tags'] );
		update_post_meta( $pid, '_trinity_read_time', $p['read_time'] );
		if ( ! empty( $p['thumb'] ) ) {
			$att = trinity_sideload( $p['thumb'] );
			if ( $att ) {
				set_post_thumbnail( $pid, $att );
			}
		}
		if ( ! empty( $p['featured'] ) ) {
			stick_post( $pid );
		}
	}
	$log[] = count( $manifest['posts'] ) . ' blog posts created.';

	// -- reading settings and site identity.
	update_option( 'blogname', 'Trinity Media UAE' );
	update_option( 'blogdescription', 'Premium exhibition stands, event branding, custom fabrication and large format printing in Dubai' );
	update_option( 'show_on_front', 'page' );
	if ( isset( $page_ids['home'] ) ) {
		update_option( 'page_on_front', $page_ids['home'] );
	}
	if ( isset( $page_ids['blog'] ) ) {
		update_option( 'page_for_posts', $page_ids['blog'] );
	}
	update_option( 'trinity_form_recipient', 'inquiry@trinitymediauae.com' );
	update_option( 'elementor_cpt_support', array( 'page', 'post', 'service' ) );
	update_option( 'elementor_disable_color_schemes', 'yes' );
	update_option( 'elementor_disable_typography_schemes', 'yes' );
	update_option( 'elementor_page_title_selector', 'h1.entry-title' );
	update_option( 'trinity_demo_imported', TRINITY_VERSION );

	// -- caches.
	if ( class_exists( '\Elementor\Plugin' ) ) {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
	}
	flush_rewrite_rules();
	$log[] = 'Elementor CSS cache cleared, permalinks flushed.';
	$log[] = 'Header/footer mode: ' . trinity_hf_mode();

	return $log;
}

/** Remove everything the importer created (pages, services, posts, templates, menus). */
function trinity_reset_demo() {
	$posts = get_posts(
		array(
			'post_type'      => 'any',
			'post_status'    => 'any',
			'meta_key'       => '_trinity_demo_key', // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			'posts_per_page' => -1,
			'fields'         => 'ids',
		)
	);
	foreach ( $posts as $id ) {
		wp_delete_post( $id, true );
	}
	delete_option( 'trinity_demo_imported' );
	return count( $posts );
}

/* ------------------------------------------------------------------------------------------------
 * Admin UI + WP-CLI + auto-run on activation
 * ---------------------------------------------------------------------------------------------- */

function trinity_importer_menu() {
	add_theme_page( __( 'Trinity Demo Import', 'trinity-media' ), __( 'Trinity Demo Import', 'trinity-media' ), 'manage_options', 'trinity-demo-import', 'trinity_importer_screen' );
}
add_action( 'admin_menu', 'trinity_importer_menu' );

function trinity_importer_screen() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$result = null;
	if ( isset( $_POST['trinity_import'] ) && check_admin_referer( 'trinity_import' ) ) {
		$result = trinity_run_import( true );
	}
	if ( isset( $_POST['trinity_reset'] ) && check_admin_referer( 'trinity_import' ) ) {
		$n      = trinity_reset_demo();
		$result = array( sprintf( 'Removed %d demo items.', $n ) );
	}
	$mode = trinity_hf_mode();
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Trinity Media – Demo Import', 'trinity-media' ); ?></h1>
		<p><?php esc_html_e( 'Builds the complete Trinity Media website with native Elementor containers and widgets.', 'trinity-media' ); ?></p>
		<table class="widefat striped" style="max-width:720px">
			<tbody>
				<tr><td>Elementor</td><td><?php echo trinity_elementor_active() ? '<span style="color:#2e7d32">Active</span>' : '<span style="color:#c62828">Not active – install & activate Elementor first</span>'; // phpcs:ignore ?></td></tr>
				<tr><td>Elementor Pro</td><td><?php echo defined( 'ELEMENTOR_PRO_VERSION' ) ? 'Active – Theme Builder header/footer will be created' : 'Not installed'; ?></td></tr>
				<tr><td>XPRO Theme Builder</td><td><?php echo defined( 'XPRO_THEME_BUILDER_VER' ) ? 'Active' : 'Not installed'; ?></td></tr>
				<tr><td>Header / Footer mode</td><td><strong><?php echo esc_html( strtoupper( $mode ) ); ?></strong></td></tr>
				<tr><td>Imported</td><td><?php echo esc_html( get_option( 'trinity_demo_imported', 'no' ) ); ?></td></tr>
			</tbody>
		</table>
		<?php if ( is_array( $result ) ) : ?>
			<div class="notice notice-success"><ul><?php foreach ( $result as $line ) : ?><li><?php echo esc_html( $line ); ?></li><?php endforeach; ?></ul></div>
		<?php elseif ( is_wp_error( $result ) ) : ?>
			<div class="notice notice-error"><p><?php echo esc_html( $result->get_error_message() ); ?></p></div>
		<?php endif; ?>
		<form method="post" style="margin-top:16px">
			<?php wp_nonce_field( 'trinity_import' ); ?>
			<p>
				<button class="button button-primary button-hero" name="trinity_import" value="1"><?php esc_html_e( 'Import / Re-import Demo Content', 'trinity-media' ); ?></button>
				<button class="button" name="trinity_reset" value="1" onclick="return confirm('Delete everything the importer created?');"><?php esc_html_e( 'Remove Demo Content', 'trinity-media' ); ?></button>
			</p>
		</form>
	</div>
	<?php
}

/** Dev helper (not shipped): re-import automatically when demo/.dev-autoimport exists and manifest changed. */
function trinity_dev_autoimport() {
	$flag = TRINITY_DIR . '/demo/.dev-autoimport';
	$man  = TRINITY_DIR . '/demo/manifest.json';
	if ( ! file_exists( $flag ) || ! file_exists( $man ) ) {
		return;
	}
	$stamp = filemtime( $man ) . '-' . filesize( $man );
	if ( get_option( 'trinity_dev_stamp' ) === $stamp ) {
		return;
	}
	update_option( 'trinity_dev_stamp', $stamp );
	update_option( 'elementor_css_print_method', 'internal' ); // dev sandbox only (multi-worker FS).
	trinity_run_import( true );
}
add_action( 'wp_loaded', 'trinity_dev_autoimport' );

/** Auto-import once after the theme is activated (and Elementor is present). */
function trinity_maybe_auto_import() {
	if ( get_option( 'trinity_demo_imported' ) || ! get_option( 'trinity_run_import_on_load' ) ) {
		return;
	}
	if ( ! function_exists( 'trinity_elementor_active' ) || ! trinity_elementor_active() ) {
		return;
	}
	delete_option( 'trinity_run_import_on_load' );
	trinity_run_import();
}
add_action( 'admin_init', 'trinity_maybe_auto_import' );

function trinity_flag_import_on_activation() {
	if ( ! get_option( 'trinity_demo_imported' ) ) {
		update_option( 'trinity_run_import_on_load', 1 );
	}
}
add_action( 'after_switch_theme', 'trinity_flag_import_on_activation' );

function trinity_missing_elementor_notice() {
	if ( trinity_elementor_active() || ! current_user_can( 'install_plugins' ) ) {
		return;
	}
	echo '<div class="notice notice-warning"><p><strong>Trinity Media</strong> needs the <em>Elementor</em> plugin (and XPRO Theme Builder / XPRO Elementor Addons, or Elementor Pro) to display its pages.</p></div>';
}
add_action( 'admin_notices', 'trinity_missing_elementor_notice' );

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command(
		'trinity import',
		function ( $args, $assoc ) {
			$res = trinity_run_import( ! empty( $assoc['force'] ) );
			if ( is_wp_error( $res ) ) {
				WP_CLI::error( $res->get_error_message() );
			}
			foreach ( $res as $line ) {
				WP_CLI::log( $line );
			}
			WP_CLI::success( 'Trinity demo imported.' );
		}
	);
}
