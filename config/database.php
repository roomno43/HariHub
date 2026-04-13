<?php

declare(strict_types=1);

namespace App;

use PDO;
use PDOException;

$config = require __DIR__ . '/app.php';

return [
    'dsn' => sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db_host'], $config['db_name']),
    'username' => $config['db_user'],
    'password' => $config['db_pass'],
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_STRINGIFY_FETCHES => false,
    ],
];
