<?php

namespace ACF_FCE;

class Compatibility {
	/**
	 * admin_init hook callback
	 */
	public static function admin_init() {
		// Not on ajax
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		// Check activation
		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}

		trigger_error( sprintf( __( 'Flexible Content Extended for Advanced Custom Fields requires PHP version %s or greater to be activated.', 'acf-flexible-content-extended' ), ACF_FCE_MIN_PHP_VERSION ) );

		// Deactive self
		deactivate_plugins( ACF_FCE_DIR . 'acf-flexible-content-extended.php' );

		unset( $_GET['activate'] );

		add_action( 'admin_notices', array( __CLASS__, 'admin_notices' ) );
	}

	/**
	 * Notify the user about the incompatibility issue.
	 */
	public static function admin_notices() {
		echo '<div class="notice error is-dismissible">';
		echo '<p>' . esc_html( sprintf( __( 'Flexible Content Extended for Advanced Custom Fields requires PHP version %s or greater to be activated. Your server is currently running PHP version %s.', 'acf-flexible-content-extended' ), ACF_FCE_MIN_PHP_VERSION, PHP_VERSION ) ) . '</p>';
		echo '</div>';
	}
}
