<?php
/**
 * Profuzion — Bricks child theme (v9 handoff)
 *
 * WordPress loads only: this theme’s CSS/JS + Bricks/ACSS — not authoring-preview bundles from the design repository.
 */

defined('ABSPATH') || exit;

define('PROFUZION_BRICK_VER', '1.4.2');
define('PROFUZION_BRICK_DIR', get_stylesheet_directory());
define('PROFUZION_BRICK_URI', get_stylesheet_directory_uri());

/** v9 matches static preview asset stack; set false for legacy v6-heavy behaviour (override in wp-config.php before this file loads). */
if (!defined('PROFUZION_HANDOFF_V9')) {
	define('PROFUZION_HANDOFF_V9', true);
}

/** Load GSAP / Three from /assets/js/vendor/ (see sync-wp-vendor-js in project scripts). If false, uses CDN fallbacks. */
define('PROFUZION_VENDOR_LOCAL', true);

/** WebGL halftone + pfz-halftone-hero.js — front page when true (see profuzion_should_enqueue_halftone). Filter: profuzion_enqueue_halftone */
if (!defined('PROFUZION_V6_HALFTONE_DEFAULT')) {
	define('PROFUZION_V6_HALFTONE_DEFAULT', true);
}

/** ScrollTrigger extras (hero / industries); disabled under v9 for parity with pfz-v2-wp preview. */
if (!defined('PROFUZION_V6_SCROLL_ANIMS')) {
	define('PROFUZION_V6_SCROLL_ANIMS', !PROFUZION_HANDOFF_V9);
}

require_once PROFUZION_BRICK_DIR . '/includes/cpt-case-study.php';
require_once PROFUZION_BRICK_DIR . '/includes/bricks-import-lib.php';
require_once PROFUZION_BRICK_DIR . '/includes/bricks-auto-templates.php';

if (defined('WP_CLI') && WP_CLI) {
	require_once PROFUZION_BRICK_DIR . '/includes/wp-cli-profz.php';
}

add_action('after_switch_theme', static function (): void {
	flush_rewrite_rules();
});

add_filter('body_class', function (array $classes): array {
	$classes[] = 'pfz';
	$classes[] = PROFUZION_HANDOFF_V9 ? 'pfz-v9' : 'pfz-v6';
	return $classes;
});

/**
 * True inside Bricks editor preview only (`?bricks=`, inner iframe, etc.).
 * Do not treat bare `bricks_is_builder()` as canvas — it can be true outside true preview and was disabling halftone on the live site.
 */
function profuzion_is_bricks_builder_canvas(): bool {
	if (isset($_GET['bricks'])) {
		$b = strtolower(trim((string) $_GET['bricks']));
		if (in_array($b, ['run', 'preview', '1', 'true', 'yes'], true)) {
			return (bool) apply_filters('profuzion_is_bricks_builder_canvas', true);
		}
	}

	if (!defined('BRICKS_VERSION')) {
		return (bool) apply_filters('profuzion_is_bricks_builder_canvas', false);
	}

	if (function_exists('bricks_is_builder_iframe') && bricks_is_builder_iframe()) {
		return (bool) apply_filters('profuzion_is_bricks_builder_canvas', true);
	}

	if (
		function_exists('bricks_is_builder')
		&& function_exists('bricks_is_builder_main')
		&& bricks_is_builder()
		&& !bricks_is_builder_main()
	) {
		return (bool) apply_filters('profuzion_is_bricks_builder_canvas', true);
	}

	return (bool) apply_filters('profuzion_is_bricks_builder_canvas', false);
}

/**
 * Cursor restore for Bricks canvas + preview.
 *
 * Tier 1: `@media (hover:hover)` — matches bundled `.pfz` cursor hiding.
 * Tier 2: `html[data-pfz-bricks-canvas]` — no media query (covers coarse pointer / weird iframe UA).
 */
function profuzion_bricks_builder_cursor_fix_css(): string {
	/* Note: never target `body.bricks-is-frontend` here — Bricks adds it on normal frontend pages too. */
	$b = 'body.profuzion-bricks-builder.pfz,body.bricks-is-builder.pfz';
	$stars = 'body.profuzion-bricks-builder.pfz *,body.bricks-is-builder.pfz *';

	$tier1 = '@media (hover:hover) and (pointer:fine){'
		. $b . ',' . $stars . '{cursor:auto!important}'
		. 'body.profuzion-bricks-builder.pfz input[type="text"],body.bricks-is-builder.pfz input[type="text"],'
		. 'body.profuzion-bricks-builder.pfz input[type="email"],body.bricks-is-builder.pfz input[type="email"],'
		. 'body.profuzion-bricks-builder.pfz input[type="tel"],body.bricks-is-builder.pfz input[type="tel"],'
		. 'body.profuzion-bricks-builder.pfz input[type="url"],body.bricks-is-builder.pfz input[type="url"],'
		. 'body.profuzion-bricks-builder.pfz input[type="search"],body.bricks-is-builder.pfz input[type="search"],'
		. 'body.profuzion-bricks-builder.pfz input[type="password"],body.bricks-is-builder.pfz input[type="password"],'
		. 'body.profuzion-bricks-builder.pfz input[type="number"],body.bricks-is-builder.pfz input[type="number"],'
		. 'body.profuzion-bricks-builder.pfz textarea,body.bricks-is-builder.pfz textarea{cursor:text!important}'
		. '}'
		. 'body.profuzion-bricks-builder #pz-cursor-root,body.bricks-is-builder #pz-cursor-root,'
		. 'body.profuzion-bricks-builder .pz-cursor-ring,body.bricks-is-builder .pz-cursor-ring,'
		. 'body.profuzion-bricks-builder .pz-cursor-dot,body.bricks-is-builder .pz-cursor-dot,'
		. 'body.profuzion-bricks-builder .pz-cursor-label,body.bricks-is-builder .pz-cursor-label{'
		. 'display:none!important;visibility:hidden!important;pointer-events:none!important}';

	$h = 'html[data-pfz-bricks-canvas="1"]';
	$tier2 = $h . ' body,' . $h . ' body.pfz,' . $h . ' body *,' . $h . ' body.pfz *{cursor:auto!important}'
		. $h . ' body input[type="text"],' . $h . ' body input[type="email"],' . $h . ' body input[type="tel"],'
		. $h . ' body input[type="url"],' . $h . ' body input[type="search"],' . $h . ' body input[type="password"],'
		. $h . ' body input[type="number"],' . $h . ' body textarea{cursor:text!important}'
		. $h . ' #pz-cursor-root,' . $h . ' .pz-cursor-ring,' . $h . ' .pz-cursor-dot,' . $h . ' .pz-cursor-label{'
		. 'display:none!important;visibility:hidden!important;pointer-events:none!important}';

	return $tier1 . $tier2;
}

add_filter(
	'body_class',
	static function (array $classes): array {
		if (profuzion_is_bricks_builder_canvas()) {
			$classes[] = 'profuzion-bricks-builder';
		}
		return $classes;
	},
	15
);

/**
 * Whether to enqueue the Three.js hero halftone (heavy).
 *
 * When PROFUZION_V6_HALFTONE_DEFAULT is true: defaults to the site front page only (see `is_front_page()`).
 * Always filterable via `profuzion_enqueue_halftone` (pass a boolean).
 */
function profuzion_should_enqueue_halftone(): bool {
	if (!PROFUZION_V6_HALFTONE_DEFAULT) {
		return (bool) apply_filters('profuzion_enqueue_halftone', false);
	}
	if (profuzion_is_bricks_builder_canvas()) {
		return (bool) apply_filters('profuzion_enqueue_halftone', false);
	}

	return (bool) apply_filters('profuzion_enqueue_halftone', is_front_page());
}

/** Head loader for builder cursor fix (external file avoids CSP blocking inline boot). */
add_action(
	'wp_enqueue_scripts',
	static function (): void {
		if (is_admin()) {
			return;
		}
		$handle = 'profuzion-bricks-cursor-fix';
		$rel = '/assets/js/pfz-bricks-cursor-fix.js';

		wp_register_script(
			$handle,
			PROFUZION_BRICK_URI . $rel,
			[],
			PROFUZION_BRICK_VER,
			false
		);

		wp_enqueue_script($handle);

		$css = profuzion_bricks_builder_cursor_fix_css();
		wp_add_inline_script(
			$handle,
			'window.__PFZ_BRICKS_CURSOR_CSS=' . wp_json_encode($css, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) . ';',
			'before'
		);
	},
	1
);
add_action('wp_enqueue_scripts', function (): void {
	if (is_admin()) {
		return;
	}
	$ver = PROFUZION_BRICK_VER;

	$style_deps = [];
	$wp_styles = wp_styles();
	if (isset($wp_styles->registered['bricks-frontend-css'])) {
		$style_deps[] = 'bricks-frontend-css';
	}

	$bundled_css = 'profuzion-v6-wp-bundled.css';
	if (PROFUZION_HANDOFF_V9 && is_readable(PROFUZION_BRICK_DIR . '/assets/css/profuzion-v2-wp-bundled.css')) {
		$bundled_css = 'profuzion-v2-wp-bundled.css';
	}

	wp_enqueue_style(
		'profuzion-wp-bundled',
		PROFUZION_BRICK_URI . '/assets/css/' . $bundled_css,
		$style_deps,
		$ver
	);

	if (!profuzion_is_bricks_builder_canvas()) {
		wp_enqueue_script(
			'profuzion-cursor',
			PROFUZION_BRICK_URI . '/assets/js/cursor.js',
			['profuzion-bricks-cursor-fix'],
			$ver,
			true
		);
	}

	$vendor_dir = PROFUZION_BRICK_DIR . '/assets/js/vendor';
	$gsap_path = $vendor_dir . '/gsap.min.js';
	$st_path = $vendor_dir . '/ScrollTrigger.min.js';
	$three_path = $vendor_dir . '/three.min.js';
	$use_vendor = defined('PROFUZION_VENDOR_LOCAL') && PROFUZION_VENDOR_LOCAL
		&& file_exists($gsap_path) && file_exists($st_path);

	if ($use_vendor) {
		wp_register_script(
			'gsap',
			PROFUZION_BRICK_URI . '/assets/js/vendor/gsap.min.js',
			[],
			(string) filemtime($gsap_path),
			true
		);
		wp_register_script(
			'gsap-scrolltrigger',
			PROFUZION_BRICK_URI . '/assets/js/vendor/ScrollTrigger.min.js',
			['gsap'],
			(string) filemtime($st_path),
			true
		);
	} else {
		wp_register_script(
			'gsap',
			'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/gsap.min.js',
			[],
			'3.15.0',
			true
		);
		wp_register_script(
			'gsap-scrolltrigger',
			'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollTrigger.min.js',
			['gsap'],
			'3.15.0',
			true
		);
	}

	wp_enqueue_script('gsap');
	wp_enqueue_script('gsap-scrolltrigger');
	wp_enqueue_script(
		'profuzion-motion',
		PROFUZION_BRICK_URI . '/assets/js/motion.js',
		['gsap', 'gsap-scrolltrigger'],
		$ver,
		true
	);

	if (PROFUZION_V6_SCROLL_ANIMS) {
		wp_enqueue_script(
			'pfz-v6-animations',
			PROFUZION_BRICK_URI . '/assets/js/pfz-v6-animations.js',
			['gsap', 'gsap-scrolltrigger'],
			$ver,
			true
		);
	}

	wp_enqueue_script(
		'profuzion-home-interactivity',
		PROFUZION_BRICK_URI . '/assets/js/pfz-home-interactivity.js',
		PROFUZION_V6_SCROLL_ANIMS ? ['gsap', 'gsap-scrolltrigger', 'pfz-v6-animations'] : ['gsap', 'gsap-scrolltrigger'],
		$ver,
		true
	);

	if (profuzion_should_enqueue_halftone()) {
		$three_ok = $use_vendor && file_exists($three_path);
		if ($three_ok) {
			wp_enqueue_script(
				'three',
				PROFUZION_BRICK_URI . '/assets/js/vendor/three.min.js',
				[],
				(string) filemtime($three_path),
				true
			);
		} else {
			wp_enqueue_script(
				'three',
				'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js',
				[],
				'0.149.0',
				true
			);
		}
		wp_enqueue_script(
			'pfz-halftone-hero',
			PROFUZION_BRICK_URI . '/assets/js/pfz-halftone-hero.js',
			['three'],
			$ver,
			true
		);
	}
}, 20);
