<?php

/**
 * Returns the API url for the specified path.
 *
 * @param string $path Optional. The path to use. Default: `''`.
 *
 * @return string The API url for the specified path.
 *
 * @since 1.0.0
 */
function nelio_unlocker_get_api_url( $path = '' ) {
	/**
	 * Filters Nelio Unlocker’s API URLs.
	 *
	 * @param string $url a URL to Nelio Unlocker’s API.
	 *
	 * @since 2.0.0
	 */
	return apply_filters( 'nelio_unlocker_api_url', 'https://api.neliounlocker.com/v1' . $path );
}//end nelio_unlocker_get_api_url()

/**
 * Performs a get request to the API.
 *
 * @param string $path The path to use.
 *
 * @return array|WP_Error the response.
 *
 * @since 1.0.0
 */
function nelio_unlocker_remote_get( $path ) {
	return nelio_unlocker_remote_request( 'GET', $path );
}//end nelio_unlocker_remote_get()

/**
 * Performs a post request to the API.
 *
 * @param string $path The path to use.
 * @param object $data   The data to post.
 *
 * @return array|WP_Error the response.
 *
 * @since 1.0.0
 */
function nelio_unlocker_remote_post( $path, $data ) {
	return nelio_unlocker_remote_request( 'POST', $path, $data );
}//end nelio_unlocker_remote_post()

/**
 * Performs a request to the API.
 *
 * @param string $method HTTP method type.
 * @param string $path   The path to use.
 * @param object $data   The data to post.
 *
 * @return array|WP_Error the response.
 *
 * @since 1.0.0
 */
function nelio_unlocker_remote_request( $method, $path, $data = '' ) {
	$response = wp_remote_request(
		nelio_unlocker_get_api_url( $path ),
		array(
			'body'    => wp_json_encode( $data ),
			'method'  => $method,
			'timeout' => 30,
			'headers' => array(
				'accept'       => 'application/json',
				'content-type' => 'application/json',
			),
		)
	);

	if ( is_wp_error( $response ) ) {
		return $response;
	} //end if

	if ( 200 !== $response['response']['code'] ) {
		$response_code    = $response['response']['code'];
		$response_message = $response['response']['message'];
		$body             = json_decode( $response['body'], true );
		$api_message      = isset( $body['message'] )
			? $body['message']
			: "Error {$response_code}: {$response_message}";
		return new WP_Error(
			'invalid-request',
			$api_message,
			array(
				'responseCode'    => $response_code,
				'responseMessage' => $response_message,
			)
		);
	} //end if

	return $response;
}//end nelio_unlocker_remote_request()
