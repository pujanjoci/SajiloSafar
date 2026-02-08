<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Join with buses table to get bus name
    $sql = "SELECT b.*, bu.name as bus_name FROM bookings b LEFT JOIN buses bu ON b.bus_id = bu.id";
    $result = $conn->query($sql);

    $bookings = array();

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $bookingId = $row['id'];

            // Fetch booked seats
            $seatNumbers = array();
            // Assuming booked_seats has booking_id (matching bookings.id) and seat_number
            $sql_seats = "SELECT seat_number FROM booked_seats WHERE booking_id = '$bookingId'";

            $res_seats = $conn->query($sql_seats);
            if ($res_seats) {
                while ($seatRow = $res_seats->fetch_assoc()) {
                    $seatNumbers[] = (int) $seatRow['seat_number'];
                }
            }

            $booking = array(
                'id' => $row['id'],
                'busId' => (int) ($row['bus_id'] ?? 0),
                'busName' => $row['bus_name'] ?? 'Unknown Bus',
                'userId' => (int) ($row['user_id'] ?? 0),
                'seatNumbers' => $seatNumbers,
                'selectedSeats' => $seatNumbers, // Alias for frontend
                'totalAmount' => (float) ($row['total_amount'] ?? 0),
                'totalPrice' => (float) ($row['total_amount'] ?? 0), // Alias for frontend
                'date' => $row['booking_date'] ?? '',
                'status' => $row['status'] ?? 'pending',
                'passengerName' => $row['passenger_name'] ?? '',
                'phoneNumber' => $row['contact_number'] ?? '', // Alias for frontend
                'contactNumber' => $row['contact_number'] ?? ''
            );

            array_push($bookings, $booking);
        }
    }
    echo json_encode($bookings);
} else {
    // Placeholder for POST/PUT/DELETE
    echo json_encode(array("message" => "Only GET is supported for now."));
}

$conn->close();
?>