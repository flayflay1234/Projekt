<?php
$host = 'localhost';
$db = 'minigames';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
  http_response_code(500);
  die("Połączenie nieudane: " . $conn->connect_error);
}

$name = $conn->real_escape_string($_POST['name']);
$score = floatval($_POST['score']);

$sql = "INSERT INTO cps_scores (name, score) VALUES ('$name', $score)";
$conn->query($sql);

$conn->close();
?>
