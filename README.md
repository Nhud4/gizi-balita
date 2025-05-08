# Gizi Balita

Aplikasi monitoring status gizi balita dengan arsitektur monorepo (frontend & backend terpisah).

## 🚀 Fitur

- Manajemen data gizi balita
- Halaman frontend dengan antarmuka pengguna
- API backend untuk penyimpanan dan pemrosesan data
- Skrip otomatis untuk setup & dev

## 🧑‍💻 Teknologi

- Frontend: (React, Vite, Tailwind CSS, React Router Dom, Redux)
- Backend: (Express.js, MySQL, Knex)
- Dev Tools: Concurrently, npm
- Node Version: 23.11.0
- npm version: 10.9.2

## ⚙️ Cara Menjalankan

```bash
# 1. Clone repository
git clone https://github.com/Nhud4/gizi-balita.git
cd gizi-balita

#2. install concurrently
npm install --save-dev concurrently

# 3. Install dependencies
npm run prepare --legacy-peer-deps

# 4. Jalankan frontend & backend secara bersamaan
npm run dev
```

## 🛠 Skrip NPM

npm run dev: Menjalankan frontend & backend secara bersamaan
npm run build: Build frontend
npm run dev:backend: Jalankan hanya backend
npm run dev:frontend: Jalankan hanya frontend
