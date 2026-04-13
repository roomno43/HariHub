<?php

declare(strict_types=1);

namespace App\Helpers;

class Response
{
    public static function json(array $payload, int $statusCode = 200): never
    {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function error(string $message, int $statusCode = 400): never
    {
        self::json(['success' => false, 'message' => $message], $statusCode);
    }

    public static function success(array $data = [], int $statusCode = 200): never
    {
        self::json(['success' => true, ...$data], $statusCode);
    }
}
