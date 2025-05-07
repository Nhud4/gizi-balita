# Gizi Balita

Aplikasi monitoring status gizi balita dengan arsitektur monorepo (frontend & backend terpisah).

## 📁 Struktur Proyek

gizi-balita/
├── backend/ # Kode untuk backend (Node.js/Express, dll)
├── frontend/ # Kode untuk frontend (React/Vite, dll)
├── package.json # Script manajemen proyek gabungan

## 🚀 Fitur

- Manajemen data gizi balita
- Halaman frontend dengan antarmuka pengguna
- API backend untuk penyimpanan dan pemrosesan data
- Skrip otomatis untuk setup & dev

## 🧑‍💻 Teknologi

- Frontend: (React, Vite, Tailwind CSS, dll) _(isi sesuai yang kamu pakai)_
- Backend: (Express.js, MySQL/MongoDB, dll) _(isi sesuai yang kamu pakai)_
- Dev Tools: Concurrently, npm

## ⚙️ Cara Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/username/gizi-balita.git
cd gizi-balita

# 2. Install dependencies
npm run prepare

## jika ada masalah saat install
npm run prepare --legacy-peer-deps

# 3. Jalankan frontend & backend secara bersamaan
npm run dev
```

## 🛠 Skrip NPM

npm run dev: Menjalankan frontend & backend secara bersamaan
npm run build: Build frontend
npm run dev:backend: Jalankan hanya backend
npm run dev:frontend: Jalankan hanya frontend
