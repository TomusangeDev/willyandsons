<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include '../database/db_conn.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $conn->real_escape_string($data['email'] ?? '');
$password = $data['password'] ?? '';
$guestCart = $data['guestCart'] ?? []; 

if (!$email || !$password) {
    echo json_encode(['error' => 'Email and password required']);
    $conn->close();
    exit;
}

$sql = "SELECT id, name, email, phone, country, password FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        
        // Get or create user's cart
        $cartSql = "SELECT id FROM carts WHERE user_id = " . $user['id'];
        $cartResult = $conn->query($cartSql);
        
        if ($cartResult->num_rows === 0) {
            // Create cart if doesn't exist
            $conn->query("INSERT INTO carts (user_id) VALUES (" . $user['id'] . ")");
            $cartId = $conn->insert_id;
        } else {
            $cartRow = $cartResult->fetch_assoc();
            $cartId = $cartRow['id'];
        }
        
        // Merge guest cart with database cart
        if (!empty($guestCart)) {
            foreach ($guestCart as $guestItem) {
                // Check if product already exists in cart
                $checkSql = "SELECT id, quantity FROM cart_items 
                            WHERE cart_id = $cartId AND product_id = " . $guestItem['id'];
                $checkResult = $conn->query($checkSql);
                
                if ($checkResult->num_rows > 0) {
                    // Update existing quantity
                    $existing = $checkResult->fetch_assoc();
                    $newQty = $existing['quantity'] + $guestItem['qty'];
                    $updateSql = "UPDATE cart_items SET quantity = $newQty 
                                 WHERE id = " . $existing['id'];
                    $conn->query($updateSql);
                } else {
                    // Add new item
                    $insertSql = "INSERT INTO cart_items (cart_id, product_id, quantity) 
                                 VALUES ($cartId, " . $guestItem['id'] . ", " . $guestItem['qty'] . ")";
                    $conn->query($insertSql);
                }
            }
        }
        
        // Get updated cart items
        $itemsSql = "SELECT ci.*, p.name, p.price, p.image 
                    FROM cart_items ci
                    JOIN products p ON ci.product_id = p.id
                    WHERE ci.cart_id = $cartId";
        $itemsResult = $conn->query($itemsSql);
        
        $cartItems = [];
        while ($row = $itemsResult->fetch_assoc()) {
            $cartItems[] = $row;
        }
        
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'phone' => $user['phone'],
                'country' => $user['country']
            ],
            'mergedCart' => $cartItems
        ]);
    } else {
        echo json_encode(['error' => 'Invalid password']);
    }
} else {
    echo json_encode(['error' => 'User not found']);
}

$conn->close();
?>