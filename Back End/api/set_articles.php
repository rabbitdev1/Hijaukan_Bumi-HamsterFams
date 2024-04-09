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

        // Memastikan bahwa 'slug' tersedia dalam request POST dan tidak kosong
        if (
            (isset($_POST["slug"]) && !empty($_POST["slug"])) ||
            (isset($_POST["source"]) && !empty($_POST["source"])) ||
            (isset($_POST["source_url"]) && !empty($_POST["source_url"])) ||
            (isset($_POST["image_url"]) && !empty($_POST["image_url"])) ||
            (isset($_POST["title"]) && !empty($_POST["title"])) ||
            (isset($_POST["content_raw"]) && !empty($_POST["content_raw"])) ||
            (isset($_POST["summary"]) && !empty($_POST["summary"])) ||
            (isset($_POST["tags"]) && !empty($_POST["tags"])) ||
            (isset($_POST["reading_time_minutes"]) &&
                !empty($_POST["reading_time_minutes"])) ||
            (isset($_POST["status_article"]) &&
                !empty($_POST["status_article"]))
        ) {
            if ($_POST["slug"] !== null && $_POST["slug"] !== "" && $_POST["slug"] !== undefined ||
            $_POST["source"] !== null && $_POST["source"] !== "" && $_POST["source"] !== undefined ||
            $_POST["image_url"] !== null && $_POST["image_url"] !== "" && $_POST["image_url"] !== undefined||
            $_POST["title"] !== null && $_POST["title"] !== "" && $_POST["title"] !== undefined||
            $_POST["content_raw"] !== null && $_POST["content_raw"] !== "" && $_POST["content_raw"] !== undefined||
            $_POST["summary"] !== null && $_POST["summary"] !== "" && $_POST["summary"] !== undefined||
            $_POST["tags"] !== null && $_POST["tags"] !== "" && $_POST["tags"] !== undefined||
            $_POST["reading_time_minutes"] !== null && $_POST["reading_time_minutes"] !== "" && $_POST["reading_time_minutes"] !== undefined||
            $_POST["status_article"] !== null && $_POST["status_article"] !== "" && $_POST["status_article"] !== undefined) {
                // 'slug' ditemukan dalam data POST dan memiliki nilai yang tidak null atau tidak kosong
                // Mengambil nilai 'slug' dari input client
                $slug = htmlspecialchars($_POST["slug"]);

                // Menambahkan data tambahan yang diperlukan
                $source = htmlspecialchars($_POST["source"]);
                $source_url = htmlspecialchars($_POST["source_url"]);
                $image_url = htmlspecialchars($_POST["image_url"]);
                $title = htmlspecialchars($_POST["title"]);
                $content_raw = ($_POST["content_raw"]);
                $fact = htmlspecialchars($_POST["fact"]);
                $summary = htmlspecialchars($_POST["summary"]);
                $tags = htmlspecialchars($_POST["tags"]);
                $reading_time_minutes = htmlspecialchars(
                    $_POST["reading_time_minutes"]
                );
                $view_count = htmlspecialchars($_POST["view_count"]);
                $published_date = htmlspecialchars($_POST["published_date"]);
                $created_at = htmlspecialchars($_POST["created_at"]);
                $updated_at = htmlspecialchars($_POST["updated_at"]);
                $status_article = htmlspecialchars($_POST["status_article"]);

                // Kueri SQL untuk memeriksa apakah 'slug' sudah ada dalam database
                $check_slug_sql =
                    "SELECT COUNT(*) AS count FROM verifikasi_berita WHERE slug = :slug";
                $check_slug_stmt = $conn->prepare($check_slug_sql);
                $check_slug_stmt->bindParam(":slug", $slug);
                $check_slug_stmt->execute();
                $slug_exists = $check_slug_stmt->fetch(PDO::FETCH_ASSOC);

                // Memeriksa apakah 'slug' sudah ada dalam database
                if ($slug_exists["count"] > 0) {
                    // Jika 'slug' sudah ada, kirim respons error
                    http_response_code(400); // Conflict
                    $response = [
                        "status" => 400,
                        "msg" => "Slug sudah ada dalam database",
                    ];
                } else {
                    // Kueri SQL INSERT
                    $sql =
                        "INSERT INTO verifikasi_berita ( slug, source, source_url, image_url, title, content_raw, fact, summary, tags, reading_time_minutes, view_count, published_date, created_at, updated_at, status_article) VALUES ( :slug, :source, :source_url, :image_url, :title, :content_raw, :fact, :summary, :tags, :reading_time_minutes, :view_count, :published_date, :created_at, :updated_at, :status_article)";
                    $stmt = $conn->prepare($sql);

                    // Mengikat parameter dan mengeksekusi kueri
                    $stmt->bindParam(":slug", $slug);
                    $stmt->bindParam(":source", $source);
                    $stmt->bindParam(":source_url", $source_url);
                    $stmt->bindParam(":image_url", $image_url);
                    $stmt->bindParam(":title", $title);
                    $stmt->bindParam(":content_raw", $content_raw);
                    $stmt->bindParam(":fact", $fact);
                    $stmt->bindParam(":summary", $summary);
                    $stmt->bindParam(":tags", $tags);
                    $stmt->bindParam(
                        ":reading_time_minutes",
                        $reading_time_minutes
                    );
                    $stmt->bindParam(":view_count", $view_count);
                    $stmt->bindParam(":published_date", $published_date);
                    $stmt->bindParam(":created_at", $created_at);
                    $stmt->bindParam(":updated_at", $updated_at);
                    $stmt->bindParam(":status_article", $status_article);
                    $stmt->execute();

                    // Memeriksa apakah kueri berhasil dieksekusi
                    if ($stmt->rowCount() > 0) {
                        // Jika berhasil, mengirim respons sukses
                        http_response_code(200);
                        $response = [
                            "status" => 200,
                            "msg" => "Data berhasil dimasukkan",
                        ];
                    } else {
                        // Jika gagal memasukkan data
                        http_response_code(500); // Internal Server Error
                        $response = [
                            "status" => 500,
                            "msg" => "Gagal memasukkan data",
                        ];
                    }
                }
            } else {
                // 'slug' null atau tidak terdefinisi
                // Lakukan penanganan kesalahan atau berikan respons yang sesuai
                http_response_code(400); // Bad Request
                $response = [
                    "status" => 400,
                    "msg" => "Slug tidak valid",
                ];
            }
        } else {
            // Jika 'slug' tidak tersedia atau kosong dalam request
            http_response_code(400); // Bad Request
            $response = [
                "status" => 400,
                "msg" => "Slug tidak valid atau tidak ditemukan dalam request",
            ];
        }

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
