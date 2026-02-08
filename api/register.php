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

$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data);

// Check if JSON decode failed
if ($data === null && $raw_data !== '') {
    http_response_code(400);
    echo json_encode(array(
        "message" => "Invalid JSON format.",
        "error" => json_last_error_msg()
    ));
    exit();
}

if (
    !empty($data->name) &&
    !empty($data->email) &&
    !empty($data->password) &&
    !empty($data->phone)
) {
    $name = mysqli_real_escape_string($conn, $data->name);
    $email = mysqli_real_escape_string($conn, $data->email);
    $password = password_hash($data->password, PASSWORD_BCRYPT);
    $phone = mysqli_real_escape_string($conn, $data->phone);
    $created_at = date('Y-m-d H:i:s');
    $updated_at = date('Y-m-d H:i:s');

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid email format."));
        exit();
    }

    // Check if email, phone, or name already exists
    $check_query = "SELECT * FROM users WHERE email = '$email' OR phone = '$phone' OR name = '$name' LIMIT 1";
    $result = $conn->query($check_query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        http_response_code(409); // Conflict

        if ($row['email'] === $email) {
            echo json_encode(array("message" => "Email already exists."));
        } elseif ($row['phone'] === $phone) {
            echo json_encode(array("message" => "Phone number already exists."));
        } elseif ($row['name'] === $name) {
            echo json_encode(array("message" => "Username already exists."));
        } else {
            echo json_encode(array("message" => "User details already exist."));
        }
        exit();
    }

    // Generate unique ID for the user
    $user_id = uniqid('user_', true);

    // Explicitly set default role and is_admin
    $sql = "INSERT INTO users (id, name, email, password, phone, role, is_admin, created_at, updated_at) 
            VALUES ('$user_id', '$name', '$email', '$password', '$phone', 'user', 0, '$created_at', '$updated_at')";

    if ($conn->query($sql) === TRUE) {
        http_response_code(201);
        echo json_encode(array("message" => "User registered successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to register user.", "error" => $conn->error));
    }
} else {
    http_response_code(400);
    $missing = [];
    if (empty($data->name))
        $missing[] = 'name';
    if (empty($data->email))
        $missing[] = 'email';
    if (empty($data->password))
        $missing[] = 'password';
    if (empty($data->phone))
        $missing[] = 'phone';
    echo json_encode(array("message" => "Incomplete data.", "missing" => $missing));
}

$conn->close();
?>