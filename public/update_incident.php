<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}
include(__DIR__ . '/db_config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the posted data
    $incident_id = $_POST['incident_id'] ?? '';
    $assigned_staff = $_POST['assigned_staff'] ?? '';
    $status = $_POST['status'] ?? '';

    // Validate input (basic validation)
    if ($incident_id && $status) {
        // Prepare update statement
        $stmt = $pdo->prepare("UPDATE incidents SET assigned_staff = ?, status = ? WHERE id = ?");
        $stmt->execute([$assigned_staff, $status, $incident_id]);
    }
}

// Redirect back to the incident list page after update
header("Location: incident_list.php");
exit;
?>