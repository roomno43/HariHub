<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Helpers\Response;
use App\Helpers\SessionManager;

class AuthMiddleware
{
    public static function requireAuth(): void
    {
        SessionManager::start();
        if (SessionManager::getUserId() === null) {
            Response::error('Authentication required', 401);
        }
    }
}
