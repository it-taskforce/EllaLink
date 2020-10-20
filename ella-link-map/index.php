<?php 
/**
 * Plugin Name: Ella link map
 * Description: Ella link map developed with mapboxjs
 * Author:      Gentrit Biba
 * Version:     1.3
 */



define('ELLA_LINK_MAP_INTEGRATION', __FILE__);
define('ELLA_LINK_MAP_INTEGRATION_DIR', plugin_dir_path(__FILE__));
define("ELLA_LINK_MAP_INTEGRATION_PLUGIN_URL", plugin_dir_url(__FILE__));

function wpdocs_theme_name_scripts() {
    wp_enqueue_style( 'mapboxgl-css', "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" );
    wp_enqueue_style( 'mapbox-decoder-css', "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css" );
    wp_enqueue_style( 'ella-link-map-css', ELLA_LINK_MAP_INTEGRATION_PLUGIN_URL . "/assets/css/style.css" );
    wp_enqueue_style( 'ella-link-map-css', ELLA_LINK_MAP_INTEGRATION_PLUGIN_URL . "/assets/css/style.css" );
    wp_enqueue_style( 'fontawesome', "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" );
    wp_enqueue_style( 'bootstrap', "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" );
    wp_enqueue_script( 'togeojson', "https://cdnjs.cloudflare.com/ajax/libs/togeojson/0.16.0/togeojson.min.js", array('jquery'), '0.16.0' );
    wp_enqueue_script( 'jszip', "https://stuk.github.io/jszip/dist/jszip.min.js", array('jquery'), '1.0.1' );
    wp_enqueue_script( 'jszip-util', "https://stuk.github.io/jszip-utils/dist/jszip-utils.js", array('jquery'), '1.0.1' );
    wp_enqueue_script( 'FileSaver', "https://stuk.github.io/jszip/vendor/FileSaver.js", array('jquery'), '3.3.1' );
    wp_enqueue_script( 'bootstrapjs', "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js", array('jquery'), '4.5.2' );
    wp_enqueue_script( 'mapbox-geodecoder', "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js", array('jquery'), '3.3.1', true );
    wp_enqueue_script( 'mapbox', "https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js", array('jquery'), '3.3.1', true );
    wp_enqueue_script( 'mapboxgl', "https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js", array('jquery'), '3.3.1', true );
    wp_enqueue_script( 'ella-link-map-js', ELLA_LINK_MAP_INTEGRATION_PLUGIN_URL . "/assets/js/main.js", array('jquery', 'mapboxgl', 'mapbox', 'mapbox-geodecoder'), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );


function ella_link_render_map(){
    global $pagenow;
        if (!(( $pagenow == 'post.php' ) || (get_post_type() == 'post'))) {

    include_once "map.php";
    }
}
add_shortcode( "ella_link_map", "ella_link_render_map" );



// include_once "util.php";
// include_once 'admin-options.php';
// include_once "rest-enpoints.php";
// include_once "post-types.php";
