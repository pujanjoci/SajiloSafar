<?php
include_once 'config.php';

function printTableInfo($conn, $tableName)
{
    echo "<h2>Table: $tableName</h2>";
    $sql = "DESCRIBE $tableName";
    $result = $conn->query($sql);

    if ($result) {
        echo "<table border='1'><tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th></tr>";
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            foreach ($row as $cell) {
                echo "<td>$cell</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "Error: " . $conn->error;
    }
    echo "<br>";
}

printTableInfo($conn, 'routes');
printTableInfo($conn, 'buses');
printTableInfo($conn, 'bookings');
?>