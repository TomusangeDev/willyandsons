<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include '../database/db_conn.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id > 0) {
    $sql = "SELECT * FROM products WHERE id = $id";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
        echo json_encode($product);
    } else {
        echo json_encode(['error' => 'Product not found']);
    }
} else {
    echo json_encode(['error' => 'Invalid product ID']);
}

$conn->close();
?>