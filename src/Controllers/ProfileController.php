<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\Response;
use App\Helpers\SessionManager;
use App\Middleware\AuthMiddleware;
use App\Models\Post;
use App\Models\User;

class ProfileController
{
    public static function show(): void
    {
        AuthMiddleware::requireAuth();
        SessionManager::start();
        $userId = SessionManager::getUserId();
        $user = User::findById($userId);
        if (!$user) {
            Response::error('User not found', 404);
        }

        $posts = Post::findByUser($userId);
        $payload = array_map(static fn(Post $post) => [
            'id' => $post->id,
            'text' => $post->text,
            'color' => $post->color,
            'likes' => $post->likes,
            'comments' => 0,
            'time' => $post->time,
            'date' => $post->createdAt,
        ], $posts);

        Response::success([
            'user' => ['id' => $user->id, 'username' => $user->username, 'bio' => 'Just trying to graduate. Engineering \'25. 🎓'],
            'stats' => ['posts' => count($posts), 'likes' => array_sum(array_map(fn(Post $post) => $post->likes, $posts)), 'comments' => 0],
            'posts' => $payload,
        ]);
    }
}
