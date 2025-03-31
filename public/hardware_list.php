<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}
include(__DIR__ . '/db_config.php');

// Process insertion if form submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['name'], $_POST['type'], $_POST['description'])) {
    $name = $_POST['name'];
    $type = $_POST['type'];
    $description = $_POST['description'];

    $stmt = $pdo->prepare("INSERT INTO hardware (name, type, description) VALUES (?, ?, ?)");
    $stmt->execute([$name, $type, $description]);

    // Redirect to avoid duplicate submissions
    header("Location: hardware_list.php");
    exit;
}

// Retrieve hardware items from the database
$stmt = $pdo->query("SELECT * FROM hardware ORDER BY id ASC");
$hardwareItems = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Computer & Hardware List</title>
    <!-- <link rel="stylesheet" href="style.css"> -->
    <!-- FontAwesome for icons -->
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
    <!-- Sidebar (fixed at left) -->
    <div class="sidebar" id="sidebar">
        <h2 id="toggleSidebar"><i class="fas fa-bars"></i></h2>
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
    <!-- Main container -->
    <div class="container" id="container">
        <div class="main-content">
            <h1>Computer & Hardware List</h1>
            <!-- Form to insert new hardware -->
            <form class="hardware-form" action="hardware_list.php" method="post">
                <h3>Add New Hardware</h3>
                <input type="text" name="name" placeholder="Hardware Name" required>
                <input type="text" name="type" placeholder="Hardware Type" required>
                <textarea name="description" placeholder="Description" rows="3" required></textarea>
                <button type="submit">Add Hardware</button>
            </form>
            <!-- Table to display hardware items -->
            <?php if (count($hardwareItems) > 0): ?>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Hardware Name</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($hardwareItems as $item): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($item['id']); ?></td>
                                <td><?php echo htmlspecialchars($item['name']); ?></td>
                                <td><?php echo htmlspecialchars($item['type']); ?></td>
                                <td><?php echo htmlspecialchars($item['description']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p>No hardware items found.</p>
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