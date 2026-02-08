<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'config.php';
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized."));
    exit();
}

$data = json_decode(file_get_contents("php://input"));
$user_id = $_SESSION['user_id'];

if (
    !empty($data->name) &&
    !empty($data->email) && // Typically email shouldn't change easily, or needs validation
    !empty($data->phone)
) {
    $name = $data->name;
    $phone = $data->phone;
    $updated_at = date('Y-m-d H:i:s');

    // Construct SQL Query
    $sql = "UPDATE users SET name = '$name', phone = '$phone', updated_at = '$updated_at'";

    // Update password if provided
    if (!empty($data->password)) {
        $password_hash = password_hash($data->password, PASSWORD_BCRYPT);
        $sql .= ", password = '$password_hash'";
    }

    $sql .= " WHERE id = '$user_id'";

    if ($conn->query($sql) === TRUE) {
        // Update Session Data
        $user_arr = $_SESSION['user'];
        $user_arr['name'] = $name;
        $user_arr['phone'] = $phone;
        // Don't store password in session

        $_SESSION['user'] = $user_arr;
        $_SESSION['last_activity'] = time();

        http_response_code(200);
        echo json_encode(array(
            "message" => "Profile updated successfully.",
            "user" => $user_arr
        ));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update profile."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
}

$conn->close();
?>