<?php
function sendOrderConfirmation($email, $orderNumber, $total, $items) {
    $subject = "Order Confirmation - #$orderNumber";
    
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #667eea; color: white; padding: 20px; text-align: center; }
            .order-details { padding: 20px; border: 1px solid #ddd; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            .total { font-size: 18px; font-weight: bold; color: #28a745; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Thank You for Your Order!</h2>
                <p>Order #$orderNumber</p>
            </div>
            <div class='order-details'>
                <h3>Order Summary</h3>
                <table>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>";
    
    foreach ($items as $item) {
        $itemTotal = $item['price'] * $item['qty'];
        $message .= "
                    <tr>
                        <td>{$item['name']}</td>
                        <td>{$item['qty']}</td>
                        <td>UGX " . number_format($item['price'], 2) . "</td>
                        <td>UGX " . number_format($itemTotal, 2) . "</td>
                    </tr>";
    }
    
    $message .= "
                </table>
                <h3 class='total'>Total: UGX " . number_format($total, 2) . "</h3>
                <p>We will notify you once your order is shipped.</p>
                <p>Thank you for shopping with Willy and Sons!</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: orders@willyandsons.com" . "\r\n";
    
    return mail($email, $subject, $message, $headers);
}
?>