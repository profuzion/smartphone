<?php
/**
 * Profuzion — Bricks child theme (v2 design system in WordPress)
 */

defined('ABSPATH') || exit;

define('PROFUZION_BRICK_VER', '1.0.0');
define('PROFUZION_BRICK_DIR', get_stylesheet_directory());
define('PROFUZION_BRICK_URI', get_stylesheet_directory_uri());

add_filter('body_class', function (array $classes): array {
	$classes[] = 'profuzion-v2';
	return $classes;
});

add_action('wp_enqueue_scripts', function (): void {
	if (is_admin()) {
		return;
	}
	$ver = PROFUZION_BRICK_VER;

	wp_enqueue_style(
		'profuzion-v2-bundled',
		PROFUZION_BRICK_URI . '/assets/css/profuzion-v2-wp-bundled.css',
		[],
		$ver
	);

	wp_enqueue_script(
		'profuzion-cursor',
		PROFUZION_BRICK_URI . '/assets/js/cursor.js',
		[],
		$ver,
		true
	);

	wp_register_script(
		'gsap',
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
		[],
		'3.12.5',
		true
	);
	wp_register_script(
		'gsap-scrolltrigger',
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
		['gsap'],
		'3.12.5',
		true
	);
	wp_enqueue_script('gsap');
	wp_enqueue_script('gsap-scrolltrigger');
	wp_enqueue_script(
		'profuzion-motion',
		PROFUZION_BRICK_URI . '/assets/js/motion.js',
		['gsap', 'gsap-scrolltrigger'],
		$ver,
		true
	);
}, 20);
