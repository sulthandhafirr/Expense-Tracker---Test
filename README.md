# Expense Tracker

Aplikasi web untuk mengelola pengeluaran pribadi dengan fitur chatbot AI dan autentikasi pengguna.

## 🚀 Fitur

- ✅ Autentikasi pengguna (Register & Login)
- 💰 Manajemen pengeluaran (CRUD)
- 📊 Dashboard statistik pengeluaran
- 🤖 Chatbot AI untuk analisis pengeluaran
- 📱 Responsive design dengan Tailwind CSS

## 📋 Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- [Node.js](https://nodejs.org/) (v18 atau lebih tinggi)
- [MongoDB](https://www.mongodb.com/) (v6 atau lebih tinggi)
- npm atau yarn

## 🛠️ Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd Expense-Tracker---Test
```

### 2. Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Buat file .env dan konfigurasi
# Contoh isi file .env:
# PORT=5173
# MONGODB_URI=mongodb://localhost:27017/expense-tracker
# JWT_SECRET=your_jwt_secret_key_here
# NODE_ENV=development

# Jalankan backend (development mode dengan nodemon)
npm run dev

# Atau jalankan backend (production mode)
npm start
```

**Environment Variables Backend (.env):**
```env
PORT=5173
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 3. Setup Frontend

Buka terminal baru:

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Jalankan frontend development server
npm run dev

# Build untuk production
npm run build
```

**Catatan:** Frontend akan berjalan di `http://localhost:5174` (atau port lain yang tersedia)

## 🚀 Running the Application

### Development Mode

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📦 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Router** - Routing
- **Axios** - HTTP client

## 📁 Project Structure

```
Expense-Tracker---Test/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
└── frontend/
    ├── public/         # Static assets
    └── src/
        ├── api/        # API configuration
        ├── components/ # React components
        ├── context/    # Context providers
        ├── hooks/      # Custom hooks
        ├── pages/      # Page components
        └── App.tsx     # Main app component
```

## 🔧 Troubleshooting

### Frontend tidak berwarna / styling tidak muncul

Pastikan Anda menggunakan Tailwind CSS v4 dengan konfigurasi yang benar. File `index.css` harus menggunakan:
```css
@import "tailwindcss";
```
bukan syntax lama (`@tailwind base;` dll).

### Backend tidak bisa connect ke MongoDB

1. Pastikan MongoDB sudah berjalan
2. Cek connection string di file `.env`
3. Pastikan port MongoDB tidak digunakan aplikasi lain

### Port sudah digunakan

Ubah port di file `.env` (backend) atau di konfigurasi Vite (frontend)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### Expenses
- `GET /api/expenses` - Get semua expenses
- `POST /api/expenses` - Create expense baru
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Chatbot
- `POST /api/chatbot` - Chat dengan AI assistant

## 👨‍💻 Development

Untuk development, gunakan mode development agar auto-reload berfungsi:

```bash
# Backend dengan nodemon
cd backend
npm run dev

# Frontend dengan Vite HMR
cd frontend
npm run dev
```

---

**Made with ❤️ by Bismillah Jadi**
