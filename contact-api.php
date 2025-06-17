<?php
// Enable full error reporting for debugging (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set header for JSON response
header("Content-Type: application/json");

// Get data from POST
$name    = $_POST['name'] ?? '';
$email   = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// Basic validation
if (!$name || !$email || !$subject || !$message) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Database configuration
$host     = "localhost";
$username = "root";
$password = "";
$database = "postax_db";

// Connect to database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Prepare SQL and bind
$stmt = $conn->prepare("INSERT INTO contact (name, email, subject, message) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Failed to prepare SQL statement."]);
    $conn->close();
    exit;
}

$stmt->bind_param("ssss", $name, $email, $subject, $message);

// Execute and respond
if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Message saved successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save message."]);
}

// Cleanup
$stmt->close();
$conn->close();
