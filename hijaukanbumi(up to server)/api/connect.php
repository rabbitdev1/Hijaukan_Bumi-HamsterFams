<?php 
$host = 'localhost';
$dbname = 'oxigenut_hijaukan-bumi';
$username = 'oxigenut_hamsterfam'; // Username baru
$password = 'STTBandung'; // Password baru

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
date_default_timezone_set('Asia/Jakarta');

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
