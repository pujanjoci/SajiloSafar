<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require_once 'config.php';
session_start();

echo json_encode([
    "session_id" => session_id(),
    "session_data" => $_SESSION,
    "cookie_params" => session_get_cookie_params()
]);
?>