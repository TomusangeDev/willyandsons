<?php
session_start();
header('Content-Type: application/json');

include '../database/db_conn.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(['error' => 'Email and password required']);
    exit;
}

// Check user credentials
$sql = "SELECT id, name, email, password, role FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
    echo json_encode(['error' => 'User not found']);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password'])) {
    echo json_encode(['error' => 'Invalid password']);
    exit;
}

if ($user['role'] !== 'admin') {
    echo json_encode(['error' => 'Access denied. Admin privileges required.']);
    exit;
}

// Set session
$_SESSION['user_id'] = $user['id'];
$_SESSION['user_name'] = $user['name'];
$_SESSION['user_email'] = $user['email'];
$_SESSION['user_role'] = $user['role'];

echo json_encode(['success' => true, 'message' => 'Login successful']);

$conn->close();
?>