<?php

declare(strict_types=1);

namespace App\Helpers;

class SessionManager
{
    public static function start(): void
    {
        $config = require __DIR__ . '/../../config/app.php';
        if (session_status() === PHP_SESSION_NONE) {
            session_name($config['session_name']);
            session_start();
        }
    }

    public static function regenerate(): void
    {
        if (session_status() !== PHP_SESSION_NONE) {
            session_regenerate_id(true);
        }
    }

    public static function setUserId(int $userId): void
    {
        $_SESSION['user_id'] = $userId;
    }

    public static function getUserId(): ?int
    {
        return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    public static function destroy(): void
    {
        if (session_status() !== PHP_SESSION_NONE) {
            $_SESSION = [];
            session_destroy();
        }
    }
}
