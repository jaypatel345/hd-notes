# HD Notes

HD Notes is a secure and efficient note-taking application built with a modern tech stack.  
It allows users to sign up, sign in using OTP authentication, and manage their personal notes seamlessly.

## Features
- User authentication with OTP (One-Time Password)
- Secure backend built with **Node.js & Express**
- Modern frontend powered by **React & Tailwind CSS**
- Persistent storage using **MongoDB**
- API integration for authentication and note management

## Tech Stack
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** OTP-based login system
- **Deployment:** Vercel (Frontend), Render (Backend)

## Project Structure
```
hd-notes/
├── backend/       # Express server, authentication, and API routes
├── frontend/      # React application with Tailwind CSS styling
├── node_modules/  # Dependencies
└── README.md      # Project documentation
```

## API Endpoints
### Authentication
- `POST /api/auth/signup` → Register a new user  
- `POST /api/auth/request-login-otp` → Request OTP for login  
- `POST /api/auth/login` → Login with OTP  

### Notes
- `GET /api/notes` → Fetch all notes for a user  
- `POST /api/notes` → Create a new note  
- `PUT /api/notes/:id` → Update a note  
- `DELETE /api/notes/:id` → Delete a note  

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/hd-notes.git
cd hd-notes
```

### 2. Install dependencies
For both backend and frontend:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Setup Environment Variables
In the `backend/.env` file, add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the project
Start backend:
```bash
cd backend
npm run dev
```

Start frontend:
```bash
cd frontend
npm run dev
```

### 5. Open in Browser
Navigate to:
```
http://localhost:5173
```

## Project Link
[HD Notes Live]((https://hd-notes-flame.vercel.app/))

---
✨ Built with passion for secure and modern note management.
