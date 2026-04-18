<?php
session_start();
header('Content-Type: application/json');

include '../database/db_conn.php';

// Check if admin is logged in
if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Get form data
$name = $_POST['name'] ?? '';
$slug = $_POST['slug'] ?? '';
$price = $_POST['price'] ?? 0;
$discount = $_POST['discount'] ?? 0;
$old_price = $_POST['old_price'] ?? null;
$category = $_POST['category'] ?? '';
$subcategory = $_POST['subcategory'] ?? '';
$brand = $_POST['brand'] ?? '';
$type = $_POST['type'] ?? '';
$tag = $_POST['tag'] ?? '';
$is_popular = $_POST['is_popular'] ?? 'NO';
$available = $_POST['available'] ?? '1';
$posted_by = $_POST['posted_by'] ?? 'Admin';
$description = $_POST['description'] ?? '';

// Validate required fields
if (!$name || !$price || !$category || !$type) {
    echo json_encode(['error' => 'Name, price, category, and type are required']);
    exit;
}

// Generate slug if empty
if (empty($slug)) {
    $slug = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $name), '-'));
}

// Handle image upload
$imagePath = '';
if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'];
    $filename = $_FILES['image']['name'];
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    
    if (!in_array($ext, $allowed)) {
        echo json_encode(['error' => 'Invalid image format. Allowed: jpg, jpeg, png, gif, webp, avif']);
        exit;
    }
    
    $newFilename = time() . '_' . preg_replace('/[^a-zA-Z0-9]/', '_', $name) . '.' . $ext;
    $uploadPath = '../uploads/' . $newFilename;
    
    // Create uploads directory if not exists
    if (!is_dir('../uploads/')) {
        mkdir('../uploads/', 0777, true);
    }
    
    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
        $imagePath = '/onlineshop/uploads/' . $newFilename;
    } else {
        echo json_encode(['error' => 'Failed to upload image']);
        exit;
    }
} else {
    echo json_encode(['error' => 'Product image is required']);
    exit;
}

// Insert into database
$sql = "INSERT INTO products (
    name, slug, price, discount, old_price, category, subcategory, brand, 
    type, tag, is_popular, available, posted_by, description, image
) VALUES (
    '$name', '$slug', '$price', '$discount', " . ($old_price ? "'$old_price'" : "NULL") . ", 
    '$category', '$subcategory', '$brand', '$type', '$tag', '$is_popular', 
    '$available', '$posted_by', '$description', '$imagePath'
)";

if ($conn->query($sql)) {
    echo json_encode(['success' => true, 'message' => 'Product added successfully']);
} else {
    echo json_encode(['error' => 'Database error: ' . $conn->error]);
}

$conn->close();
?>