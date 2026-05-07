<?php
/**
 * WP-CLI: import bundled v9 Bricks JSON into bricks_template posts.
 */
defined('ABSPATH') || exit;

if (!defined('WP_CLI') || !WP_CLI || !class_exists('WP_CLI', false)) {
	return;
}

require_once __DIR__ . '/bricks-import-lib.php';

WP_CLI::add_command(
	'profuzion import-bricks',
	static function (array $args, array $assoc_args): void {
		$dry_run = isset($assoc_args['dry-run']);
		try {
			profuzion_import_bricks_from_theme_directory($dry_run);
		} catch (Throwable $e) {
			WP_CLI::error($e->getMessage());
		}
		if (!$dry_run) {
			WP_CLI::success('Profuzion Bricks templates imported.');
		}
	},
	[
		'shortdesc' => 'Import Profuzion v9 Bricks templates from the child theme bricks-import/ folder.',
	]
);
