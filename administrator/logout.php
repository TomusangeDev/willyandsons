<?php 
session_start();
session_destroy();
header('Location: /onlineshop/administrator/admin-login.html');
exit;
?>