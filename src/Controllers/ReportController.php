<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\Csrf;
use App\Helpers\Response;
use App\Helpers\Sanitizer;
use App\Helpers\SessionManager;
use App\Middleware\AuthMiddleware;
use App\Models\Report;

class ReportController
{
    public static function create(array $body): void
    {
        AuthMiddleware::requireAuth();
        SessionManager::start();
        if (!Csrf::validateToken($body['csrf_token'] ?? null)) {
            Response::error('Invalid CSRF token', 403);
        }

        $type = Sanitizer::sanitizeText($body['type'] ?? '');
        $targetType = Sanitizer::sanitizeText($body['target_type'] ?? 'post');
        $targetId = isset($body['target_id']) ? (int) $body['target_id'] : 0;
        $reason = Sanitizer::sanitizeText($body['reason'] ?? '');

        if ($type === '' || $targetId <= 0 || $reason === '') {
            Response::error('Report type, target and reason are required', 422);
        }

        $reporterId = SessionManager::getUserId();
        Report::create($reporterId, $type, $targetType, $targetId, $reason);
        Response::success(['message' => 'Report submitted successfully']);
    }
}
