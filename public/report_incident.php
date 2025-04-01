<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Submit Incident Report</title>
    <!-- Optionally include FontAwesome if you use icons elsewhere -->
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

    <div class="sidebar" id="sidebar">
        <h2><i class="fas fa-bars"></i></h2>
        <a href="dashboard.php"><i class="fas fa-tachometer-alt"></i><span class="link-text">Dashboard</span></a>
        <a href="incident_list.php"><i class="fas fa-exclamation-triangle"></i><span class="link-text">Incident
                List</span></a>
        <a href="employee_list.php"><i class="fas fa-users"></i><span class="link-text">Employee List</span></a>
        <a href="hardware_list.php"><i class="fas fa-desktop"></i><span class="link-text">Hardware List</span></a>
        <a href="report_incident.php"><i class="fas fa-file"></i><span class="link-text">Report Incident</span></a>
        <a href="closed_incidents.php"><i class="fas fa-circle-xmark"></i><span class="link-text">Closed
                Incidents</span></a>
        <a href="logout.php"><i class="fas fa-sign-out-alt"></i><span class="link-text">Logout</span></a>
    </div>

    <div class="container" id="container">
        <div class="main-content">
            <div class="report-container">
                <h1>Submit Incident Report</h1>
                <form action="submit_report.php" method="post">
                    <!-- Problem Type: Dropdown plus custom text -->
                    <label for="problem_type">Problem Type:</label>
                    <select name="problem_type" id="problem_type">
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="IT Support">IT Support</option>
                        <option value="ERP">ERP</option>
                        <option value="Other">Other</option>
                    </select>
                    <label for="custom_problem">If Other, please specify:</label>
                    <input type="text" name="custom_problem" id="custom_problem" placeholder="Custom Problem Type">

                    <!-- Severity Dropdown -->
                    <label for="severity">Severity:</label>
                    <select name="severity" id="severity">
                        <option value="1">1 - Resolves in a couple of hours</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5 - Resolves in a couple of days</option>
                    </select>

                    <!-- Description -->
                    <label for="description">Description:</label>
                    <textarea name="description" id="description" rows="5" placeholder="Describe the incident in detail"
                        required></textarea>

                    <!-- Informant Name -->
                    <label for="informant_name">Name of the Informant:</label>
                    <input type="text" name="informant_name" id="informant_name" placeholder="Your Name" required>

                    <!-- Informant Department -->
                    <label for="informant_department">Department of the Informant:</label>
                    <input type="text" name="informant_department" id="informant_department"
                        placeholder="Your Department" required>

                    <button type="submit">Submit Report</button>
                </form>
            </div>
        </div>
    </div>



    <script>
        // Sidebar state handling
        document.addEventListener('DOMContentLoaded', function () {
            const sidebar = document.getElementById('sidebar');
            const container = document.getElementById('container');
            const isExpanded = localStorage.getItem('sidebarExpanded') === 'true';
            if (isExpanded) {
                sidebar.classList.add('expanded');
                container.classList.add('expanded');
            }
            sidebar.querySelector('h2').addEventListener('click', function () {
                const expanded = sidebar.classList.toggle('expanded');
                container.classList.toggle('expanded');
                localStorage.setItem('sidebarExpanded', expanded);
            });
        });
    </script>
</body>

</html>