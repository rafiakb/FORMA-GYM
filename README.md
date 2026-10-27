# FORMA Gym Cloud — siap deploy ke Vercel

Versi online dari proyek FORMA Gym Studio lama (XAMPP). **Desain, 26 animasi gerakan, 7 program, latihan aktif, timer, jadwal, grafik, profil, CSV** tetap ada. **Login, pengaturan profil, program buatan sendiri, jadwal, berat badan, dan riwayat workout** disimpan per akun di **Supabase PostgreSQL**.

## HARUS DISETEL SEBELUM DIPAKAI

1. Buat project gratis di https://supabase.com/dashboard.
2. Di SQL Editor Supabase, jalankan **database/supabase.sql**.
3. Ambil **Project URL** dan **publishable key / anon public key** dari Supabase > Project Settings > API Keys.
4. Tempel keduanya di **assets/config.js**. Jangan pernah tempel **service_role** atau **secret key**.
5. Zip seluruh **isi folder** ini (pastikan `index.html` pada root ZIP), upload via https://vercel.com/drop, lalu Deploy.
6. Di Supabase > Authentication > URL Configuration, set **Site URL** dan allow **Redirect URLs** ke URL HTTPS Vercel yang baru. Tambahkan juga alamat `https://NAMA-PROJECT.vercel.app/reset-password.html` untuk reset password.
7. Buat akun, verifikasi email jika diminta, login, catat workout, dan uji login dari HP/laptop.

Buka **SETUP.html** untuk panduan lebih rinci.

## Data dan keamanan

- **Supabase Auth** mengurus password dan sesi login.
- **Row Level Security** memastikan user A tidak bisa membaca/mengubah profil dan progres user B.
- Browser hanya menerima **publishable / anon key** publik; **jangan gunakan** service_role/secret.
- Progres workout disimpan di PostgreSQL saat menyelesaikan sesi. Draft yang belum disimpan masih lokal per browser.
- Pustaka 26 gerakan dan program bawaan ada di `assets/catalog.json` dan ilustrasi gerakan berupa SVG lokal.
- Ini adalah versi prototype, bukan perangkat medis atau rekomendasi olahraga individual. Perhatikan teknik dan hentikan latihan jika muncul nyeri.

## Isi proyek

- `index.html`: aplikasi website siap Vercel
- `assets/app.js`: UI asli FORMA
- `assets/cloud.js`: autentikasi Supabase & penyimpanan progres
- `assets/config.js`: **diisi sendiri** dengan dua nilai publik project Supabase
- `assets/catalog.json`: 26 gerakan + 7 template program asli
- `assets/style.css`, `assets/motion.js`: desain & animasi orisinal
- `database/supabase.sql`: SQL Supabase PostgreSQL + RLS
- `SETUP.html`: petunjuk hosting lengkap
- `reset-password.html`: halaman mengganti password melalui tautan email

## Migrasi dari XAMPP

Riwayat lama MySQL XAMPP **tidak otomatis dimigrasikan** ke akun cloud. Proyek baru memulai akun masing-masing dari data kosong. Sistem lama dapat tetap dijalankan secara terpisah di XAMPP.

## Catatan

Karena website ini adalah file statis dan kunci Supabase belum tersedia, zip tidak langsung bisa login sampai konfigurasi selesai. Koneksi Supabase dan pengiriman email memerlukan internet. Jika login menemui "Invalid login credentials", periksa email/password dan email verification.
