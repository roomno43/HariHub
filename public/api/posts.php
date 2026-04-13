<?php

declare(strict_types=1);

require_once __DIR__ . '/../../src/autoload.php';

use App\Controllers\PostController;
use App\Helpers\Response;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    PostController::index();
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);
    if (!is_array($body)) {
        Response::error('Invalid JSON payload', 400);
    }

    PostController::create($body);
    exit;
}

http_response_code(405);
header('Allow: GET, POST');
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
