import os
import requests
from dotenv import load_dotenv
import telegram
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters

# Fungsi untuk menangani perintah /start
def start(update, context):
    # Pesan selamat datang
    welcome_message = (
        "Selamat datang di Bot Hijaukan Bumi! 😊\n\n"
        "Berikut adalah beberapa opsi yang bisa Anda gunakan:\n"
        "/cek_berita_hoax - Untuk memeriksa berita hoax seputar lingkungan.\n"
        "/kunjungi_situs_hoax - Untuk mengunjungi situs Hijaukan bumi.\n"
        "/stop - Untuk menghentikan Bot"
    )

    # Kirim pesan balasan ke pengguna
    update.message.reply_text(welcome_message)


def cek_berita_hoax(update, context):
    # Meminta pengguna untuk memasukkan judul berita
    update.message.reply_text("Masukkan judul berita yang ingin Anda periksa:")

    # Menyiapkan handler untuk tanggapan pengguna
    context.user_data["next_action"] = "cek_berita_api"


def cek_berita_api(update, context):
    # Mengambil judul berita yang dimasukkan pengguna
    judul_berita = update.message.text

    url = "https://hijaukanbumi.oxigenutb.web.id/api/search_bot"
    payload = {
        'search_title': judul_berita,
        'filter': 'terbaru',
        'page': '0',
        'limit': '10'
    }
    headers = {
        'X-Authorization': 'Bearer 8c9908aeb07688a9cdc593f52653aea2',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    response = requests.post(url, headers=headers, data=payload)

    if response.status_code == 200:
        # Berhasil mendapatkan respons dari API
        data = response.json()
        if data and "data" in data:
            # Artikel berita ditemukan
            articles = data["data"]
            for article in articles:
                summary = ' '.join(article['summary'].split()[:40]) + "..."
                # Kirim pesan dengan judul, isi, sumber, dan tautan
                message_text = (
                    f"Judul: {article['title']}\n"
                    f"Isi: {summary}\n"
                    f"Sumber: {article['source']}\n"
                    f"Lihat Lebih Detail: https://temukanhoax.oxigenutb.web.id/detail/{article['slug']}"
                )
                # Kirim gambar sebagai media
                job = context.job_queue.run_once(
                    send_message_with_photo,
                    1,
                    context=[
                        update.message.chat_id,
                        article["image_url"],
                        message_text,
                    ],
                )
        else:
            response_text = (
                "Maaf, tidak ditemukan artikel berita dengan judul tersebut."
            )
            update.message.reply_text(response_text)
    else:
        # Gagal mengakses API
        response_text = (
            "Terjadi kesalahan saat mencari artikel berita. Silakan coba lagi nanti."
        )
        update.message.reply_text(response_text)


def send_message_with_photo(context):
    chat_id, image_url, message_text = context.job.context

    # Truncate message text if it exceeds Telegram's caption length limit
    max_caption_length = 1024  # Telegram's caption length limit
    if len(message_text) > max_caption_length:
        message_text = message_text[:max_caption_length]

    # Send photo with the truncated caption
    context.bot.send_photo(chat_id, image_url, caption=message_text)



# Fungsi untuk menangani perintah /kunjungi_situs_hoax
def kunjungi_situs_hoax(update, context):
    # Contoh implementasi kunjungi situs hoax
    # Anda dapat mengarahkan pengguna ke situs web berita hoax yang diinginkan
    update.message.reply_text(
        "Kunjungi situs berita hoax di [Temukan Hoax](https://hijaukanbumi.oxigenutb.web.id/)"
    )

def stop_bot(update, context):
    # Token bot dari BotFather
    TOKEN = os.getenv("BOT_TOKEN")

    # Inisialisasi Updater
    updater = Updater(TOKEN, use_context=True)

    # Dapatkan dispatcher untuk menangani perintah
    dp = updater.dispatcher
    updater.stop()
    update.message.reply_text("Bot telah dihentikan.")
    
def main():
    # Token bot dari BotFather
    TOKEN = os.getenv("BOT_TOKEN")

    # Inisialisasi Updater
    updater = Updater(TOKEN, use_context=True)

    # Dapatkan dispatcher untuk menangani perintah
    dp = updater.dispatcher

    # Tambahkan handler untuk perintah /start
    dp.add_handler(CommandHandler("start", start))

    # Tambahkan handler untuk perintah /cek_berita_hoax
    dp.add_handler(CommandHandler("cek_berita_hoax", cek_berita_hoax))
    dp.add_handler(MessageHandler(Filters.text & (~Filters.command), cek_berita_api))

    # Tambahkan handler untuk perintah /kunjungi_situs_hoax
    dp.add_handler(CommandHandler("kunjungi_situs_hoax", kunjungi_situs_hoax))
    dp.add_handler(CommandHandler("stop", stop_bot))

    # Mulai polling untuk mendapatkan pembaruan
    updater.start_polling()

    # Biarkan bot berjalan hingga Anda menghentikannya
    updater.idle()


if __name__ == "__main__":
    main()
