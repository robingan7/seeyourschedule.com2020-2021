<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: *');

$dBServername = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "smlunch";
$conn = mysqli_connect($dBServername, $dBUsername, $dBPassword, $dBName);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>