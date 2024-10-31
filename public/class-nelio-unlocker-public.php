<?php

defined( 'ABSPATH' ) || exit;

class Nelio_Unlocker_Public {

	protected static $instance;

	public static function instance() {

		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}//end if

		return self::$instance;

	}//end instance()

	public function init() {

		$aux = Nelio_Unlocker_Virtual_Dom_Exporter::instance();
		$aux->init();

		$aux = Nelio_Unlocker_External_Page_Wrapper::instance();
		$aux->init();

	}//end init()

}//end class
