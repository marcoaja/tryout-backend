# Tryout Backend

## Requirements

Pastikan Bun sudah terinstal:

- [Bun](https://bun.sh/) (Runtime JavaScript)

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/marcoaja/tryout-backend
```

### 2. Instal Dependensi

```bash
bun install
```

### 3. Konfigurasi Environment

Buat file `.env` di root proyek dan isi dengan konfigurasi database:

```env
DATABASE_URL="..."
DIRECT_URL="..."
```

### 4. Jalankan Server

Untuk menjalankan server:

```bash
bun run dev
```

Server akan berjalan di: **http://localhost:8000/**

## Documentation

Untuk melihat dokumentasi API:
**http://localhost:8000/docs**

## Command Tambahan

- **Lint kode:** `bun run lint`
- **Format kode:** `bun run format`
