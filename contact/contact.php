<?php
header("Content-Type: application/json");

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || empty($data->name) || empty($data->email) || empty($data->subject) || empty($data->message)) {
    echo json_encode([
        "status" => "error",
        "message" => "Please fill in all the required fields."
    ]);
    exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $data->name,
        $data->email,
        $data->subject,
        $data->message
    ]);

    echo json_encode([
        "status" => "success",
        "message" => "Thanks for contacting us! Our team will reach out to you within 24 hours."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Something went wrong while saving your message."
    ]);
}
?>
