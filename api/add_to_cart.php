<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

include '../database/db_conn.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    $conn->close();
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$product_id = intval($data['product_id']);
$quantity = intval($data['quantity']);

if ($product_id <= 0 || $quantity <= 0) {
    echo json_encode(['success' => false, 'error' => 'Invalid product or quantity']);
    $conn->close();
    exit;
}

$user_id = $_SESSION['user_id'];


$cartSql = "SELECT id FROM carts WHERE user_id = $user_id";
$cartResult = $conn->query($cartSql);

if ($cartResult->num_rows === 0) {
    $conn->query("INSERT INTO carts (user_id) VALUES ($user_id)");
    $cartId = $conn->insert_id;
} else {
    $cartRow = $cartResult->fetch_assoc();
    $cartId = $cartRow['id'];
}


$checkSql = "SELECT id, quantity FROM cart_items WHERE cart_id = $cartId AND product_id = $product_id";
$checkResult = $conn->query($checkSql);

if ($checkResult->num_rows > 0) {
    $existing = $checkResult->fetch_assoc();
    $newQty = $existing['quantity'] + $quantity;
    $updateSql = "UPDATE cart_items SET quantity = $newQty WHERE id = {$existing['id']}";
    $conn->query($updateSql);
} else {
    $insertSql = "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($cartId, $product_id, $quantity)";
    $conn->query($insertSql);
}

echo json_encode(['success' => true]);

$conn->close();
?>