<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';
session_start();

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(["message" => "Unauthorized access"]);
    exit();
}

// Fetch Counts
$stats = [
    'users' => 0,
    'buses' => 0,
    'routes' => 0,
    'bookings' => 0,
    'revenue' => 0
];

// Users
$result = $conn->query("SELECT COUNT(*) as count FROM users WHERE role = 'user'");
if ($result)
    $stats['users'] = $result->fetch_assoc()['count'];

// Buses
$result = $conn->query("SELECT COUNT(*) as count FROM buses");
if ($result)
    $stats['buses'] = $result->fetch_assoc()['count'];

// Routes
$result = $conn->query("SELECT COUNT(*) as count FROM routes");
if ($result)
    $stats['routes'] = $result->fetch_assoc()['count'];

// Bookings
$result = $conn->query("SELECT COUNT(*) as count, SUM(total_amount) as revenue FROM bookings");
if ($result) {
    $row = $result->fetch_assoc();
    $stats['bookings'] = $row['count'];
    $stats['revenue'] = $row['revenue'] ?? 0;
}

echo json_encode($stats);

$conn->close();
?>