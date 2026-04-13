<?php

declare(strict_types=1);

namespace App\Models;

use App\Helpers\Database;
use PDO;

class Post
{
    public int $id;
    public int $userId;
    public string $text;
    public string $color;
    public int $likes;
    public int $shares;
    public string $createdAt;
    public string $author;
    public string $time;

    public static function all(): array
    {
        $db = Database::getInstance();
        $stmt = $db->query('SELECT p.id, p.user_id, p.text, p.color, p.likes_count, p.shares_count, p.created_at, u.username AS author FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC');
        return array_map([self::class, 'hydrate'], $stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public static function create(int $userId, string $text, string $color): self
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('INSERT INTO posts (user_id, text, color, likes_count, shares_count, created_at) VALUES (:user_id, :text, :color, 0, 0, NOW())');
        $stmt->execute([
            'user_id' => $userId,
            'text' => $text,
            'color' => $color,
        ]);

        return self::findById((int) $db->lastInsertId());
    }

    public static function findById(int $id): ?self
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('SELECT p.id, p.user_id, p.text, p.color, p.likes_count, p.shares_count, p.created_at, u.username AS author FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? self::hydrate($data) : null;
    }

    public static function findByUser(int $userId): array
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('SELECT p.id, p.user_id, p.text, p.color, p.likes_count, p.shares_count, p.created_at, u.username AS author FROM posts p JOIN users u ON p.user_id = u.id WHERE p.user_id = :user_id ORDER BY p.created_at DESC');
        $stmt->execute(['user_id' => $userId]);
        return array_map([self::class, 'hydrate'], $stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    public static function incrementLikes(int $postId): void
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('UPDATE posts SET likes_count = likes_count + 1 WHERE id = :id');
        $stmt->execute(['id' => $postId]);
    }

    public static function decrementLikes(int $postId): void
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('UPDATE posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = :id');
        $stmt->execute(['id' => $postId]);
    }

    private static function hydrate(array $data): self
    {
        $post = new self();
        $post->id = (int) $data['id'];
        $post->userId = (int) $data['user_id'];
        $post->text = $data['text'];
        $post->color = $data['color'];
        $post->likes = (int) $data['likes_count'];
        $post->shares = (int) $data['shares_count'];
        $post->createdAt = $data['created_at'];
        $post->author = $data['author'];
        $post->time = self::formatTimeAgo(new \DateTimeImmutable($data['created_at']));
        return $post;
    }

    private static function formatTimeAgo(\DateTimeImmutable $dateTime): string
    {
        $now = new \DateTimeImmutable();
        $diff = $now->getTimestamp() - $dateTime->getTimestamp();
        if ($diff < 3600) {
            return floor($diff / 60) . 'm ago';
        }
        if ($diff < 86400) {
            return floor($diff / 3600) . 'h ago';
        }
        return floor($diff / 86400) . 'd ago';
    }
}
