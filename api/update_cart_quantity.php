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
$change = intval($data['change']);

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

// Get current quantity
$checkSql = "SELECT quantity FROM cart_items WHERE cart_id = $cartId AND product_id = $product_id";
$checkResult = $conn->query($checkSql);

if ($checkResult->num_rows > 0) {
    $item = $checkResult->fetch_assoc();
    $newQuantity = $item['quantity'] + $change;
    
    if ($newQuantity <= 0) {
        $deleteSql = "DELETE FROM cart_items WHERE cart_id = $cartId AND product_id = $product_id";
        $conn->query($deleteSql);
    } else {
        if ($newQuantity > 50) $newQuantity = 50;
        $updateSql = "UPDATE cart_items SET quantity = $newQuantity 
                      WHERE cart_id = $cartId AND product_id = $product_id";
        $conn->query($updateSql);
    }
}

echo json_encode(['success' => true]);

$conn->close();
?>