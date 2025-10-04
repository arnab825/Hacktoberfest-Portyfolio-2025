<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Default password for WAMP is blank
$dbname = "portfolio";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input data to prevent SQL injection
    $name = isset($_POST["name"]) ? $conn->real_escape_string(trim($_POST["name"])) : "";
    $email = isset($_POST["email"]) ? $conn->real_escape_string(trim($_POST["email"])) : "";
    $mobile = isset($_POST["mobile"]) ? $conn->real_escape_string(trim($_POST["mobile"])) : "";
    $subject = isset($_POST["subject"]) ? $conn->real_escape_string(trim($_POST["subject"])) : "";
    $message = isset($_POST["message"]) ? $conn->real_escape_string(trim($_POST["message"])) : "";

    // Insert data into the table only if all required fields are filled
    if ($name && $email && $subject && $message) {
        // Prepare the SQL query
        $sql = "INSERT INTO contact_submissions (name, email, mobile, subject, message) 
                VALUES ('$name', '$email', '$mobile', '$subject', '$message')";

        // Execute the query
        if ($conn->query($sql) === TRUE) {
            // Successful submission
            echo "<h2>Thank you, $name!</h2>";
            echo "<p>Your message has been submitted successfully.</p>";
        } else {
            // Database error
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        // If any required field is missing
        echo "<p>Please fill in all required fields (name, email, subject, and message).</p>";
    }
} else {
    // If the form is not submitted
    echo "<p>Please submit the form first.</p>";
}

// Close the database connection
$conn->close();
?>
