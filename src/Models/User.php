<?php

declare(strict_types=1);

namespace App\Models;

use App\Helpers\Database;
use PDO;

class User
{
    public int $id;
    public string $username;
    public string $email;
    public string $passwordHash;
    public string $createdAt;

    public static function findByEmail(string $email): ?self
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? self::hydrate($data) : null;
    }

    public static function findByUsername(string $username): ?self
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('SELECT * FROM users WHERE username = :username LIMIT 1');
        $stmt->execute(['username' => $username]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? self::hydrate($data) : null;
    }

    public static function findById(int $id): ?self
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('SELECT * FROM users WHERE id = :id LIMIT 1');
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        return $data ? self::hydrate($data) : null;
    }

    public static function create(string $username, string $email, string $passwordHash): self
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('INSERT INTO users (username, email, password_hash, created_at) VALUES (:username, :email, :password_hash, NOW())');
        $stmt->execute([
            'username' => $username,
            'email' => $email,
            'password_hash' => $passwordHash,
        ]);

        return self::findById((int) $db->lastInsertId());
    }

    public static function authenticate(string $email, string $password): ?self
    {
        $user = self::findByEmail($email);
        if (!$user) {
            return null;
        }

        if (password_verify($password, $user->passwordHash)) {
            return $user;
        }

        return null;
    }

    private static function hydrate(array $data): self
    {
        $user = new self();
        $user->id = (int) $data['id'];
        $user->username = $data['username'];
        $user->email = $data['email'];
        $user->passwordHash = $data['password_hash'];
        $user->createdAt = $data['created_at'];
        return $user;
    }
}
