<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}
include(__DIR__ . '/db_config.php');

// Query all employees (users)
$stmt = $pdo->query("SELECT id, user_name, name, mail, responsibility FROM users ORDER BY id ASC");
$employees = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Employee List</title>
    <!-- <link rel="stylesheet" href="style.css"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* Global resets */
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            overflow-x: hidden;
            /* Prevent horizontal scroll */
        }

        /* Sidebar styles */
        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 50px;
            /* Collapsed width */
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
            white-space: nowrap;
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

        /* Main container styles */
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

        /* Form Styles */
        form.hardware-form {
            margin-bottom: 20px;
            background: #f9f9f9;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        form.hardware-form h3 {
            margin-top: 0;
        }

        form.hardware-form input,
        form.hardware-form textarea {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
        }

        form.hardware-form button {
            padding: 10px 20px;
            background-color: #333;
            color: #fff;
            border: none;
            cursor: pointer;
            border-radius: 4px;
        }

        /* Table Styles */
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
    <div class="container">
        <div class="sidebar" id="sidebar">
            <h2><i class="fas fa-bars"></i></h2>
            <a href="dashboard.php">
                <i class="fas fa-tachometer-alt"></i>
                <span class="link-text">Dashboard</span>
            </a>
            <a href="incident_list.php">
                <i class="fas fa-exclamation-triangle"></i>
                <span class="link-text">Incident List</span>
            </a>
            <a href="employee_list.php">
                <i class="fas fa-users"></i>
                <span class="link-text">Employee List</span>
            </a>
            <a href="hardware_list.php">
                <i class="fas fa-desktop"></i>
                <span class="link-text">Hardware List</span>
            </a>
            <a href="logout.php">
                <i class="fas fa-sign-out-alt"></i>
                <span class="link-text">Logout</span>
            </a>
        </div>
        <div class="main-content">
            <h1>Employee List</h1>
            <?php if (count($employees) > 0): ?>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Responsibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($employees as $employee): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($employee['id']); ?></td>
                                <td><?php echo htmlspecialchars($employee['user_name']); ?></td>
                                <td><?php echo htmlspecialchars($employee['name']); ?></td>
                                <td><?php echo htmlspecialchars($employee['mail']); ?></td>
                                <td><?php echo htmlspecialchars($employee['responsibility']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p>No employees found.</p>
            <?php endif; ?>
        </div>
    </div>

    <script>
        // Retrieve sidebar state from localStorage
        const sidebar = document.getElementById('sidebar');
        const container = document.getElementById('container');
        const toggleSidebar = document.getElementById('toggleSidebar');

        function setSidebarState(expanded) {
            if (expanded) {
                sidebar.classList.add('expanded');
                container.classList.add('expanded');
                localStorage.setItem('sidebarState', 'expanded');
            } else {
                sidebar.classList.remove('expanded');
                container.classList.remove('expanded');
                localStorage.setItem('sidebarState', 'collapsed');
            }
        }

        // On DOMContentLoaded, set sidebar state from localStorage
        document.addEventListener('DOMContentLoaded', function () {
            const sidebar = document.getElementById('sidebar');
            const container = document.getElementById('container');
            // Retrieve saved state
            const expanded = localStorage.getItem('sidebarExpanded') === 'true';
            if (expanded) {
                sidebar.classList.add('expanded');
                container.classList.add('expanded');
            }
            // Toggle sidebar when clicking on the h2 (hamburger icon)
            sidebar.querySelector('h2').addEventListener('click', function () {
                sidebar.classList.toggle('expanded');
                container.classList.toggle('expanded');
                // Save the state in localStorage
                localStorage.setItem('sidebarExpanded', sidebar.classList.contains('expanded'));
            });
        });

        // On page load, check localStorage for the sidebar state
        const storedState = localStorage.getItem('sidebarState');
        if (storedState === 'expanded') {
            setSidebarState(true);
        } else {
            setSidebarState(false);
        }

        // Toggle sidebar state when clicking the toggle button
        toggleSidebar.addEventListener('click', function () {
            if (sidebar.classList.contains('expanded')) {
                setSidebarState(false);
            } else {
                setSidebarState(true);
            }
        });
    </script>
</body>

</html>