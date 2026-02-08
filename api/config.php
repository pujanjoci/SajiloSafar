<?php
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'project';

// Set session cookie parameters
session_set_cookie_params(0, '/');

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8mb4
$conn->set_charset("utf8mb4");