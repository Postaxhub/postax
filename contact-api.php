<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

// Collect form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// Basic validation
if ($name && $email && $subject && $message) {
    $to = "santhiya8334@gmail.com"; // CHANGE to your actual email
    $email_subject = "New Contact Form Message - $subject";
    $email_body = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Mail sending failed.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all fields.']);
}
?>
