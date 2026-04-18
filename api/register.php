<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include '../database/db_conn.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $conn->real_escape_string($data['name'] ?? '');
$email = $conn->real_escape_string($data['email'] ?? '');
$phone = $conn->real_escape_string($data['phone'] ?? '');
$country = $conn->real_escape_string($data['country'] ?? '');
$password = $data['password'] ?? '';

// Validate
if (!$name || !$email || !$password) {
    echo json_encode(['error' => 'Name, email and password are required']);
    $conn->close();
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Invalid email format']);
    $conn->close();
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['error' => 'Password must be at least 6 characters']);
    $conn->close();
    exit;
}

// Check if email exists
$check = $conn->query("SELECT id FROM users WHERE email = '$email'");
if ($check->num_rows > 0) {
    echo json_encode(['error' => 'Email already registered']);
    $conn->close();
    exit;
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (name, email, phone, country, password) 
        VALUES ('$name', '$email', '$phone', '$country', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    $userId = $conn->insert_id;
    
    // Create cart for user
    $conn->query("INSERT INTO carts (user_id) VALUES ($userId)");
    
    echo json_encode(['success' => true, 'message' => 'Registration successful']);
} else {
    echo json_encode(['error' => 'Registration failed: ' . $conn->error]);
}

$conn->close();
?>