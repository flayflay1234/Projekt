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

$sql = "SELECT name, score FROM cps_scores ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$scores = [];

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $scores[] = $row;
  }
}

header('Content-Type: application/json');
echo json_encode($scores);

$conn->close();
?>
