# FORMA Gym Studio — Workout Tracker

**FORMA Gym Studio** adalah aplikasi web untuk merencanakan latihan gym, mempelajari gerakan, dan mencatat progres olahraga. Website ini responsif untuk HP maupun laptop, menggunakan desain modern dengan aksen hijau limau.

**Website:** https://forma-gym-online.vercel.app  
**GitHub:** https://github.com/rafiakb/FORMA-GYM  
**Status proyek:** Prototype / dalam pengembangan  
**Pembaruan dokumentasi:** 28 Oktober 2026

> FORMA awalnya dibuat menggunakan PHP dan MySQL untuk XAMPP. Versi **FORMA Gym Cloud** pada repository ini menggunakan frontend HTML, CSS, dan JavaScript serta **Supabase** untuk login dan penyimpanan progres online. Website di atas telah dipublikasikan ke Vercel. Integrasi auto-deploy GitHub → Vercel untuk FORMA belum dikonfirmasi.

## ✨ Fitur utama

- **Akun pengguna:** registrasi, login, logout, verifikasi email bila diaktifkan, serta reset password menggunakan Supabase Auth.
- **Dashboard:** ringkasan aktivitas, target mingguan, dan latihan terbaru.
- **Pustaka 26 gerakan gym:** informasi otot yang dilatih, peralatan, langkah teknik, tips, dan ilustrasi gerakan animasi.
- **7 program latihan bawaan:** pilihan latihan dengan susunan gerakan, set, dan repetisi.
- **Program pribadi:** membuat dan mengelola program latihan sesuai kebutuhan.
- **Jadwal mingguan:** mengatur program latihan untuk hari-hari tertentu.
- **Sesi workout:** mencatat set, repetisi, beban, serta menggunakan timer istirahat.
- **Riwayat dan progres:** ringkasan latihan, grafik, statistik, dan catatan berat badan.
- **Ekspor CSV:** mengunduh catatan aktivitas.
- **Responsif:** dapat digunakan melalui browser desktop dan ponsel.

## 🧰 Teknologi

| Komponen | Teknologi |
| --- | --- |
| Antarmuka | HTML5, CSS3, JavaScript |
| Hosting website | Vercel |
| Autentikasi | Supabase Auth |
| Penyimpanan progres | Supabase PostgreSQL |
| Keamanan data per akun | Supabase Row Level Security (RLS) |
| Version control | Git & GitHub |

**Catatan:** Untuk versi web online ini, **XAMPP dan MySQL tidak diperlukan**.

## 📁 Struktur proyek

```text
FORMA-GYM/
├── assets/
│   ├── app.js           # Antarmuka, latihan, dashboard, dan interaksi
│   ├── cloud.js         # Login dan penyimpanan dengan Supabase
│   ├── config.js        # Project URL dan publishable key Supabase
│   ├── catalog.json     # Katalog gerakan dan program bawaan
│   ├── motion.js        # Animasi ilustrasi gerakan
│   ├── style.css        # Desain responsif
│   └── favicon.svg
├── database/
│   └── supabase.sql     # Skema PostgreSQL dan kebijakan RLS
├── index.html           # Halaman utama
├── reset-password.html  # Halaman pengaturan ulang password
├── SETUP.html           # Panduan pemasangan
├── vercel.json          # Konfigurasi deployment
└── README.md
```

## 🚀 Cara menjalankan proyek

### A. Menyiapkan Supabase

1. Buat proyek di [Supabase Dashboard](https://supabase.com/dashboard).
2. Buka **SQL Editor** dan jalankan isi `database/supabase.sql`.
3. Dari pengaturan proyek Supabase, salin **Project URL** dan **Publishable Key**.
4. Buka `assets/config.js`, kemudian isi konfigurasi berikut dengan nilai milik proyekmu:

```javascript
window.FORMA_CONFIG = {
  supabaseUrl: "https://PROJECT-ID.supabase.co",
  supabaseAnonKey: "sb_publishable_..."
};
```

**Jangan pernah menggunakan database password, `service_role`, atau `sb_secret_...` di file frontend.** Publishable key boleh berada di browser, tetapi kebijakan RLS harus tetap aktif dan benar.

### B. Menjalankan di komputer

Buka folder proyek melalui **VS Code** dan jalankan menggunakan server lokal, misalnya ekstensi **Live Server**. Koneksi internet diperlukan untuk menggunakan autentikasi dan penyimpanan Supabase.

### C. Deploy ke Vercel

1. Pastikan `assets/config.js` sudah terisi dengan nilai publik Supabase.
2. Unggah isi proyek melalui [Vercel Drop](https://vercel.com/drop), atau hubungkan repository GitHub jika integrasi Git sudah dikonfigurasi.
3. Pastikan `index.html` berada pada root proyek.
4. Sesudah deployment, masuk ke **Supabase → Authentication → URL Configuration**:
   - **Site URL:** `https://forma-gym-online.vercel.app`
   - **Redirect URLs:** tambahkan `https://forma-gym-online.vercel.app/**` (dan alamat preview lain jika memang digunakan).
5. Coba registrasi, verifikasi email jika diminta, login, selesaikan workout, dan buka lagi akun yang sama dari perangkat lain.

## 🔄 Memperbarui proyek lewat GitHub

Jika kode berubah di VS Code:

1. Simpan perubahan dengan `Ctrl + S`.
2. Buka **Source Control** dan tulis pesan commit, misalnya `feat: improve workout dashboard`.
3. Klik **Commit & Push** atau lakukan **Commit** lalu **Sync Changes**.
4. Periksa perubahan di [repository GitHub](https://github.com/rafiakb/FORMA-GYM).

**Penting:** Push ke GitHub **belum otomatis memperbarui website FORMA** sebelum repository FORMA dihubungkan ke proyek Vercel yang benar. Untuk deployment yang sudah terhubung, periksa hasilnya di halaman **Deployments** Vercel.

## 🔐 Akun, data, dan keamanan

- Password dan proses login dikelola oleh **Supabase Auth**, bukan disimpan di JavaScript atau file SQL aplikasi.
- SQL proyek mengaktifkan **Row Level Security (RLS)** pada tabel `public.forma_user_data` dan membatasi akses berdasarkan `auth.uid()`.
- Data seperti profil, program pribadi, jadwal, riwayat latihan, dan pengukuran tubuh disimpan per akun pada PostgreSQL Supabase.
- Progres latihan disimpan ke cloud **setelah sesi diselesaikan dan penyimpanan berhasil**. Draft sesi yang masih berjalan dapat tersimpan secara lokal di browser.
- Jangan unggah rahasia, password, atau file konfigurasi privat ke repository publik. Bila rahasia terlanjur terpublikasi, rotasi kuncinya.
- Fitur dan aturan keamanan masih perlu diuji sebelum website digunakan secara luas.

## ❓ Mengatasi kendala umum

**`Email not confirmed`:** cek email konfirmasi dan folder Spam. Pastikan Site URL serta Redirect URLs Supabase sesuai alamat Vercel.  
**`Invalid login credentials`:** periksa email, password, dan status verifikasi akun.  
**Tidak dapat menyimpan progres:** periksa koneksi internet, konfigurasi `assets/config.js`, hasil eksekusi SQL, RLS, serta pesan error pada Console browser.  
**Tampilan berubah tetapi website online belum berubah:** pastikan perubahan sudah di-push dan deployment terbaru Vercel telah berstatus **Ready**.

## 🛣️ Pengembangan berikutnya

- Uji penuh alur registrasi, konfirmasi email, reset password, dan sinkronisasi HP–laptop.
- Hubungkan repository FORMA ke proyek Vercel agar deployment bisa otomatis.
- Tambahkan lebih banyak gerakan serta pilihan program latihan.
- Tingkatkan aksesibilitas, validasi input, dan pengujian keamanan.

## ⚠️ Catatan

FORMA Gym Studio merupakan **proyek prototype**, bukan pengganti instruktur atau nasihat medis. Gunakan beban sesuai kemampuan, utamakan teknik yang baik, dan hentikan latihan bila muncul rasa sakit.

---

Dibuat untuk pengembangan dan pembelajaran aplikasi web.  
**Project:** FORMA Gym Studio · **Repository:** [rafiakb/FORMA-GYM](https://github.com/rafiakb/FORMA-GYM)
