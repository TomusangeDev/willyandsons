<?php
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'willy_and_sons_db';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Conection failed: " . $conn->connect_error);
}

// echo "Connected successfully";

?>