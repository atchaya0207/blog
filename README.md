# 📝 My Blog App

A full-stack blog application that allows users to securely create, manage, and publish blog posts. The application includes user authentication, author-based authorization, and a clean server-rendered interface built with EJS.

## 🚀 Live Demo

🔗 https://blog-beta-weld-76.vercel.app/

## ✨ Features

- User signup, login, and logout
- Secure password hashing using bcryptjs
- Session-based authentication
- Create, read, update, and delete blog posts
- Author-based access control (only authors can edit or delete their own posts)
- User profile displaying all published posts
- Responsive and user-friendly interface
- MongoDB Atlas integration for persistent data storage
- Deployed on Vercel

## 🛠️ Technologies Used

### Frontend
- EJS
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- bcryptjs
- express-session

### Deployment
- Vercel

## 📂 Project Structure

```text
myblog/
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── Post.js
│   └── User.js
│
├── public/
│   └── styles/
│       └── main.css
│
├── routes/
│   ├── auth.js
│   └── posts.js
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── profile.ejs
│   └── edit.ejs
│
├── .env
├── index.js
├── package.json
├── vercel.json
└── README.md
```

## ⚙️ Installation

```bash
git clone https://github.com/atchaya0207/blog.git
cd blog
npm install
```

Create a `.env` file and add the required environment variables.

Run the application:

```bash
node index.js
```

Open your browser and visit:

```
http://localhost:3000
```

## 📸 Screenshots

Add screenshots of:
- Home Page
- Login Page
- Signup Page
- Profile Page
- Create/Edit Blog Page

## 👩‍💻 Author

**Atchaya S**

GitHub: https://github.com/atchaya0207
