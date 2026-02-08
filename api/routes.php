<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';

// Join with cities table to get distinct city names
// Assuming cities table exists with id and name columns based on foreign key convention
$sql = "SELECT r.*, c1.name as from_city, c2.name as to_city 
            FROM routes r 
            LEFT JOIN cities c1 ON r.from_city_id = c1.id 
            LEFT JOIN cities c2 ON r.to_city_id = c2.id";

$result = $conn->query($sql);

$routes = array();

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $route = array(
            'id' => $row['id'],
            // Use joined city names, fallback to empty string if join fails
            'from' => $row['from_city'] ?? '',
            'to' => $row['to_city'] ?? '',
            'isPopular' => (bool) ($row['is_popular'] ?? 0),
            'type' => $row['route_type'] ?? 'standard', // Mapped from route_type
            'direction' => $row['direction'] ?? '',
            'region' => $row['region'] ?? ''
        );
        array_push($routes, $route);
    }
}

echo json_encode($routes);

$conn->close();
?>