<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

include '../database/db_conn.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    $conn->close();
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$product_id = intval($data['product_id']);

$user_id = $_SESSION['user_id'];

// Get user's cart
$cartSql = "SELECT id FROM carts WHERE user_id = $user_id";
$cartResult = $conn->query($cartSql);

if ($cartResult->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'Cart not found']);
    $conn->close();
    exit;
}

$cartRow = $cartResult->fetch_assoc();
$cartId = $cartRow['id'];

// Delete item
$deleteSql = "DELETE FROM cart_items WHERE cart_id = $cartId AND product_id = $product_id";
$conn->query($deleteSql);

echo json_encode(['success' => true]);

$conn->close();
?>