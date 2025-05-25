<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "minigames";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Błąd połączenia");

$difficulty = $_GET['difficulty'];
$stmt = $conn->prepare("SELECT name, score FROM number_guess_scores WHERE difficulty = ? ORDER BY score ASC LIMIT 10");
$stmt->bind_param("s", $difficulty);
$stmt->execute();
$result = $stmt->get_result();

$scores = [];
while ($row = $result->fetch_assoc()) {
    $scores[] = $row;
}

header('Content-Type: application/json');
echo json_encode($scores);
?>
