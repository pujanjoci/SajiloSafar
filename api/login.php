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

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->email) &&
    !empty($data->password)
) {
    $email = $data->email;
    $password = $data->password;

    $sql = "SELECT * FROM users WHERE email = '$email' OR name = '$email' LIMIT 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        if (password_verify($password, $row['password'])) {

            // correct password
            $token = bin2hex(random_bytes(16)); // Simple token generation

            // Update last login
            $update_sql = "UPDATE users SET last_login = NOW() WHERE id = " . $row['id'];
            $conn->query($update_sql);

            $user_arr = array(
                "id" => $row['id'],
                "name" => $row['name'],
                "email" => $row['email'],
                "phone" => $row['phone'],
                "role" => $row['role'],
                "isAdmin" => true, // Grant admin access to anyone who can log into admin panel
                "token" => $token
            );

            // Set Session Variables
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user'] = $user_arr;
            $_SESSION['last_activity'] = time();

            http_response_code(200);
            echo json_encode(array(
                "message" => "Login successful.",
                "user" => $user_arr
            ));

        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Invalid password."));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "User not found."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data."));
}

$conn->close();
?>