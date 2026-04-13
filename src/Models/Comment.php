<?php

declare(strict_types=1);

namespace App\Models;

use App\Helpers\Database;
use PDO;

class Comment
{
    public int $id;
    public int $postId;
    public int $userId;
    public ?int $parentCommentId;
    public string $text;
    public string $createdAt;
    public string $username;
    public ?string $replyTo;

    public static function allByPost(int $postId): array
    {
        $db = Database::getInstance();
        $stmt = $db->prepare(
            'SELECT c.id, c.post_id, c.user_id, c.parent_comment_id, c.text, c.created_at, u.username, p.user_id AS reply_to_user_id
            FROM comments c
            JOIN users u ON c.user_id = u.id
            LEFT JOIN comments p ON c.parent_comment_id = p.id
            WHERE c.post_id = :post_id
            ORDER BY c.created_at ASC'
        );
        $stmt->execute(['post_id' => $postId]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $comments = [];
        foreach ($rows as $row) {
            $comment = new self();
            $comment->id = (int) $row['id'];
            $comment->postId = (int) $row['post_id'];
            $comment->userId = (int) $row['user_id'];
            $comment->parentCommentId = $row['parent_comment_id'] !== null ? (int) $row['parent_comment_id'] : null;
            $comment->text = $row['text'];
            $comment->createdAt = $row['created_at'];
            $comment->username = $row['username'];
            $comment->replyTo = null;
            if ($row['reply_to_user_id'] !== null) {
                $replyUserStmt = Database::getInstance()->prepare('SELECT username FROM users WHERE id = :id');
                $replyUserStmt->execute(['id' => $row['reply_to_user_id']]);
                $replyUserData = $replyUserStmt->fetch(PDO::FETCH_ASSOC);
                $comment->replyTo = $replyUserData['username'] ?? null;
            }
            $comments[] = $comment;
        }

        return $comments;
    }

    public static function create(int $postId, int $userId, string $text, ?int $parentCommentId = null): self
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('INSERT INTO comments (post_id, user_id, parent_comment_id, text, created_at) VALUES (:post_id, :user_id, :parent_comment_id, :text, NOW())');
        $stmt->execute([
            'post_id' => $postId,
            'user_id' => $userId,
            'parent_comment_id' => $parentCommentId,
            'text' => $text,
        ]);

        return self::findById((int) $db->lastInsertId());
    }

    public static function findById(int $id): ?self
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('SELECT c.id, c.post_id, c.user_id, c.parent_comment_id, c.text, c.created_at, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            return null;
        }

        $comment = new self();
        $comment->id = (int) $row['id'];
        $comment->postId = (int) $row['post_id'];
        $comment->userId = (int) $row['user_id'];
        $comment->parentCommentId = $row['parent_comment_id'] !== null ? (int) $row['parent_comment_id'] : null;
        $comment->text = $row['text'];
        $comment->createdAt = $row['created_at'];
        $comment->username = $row['username'];
        $comment->replyTo = null;
        return $comment;
    }
}
