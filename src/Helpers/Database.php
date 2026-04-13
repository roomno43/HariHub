<?php

declare(strict_types=1);

namespace App\Helpers;

use PDO;

class Database
{
    private static ?PDO $instance = null;

    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            $config = require __DIR__ . '/../../config/database.php';
            self::$instance = new PDO(
                $config['dsn'],
                $config['username'],
                $config['password'],
                $config['options']
            );
        }

        return self::$instance;
    }
}
