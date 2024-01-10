<?php

namespace ACF_FCE;

class Main {
	use Singleton;

	protected function init() {

		// Assets
		add_action( 'acf/input/admin_enqueue_scripts', [ $this, 'register_assets' ], 1 );
		add_action( 'acf/input/admin_enqueue_scripts', [ $this, 'enqueue_assets' ] );

		// Images
		add_action( 'acf/input/admin_footer', [ $this, 'layouts_images_style' ], 20 );

		add_action( 'acf/input/admin_head', [ $this, 'retrieve_flexible_keys' ], 1 );
	}

	/**
	 * Display the flexible layouts images related css for backgrounds
	 */
	public function layouts_images_style() {
		$images = $this->get_layouts_images();
		if ( empty( $images ) ) {
			return;
		}

		$css = "\n<style>";
		$css .= "\n\t /** Flexible Content Extended for Advanced Custom Fields : dynamic images */";
		foreach ( $images as $layout_key => $image_url ) {
      if ( isset( $image_url ) ) {
        $css .= sprintf( "\n\t .acf-fc-popup ul li a[data-layout=\"%s\"] .acf-fc-popup-image { background-image: url(\"%s\"); }", $layout_key, $image_url );
      }
		}
		$css .= "\n</style>\n";

		echo $css;
	}

	/**
	 * Get all ACF flexible content field layout keys
	 *
	 * @return array
	 */
	public function retrieve_flexible_keys() {
		$keys   = [];
		$groups = acf_get_field_groups();

		if ( empty( $groups ) ) {
			return $keys;
		}

		foreach ( $groups as $group ) {
			$fields = (array) acf_get_fields( $group );

			if ( !empty( $fields ) ) {
				$this->retrieve_flexible_keys_from_fields( $fields, $keys );
			}
		}

		return $keys;
	}

	/**
	 * Recursively get ACF flexible content field layout keys from fields.
	 *
	 * @param array $fields
	 * @return array
	 */
	protected function retrieve_flexible_keys_from_fields( $fields, &$keys ) {
		foreach ( $fields as $field ) {

      // Repeater and group fields
      if (
        'repeater' === $field['type'] ||
        'group' === $field['type']
      ) {
        // If this is a repeater or group field, check to see if it
        // contains any nested flexible content fields
        $subFields = acf_get_fields( $field );
        $this->retrieve_flexible_keys_from_fields( $subFields, $keys );

        // Flexible content fields
      } elseif ( 'flexible_content' === $field['type'] ) {

				foreach ( $field['layouts'] as $layout_field ) {

          // Prevent skipping layout fields with identical keys from
  				// different fields by creating a unique identifier.
  				$field_identifier = $field['key'] . '-' . $layout_field['key'];

  				// Don't revisit keys we've recorded already
  				if ( ! empty( $keys[ $field_identifier ] ) ) {
  					continue;
  				}

  				$keys[ $field_identifier ] = $layout_field['name'];

					// Flexible content has a potentially recursive structure. Each layout
					// has its own sub-fields that could in turn be flexible content.
					if ( ! empty( $layout_field['sub_fields'] ) ) {
						$this->retrieve_flexible_keys_from_fields( $layout_field['sub_fields'], $keys );
					}
				}
			}
		}
	}

	/**
	 * Get images for all flexible content field keys
	 *
	 * @return mixed
	 */
	public function get_layouts_images() {
		$flexibles = $this->retrieve_flexible_keys();

		if ( empty( $flexibles ) ) {
			return [];
		}

		foreach ( $flexibles as $flexible ) {
			$layouts_images[ $flexible ] = $this->locate_image( $flexible );
		}

		/**
		 * Allow to add/remove/change a flexible layout key
		 *
		 * @params array $layouts_images : Array of flexible content field layout's keys with associated image url
		 *
		 * @return array
		 */
		return apply_filters( 'acf-flexible-content-extended.images', $layouts_images );
	}

	/**
	 * Locate layout in the theme or plugin if needed
	 *
	 * @param string $layout : the layout name, add automatically .jpg at the end of the file
	 *
	 * @return false|string
	 */
	public function locate_image( $layout ) {
		if ( empty( $layout ) ) {
			return false;
		}

		/**
		 * Allow to add/remove/change the path to images
		 *
		 * @params array $path : Path to check
		 *
		 * @return array
		 */
		$path = apply_filters( 'acf-flexible-content-extended.images_path', 'lib/admin/images/acf-flexible-content-extended' );

		/**
		 * Allow to change the file extension expected
		 *
		 * @params string $extension : Extension to look for
		 *
		 * @return string
		 */
		$extension = apply_filters( 'acf-flexible-content-extended.images_extension', 'jpg' );

		// Rework the tpl
		$layout = str_replace( '_', '-', $layout );

		$image_path = get_stylesheet_directory() . '/' . $path . '/' . $layout . '.' . $extension;
		$image_uri = get_stylesheet_directory_uri() . '/' . $path . '/' . $layout . '.' . $extension;

		// Direct path to custom folder
		if ( is_file( $image_path ) ) {
			return $image_uri;
		}
	}

	/**
	 * Register assets
	 */
	public function register_assets() {
		wp_register_script( 'acf-flexible-content-extended', ACF_FCE_URL . 'assets/js/acf-flexible-content-extended.js', [ 'jquery', 'acf-input' ], ACF_FCE_VERSION );
		wp_register_style( 'acf-flexible-content-extended', ACF_FCE_URL . 'assets/css/acf-flexible-content-extended.css', [], ACF_FCE_VERSION );
	}

	/**
	 * Enqueue assets
	 */
	public function enqueue_assets() {
		wp_enqueue_script( 'acf-flexible-content-extended' );
		wp_enqueue_style( 'acf-flexible-content-extended' );
	}
}
