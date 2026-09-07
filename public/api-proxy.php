<?php

/**
 * Same-origin proxy to the Laravel API host.
 * Browsers on some networks/PCs are blocked by Cloudflare on admin.*
 * (OPTIONS/GET 403 → "Failed to fetch"). Same-origin /api and /storage
 * avoid that cross-origin WAF path.
 */

$admin = 'https://admin.sanjoselogodesign.com';
$path = isset($_GET['path']) ? (string) $_GET['path'] : '';
$storage = isset($_GET['storage']) ? (string) $_GET['storage'] : '';

if ($storage !== '') {
    $target = $admin.'/storage/'.ltrim($storage, '/');
} elseif ($path !== '') {
    $target = $admin.'/api/'.ltrim($path, '/');
} else {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Missing proxy path.']);
    exit;
}

$query = isset($_SERVER['QUERY_STRING']) ? (string) $_SERVER['QUERY_STRING'] : '';
$query = preg_replace('/(?:^|&)(?:path|storage)=[^&]*/', '', $query);
$query = ltrim((string) $query, '&');
if ($query !== '') {
    $target .= '?'.$query;
}

$headers = [];
if (!empty($_SERVER['HTTP_ACCEPT'])) {
    $headers[] = 'Accept: '.$_SERVER['HTTP_ACCEPT'];
}
if (!empty($_SERVER['CONTENT_TYPE'])) {
    $headers[] = 'Content-Type: '.$_SERVER['CONTENT_TYPE'];
} elseif (!empty($_SERVER['HTTP_CONTENT_TYPE'])) {
    $headers[] = 'Content-Type: '.$_SERVER['HTTP_CONTENT_TYPE'];
}
if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
    $headers[] = 'Authorization: '.$_SERVER['HTTP_AUTHORIZATION'];
}
$headers[] = 'X-Forwarded-For: '.($_SERVER['REMOTE_ADDR'] ?? '');
$headers[] = 'X-Requested-By: sanjose-frontend-proxy';

$ch = curl_init($target);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD'] ?? 'GET');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_TIMEOUT, 45);

if (in_array($_SERVER['REQUEST_METHOD'] ?? 'GET', ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
}

$response = curl_exec($ch);
if ($response === false) {
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Unable to reach payment server.']);
    exit;
}

$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$respHeaders = substr($response, 0, $headerSize);
$body = substr($response, $headerSize);
curl_close($ch);

http_response_code($status ?: 502);

foreach (explode("\r\n", $respHeaders) as $line) {
    if (
        stripos($line, 'Content-Type:') === 0
        || stripos($line, 'Content-Disposition:') === 0
        || stripos($line, 'Cache-Control:') === 0
    ) {
        header($line, true);
    }
}

echo $body;
