<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "minigames";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Błąd połączenia");

$name = $_POST['name'];
$score = (int)$_POST['score'];
$difficulty = $_POST['difficulty'];

$stmt = $conn->prepare("INSERT INTO number_guess_scores (name, score, difficulty) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $name, $score, $difficulty);
$stmt->execute();
$stmt->close();
$conn->close();

echo "OK";
?>
