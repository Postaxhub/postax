<?php
// Show all errors for debugging (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["status" => "error", "message" => "Only POST requests are allowed."]);
    exit;
}

// Set header for JSON response
header("Content-Type: application/json");

// (Optional) CORS support if needed
// header("Access-Control-Allow-Origin: *");

// Get and sanitize input
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Basic validation
if (!$name || !$email || !$subject || !$message) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email address."]);
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
