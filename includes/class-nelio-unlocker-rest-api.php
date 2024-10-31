<?php

defined( 'ABSPATH' ) || exit;

class Nelio_Unlocker_REST_API extends WP_REST_Controller {

	private static $instance;


	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}//end if
		return self::$instance;
	}//end instance()


	public function init() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}//end init()


	public function register_routes() {

		register_rest_route(
			nelio_unlocker()->rest_namespace,
			'/posts/search',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'search_post_by_url' ),
					'permission_callback' => 'nelio_unlocker_can_use_plugin',
					'args'                => array(
						'url' => array(
							'type' => 'string',
						),
					),
				),
			)
		);

		register_rest_route(
			nelio_unlocker()->rest_namespace,
			'/convert',
			array(
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'convert' ),
					'permission_callback' => 'nelio_unlocker_can_use_plugin',
					'args'                => array(
						'request'  => array(
							'required'          => true,
							'type'              => 'record<string,any>',
							'validate_callback' => array( $this, 'validate_conversion_request' ),
						),
						'settings' => array(
							'required'          => true,
							'type'              => 'record<string,any>',
							'validate_callback' => array( $this, 'validate_import_settings' ),
						),
					),
				),
			)
		);

		register_rest_route(
			nelio_unlocker()->rest_namespace,
			'/media-library/image',
			array(
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'image_to_media_library' ),
					'permission_callback' => 'nelio_unlocker_can_use_plugin',
					'args'                => array(
						'url'     => array(
							'required' => true,
							'type'     => 'string',
						),
						'width'   => array(
							'required' => true,
							'type'     => 'number',
						),
						'height'  => array(
							'required' => true,
							'type'     => 'number',
						),
						'mime'    => array(
							'required' => true,
							'type'     => 'string',
						),
						'builder' => array(
							'required' => true,
							'type'     => 'string',
						),
					),
				),
			)
		);

	}//end register_routes()


	public function validate_conversion_request( $conversion_request ) {

		if ( ! $this->has_keys( array( 'vdom', 'settings', 'hash' ), $conversion_request ) ) {
			return false;
		}//end if

		$conversion_settings = $conversion_request['settings'];
		return $this->has_keys( array( 'builder', 'url' ), $conversion_settings );

	}//end validate_conversion_request()


	public function validate_import_settings( $import_settings ) {

		if ( ! $this->has_keys( array( 'mode', 'post' ), $import_settings ) ) {
			return false;
		}//end if

		$post = $import_settings['post'];
		return 'create' === $import_settings['mode']
			? $this->has_keys( array( 'title', 'type' ), $post )
			: $this->has_keys( array( 'id', 'type' ), $post );

	}//end validate_import_settings()


	public function search_post_by_url( $params ) {

		$post_id = url_to_postid( $params['url'] );
		return $post_id
			? new WP_REST_Response( $this->get_post_for_response( $post_id ) )
			: new WP_REST_Response( false, 200 );

	}//end search_post_by_url()


	public function convert( $params ) {

		/**
		 * Fires before triggering a conversion request.
		 *
		 * @param string $builder builder used to generate a conversion.
		 *
		 * @since 2.0.0
		 */
		do_action( 'nelio_unlocker_convert_before', $params['request']['settings']['builder'] );

		/**
		 * Filters the conversion request.
		 *
		 * @param array $conversion_request the conversion request.
		 *
		 * @since 2.0.0
		 */
		$conversion_request = apply_filters( 'nelio_unlocker_conversion_request', $params['request'] );
		$import_settings    = $params['settings'];

		$api_url  = nelio_unlocker_get_api_url();
		$builder  = $conversion_request['settings']['builder'];
		$response = nelio_unlocker_remote_request(
			'POST',
			"/unlock/{$builder}",
			$conversion_request
		);

		// If the response is an error, leave.
		if ( is_wp_error( $response ) ) {
			/**
			 * Fires when a conversion request failed.
			 *
			 * @param WP_Error $error   the error.
			 * @param array    $request conversion request object.
			 *
			 * @since 2.0.0
			 */
			do_action( 'nelio_unlocker_convert_error', $response, $conversion_request );
			return $response;
		}//end if

		$conversion = json_decode( $response['body'], true );
		$post       = $import_settings['post'];
		$args       = array_merge(
			isset( $post['id'] ) ? array( 'post_id' => $post['id'] ) : array(),
			isset( $post['type'] ) ? array( 'post_type' => $post['type'] ) : array(),
			isset( $post['title'] ) ? array( 'post_title' => $post['title'] ) : array(),
			array( 'conversion_request' => $conversion_request )
		);

		$result = 'create' === $import_settings['mode']
			? $this->create_new_item( $conversion['result'], $args )
			: $this->overwrite_existing_item( $conversion['result'], $args );

		if ( is_wp_error( $result ) ) {
			/**
			 * Fires when a conversion request failed.
			 *
			 * @param WP_Error $error   the error.
			 * @param array    $request conversion request object.
			 *
			 * @since 2.0.0
			 */
			do_action( 'nelio_unlocker_convert_error', $result, $conversion_request );
		} else {
			/**
			 * Fires after successfully triggering a conversion request and generating the post.
			 *
			 * @since 2.0.0
			 */
			do_action( 'nelio_unlocker_convert_done' );
		}//end if

		return $result;

	}//end convert()


	public function image_to_media_library( $params ) {

		/**
		 * Fires before uploading an image to the media library.
		 *
		 * @param string $builder builder that’ll be used to generate the conversion.
		 *
		 * @since 2.0.0
		 */
		do_action( 'nelio_unlocker_image_to_attachment_before', $params['builder'] );

		$url   = $params['url'];
		$props = array(
			'width'  => $params['width'],
			'height' => $params['height'],
			'mime'   => $params['mime'],
		);

		$attachment_id = $this->image_url_to_attachment_id( $url, $props );
		$attachment_id = ! empty( $attachment_id ) ? $attachment_id : $this->upload_image_to_media_library( $url );
		$attachment    = $this->generate_attachment( $attachment_id, $url );

		/**
		 * Fires after uploading an image to the media library.
		 *
		 * @since 2.0.0
		 */
		do_action( 'nelio_unlocker_image_to_attachment_after' );

		return new WP_REST_Response( $attachment, 200 );

	}//end image_to_media_library()


	private function create_new_item( $conversion, $args ) {

		$post_id = wp_insert_post(
			array(
				'post_title'   => $args['post_title'],
				'post_type'    => $args['post_type'],
				'post_content' => $conversion['content'],
			)
		);

		if ( empty( $post_id ) || is_wp_error( $post_id ) ) {
			return is_wp_error( $post_id )
				? $post_id
				: new WP_Error(
						'unable-to-create-post',
						_x( 'There was an unexpected error while creating the new post', 'text', 'nelio-unlocker' )
				);
		}//end if

		/**
		 * Save conversion request as a post meta.
		 *
		 * @param boolean $save whether conversion request should be saved as a post meta or not. Default: `false`.
		 *
		 * @since 2.0.0
		 */
		$save_conversion_request = apply_filters( 'nelio_unlocker_save_conversion_request', false );
		$this->update_metas(
			$post_id,
			array_merge(
				$conversion['meta'],
				array( '_nelio_unlocker_source_url' => $args['conversion_request']['settings']['url'] ),
				$save_conversion_request ? array( '_nelio_unlocker_conversion_request' => base64_encode( wp_json_encode( $args['conversion_request'] ) ) ) : array() // phpcs:ignore
			)
		);

		$post = $this->get_post_for_response( $post_id );

		/**
		 * Fires after creating a new item.
		 *
		 * @param int   $post_id the ID of the new post.
		 * @param array $request conversion request object.
		 *
		 * @since 2.0.0
		 */
		do_action( 'nelio_unlocker_create_item_after', $post_id, $args['conversion_request'] );

		return new WP_REST_Response( $post, 200 );

	}//end create_new_item()


	private function overwrite_existing_item( $conversion, $args ) {

		$post_id = wp_update_post(
			array(
				'ID'           => $args['post_id'],
				'post_content' => $conversion['content'],
			)
		);
		if ( is_wp_error( $post_id ) ) {
			return $post_id;
		}//end if

		$this->update_metas(
			$post_id,
			array_merge(
				$conversion['meta'],
				array( '_nelio_unlocker_source_url' => $args['conversion_request']['settings']['url'] )
			)
		);

		$post = $this->get_post_for_response( $post_id );
		return new WP_REST_Response( $post, 200 );

	}//end overwrite_existing_item()


	private function update_metas( $post_id, $metas ) {
		foreach ( $metas as $key => $value ) {
			if ( empty( $value ) ) {
				delete_post_meta( $post_id, $key );
			} elseif ( is_string( $value ) ) {
				update_post_meta( $post_id, $key, wp_slash( $value ) );
			} else {
				update_post_meta( $post_id, $key, $value );
			}//end if
		}//end foreach
	}//end update_metas()


	private function get_post_for_response( $post_id ) {
		return array(
			'id'    => $post_id,
			'type'  => get_post_type( $post_id ),
			'links' => array(
				'view' => get_post_permalink( $post_id ),
				'edit' => get_edit_post_link( $post_id, 'regular' ),
			),
		);
	}//end get_post_for_response()


	private function image_url_to_attachment_id( $url, $props ) {

		/**
		 * Filters the translation of an image URL into an attachment ID.
		 *
		 * Returning a truthy, integer value from the filter will effectively short-circuit
		 * retrieving the actual attachment ID, returning that value instead.
		 *
		 * @param int    $attachment_id Whether images should be imported or not. Default: `true`.
		 * @param string $url           URL of the image to import.
		 * @param array  $props         Object with image’s props like `width`, `height`, and `mime` type.
		 *
		 * @since 2.0.0
		 */
		$attachment_id = absint( apply_filters( 'nelio_unlocker_image_url_to_attachment_id', 0, $url, $props ) );
		if ( $attachment_id ) {
			return $attachment_id;
		}//end if

		$attachment_id = attachment_url_to_postid( $url );
		if ( $attachment_id ) {
			return $attachment_id;
		}//end if

		$media_content_dir   = wp_upload_dir();
		$media_content_dir   = trailingslashit( $media_content_dir['baseurl'] );
		$is_in_media_library = false !== strpos( $url, $media_content_dir );
		return $is_in_media_library
			? $this->improved_attachment_url_to_postid( $url )
			: $this->get_previous_upload_to_postid( $url );

	}//end image_url_to_attachment_id()


	private function improved_attachment_url_to_postid( $url ) {

		$file       = basename( $url );
		$query_args = array(
			'post_type'   => 'attachment',
			'post_status' => 'inherit',
			'fields'      => 'ids',
			'meta_query'  => array( // phpcs:ignore
				array(
					'value'   => $file,
					'compare' => 'LIKE',
					'key'     => '_wp_attachment_metadata',
				),
			),
		);

		$query = new WP_Query( $query_args );
		$posts = $query->have_posts() ? $query->posts : array();
		foreach ( $posts as $attachment_id ) {
			$meta                = wp_get_attachment_metadata( $attachment_id );
			$original_file       = basename( $meta['file'] );
			$cropped_image_files = wp_list_pluck( $meta['sizes'], 'file' );
			if ( $original_file === $file || in_array( $file, $cropped_image_files, true ) ) {
				return $attachment_id;
			}//end if
		}//end foreach

		return 0;

	}//end improved_attachment_url_to_postid()


	private function get_previous_upload_to_postid( $url ) {

		$query_args = array(
			'post_type'   => 'attachment',
			'post_status' => 'inherit',
			'fields'      => 'ids',
			'meta_query'  => array( // phpcs:ignore
				array(
					'value'   => $this->clean_image_url( $url ),
					'compare' => 'LIKE',
					'key'     => '_nelio_unlocker_source_url',
				),
			),
		);

		$query = new WP_Query( $query_args );
		return $query->have_posts() ? $query->posts[0] : 0;

	}//end get_previous_upload_to_postid()


	private function upload_image_to_media_library( $url ) {

		/**
		 * Whether the image with URL $url should be imported or not.
		 *
		 * @param boolean $import Whether images should be imported or not. Default: `true`.
		 * @param string  $url    URL of the image to import.
		 *
		 * @since 1.1.0
		 */
		if ( ! apply_filters( 'nelio_unlocker_import_image_to_media_library', true, $url ) ) {
			return 0;
		}//end if

		include_once ABSPATH . 'wp-admin/includes/media.php';
		include_once ABSPATH . 'wp-admin/includes/file.php';
		include_once ABSPATH . 'wp-admin/includes/image.php';

		// Save guard if previous includes fail.
		if ( ! function_exists( 'media_sideload_image' ) ) {
			return 0;
		}//end if

		$clean_url = $this->clean_image_url( $url );
		$urls      = array_values( array_unique( array( $clean_url, $url ) ) );
		foreach ( $urls as $url ) {
			$attachment_id = media_sideload_image( $clean_url, 0, null, 'id' );
			if ( ! is_wp_error( $attachment_id ) && 0 < $attachment_id ) {
				/**
				 * Fires after creating a new attachment from a given url.
				 *
				 * @param int    $attachment_id ID of the new attachment.
				 * @param string $url           URL of the original attachment.
				 *
				 * @since 2.0.0
				 */
				do_action( 'nelio_unlocker_image_to_new_attachment', $attachment_id, $url );
				update_post_meta( $attachment_id, '_nelio_unlocker_source_url', $url );
				return $attachment_id;
			}//end if
		}//end foreach

		return 0;

	}//end upload_image_to_media_library()


	private function clean_image_url( $url ) {
		return preg_replace( '/^(.+)-[0-9]+x[0-9]+(\.[^.]+)$/', '\1\2', $url );
	}//end clean_image_url()


	private function generate_attachment( $attachment_id, $default_src ) {
		$attachment_src = wp_get_attachment_image_src( $attachment_id, 'full' );
		$attachment_src = $attachment_src ? $attachment_src[0] : false;
		return array(
			'id'  => $attachment_id,
			'url' => ! empty( $attachment_src ) ? $attachment_src : $default_src,
		);
	}//end generate_attachment()


	private function has_keys( $expected_keys, $array ) {
		if ( ! is_array( $array ) ) {
			return false;
		}//end if

		$actual_keys = array_keys( $array );
		return empty( array_diff( $expected_keys, $actual_keys ) );
	}//end has_keys()

}//end class
