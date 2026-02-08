<?php
// Quick test script to check database schema
include_once 'config.php';

// Get table structure
$result = $conn->query("DESCRIBE users");

echo "Users table structure:\n";
while ($row = $result->fetch_assoc()) {
    echo $row['Field'] . " - " . $row['Type'] . " - " . $row['Null'] . " - " . $row['Default'] . "\n";
}

$conn->close();
?>