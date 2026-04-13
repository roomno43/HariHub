<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\Csrf;
use App\Helpers\Response;
use App\Helpers\Sanitizer;
use App\Helpers\SessionManager;
use App\Middleware\AuthMiddleware;
use App\Middleware\RateLimiter;
use App\Models\Like;
use App\Models\Post;

class PostController
{
    public static function index(): void
    {
        $posts = Post::all();
        $payload = array_map(static fn(Post $post) => [
            'id' => $post->id,
            'author' => $post->author,
            'text' => $post->text,
            'color' => $post->color,
            'likes' => $post->likes,
            'shares' => $post->shares,
            'time' => $post->time,
            'date' => $post->createdAt,
        ], $posts);

        Response::success(['posts' => $payload]);
    }

    public static function create(array $body): void
    {
        AuthMiddleware::requireAuth();
        SessionManager::start();
        if (!Csrf::validateToken($body['csrf_token'] ?? null)) {
            Response::error('Invalid CSRF token', 403);
        }

        RateLimiter::check('post_create');

        $text = Sanitizer::sanitizeText($body['text'] ?? '');
        $color = $body['color'] ?? 'pink';

        if ($text === '') {
            Response::error('Post text cannot be empty', 422);
        }

        $userId = SessionManager::getUserId();
        $post = Post::create($userId, $text, $color);
        Response::success(['post' => [
            'id' => $post->id,
            'author' => $post->author,
            'text' => $post->text,
            'color' => $post->color,
            'likes' => $post->likes,
            'shares' => $post->shares,
            'time' => $post->time,
            'date' => $post->createdAt,
        ]]);
    }

    public static function toggleLike(array $body): void
    {
        AuthMiddleware::requireAuth();
        SessionManager::start();
        if (!Csrf::validateToken($body['csrf_token'] ?? null)) {
            Response::error('Invalid CSRF token', 403);
        }

        $postId = isset($body['post_id']) ? (int) $body['post_id'] : 0;
        if ($postId <= 0) {
            Response::error('Invalid post identifier', 422);
        }

        $userId = SessionManager::getUserId();
        $liked = Like::toggle($userId, $postId);
        $post = Post::findById($postId);
        if (!$post) {
            Response::error('Post not found', 404);
        }

        Response::success(['liked' => $liked, 'likes' => $post->likes]);
    }
}
