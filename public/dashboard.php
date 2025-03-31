<?php
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.html");
  exit;
}

include(__DIR__ . '/db_config.php');

// Query to get the count of incidents grouped by severity
$stmt = $pdo->query("SELECT severity, COUNT(*) as count FROM incidents GROUP BY severity ORDER BY severity ASC");
$data = $stmt->fetchAll();

// Initialize counts for severities 1 to 5
$severity_counts = [0, 0, 0, 0, 0];
foreach ($data as $row) {
  $severity = (int) $row['severity'];
  if ($severity >= 1 && $severity <= 5) {
    $severity_counts[$severity - 1] = (int) $row['count'];
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>IT Staff Dashboard</title>
  <!-- <link rel="stylesheet" href="style.css"> -->
  <!-- Include Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
    <!-- Sidebar -->
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

    <!-- Main Content -->
    <div class="main-content">
      <h1>Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?></h1>
      <div class="chart-container">
        <canvas id="incidentChart"></canvas>
      </div>
    </div>
  </div>

  <script>
    const severityLabels = ['Severity 1', 'Severity 2', 'Severity 3', 'Severity 4', 'Severity 5'];
    const severityData = <?php echo json_encode($severity_counts); ?>;

    const ctx = document.getElementById('incidentChart').getContext('2d');
    const incidentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: severityLabels,
        datasets: [{
          label: 'Number of Incidents',
          data: severityData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });



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