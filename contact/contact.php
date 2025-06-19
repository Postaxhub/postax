<?php
header("Content-Type: application/json");

$host = "168.231.121.76";
$dbname = "postax.in";
$username = "postax.in";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $data = json_decode(file_get_contents("php://input"));

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
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>
