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

        // Mendapatkan nilai page dan limit dari body request
        $page = isset($_POST["page"]) ? $_POST["page"] : 1;
        $limit = isset($_POST["limit"]) ? $_POST["limit"] : 20;

        // Hitung offset untuk paginasi
        $offset = $page * $limit;

        // Deklarasi variabel totalData di luar percabangan agar dapat diakses di bagian selanjutnya
        $totalData = 0;

        // Jika tabel ada, lanjutkan dengan pengambilan data dari tabel yang diminta
        if (isset($_POST["search_title"])) {
            // Mendapatkan judul yang akan dicari dari body request
            $search_title = $_POST["search_title"];

            // Mendapatkan filter (terbaru/terlama)
            $filter = isset($_POST["filter"]) ? $_POST["filter"] : "terbaru";

            // Query SQL untuk mencari data berdasarkan judul dan menerapkan filter
            if ($filter == "terbaru") {
                $sql =
                    "SELECT COUNT(*) AS total FROM verifikasi_berita WHERE title LIKE :search_title";
            } else {
                $sql =
                    "SELECT COUNT(*) AS total FROM verifikasi_berita WHERE title LIKE :search_title";
            }

            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":search_title", "%" . $search_title . "%");
            $stmt->execute();
            $totalData = $stmt->fetch(PDO::FETCH_ASSOC)["total"];
        } else {
            // Jika tidak ada pencarian judul, ambil total data
            $sql = "SELECT COUNT(*) AS total FROM verifikasi_berita";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $totalData = $stmt->fetch(PDO::FETCH_ASSOC)["total"];
        }

        // Hitung total halaman berdasarkan jumlah total data dan batasan data per halaman
        $totalPages = $totalData <=0 ?0: ceil($totalData / $limit) -1;

        // Jika tabel ada, lanjutkan dengan pengambilan data dari tabel yang diminta
        if (isset($_POST["search_title"])) {
            // Query SQL untuk mencari data berdasarkan judul dan menerapkan filter
            if ($filter == "terbaru") {
                $sql =
                    "SELECT * FROM verifikasi_berita WHERE title LIKE :search_title ORDER BY updated_at DESC LIMIT :limit OFFSET :offset";
            } else {
                $sql =
                    "SELECT * FROM verifikasi_berita WHERE title LIKE :search_title ORDER BY updated_at ASC LIMIT :limit OFFSET :offset";
            }

            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":search_title", "%" . $search_title . "%");
            $stmt->bindValue(":limit", (int) $limit, PDO::PARAM_INT);
            $stmt->bindValue(":offset", (int) $offset, PDO::PARAM_INT);
            $stmt->execute();
        } else {
            // Jika tidak ada pencarian judul, ambil semua data
            if ($filter == "terbaru") {
                $sql =
                    "SELECT * FROM verifikasi_berita ORDER BY updated_at DESC LIMIT :limit OFFSET :offset";
            } else {
                $sql =
                    "SELECT * FROM verifikasi_berita ORDER BY updated_at ASC LIMIT :limit OFFSET :offset";
            }
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(":limit", (int) $limit, PDO::PARAM_INT);
            $stmt->bindValue(":offset", (int) $offset, PDO::PARAM_INT);
            $stmt->execute();
        }

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        http_response_code(200);

        // Mengirimkan data sebagai JSON dengan format yang diinginkan
        $response = [
            "status" => 200,
            "data" => $results,
            "total_pages" => $totalPages,
            "total_data" => $totalData,
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
