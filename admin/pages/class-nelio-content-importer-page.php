<?php

defined( 'ABSPATH' ) || exit;

class Nelio_Unlocker_Importer_Page {

	public function init() {

		$this->add_page();
		add_filter( 'admin_enqueue_scripts', array( $this, 'maybe_enqueue_assets' ) );

	}//end init()

	private function add_page() {

		register_importer(
			'nelio-unlocker',
			'Nelio Unlocker',
			sprintf(
				/* translators: link to Nelio Unlocker’s service */
				_x( 'Import pages, posts, and content converted with <a href="%s">Nelio Unlocker</a>.', 'text', 'nelio-unlocker' ),
				add_query_arg(
					array(
						'utm_source'   => 'nelio-unlocker',
						'utm_medium'   => 'plugin',
						'utm_campaign' => 'importer-description',
						'utm_content'  => 'importers-list',
					),
					__( 'https://neliosoftware.com/unlocker/', 'nelio-unlocker' )
				)
			),
			array( $this, 'render_root_node' )
		);

	}//end add_page()

	public function render_root_node() {
		echo '<div class="wrap">';

		printf(
			'<div class="notice notice-error notice-alt hide-if-js"><p>%s</p></div>',
			esc_html_x(
				'This page requires JavaScript. Please enable JavaScript in your browser settings.',
				'user',
				'nelio-unlocker'
			)
		);

		echo '<div id="nelio-unlocker-wrapper"></div>';

		echo '</div>';
	}//end render_root_node()

	public function maybe_enqueue_assets() {

		if ( ! $this->is_current_screen_this_page() ) {
			return;
		} //end if

		nelio_unlocker_enqueue_script_with_auto_deps(
			'nelio-unlocker-importer',
			'importer',
			true
		);
		wp_enqueue_style( 'wp-components' );

		// NOTE. Update service when tweaking this object.
		$settings = array(
			'apiUrl'        => nelio_unlocker_get_api_url(),
			'pluginVersion' => nelio_unlocker()->plugin_version,
		);
		wp_add_inline_script(
			'nelio-unlocker-importer',
			sprintf(
				'wp.data.dispatch( %s ).%s( %s )',
				wp_json_encode( 'nelio-unlocker-importer/data' ),
				'setPluginSettings',
				wp_json_encode( $settings )
			)
		);

	}//end maybe_enqueue_assets()

	private function is_current_screen_this_page() {
		$screen    = get_current_screen();
		$screen_id = empty( $screen ) ? '' : $screen->id;
		$importer  = isset( $_GET['import'] ) ? sanitize_text_field( $_GET['import'] ) : ''; // phpcs:ignore
		return (
			'admin' === $screen_id &&
			'nelio-unlocker' === $importer
		);
	}//end is_current_screen_this_page()

}//end class
