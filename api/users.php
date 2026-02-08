<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

// Check if user is logged in and is admin
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user'])) {
    http_response_code(403);
    echo json_encode(["message" => "Unauthorized: No session found"]);
    exit();
}

$role = $_SESSION['user']['role'] ?? '';
$isAdmin = $_SESSION['user']['isAdmin'] ?? false;

if (strtolower($role) !== 'admin' && !$isAdmin) {
    http_response_code(403);
    echo json_encode([
        "message" => "Unauthorized: Insufficient permissions",
        "role" => $role,
        "isAdmin" => $isAdmin
    ]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sql = "SELECT id, name, email, role, phone, is_admin, created_at FROM users ORDER BY created_at DESC";
    $result = $conn->query($sql);

    $users = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }
    echo json_encode($users);
} elseif ($method === 'PUT') {
    // Update user role
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id']) || !isset($data['role'])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing required fields"]);
        exit();
    }

    $userId = $conn->real_escape_string($data['id']);
    $newRole = $conn->real_escape_string($data['role']);
    $isAdmin = isset($data['is_admin']) ? intval($data['is_admin']) : 0;

    $sql = "UPDATE users SET role = ?, is_admin = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sis", $newRole, $isAdmin, $userId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User role updated successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to update user role"]);
    }
    $stmt->close();
} elseif ($method === 'DELETE') {
    // Delete user
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "User ID is required"]);
        exit();
    }

    $userId = $conn->real_escape_string($_GET['id']);

    // Prevent deleting yourself
    if ($userId === $_SESSION['user_id']) {
        http_response_code(400);
        echo json_encode(["message" => "Cannot delete your own account"]);
        exit();
    }

    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $userId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User deleted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to delete user"]);
    }
    $stmt->close();
}

$conn->close();
?>