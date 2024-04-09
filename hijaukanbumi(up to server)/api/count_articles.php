<?php

require_once "connect.php";
// Mengecek metode HTTP yang digunakan
$method = $_SERVER["REQUEST_METHOD"];

// Jika metode adalah POST
if ($method === "POST") {
    // Memeriksa apakah header X-Authorization disertakan dalam permintaan
    if (!isset($_SERVER["HTTP_X_AUTHORIZATION"])) {
        http_response_code(401);
        // Jika tidak disertakan, kirim respons error
        $error_response = [
            "status" => 401,
            "msg" => "Unauthorized: X-Authorization header is missing",
        ];
        header("Content-Type: application/json");
        echo json_encode($error_response, JSON_PRETTY_PRINT);
        exit(); // Menghentikan eksekusi skrip
    }

    // Mengambil tanggal saat ini dengan format 'YYYY-MM-DD'
    $current_date = date("Y-m-d");

    // Mengenkripsi tanggal saat ini menjadi hash MD5
    $api_key_hash = md5($current_date);

    // Memeriksa apakah body request mengandung api_key
    if (!isset($_POST["api_key"]) || $_POST["api_key"] !== $api_key_hash) {
        // Jika api_key tidak sesuai, kirim respons error
        http_response_code(401);
        $error_response = [
            "status" => 401,
            "msg" => "Unauthorized: Invalid api_key ",
        ];
        header("Content-Type: application/json");
        echo json_encode($error_response, JSON_PRETTY_PRINT);
        exit(); // Menghentikan eksekusi skrip
    }

    // Mengambil token otorisasi dari database
    $sql_token = "SELECT authorization_token FROM authorization WHERE id = 1"; // Ganti dengan query yang sesuai
    try {
        $stmt_token = $conn->query($sql_token);
        $row = $stmt_token->fetch(PDO::FETCH_ASSOC);
        $authorization_token_db = $row["authorization_token"];

        // Memeriksa apakah token otorisasi valid
        $authorization_token_request = $_SERVER["HTTP_X_AUTHORIZATION"];
        $hashed_token_db = md5($authorization_token_db); // Mengenkripsi token dari database dengan MD5
        $bearer_token = "Bearer " . $hashed_token_db; // Menambahkan "Bearer " di depan token yang telah dienkripsi

        if ($authorization_token_request !== $bearer_token) {
            http_response_code(401);
            // Jika token tidak valid, kirim respons error
            $error_response = [
                "status" => 401,
                "msg" => "Unauthorized: Invalid X-Authorization token",
            ];
            header("Content-Type: application/json");
            echo json_encode($error_response, JSON_PRETTY_PRINT);
            exit(); // Menghentikan eksekusi skrip
        }

        $sql = "SELECT 
            COUNT(*) AS total_article,
            SUM(CASE WHEN status_article = 'Fakta' THEN 1 ELSE 0 END) AS total_fakta,
            SUM(CASE WHEN status_article = 'Hoax' THEN 1 ELSE 0 END) AS total_hoax
        FROM 
            verifikasi_berita";

        $stmt = $conn->query($sql);
        $results = $stmt->fetch(PDO::FETCH_ASSOC);

        http_response_code(200);

        // Mengirimkan data sebagai JSON dengan format yang diinginkan
        $response = [
            "status" => 200,
            "data" => $results,
        ];

        // sudah bisa menghasilkan respon sesuai di figma, namun hanya untuk respon yg tidak nested
        // untuk response nested array: buat file baru

        // Menambahkan header X-Authorization
        header("Content-Type: application/json");
        header("X-Authorization: " . $bearer_token); // Mengirimkan token dengan "Bearer " di depannya
        echo json_encode($response, JSON_PRETTY_PRINT);
    } catch (PDOException $e) {
        http_response_code(500);
        // Jika terjadi kesalahan, kirim respons dengan format yang diinginkan
        $error_response = [
            "status" => 500,
            "msg" => $e->getMessage(),
        ];
        header("Content-Type: application/json");
        echo json_encode($error_response, JSON_PRETTY_PRINT);
    }
}
?>
