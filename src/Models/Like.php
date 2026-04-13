<?php

declare(strict_types=1);

namespace App\Models;

use App\Helpers\Database;
use PDO;

class Like
{
    public static function hasLiked(int $userId, int $postId): bool
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('SELECT 1 FROM likes WHERE user_id = :user_id AND post_id = :post_id LIMIT 1');
        $stmt->execute(['user_id' => $userId, 'post_id' => $postId]);
        return (bool) $stmt->fetchColumn();
    }

    public static function toggle(int $userId, int $postId): bool
    {
        if (self::hasLiked($userId, $postId)) {
            self::remove($userId, $postId);
            Post::decrementLikes($postId);
            return false;
        }

        self::add($userId, $postId);
        Post::incrementLikes($postId);
        return true;
    }

    private static function add(int $userId, int $postId): void
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('INSERT INTO likes (user_id, post_id, created_at) VALUES (:user_id, :post_id, NOW())');
        $stmt->execute(['user_id' => $userId, 'post_id' => $postId]);
    }

    private static function remove(int $userId, int $postId): void
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('DELETE FROM likes WHERE user_id = :user_id AND post_id = :post_id');
        $stmt->execute(['user_id' => $userId, 'post_id' => $postId]);
    }
}
