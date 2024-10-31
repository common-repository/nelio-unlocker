<?php

/**
 * Registers a script loading the dependencies automatically.
 *
 * @param string  $handle    the script handle name.
 * @param string  $file_name the JS name of a script in $plugin_path/dist/. Don’t include the extension or the path.
 * @param boolean $footer    whether the script should be included in the footer or not.
 *
 * @since 1.0.0
 */
function nelio_unlocker_register_script_with_auto_deps( $handle, $file_name, $footer ) {

	$asset = array(
		'dependencies' => array(),
		'version'      => nelio_unlocker()->plugin_version,
	);

	if ( file_exists( nelio_unlocker()->plugin_path . "/dist/$file_name.asset.php" ) ) {
		$asset = include nelio_unlocker()->plugin_path . "/dist/$file_name.asset.php";
	}//end if

	// NOTE. Add regenerator-runtime to our components package to make sure AsyncPaginate works.
	$asset['dependencies'] = array_merge( $asset['dependencies'], array( 'regenerator-runtime' ) );

	// NOTE. Bug fix with @wordpress/core-data package.
	$asset['dependencies'] = array_map(
		function( $dep ) {
			return str_replace( 'wp-coreData', 'wp-core-data', $dep );
		},
		$asset['dependencies']
	);

	wp_register_script(
		$handle,
		nelio_unlocker()->plugin_url . "/dist/$file_name.js",
		$asset['dependencies'],
		$asset['version'],
		$footer
	);

	wp_set_script_translations( $handle, 'nelio-unlocker' );

}//end nelio_unlocker_register_script_with_auto_deps()

/**
 * Enqueues a script loading the dependencies automatically.
 *
 * @param string  $handle    the script handle name.
 * @param string  $file_name the JS name of a script in $plugin_path/dist/. Don’t include the extension or the path.
 * @param boolean $footer    whether the script should be included in the footer or not.
 *
 * @since 1.0.0
 */
function nelio_unlocker_enqueue_script_with_auto_deps( $handle, $file_name, $footer ) {

	nelio_unlocker_register_script_with_auto_deps( $handle, $file_name, $footer );
	wp_enqueue_script( $handle );

}//end nelio_unlocker_enqueue_script_with_auto_deps()

/**
 * Whether the current user is an administrator or not.
 *
 * @return boolean whether the current user is an administrator or not.
 *
 * @since 2.0.0
 */
function nelio_unlocker_can_use_plugin() {

	$can_use_plugin = function_exists( 'current_user_can' ) && current_user_can( 'manage_options' );

	/**
	 * Whether the current user can use the plugin or not. By default, only users who can “manage_option” can.
	 *
	 * @param boolean $can_use_plugin whether the current user can use the plugin or not.
	 *
	 * @since 2.0.0
	 */
	return apply_filters( 'nelio_unlocker_can_use_plugin', $can_use_plugin );

}//end nelio_unlocker_can_use_plugin()
