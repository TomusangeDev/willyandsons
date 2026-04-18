<?php
session_start();
header('Content-Type: application/json');

$isAdmin = isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
echo json_encode(['admin' => $isAdmin]);
?>