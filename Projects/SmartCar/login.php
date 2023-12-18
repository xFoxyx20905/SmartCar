<?php
/*
Requirement:
    - MySQL Server
    - Web Server
*/

/* 
----- Connection Data to SQL Sever -----
*/

$host ="LNL-5CG1436LCJ";
$user ="KKK KG";
$password ="TfZSVrK4jW4ShH";
$db = "user data";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

/*
----- Log in function ----- 
*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username='$user' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "Login successful!";
        header("Location: SmartCar-Home.html");
        exit();
    } else {
        echo "Login failed. Please check your username and password.";
        header("Location: SmartCar-Login.html");
    }
}

$conn->close();
?>