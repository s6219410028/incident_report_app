<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}
include(__DIR__ . '/db_config.php');

// Retrieve only closed incidents
$stmt = $pdo->prepare("SELECT * FROM incidents WHERE status = 'Close' ORDER BY created_at DESC");
$stmt->execute();
$closedIncidents = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Closed Incidents</title>
    <!-- DataTables CSS -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
    <!-- FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            overflow-x: hidden;
        }

        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 50px;
            background-color: #333;
            color: #fff;
            overflow: hidden;
            transition: width 0.3s ease;
            z-index: 1000;
        }

        .sidebar.expanded {
            width: 250px;
        }

        .sidebar h2 {
            margin: 0;
            padding: 10px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;
        }

        .sidebar a {
            display: flex;
            align-items: center;
            color: #fff;
            text-decoration: none;
            padding: 10px;
            margin: 5px;
            background: #444;
            border-radius: 4px;
            transition: background 0.2s;
        }

        .sidebar a:hover {
            background: #555;
        }

        .sidebar a i {
            min-width: 30px;
            text-align: center;
            font-size: 18px;
        }

        .sidebar a .link-text {
            margin-left: 10px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .sidebar.expanded a .link-text {
            opacity: 1;
        }

        .container {
            margin-left: 50px;
            width: calc(100% - 50px);
            transition: margin-left 0.3s ease, width 0.3s ease;
            padding: 20px;
        }

        .container.expanded {
            margin-left: 250px;
            width: calc(100% - 250px);
        }

        .main-content {
            width: 90%;
            margin: 0 auto;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>

<body>
    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
    <h2><i class="fas fa-bars"></i></h2>
    <a href="dashboard.php"><i class="fas fa-tachometer-alt"></i><span class="link-text">Dashboard</span></a>
    <a href="incident_list.php"><i class="fas fa-exclamation-triangle"></i><span class="link-text">Incident
        List</span></a>
    <a href="employee_list.php"><i class="fas fa-users"></i><span class="link-text">Employee List</span></a>
    <a href="hardware_list.php"><i class="fas fa-desktop"></i><span class="link-text">Hardware List</span></a>
    <a href="report_incident.php"><i class="fas fa-file"></i><span class="link-text">Report Incident</span></a>
    <a href="closed_incidents.php"><i class="fas fa-circle-xmark"></i><span class="link-text">Closed Incidents</span></a>
    <a href="logout.php"><i class="fas fa-sign-out-alt"></i><span class="link-text">Logout</span></a>
  </div>
    <!-- Main container -->
    <div class="container" id="container">
        <div class="main-content">
            <h1>Closed Incidents</h1>
            <table id="closedIncidentTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Problem Type</th>
                        <th>Severity</th>
                        <th>Assigned Staff</th>
                        <th>Description</th>
                        <th>Employee Name</th>
                        <th>Employee Dept</th>
                        <th>Status</th>
                        <th>Submitted</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($closedIncidents as $incident): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($incident['id']); ?></td>
                            <td><?php echo htmlspecialchars($incident['problem_type']); ?></td>
                            <td><?php echo htmlspecialchars($incident['severity']); ?></td>
                            <td><?php echo htmlspecialchars($incident['assigned_staff']); ?></td>
                            <td><?php echo htmlspecialchars($incident['description']); ?></td>
                            <td><?php echo htmlspecialchars($incident['employee_name']); ?></td>
                            <td><?php echo htmlspecialchars($incident['employee_department']); ?></td>
                            <td><?php echo htmlspecialchars($incident['status']); ?></td>
                            <td><?php echo htmlspecialchars($incident['created_at']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
    <!-- jQuery and DataTables JS -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script>
        $(document).ready(function () {
            $('#closedIncidentTable').DataTable({
                dom: '<"dt-header"f>rt<"dt-footer"ip>'
            });
        });
        document.addEventListener('DOMContentLoaded', function () {
            const sidebar = document.getElementById('sidebar');
            const container = document.getElementById('container');
            const storedState = localStorage.getItem('sidebarExpanded') === 'true';
            if (storedState) {
                sidebar.classList.add('expanded');
                container.classList.add('expanded');
            }
            sidebar.querySelector('h2').addEventListener('click', function () {
                sidebar.classList.toggle('expanded');
                container.classList.toggle('expanded');
                localStorage.setItem('sidebarExpanded', sidebar.classList.contains('expanded'));
            });
        });
    </script>
</body>

</html>