<?php
/**
 * Shared Bricks JSON → bricks_template import (WP-CLI + web / NovaMira execute-php).
 */
defined('ABSPATH') || exit;

/**
 * @return never
 */
function profuzion_bricks_import_die(string $message): void {
	if (defined('WP_CLI') && WP_CLI && class_exists('WP_CLI', false)) {
		WP_CLI::error($message);
	}
	throw new RuntimeException($message);
}

/**
 * @return array{0:string,1:string} [ meta_key, template_type ]
 */
function profuzion_bricks_meta_for_import(string $basename): array {
	switch ($basename) {
		case 'profuzion-v6-bricks-header-import.json':
			return ['_bricks_page_header_2', 'header'];
		case 'profuzion-v6-bricks-footer-import.json':
			return ['_bricks_page_footer_2', 'footer'];
		case 'profuzion-v2-bricks-import.json':
			return ['_bricks_page_content_2', 'content'];
		case 'profuzion-v2-bricks-case-import.json':
			return ['_bricks_page_content_2', 'content'];
		default:
			profuzion_bricks_import_die("Unknown import file: {$basename}");
	}
}

/**
 * @param array<int,mixed> $elements
 */
function profuzion_bricks_clear_stale_template_meta(int $post_id, string $primary_key): void {
	$keys = ['_bricks_page_header_2', '_bricks_page_footer_2', '_bricks_page_content_2'];
	foreach ($keys as $k) {
		if ($k !== $primary_key) {
			delete_post_meta($post_id, $k);
		}
	}
}

/**
 * @param array<int,mixed> $elements
 */
function profuzion_bricks_upsert_template(string $slug, string $title, string $template_type, string $meta_key, array $elements, bool $dry_run): int {
	if (!post_type_exists('bricks_template')) {
		profuzion_bricks_import_die('Post type bricks_template is not registered. Activate the Bricks parent theme.');
	}

	$existing = get_posts(
		[
			'post_type'              => 'bricks_template',
			'name'                   => $slug,
			'post_status'            => 'any',
			'posts_per_page'         => 1,
			'fields'                 => 'ids',
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
		]
	);

	$post_id = isset($existing[0]) ? (int) $existing[0] : 0;

	if ($dry_run) {
		if (defined('WP_CLI') && WP_CLI && class_exists('WP_CLI', false)) {
			WP_CLI::log(($post_id ? 'Would update' : 'Would create') . " template slug={$slug} type={$template_type}");
		}
		return $post_id > 0 ? $post_id : 0;
	}

	if ($post_id) {
		wp_update_post(
			[
				'ID'          => $post_id,
				'post_title'  => $title,
				'post_status' => 'publish',
				'post_name'   => $slug,
				'post_type'   => 'bricks_template',
			]
		);
	} else {
		$post_id = (int) wp_insert_post(
			[
				'post_title'  => $title,
				'post_status' => 'publish',
				'post_name'   => $slug,
				'post_type'   => 'bricks_template',
			],
			true
		);
		if (!$post_id || is_wp_error($post_id)) {
			profuzion_bricks_import_die(is_wp_error($post_id) ? $post_id->get_error_message() : 'wp_insert_post failed');
		}
	}

	update_post_meta($post_id, '_bricks_template_type', $template_type);
	profuzion_bricks_clear_stale_template_meta($post_id, $meta_key);
	update_post_meta($post_id, $meta_key, $elements);

	return $post_id;
}

/**
 * Hard-delete bricks_template posts by slug (used to retire pfz-v6-* after v9 handoff).
 *
 * @param array<int,string> $slugs
 */
function profuzion_purge_bricks_templates_by_slug(array $slugs): int {
	if (!post_type_exists('bricks_template')) {
		return 0;
	}
	$deleted = 0;
	foreach ($slugs as $slug) {
		$posts = get_posts(
			[
				'post_type'              => 'bricks_template',
				'name'                   => $slug,
				'post_status'            => 'any',
				'posts_per_page'         => -1,
				'fields'                 => 'ids',
				'no_found_rows'          => true,
				'update_post_meta_cache' => false,
				'suppress_filters'       => true,
			]
		);
		foreach ($posts as $pid) {
			if (wp_delete_post((int) $pid, true)) {
				++$deleted;
			}
		}
	}
	return $deleted;
}

/**
 * Import bundled JSON from active child theme bricks-import/.
 *
 * @return array{lines:string[], success:bool}
 */
function profuzion_import_bricks_from_theme_directory(bool $dry_run = false): array {
	$lines   = [];
	$dir     = trailingslashit(get_stylesheet_directory()) . 'bricks-import';

	if (!is_dir($dir)) {
		profuzion_bricks_import_die("Missing directory: {$dir}. Deploy bricks-import/ from npm run wp:handoff.");
	}

	if (!$dry_run) {
		$n = profuzion_purge_bricks_templates_by_slug(
			[
				'pfz-v6-header',
				'pfz-v6-footer',
				'pfz-v6-home',
				'pfz-v6-hero-prompt',
				'pfz-v6-case',
			]
		);
		if ($n > 0) {
			$lines[] = "Removed {$n} legacy pfz-v6 Bricks template post(s).";
			if (defined('WP_CLI') && WP_CLI && class_exists('WP_CLI', false)) {
				WP_CLI::log(end($lines));
			}
		}
		if (function_exists('wp_cache_flush')) {
			wp_cache_flush();
		}
	}

	$map = [
		'profuzion-v6-bricks-header-import.json' => ['slug' => 'pfz-v9-header', 'title' => 'Profuzion v9 · Header'],
		'profuzion-v6-bricks-footer-import.json' => ['slug' => 'pfz-v9-footer', 'title' => 'Profuzion v9 · Footer'],
		'profuzion-v2-bricks-import.json'       => ['slug' => 'pfz-v9-home', 'title' => 'Profuzion v9 · Home'],
		'profuzion-v2-bricks-case-import.json'   => ['slug' => 'pfz-v9-case', 'title' => 'Profuzion v9 · Case study'],
	];

	foreach ($map as $file => $info) {
		$path = $dir . '/' . $file;
		if (!is_readable($path)) {
			profuzion_bricks_import_die("Missing or unreadable: {$path}");
		}
		$raw = file_get_contents($path);
		if ($raw === false) {
			profuzion_bricks_import_die("Could not read: {$path}");
		}
		$data = json_decode($raw, true);
		if (!is_array($data) || empty($data['content']) || !is_array($data['content'])) {
			profuzion_bricks_import_die("Invalid Bricks JSON (expected content array): {$file}");
		}
		list($meta_key, $template_type) = profuzion_bricks_meta_for_import($file);

		$pid = profuzion_bricks_upsert_template(
			$info['slug'],
			$info['title'],
			$template_type,
			$meta_key,
			$data['content'],
			$dry_run
		);

		if (!$dry_run) {
			$lines[] = "Imported {$file} → ID {$pid} ({$info['slug']})";
			if (defined('WP_CLI') && WP_CLI && class_exists('WP_CLI', false)) {
				WP_CLI::log(end($lines));
			}
		}
	}

	if (!$dry_run) {
		$lines[] = 'Profuzion Bricks templates imported. Set Reading → static homepage if needed.';
	}

	return ['lines' => $lines, 'success' => true];
}
