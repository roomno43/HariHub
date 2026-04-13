<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\Csrf;
use App\Helpers\Response;
use App\Helpers\Sanitizer;
use App\Helpers\SessionManager;
use App\Models\User;

class AuthController
{
    public static function status(): void
    {
        SessionManager::start();
        $userId = SessionManager::getUserId();
        if ($userId === null) {
            Response::success(['authenticated' => false, 'csrf_token' => Csrf::generateToken()]);
        }

        $user = User::findById($userId);
        if (!$user) {
            SessionManager::destroy();
            Response::success(['authenticated' => false, 'csrf_token' => Csrf::generateToken()]);
        }

        Response::success([
            'authenticated' => true,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
            ],
            'csrf_token' => Csrf::generateToken(),
        ]);
    }

    public static function login(array $body): void
    {
        SessionManager::start();
        if (!Csrf::validateToken($body['csrf_token'] ?? null)) {
            Response::error('Invalid CSRF token', 403);
        }

        $email = Sanitizer::sanitizeEmail($body['email'] ?? '');
        $password = trim($body['password'] ?? '');
        if ($email === '' || $password === '') {
            Response::error('Email and password are required', 422);
        }

        $user = User::authenticate($email, $password);
        if (!$user) {
            Response::error('Invalid credentials', 401);
        }

        SessionManager::regenerate();
        SessionManager::setUserId($user->id);
        Response::success(['user' => ['id' => $user->id, 'username' => $user->username, 'email' => $user->email]]);
    }

    public static function register(array $body): void
    {
        SessionManager::start();
        if (!Csrf::validateToken($body['csrf_token'] ?? null)) {
            Response::error('Invalid CSRF token', 403);
        }

        $email = Sanitizer::sanitizeEmail($body['email'] ?? '');
        $password = trim($body['password'] ?? '');
        $username = Sanitizer::sanitizeUsername($body['username'] ?? '');

        if ($email === '' || $password === '') {
            Response::error('Email and password are required', 422);
        }

        if ($username === '') {
            $username = self::generateAnonymousUsername();
        }

        if (User::findByEmail($email) !== null) {
            Response::error('Email is already registered.', 409);
        }

        if (User::findByUsername($username) !== null) {
            $username = $username . '_' . random_int(10, 99);
        }

        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $user = User::create($username, $email, $passwordHash);

        SessionManager::regenerate();
        SessionManager::setUserId($user->id);
        Response::success(['user' => ['id' => $user->id, 'username' => $user->username, 'email' => $user->email]]);
    }

    public static function logout(array $body): void
    {
        SessionManager::start();
        if (!Csrf::validateToken($body['csrf_token'] ?? null)) {
            Response::error('Invalid CSRF token', 403);
        }

        SessionManager::destroy();
        Response::success(['message' => 'Logged out successfully']);
    }

    private static function generateAnonymousUsername(): string
    {
        $adjectives = ['Quiet', 'Silent', 'Happy', 'Wise', 'Brave', 'Swift', 'Bold', 'Calm', 'Keen', 'Lone'];
        $nouns = ['Panda', 'Wolf', 'Lion', 'Eagle', 'Fox', 'Bear', 'Hawk', 'Otter', 'Deer', 'Lynx'];
        return $adjectives[array_rand($adjectives)] . $nouns[array_rand($nouns)] . '_' . random_int(1, 99);
    }
}
