<?php
require_once 'db.php';

$result = $conn->query("SELECT name, score FROM multiplication_scores ORDER BY score DESC, created_at ASC LIMIT 10");

$scores = [];
while ($row = $result->fetch_assoc()) {
  $scores[] = $row;
}

header("Content-Type: application/json");
echo json_encode($scores);
?>
