<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Helpers\Csrf;
use App\Helpers\Response;
use App\Helpers\Sanitizer;
use App\Helpers\SessionManager;
use App\Middleware\AuthMiddleware;
use App\Middleware\RateLimiter;
use App\Models\Comment;
use App\Models\Post;

class CommentController
{
    public static function index(array $query): void
    {
        $postId = isset($query['post_id']) ? (int) $query['post_id'] : 0;
        if ($postId <= 0) {
            Response::error('Invalid post identifier', 422);
        }

        $post = Post::findById($postId);
        if (!$post) {
            Response::error('Post not found', 404);
        }

        $comments = Comment::allByPost($postId);
        $payload = array_map(static fn(Comment $comment) => [
            'id' => $comment->id,
            'user' => $comment->username,
            'text' => $comment->text,
            'time' => $comment->createdAt,
            'parent_comment_id' => $comment->parentCommentId,
            'reply_to' => $comment->replyTo,
        ], $comments);

        Response::success(['comments' => $payload]);
    }

    public static function create(array $body): void
    {
        AuthMiddleware::requireAuth();
        SessionManager::start();
        if (!Csrf::validateToken($body['csrf_token'] ?? null)) {
            Response::error('Invalid CSRF token', 403);
        }

        RateLimiter::check('comment_create');

        $postId = isset($body['post_id']) ? (int) $body['post_id'] : 0;
        if ($postId <= 0) {
            Response::error('Invalid post identifier', 422);
        }

        $text = Sanitizer::sanitizeText($body['text'] ?? '');
        if ($text === '') {
            Response::error('Comment cannot be empty', 422);
        }

        $parentId = isset($body['parent_comment_id']) ? (int) $body['parent_comment_id'] : null;
        $userId = SessionManager::getUserId();
        $comment = Comment::create($postId, $userId, $text, $parentId);

        if (!$comment) {
            Response::error('Unable to create comment', 500);
        }

        Response::success(['comment' => [
            'id' => $comment->id,
            'user' => $comment->username,
            'text' => $comment->text,
            'time' => $comment->createdAt,
            'parent_comment_id' => $comment->parentCommentId,
            'reply_to' => $comment->replyTo,
        ]]);
    }
}
