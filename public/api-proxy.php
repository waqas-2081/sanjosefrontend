<?php

/**
 * Same-origin gateway to Laravel (bypasses Cloudflare rules that target "/api").
 *
 * Public paths:
 *   /sjld-svc/*    → admin /api/*
 *   /sjld-media/*  → admin /storage/*
 *
 * Optional: create api-proxy.local.php returning:
 *   ['origin_ip' => 'x.x.x.x', 'origin_port' => 443, 'admin_host' => 'admin.sanjoselogodesign.com']
 * so curl talks to the real server and skips Cloudflare entirely.
 */

$adminHost = 'admin.sanjoselogodesign.com';
$adminPublic = 'https://'.$adminHost;
$originIp = null;
$originPort = 443;

// Same-server proxy: talk to this machine directly (skips Cloudflare edge).
if (!empty($_SERVER['SERVER_ADDR']) && filter_var($_SERVER['SERVER_ADDR'], FILTER_VALIDATE_IP)) {
    $originIp = $_SERVER['SERVER_ADDR'];
}

$localConfig = __DIR__.'/api-proxy.local.php';
if (is_file($localConfig)) {
    $cfg = include $localConfig;
    if (is_array($cfg)) {
        if (!empty($cfg['admin_host'])) {
            $adminHost = (string) $cfg['admin_host'];
            $adminPublic = 'https://'.$adminHost;
        }
        if (!empty($cfg['origin_ip'])) {
            $originIp = (string) $cfg['origin_ip'];
        }
        if (!empty($cfg['origin_port'])) {
            $originPort = (int) $cfg['origin_port'];
        }
    }
}

$path = isset($_GET['path']) ? (string) $_GET['path'] : '';
$storage = isset($_GET['storage']) ? (string) $_GET['storage'] : '';

if ($storage !== '') {
    $urlPath = '/storage/'.ltrim($storage, '/');
} elseif ($path !== '') {
    $urlPath = '/api/'.ltrim($path, '/');
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
    $urlPath .= '?'.$query;
}

$target = $adminPublic.$urlPath;

$headers = [
    'Host: '.$adminHost,
    'Accept: application/json',
    'User-Agent: SanJoseFrontendProxy/1.0',
    'X-Forwarded-For: '.($_SERVER['REMOTE_ADDR'] ?? ''),
    'X-Requested-By: sanjose-frontend-proxy',
];

$requestContentType = '';
if (!empty($_SERVER['CONTENT_TYPE'])) {
    $requestContentType = (string) $_SERVER['CONTENT_TYPE'];
} elseif (!empty($_SERVER['HTTP_CONTENT_TYPE'])) {
    $requestContentType = (string) $_SERVER['HTTP_CONTENT_TYPE'];
}

$isMultipart = stripos($requestContentType, 'multipart/form-data') !== false;

// For multipart, curl must set Content-Type + boundary itself when POSTFIELDS is an array.
if (!$isMultipart && $requestContentType !== '') {
    $headers[] = 'Content-Type: '.$requestContentType;
}
if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
    $headers[] = 'Authorization: '.$_SERVER['HTTP_AUTHORIZATION'];
}

/**
 * Rebuild multipart fields from $_POST / $_FILES.
 * PHP empties php://input for multipart requests, so raw forwarding always drops the body.
 *
 * @return array<string, mixed>
 */
function sjld_build_multipart_fields()
{
    $fields = [];

    $flatten = function ($key, $value) use (&$flatten, &$fields) {
        if (is_array($value)) {
            foreach ($value as $i => $item) {
                $flatten($key.'['.$i.']', $item);
            }
            return;
        }
        $fields[$key] = $value;
    };

    foreach ($_POST as $key => $value) {
        $flatten($key, $value);
    }

    foreach ($_FILES as $key => $file) {
        if (!isset($file['name'])) {
            continue;
        }

        if (is_array($file['name'])) {
            foreach ($file['name'] as $i => $name) {
                $error = $file['error'][$i] ?? UPLOAD_ERR_NO_FILE;
                if ($error !== UPLOAD_ERR_OK || empty($file['tmp_name'][$i])) {
                    continue;
                }
                $fields[$key.'['.$i.']'] = new CURLFile(
                    $file['tmp_name'][$i],
                    !empty($file['type'][$i]) ? $file['type'][$i] : 'application/octet-stream',
                    $name
                );
            }
            continue;
        }

        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || empty($file['tmp_name'])) {
            continue;
        }
        $fields[$key] = new CURLFile(
            $file['tmp_name'],
            !empty($file['type']) ? $file['type'] : 'application/octet-stream',
            $file['name']
        );
    }

    return $fields;
}

$method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
$body = null;
if (in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
    if ($isMultipart) {
        $body = sjld_build_multipart_fields();
    } else {
        $body = file_get_contents('php://input');
    }
}

/**
 * @return array{ok:bool,status:int,headers:string,body:string}|null
 */
function sjld_proxy_request($target, $method, $headers, $body, $resolve = null, $insecureSsl = false)
{
    if (!function_exists('curl_init')) {
        return null;
    }

    $ch = curl_init($target);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    // File uploads (briefs) need more than a short JSON timeout.
    curl_setopt($ch, CURLOPT_TIMEOUT, is_array($body) ? 120 : 20);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 4);

    if ($insecureSsl) {
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    } else {
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    }

    if (is_array($resolve) && $resolve) {
        curl_setopt($ch, CURLOPT_RESOLVE, $resolve);
    }

    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    }

    $response = curl_exec($ch);
    if ($response === false) {
        curl_close($ch);
        return null;
    }

    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $respHeaders = substr($response, 0, $headerSize);
    $respBody = substr($response, $headerSize);
    curl_close($ch);

    return [
        'ok' => true,
        'status' => $status ?: 502,
        'headers' => $respHeaders,
        'body' => $respBody,
    ];
}

$result = null;
$resolveTargets = [];

if ($originIp) {
    $resolveTargets[] = $originIp;
}
$resolveTargets[] = '127.0.0.1';
$resolveTargets[] = '::1';

// Prefer direct machine IP / loopback so Cloudflare WAF never sees this hop.
foreach (array_unique($resolveTargets) as $ip) {
    foreach ([443, 80, 8081, 8443] as $port) {
        $scheme = in_array($port, [80, 8081], true) ? 'http' : 'https';
        $directTarget = $scheme.'://'.$adminHost.$urlPath;
        $try = sjld_proxy_request(
            $directTarget,
            $method,
            $headers,
            $body,
            [$adminHost.':'.$port.':'.$ip],
            $scheme === 'http' || $port !== 443
        );
        if ($try && $try['status'] > 0 && $try['status'] < 500 && $try['status'] !== 403) {
            $contentType = '';
            foreach (explode("\r\n", $try['headers']) as $line) {
                if (stripos($line, 'Content-Type:') === 0) {
                    $contentType = strtolower($line);
                    break;
                }
            }
            if (strpos($contentType, 'json') !== false || (is_string($try['body']) && str_starts_with(ltrim($try['body']), '{'))) {
                $result = $try;
                break 2;
            }
        }
        if ($result === null && $try && $try['status'] !== 403) {
            $result = $try;
        }
    }
}

// Public HTTPS hostname (may still hit Cloudflare).
if ($result === null || $result['status'] === 403 || $result['status'] >= 500) {
    $public = sjld_proxy_request($target, $method, $headers, $body, null, false);
    if ($public && !($public['status'] === 403 && is_string($public['body']) && stripos($public['body'], 'cloudflare') !== false)) {
        $result = $public;
    } elseif ($result === null && $public) {
        $result = $public;
    }
}

if ($result === null) {
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Unable to reach payment server.']);
    exit;
}

// If Cloudflare challenge HTML came back, don't pretend it's an API response.
if (
    $result['status'] === 403
    && is_string($result['body'])
    && (stripos($result['body'], 'cloudflare') !== false || stripos($result['body'], 'Attention Required') !== false)
) {
    http_response_code(503);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'API blocked by Cloudflare. Add a WAF skip rule for /api/* on admin.sanjoselogodesign.com (or set origin_ip in api-proxy.local.php).',
    ]);
    exit;
}

http_response_code($result['status']);

foreach (explode("\r\n", $result['headers']) as $line) {
    if (
        stripos($line, 'Content-Type:') === 0
        || stripos($line, 'Content-Disposition:') === 0
        || stripos($line, 'Cache-Control:') === 0
    ) {
        header($line, true);
    }
}

echo $result['body'];
