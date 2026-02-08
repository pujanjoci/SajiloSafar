<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';

$sql = "SELECT * FROM buses";
$result = $conn->query($sql);

$buses = array();

if ($result->num_rows > 0) {
    while ($bus = $result->fetch_assoc()) {
        $busId = $bus['id'];

        // Fetch Amenities
        $amenities = array();
        $sql_amenities = "SELECT name FROM bus_amenities 
                          JOIN bus_has_amenities ON bus_amenities.id = bus_has_amenities.amenity_id 
                          WHERE bus_has_amenities.bus_id = $busId";
        $res_amenities = $conn->query($sql_amenities);
        if ($res_amenities) {
            while ($row = $res_amenities->fetch_assoc()) {
                $amenities[] = $row['name'];
            }
        }
        $bus['amenities'] = $amenities;

        // Fetch Seat Configuration
        $seatConfig = array();
        $sql_seat = "SELECT * FROM bus_seat_configuration WHERE bus_id = $busId";
        $res_seat = $conn->query($sql_seat);
        if ($res_seat) {
            while ($row = $res_seat->fetch_assoc()) {
                // Assuming table has columns like 'type' and 'seat_numbers' (comma separated)
                // Or maybe columns like 'premium_seats', 'sofa_seats' etc.
                // Let's assume the table stores JSON or specific columns.
                // Based on JS data: premiumSeats: [1, 2], sofaSeats: [], etc.

                // If table structure is row-based (key-value):
                if (isset($row['seat_type']) && isset($row['seat_numbers'])) {
                    $seatConfig[$row['seat_type']] = json_decode($row['seat_numbers']) ?: explode(',', $row['seat_numbers']);
                } else {
                    // If table columns match the JS object keys
                    if (isset($row['premium_seats']))
                        $seatConfig['premiumSeats'] = json_decode($row['premium_seats']);
                    if (isset($row['sofa_seats']))
                        $seatConfig['sofaSeats'] = json_decode($row['sofa_seats']);
                    if (isset($row['window_seats']))
                        $seatConfig['windowSeats'] = json_decode($row['window_seats']);
                    if (isset($row['aisle_seats']))
                        $seatConfig['aisleSeats'] = json_decode($row['aisle_seats']);
                }
            }
        }
        // Fallback if empty, maybe try to decode if stored as whole JSON in buses table? No, user said there IS a table.
        // Let's try to map typical snake_case to camelCase if they are just columns in a single row for the bus
        if (empty($seatConfig)) {
            $seatConfig = [
                'premiumSeats' => [],
                'sofaSeats' => [],
                'windowSeats' => [],
                'aisleSeats' => []
            ];
        }
        $bus['seatConfiguration'] = $seatConfig;

        // Fetch Rules
        $rules = array();
        $sql_rules = "SELECT rule_key, rule_value FROM bus_rules WHERE bus_id = $busId";
        $res_rules = $conn->query($sql_rules);
        if ($res_rules) {
            while ($row = $res_rules->fetch_assoc()) {
                $rules[$row['rule_key']] = $row['rule_value']; // e.g. allowedDestinations
            }
        }
        // If rules are stored as JSON in a column in buses table? Unlikely given the table list.
        $bus['rules'] = $rules;


        // Fetch Service Areas
        $serviceAreas = array();
        $sql_areas = "SELECT area_name FROM bus_service_areas WHERE bus_id = $busId";
        $res_areas = $conn->query($sql_areas);
        if ($res_areas) {
            while ($row = $res_areas->fetch_assoc()) {
                $serviceAreas[] = $row['area_name'];
            }
        }
        $bus['serviceAreas'] = $serviceAreas;

        // Fix data types and Map Columns
        $bus['id'] = (int) $bus['id'];
        $bus['minPrice'] = (int) ($bus['min_price'] ?? 0);
        $bus['maxPrice'] = (int) ($bus['max_price'] ?? 0);
        $bus['totalSeats'] = (int) ($bus['total_seats'] ?? 0);
        $bus['seatsAvailable'] = (int) ($bus['seats_available'] ?? 0);
        $bus['rating'] = (float) ($bus['rating'] ?? 0);
        $bus['company'] = $bus['company'] ?? ''; // Column is 'company'
        $bus['busNumber'] = $bus['bus_number'] ?? '';
        $bus['type'] = $bus['type'] ?? 'Standard';

        // Remove DB columns from response if cleaner output needed
        unset($bus['min_price']);
        unset($bus['max_price']);
        unset($bus['total_seats']);
        unset($bus['seats_available']);
        unset($bus['bus_number']);
        unset($bus['created_at']);
        unset($bus['updated_at']);

        array_push($buses, $bus);
    }
}

echo json_encode($buses);

$conn->close();
?>