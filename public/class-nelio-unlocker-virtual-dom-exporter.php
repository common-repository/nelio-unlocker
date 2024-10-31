<?php

defined( 'ABSPATH' ) || exit;

class Nelio_Unlocker_Virtual_Dom_Exporter {

	protected static $instance;

	public static function instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}//end if

		return self::$instance;

	}//end instance()

	public function init() {
		if ( ! $this->is_virtual_dom_request() ) {
			return;
		} //end if

		if ( $this->is_external_page_request() ) {
			add_filter( 'nelio_unlocker_external_page_body', array( $this, 'append_virtual_dom_script' ) );
		} else {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_virtual_dom_script' ) );
		} //end if
	}//end init()

	public function enqueue_virtual_dom_script() {
		wp_enqueue_script(
			'nelio-unlocker-virtual-dom-exporter',
			nelio_unlocker()->plugin_url . '/dist/virtual-dom-exporter.js',
			array(),
			$this->get_virtual_dom_exporter_version(),
			false
		);
	}//end enqueue_virtual_dom_script()

	public function append_virtual_dom_script( $body ) {
		$url    = nelio_unlocker()->plugin_url . '/dist/virtual-dom-exporter.js';
		$script = sprintf(
			'<script type="text/javascript" src="%s"></script>',
			esc_url( add_query_arg( 'version', $this->get_virtual_dom_exporter_version(), $url ) )
		);
		return preg_replace( '/(<head\b[^>]*>)/i', sprintf( '$1%s', $script ), $body );
	}//end append_virtual_dom_script()

	private function is_virtual_dom_request() {
		return isset( $_GET['nelio-unlocker'] ); // phpcs:ignore
	}//end is_virtual_dom_request()

	private function is_external_page_request() {
		return (
			isset( $_GET['mode'] ) && // phpcs:ignore
			'external' === sanitize_text_field( $_GET['mode'] ) // phpcs:ignore
		);
	}//end is_external_page_request()

	private function get_virtual_dom_exporter_version() {
		$asset = include nelio_unlocker()->plugin_path . '/dist/virtual-dom-exporter.asset.php';
		return empty( $asset ) ? nelio_unlocker()->plugin_version : $asset['version'];
	}//end get_virtual_dom_exporter_version()

}//end class
