<?php

declare(strict_types=1);

namespace App\Helpers;

class Sanitizer
{
    public static function sanitizeText(string $text): string
    {
        return htmlspecialchars(trim($text), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    public static function sanitizeEmail(string $email): string
    {
        return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
    }

    public static function sanitizeUsername(string $username): string
    {
        $value = trim($username);
        $value = preg_replace('/[^A-Za-z0-9_]/', '', $value);
        return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}
