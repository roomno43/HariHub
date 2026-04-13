<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Helpers\Response;
use App\Helpers\SessionManager;

class RateLimiter
{
    public static function check(string $key, int $intervalSeconds = 5): void
    {
        SessionManager::start();
        $rateKey = sprintf('rate_limit_%s', $key);
        $now = time();
        $lastAttempt = $_SESSION[$rateKey] ?? 0;

        if ($lastAttempt && ($now - $lastAttempt) < $intervalSeconds) {
            Response::error('Please wait a few seconds before trying again.', 429);
        }

        $_SESSION[$rateKey] = $now;
    }
}
