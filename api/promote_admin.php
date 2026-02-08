<?php
require_once 'config.php';

// CHANGE THIS EMAIL TO YOUR USER'S EMAIL
$email = 'admin@example.com';
// Or just update the first user if you want
$sql = "UPDATE users SET role = 'admin', is_admin = 1 WHERE email = 'pujan@gmail.com'"; // Assuming pujan@gmail.com based on username

if (isset($_GET['email'])) {
    $email = $_GET['email'];
    $sql = "UPDATE users SET role = 'admin', is_admin = 1 WHERE email = '$email'";
}

if ($conn->query($sql) === TRUE) {
    echo "User $email promoted to admin successfully.";
} else {
    echo "Error updating record: " . $conn->error;
}
?>