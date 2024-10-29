<?php
require '../db.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$activationToken = bin2hex(random_bytes(16));

// Walidacja unikalności emaila
$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetchColumn() > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already exists.']);
    exit;
}

// Dodanie użytkownika i wysyłka emaila aktywacyjnego
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO users (email, password, activation_token) VALUES (?, ?, ?)");
$stmt->execute([$email, $hashedPassword, $activationToken]);

$host = $_SERVER['HTTP_HOST'];
$path = 'template';

$activationLink = "http://$host/$path/activate?token=$activationToken";
mail($email, "Activate your account", "Click here to activate: $activationLink");

echo json_encode(['success' => true]);
?>