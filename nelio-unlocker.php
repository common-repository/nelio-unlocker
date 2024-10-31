<?php
/**
 * The plugin bootstrap file
 *
 * @wordpress-plugin
 * Plugin Name:       Nelio Unlocker - Importer
 * Plugin URI:        https://neliosoftware.com/unlocker/
 * Description:       Transform web pages into WordPress page builders.
 * Version:           2.0.3
 *
 * Author:            Nelio Software
 * Author URI:        https://neliosoftware.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * Text Domain:       nelio-unlocker
 *
 * @package Nelio_Unlocker
 * @author  David Aguilera <david.aguilera@neliosoftware.com>
 */

defined( 'ABSPATH' ) || exit;

define( 'NELIO_UNLOCKER', true );

function nelio_unlocker() {
	return Nelio_Unlocker::instance();
}//end nelio_unlocker()

/**
 * Main class.
 */
class Nelio_Unlocker {

	private static $instance = null;

	public $plugin_file;
	public $plugin_path;
	public $plugin_url;
	public $plugin_name;
	public $plugin_slug;
	public $plugin_version;
	public $plugin_name_sanitized;
	public $rest_namespace;

	public static function instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->load_dependencies();
			self::$instance->init();
		}//end if

		return self::$instance;

	}//end instance()

	private function load_dependencies() {

		$this->plugin_path    = untrailingslashit( plugin_dir_path( __FILE__ ) );
		$this->plugin_url     = untrailingslashit( plugin_dir_url( __FILE__ ) );
		$this->plugin_file    = 'nelio-unlocker/nelio-unlocker.php';
		$this->rest_namespace = 'nelio-unlocker/v2';

		require_once $this->plugin_path . '/vendor/autoload.php';
		require_once $this->plugin_path . '/includes/utils/functions/api.php';
		require_once $this->plugin_path . '/includes/utils/functions/helpers.php';

	}//end load_dependencies()

	private function init() {

		add_action( 'plugins_loaded', array( $this, 'load_i18n_strings' ), 1 );
		add_action( 'plugins_loaded', array( $this, 'plugin_data_init' ), 1 );

		if ( is_admin() ) {
			$aux = Nelio_Unlocker_Admin::instance();
			$aux->init();
		} else {
			$aux = Nelio_Unlocker_Public::instance();
			$aux->init();
		} //end if

		$aux = Nelio_Unlocker_REST_API::instance();
		$aux->init();

	}//end init()

	public function load_i18n_strings() {

		load_plugin_textdomain( 'nelio-unlocker' );

	}//end load_i18n_strings()

	public function plugin_data_init() {

		$data = get_file_data( __FILE__, array( 'Plugin Name', 'Version' ), 'plugin' );

		$this->plugin_name           = $data[0];
		$this->plugin_version        = $data[1];
		$this->plugin_slug           = plugin_basename( __FILE__, '.php' );
		$this->plugin_name_sanitized = basename( __FILE__, '.php' );

	}//end plugin_data_init()

}//end class

// Start plugin.
nelio_unlocker();
