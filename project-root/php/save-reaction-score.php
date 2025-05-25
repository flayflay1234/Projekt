<?php
$host = 'localhost';
$db = 'minigames';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  http_response_code(500);
  die("Błąd połączenia: " . $conn->connect_error);
}

$name = $conn->real_escape_string($_POST['name']);
$score = intval($_POST['score']);

$sql = "INSERT INTO reaction_scores (name, score) VALUES ('$name', $score)";
$conn->query($sql);
$conn->close();
?>
