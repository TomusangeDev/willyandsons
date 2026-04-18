<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include '../database/db_conn.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not logged in']);
    $conn->close();
    exit;
}

$user_id = $_SESSION['user_id'];

// Get user's cart
$cartSql = "SELECT id FROM carts WHERE user_id = $user_id";
$cartResult = $conn->query($cartSql);

if ($cartResult->num_rows === 0) {
    echo json_encode([]);
    $conn->close();
    exit;
}

$cartRow = $cartResult->fetch_assoc();
$cartId = $cartRow['id'];


$sql = "SELECT ci.*, p.name, p.price, p.image, p.description 
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $cartId";
$result = $conn->query($sql);

$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

echo json_encode($items);

$conn->close();
?>