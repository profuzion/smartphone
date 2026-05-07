$bricks_dir = get_stylesheet_directory() . '/bricks-import';
$result = ['steps' => []];

function pfz_load_json($path) {
    if (!file_exists($path)) return null;
    $data = json_decode(file_get_contents($path), true);
    return is_array($data) ? ($data['content'] ?? []) : null;
}

function pfz_update_template($slug, $type, $elements) {
    $existing = get_page_by_path($slug, OBJECT, 'bricks_template');
    if (!$existing) return ['error' => 'no template found for slug ' . $slug];
    $type_to_meta = [
        'header'  => '_bricks_page_header_2',
        'footer'  => '_bricks_page_footer_2',
        'page'    => '_bricks_page_content_2',
        'single'  => '_bricks_page_content_2',
    ];
    $content_meta = $type_to_meta[$type] ?? '_bricks_page_content_2';
    update_post_meta($existing->ID, $content_meta, $elements);
    return ['id' => $existing->ID, 'slug' => $slug, 'count' => count($elements)];
}

$result['steps']['header'] = pfz_update_template('pfz-v9-header', 'header',
    pfz_load_json($bricks_dir . '/profuzion-v6-bricks-header-import.json') ?? []);
$result['steps']['footer'] = pfz_update_template('pfz-v9-footer', 'footer',
    pfz_load_json($bricks_dir . '/profuzion-v6-bricks-footer-import.json') ?? []);
$result['steps']['home_template'] = pfz_update_template('pfz-v9-home', 'page',
    pfz_load_json($bricks_dir . '/profuzion-v2-bricks-import.json') ?? []);
$result['steps']['case'] = pfz_update_template('pfz-v9-case', 'single',
    pfz_load_json($bricks_dir . '/profuzion-v2-bricks-case-import.json') ?? []);

delete_transient('bricks_active_templates');
wp_cache_flush();
if (function_exists('rocket_clean_domain')) { rocket_clean_domain(); }
$result['steps']['cache'] = 'flushed';
return $result;
