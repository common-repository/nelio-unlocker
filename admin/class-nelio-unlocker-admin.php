<?php

defined( 'ABSPATH' ) || exit;

class Nelio_Unlocker_Admin {

	protected static $instance;

	public static function instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}//end if

		return self::$instance;

	}//end instance()

	public function init() {
		add_action( 'admin_menu', array( $this, 'create_pages' ) );
	}//end init()

	public function create_pages() {

		$page = new Nelio_Unlocker_Importer_Page();
		$page->init();

	}//end create_pages()

}//end class
