<?php
/**
 * Wire Profuzion v9 Bricks templates (v2 body/case + header/footer shell) without Conditions UI.
 *
 * @see bricks/active_templates — Bricks 1.8.4+
 */
defined('ABSPATH') || exit;

/** Set false in wp-config.php to manage template conditions only in Bricks. */
if (defined('PROFUZION_AUTO_BRICKS_TEMPLATES') && !PROFUZION_AUTO_BRICKS_TEMPLATES) {
	return;
}

/**
 * When true (default): static front page always uses template slug pfz-v9-home for **content**,
 * ignoring any Bricks layout saved on the Page itself. Edit home via imported template + redeploy/import.
 * Set false in wp-config.php (before theme loads) to restore legacy behaviour (pfz-v9-home only when Page body is empty).
 */
if (!defined('PROFUZION_FORCE_PFZ_HOME_TEMPLATE')) {
	define('PROFUZION_FORCE_PFZ_HOME_TEMPLATE', true);
}

/**
 * @return int Bricks template post ID or 0
 */
function profuzion_bricks_template_id(string $slug): int {
	$posts = get_posts(
		[
			'post_type'              => 'bricks_template',
			'name'                   => $slug,
			'post_status'            => 'publish',
			'posts_per_page'         => 1,
			'fields'                 => 'ids',
			'no_found_rows'         => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
		]
	);
	return isset($posts[0]) ? (int) $posts[0] : 0;
}

add_filter(
	'bricks/active_templates',
	static function (array $active_templates, $post_id, string $content_type): array {
		if (!class_exists('\Bricks\Database')) {
			return $active_templates;
		}

		$header_id = profuzion_bricks_template_id('pfz-v9-header');
		$footer_id = profuzion_bricks_template_id('pfz-v9-footer');
		$home_id   = profuzion_bricks_template_id('pfz-v9-home');
		$case_id   = profuzion_bricks_template_id('pfz-v9-case');

		if ($header_id) {
			$active_templates['header'] = $header_id;
		}
		if ($footer_id) {
			$active_templates['footer'] = $footer_id;
		}

		if ($content_type !== 'content' || !$post_id) {
			return $active_templates;
		}

		if (get_post_type((int) $post_id) === 'pfz_case_study' && $case_id) {
			$active_templates['content'] = $case_id;
			return $active_templates;
		}

		$front_id = (int) get_option('page_on_front', 0);
		if ($front_id > 0 && (int) $post_id === $front_id && $home_id) {
			if (PROFUZION_FORCE_PFZ_HOME_TEMPLATE) {
				$active_templates['content'] = $home_id;
			} else {
				$bricks_data = \Bricks\Database::get_data((int) $post_id, 'content');
				if (!is_array($bricks_data) || count($bricks_data) === 0) {
					$active_templates['content'] = $home_id;
				}
			}
		}

		return $active_templates;
	},
	10,
	3
);
