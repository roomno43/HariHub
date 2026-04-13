<?php

declare(strict_types=1);

require_once __DIR__ . '/../../src/autoload.php';

use App\Controllers\AuthController;

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

AuthController::status();
