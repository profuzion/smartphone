<?php
/**
 * Case study CPT — URLs: /work/{post-slug}/
 */
defined('ABSPATH') || exit;

add_action('init', static function (): void {
	register_post_type(
		'pfz_case_study',
		[
			'labels' => [
				'name' => 'Case studies',
				'singular_name' => 'Case study',
				'add_new' => 'Add case study',
				'add_new_item' => 'Add new case study',
				'edit_item' => 'Edit case study',
				'view_item' => 'View case study',
				'view_items' => 'View case studies',
				'search_items' => 'Search case studies',
				'not_found' => 'No case studies found',
				'all_items' => 'All case studies',
			],
			'public' => true,
			'has_archive' => true,
			'rewrite' => [
				'slug' => 'work',
				'with_front' => false,
			],
			'menu_position' => 21,
			'menu_icon' => 'dashicons-portfolio',
			'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
			'show_in_rest' => true,
			'capability_type' => 'post',
		]
	);
});
