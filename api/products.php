<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

include '../database/db_conn.php';

$sql = "SELECT id, name, price, image, description, category, brand, type, tag, subcategory, is_popular, available, posted_by, slug, sold_count, discount, old_price FROM products WHERE available = 1";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows> 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products);

$conn->close();
?>