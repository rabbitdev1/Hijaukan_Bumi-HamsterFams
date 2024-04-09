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

        $requested_slug = $_POST["slug"];

        // Memeriksa apakah parameter 'slug' ada dalam permintaan POST
        if (!isset($_POST["slug"]) || empty($_POST["slug"])) {
            // Jika parameter 'slug' kosong atau tidak ada
            http_response_code(400);
            $error_response = [
                "status" => 400,
                "msg" => "Bad Request: Slug parameter is missing or empty",
            ];
            header("Content-Type: application/json");
            echo json_encode($error_response, JSON_PRETTY_PRINT);
            exit(); // Menghentikan eksekusi skrip
        }

        // Mengambil data dari database berdasarkan slug
        $sql = "SELECT * FROM verifikasi_berita WHERE slug = '$requested_slug'";
        $stmt = $conn->query($sql);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Memeriksa apakah hasilnya kosong
        if (empty($results)) {
            // Jika tidak ada entri dengan slug yang diberikan
            http_response_code(404);
            $error_response = [
                "status" => 404,
                "msg" => "Not Found: No entry found with the provided slug",
            ];
            header("Content-Type: application/json");
            echo json_encode($error_response, JSON_PRETTY_PRINT);
            exit(); // Menghentikan eksekusi skrip
        }
        $single_result = reset($results);
        // Jika ada entri dengan slug yang diberikan, kirimkan respons dengan data yang ditemukan
        http_response_code(200);
        $response = [
            "status" => 200,
            "data" => $single_result,
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
