<?php
require_once 'db_conn.php';

header('content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {


    $email = $_POST['email'] ?? '';

    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email address"]);
        exit;
    }

    
    $location = $_SERVER['REMOTE_ADDR']; 
    $source = ($_SERVER['HTTP_REFERER'] ?? 'direct') . ' | ' . $_SERVER['REQUEST_URI'];

    try {
        
    $stmt = $conn->prepare("
    INSERT INTO email_subscriptions (client_email, location, source)
    VALUES (?, ?, ?)
    ");
    $stmt->bind_param("sss", $email, $location, $source);
    $stmt->execute();

    echo json_encode(["status" => "success", "message" => "Subscribed successfully. Thank you!"]);
    $stmt->close();
    } catch (mysqli_sql_exception $e) {
        if ($e->getCode() == 1062) {
            echo json_encode(["status" => "info", "message" => "You are already subscribed"]);
        } else {
            echo json_encode(["status" => "error", "message" => "An error occured"]);
        }
    }


}

$conn->close();
?>