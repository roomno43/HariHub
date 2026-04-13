<?php

declare(strict_types=1);

namespace App\Models;

use App\Helpers\Database;

class Report
{
    public static function create(int $reporterId, string $type, string $targetType, int $targetId, string $reason): void
    {
        $db = Database::getInstance();
        $stmt = $db->prepare('INSERT INTO reports (reporter_id, type, target_type, target_id, reason, created_at) VALUES (:reporter_id, :type, :target_type, :target_id, :reason, NOW())');
        $stmt->execute([
            'reporter_id' => $reporterId,
            'type' => $type,
            'target_type' => $targetType,
            'target_id' => $targetId,
            'reason' => $reason,
        ]);
    }
}
