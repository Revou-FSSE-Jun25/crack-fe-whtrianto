# 🚀 Setup Vercel untuk Frontend

## Environment Variable yang Diperlukan

Untuk menghubungkan frontend ke backend production, Anda perlu mengatur Environment Variable di Vercel:

### URL Backend Production
```
https://crackbe-production.up.railway.app
```

## 📝 Langkah Setup di Vercel Dashboard

1. **Login ke Vercel Dashboard**
   - Buka [vercel.com](https://vercel.com)
   - Login ke akun Anda

2. **Pilih Project**
   - Pilih project frontend Anda di dashboard

3. **Buka Settings**
   - Klik tab **Settings** di menu atas
   - Pilih **Environment Variables** di sidebar kiri

4. **Tambah Environment Variable**
   - Klik **Add New**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://crackbe-production.up.railway.app`
   - **Environment:** Pilih semua (Production, Preview, Development)
   - Klik **Save**

5. **Redeploy**
   - Setelah menambahkan environment variable, klik **Deployments** tab
   - Pilih deployment terbaru
   - Klik **Redeploy** untuk menerapkan perubahan

## ✅ Verifikasi

Setelah redeploy, cek:
1. Buka aplikasi frontend di Vercel
2. Buka browser console (F12)
3. Cek apakah tidak ada error CORS atau connection error
4. Test login/register untuk memastikan API terhubung

## 🔧 Troubleshooting

### Frontend tidak bisa connect ke backend

1. **Cek Environment Variable:**
   - Pastikan `VITE_API_URL` sudah di-set dengan benar
   - Pastikan tidak ada spasi atau karakter tambahan
   - Pastikan menggunakan HTTPS (bukan HTTP)

2. **Cek CORS di Backend:**
   - Pastikan backend mengizinkan origin Vercel
   - Backend harus mengizinkan domain Vercel Anda

3. **Redeploy:**
   - Setelah mengubah environment variable, selalu redeploy
   - Environment variable hanya berlaku setelah redeploy

## 📌 Catatan

- **Development:** Untuk development lokal, buat file `.env` dengan `VITE_API_URL=http://localhost:5000`
- **Production:** Environment variable di Vercel akan otomatis digunakan saat build
- **URL Format:** Jangan tambahkan `/api` di akhir URL, karena sudah ditambahkan di kode

