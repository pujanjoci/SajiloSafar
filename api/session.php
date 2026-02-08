<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';

$timeout_duration = 300; // 5 minutes in seconds

if (isset($_SESSION['user_id'])) {
    // Check for timeout
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $timeout_duration) {
        // Session timed out
        session_unset();
        session_destroy();
        http_response_code(200);
        echo json_encode(array("message" => "Session expired.", "authenticated" => false));
    } else {
        // Session valid, update last activity
        $_SESSION['last_activity'] = time();

        http_response_code(200);
        echo json_encode(array(
            "message" => "Session active.",
            "authenticated" => true,
            "user" => $_SESSION['user']
        ));
    }
} else {
    http_response_code(200);
    echo json_encode(array("message" => "No active session.", "authenticated" => false));
}
?>