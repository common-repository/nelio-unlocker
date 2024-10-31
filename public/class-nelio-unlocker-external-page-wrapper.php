<?php

defined( 'ABSPATH' ) || exit;

class Nelio_Unlocker_External_Page_Wrapper {

	protected static $instance;

	public static function instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}//end if

		return self::$instance;

	}//end instance()

	public function init() {
		add_action( 'plugins_loaded', array( $this, 'maybe_render_external_page' ) );
	}//end init()

	public function maybe_render_external_page() {

		if ( ! $this->is_external_page_request() ) {
			return;
		}//end if

		if ( ! current_user_can( 'manage_options' ) ) {
			$this->error_die( _x( 'You’re not allowed to view this page.', 'user', 'nelio-unlocker' ) );
		}//end if

		if ( ! $this->is_external_page_request_valid() ) {
			header( 'HTTP/1.1 400 Bad Request' );
			$this->error_die( _x( 'Invalid request.', 'text', 'nelio-unlocker' ) );
		} //end if

		$url      = sanitize_text_field( $_GET['url'] ); // phpcs:ignore
		$response = wp_remote_get( $url );
		if ( is_wp_error( $response ) ) {
			$this->error_die(
				sprintf(
					/* translators: error message */
					_x( 'Unable to load page. %s', 'text', 'nelio-unlocker' ),
					$response->get_error_message()
				)
			);
		}//end if

		if ( 200 !== wp_remote_retrieve_response_code( $response ) ) {
			$this->error_die(
				sprintf(
					/* translators: HTML error code */
					_x( 'Unable to load page. Response code: %d.', 'text', 'nelio-unlocker' ),
					wp_remote_retrieve_response_code( $response )
				)
			);
		}//end if

		$body = $response['body'];
		$body = preg_replace( '/(<head\b[^>]*>)/i', sprintf( '$1<base href="%s">', esc_url( $url ) ), $body );

		/**
		 * Filters the body of a page obtained from a third-party website.
		 *
		 * @param string $body the body of the third-party page.
		 * @param string $url  the URL of the third-party page.
		 *
		 * @since 1.0.0
		 */
		$body = apply_filters( 'nelio_unlocker_external_page_body', $body, $url );

		echo $body; // phpcs:ignore
		die();

	}//end maybe_render_external_page()

	private function is_external_page_request() {
		if ( ! isset( $_GET['nelio-unlocker'] ) ) { // phpcs:ignore
			return false;
		}//end if

		if ( ! isset( $_GET['url'] ) ) { // phpcs:ignore
			return false;
		}//end if

		if ( ! isset( $_GET['mode'] ) ) { // phpcs:ignore
			return false;
		}//end if

		$mode = sanitize_text_field( $_GET['mode'] ); // phpcs:ignore
		return 'external' === strtolower( $mode );
	}//end is_external_page_request()

	private function is_external_page_request_valid() {
		$url = sanitize_text_field( $_GET['url'] ); // phpcs:ignore
		return filter_var( $url, FILTER_VALIDATE_URL );
	}//end is_external_page_request_valid()

	private function error_die( $message ) {
		$dispatchers = 'window.parent.wp.data.dispatch';

		$script  = '<script type="text/javascript">';
		$script .= sprintf(
			'%s("core/notices").createErrorNotice( %s );',
			$dispatchers,
			wp_json_encode( $message )
		);
		$script .= sprintf(
			'%s("nelio-unlocker-importer/data").failConversion();',
			$dispatchers
		);
		$script .= '</script>';

		wp_die( esc_html( $message ) . $script ); // phpcs:ignore
	}//end error_die()

}//end class
