<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include '../database/db_conn.php';

$data = json_decode(file_get_contents('php://input'), true);

// Get user ID from session or data
$userId = $_SESSION['user_id'] ?? ($data['user_id'] ?? null);

// Generate unique order number
$orderNumber = 'ORD-' . strtoupper(uniqid());

// Insert order
$sql = "INSERT INTO orders (
    order_number, user_id, first_name, last_name, email, phone, 
    address, city, district, zipcode, delivery_instructions, 
    payment_method, subtotal, delivery_fee, total, status
) VALUES (
    '$orderNumber', $userId, 
    '{$conn->real_escape_string($data['firstName'])}',
    '{$conn->real_escape_string($data['lastName'])}',
    '{$conn->real_escape_string($data['email'])}',
    '{$conn->real_escape_string($data['phone'])}',
    '{$conn->real_escape_string($data['address'])}',
    '{$conn->real_escape_string($data['city'])}',
    '{$conn->real_escape_string($data['district'])}',
    '{$conn->real_escape_string($data['zipcode'])}',
    '{$conn->real_escape_string($data['instructions'])}',
    '{$conn->real_escape_string($data['paymentMethod'])}',
    {$data['subtotal']}, {$data['deliveryFee']}, {$data['total']},
    'pending'
)";

if ($conn->query($sql)) {
    $orderId = $conn->insert_id;
    
    // Insert order items
    foreach ($data['items'] as $item) {
        $productName = $conn->real_escape_string($item['name']);
        $itemSql = "INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity) 
                    VALUES ($orderId, {$item['id']}, '$productName', {$item['price']}, {$item['qty']})";
        $conn->query($itemSql);
    }
    
    echo json_encode([
        'success' => true,
        'order_id' => $orderId,
        'order_number' => $orderNumber
    ]);
} else {
    echo json_encode(['error' => 'Failed to save order: ' . $conn->error]);
}

$conn->close();
?>