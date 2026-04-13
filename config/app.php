<?php

declare(strict_types=1);

namespace App;

if (!function_exists('app_env')) {
    function app_env(string $key, mixed $default = null): mixed
    {
        static $data = null;
        if ($data === null) {
            $data = [];
            $envPath = __DIR__ . '/../.env';
            if (is_file($envPath)) {
                $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if ($line === '' || str_starts_with($line, '#')) {
                        continue;
                    }

                    [$name, $value] = array_map('trim', explode('=', $line, 2) + [1 => '']);
                    if ($name === '') {
                        continue;
                    }

                    if (str_starts_with($value, '"') && str_ends_with($value, '"')) {
                        $value = substr($value, 1, -1);
                    }
                    $data[$name] = $value;
                }
            }
        }

        return $data[$key] ?? $default;
    }
}

return [
    'app_name' => app_env('APP_NAME', 'UTD Confession'),
    'app_env' => app_env('APP_ENV', 'production'),
    'app_url' => app_env('APP_URL', 'http://localhost'),
    'debug' => filter_var(app_env('APP_DEBUG', 'false'), FILTER_VALIDATE_BOOLEAN),
    'session_name' => app_env('SESSION_NAME', 'utd_confession_session'),
    'csrf_secret' => app_env('CSRF_SECRET', 'change-me'),
    'db_host' => app_env('DB_HOST', '127.0.0.1'),
    'db_name' => app_env('DB_NAME', 'utd_confession'),
    'db_user' => app_env('DB_USER', 'root'),
    'db_pass' => app_env('DB_PASS', ''),
];
