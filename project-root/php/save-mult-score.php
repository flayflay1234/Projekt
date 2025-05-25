<?php
require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"] ?? '';
  $score = intval($_POST["score"] ?? 0);

  if (!empty($name) && $score >= 0) {
    $stmt = $conn->prepare("INSERT INTO multiplication_scores (name, score) VALUES (?, ?)");
    $stmt->bind_param("si", $name, $score);
    $stmt->execute();
    $stmt->close();
  }
}
?>
