# 🧾 GyanLedger

**GyanLedger** is a full-stack Tuition Manager app built for tutors to manage students, track fee payments, view reports/summaries and stay organized — all in one place. It also has features like profile management, dark/light theme toggle, image uploads, and real-time UI feedback using toasts and spinners.

---

## 🚀 Features

### 🔐🧾 **Authentication**

  * Login & Registration via modal popups on the landing page
  * Token-based authentication with session persistence

### 👥 **Student Management**

  * Add, edit, and delete student records
  * Search students by name or phone number

### 💰 **Payment Tracking**

  * Record monthly payments with date and remarks
  * View payment history per student
  * Monthly collection summary

- 📊 **Monthly Summary Reports** — See collected, expected, and pending amounts

### 📊 **Dashboard**

  * Total students, total collected, expected, and pending amount
  * Supports light/dark mode/theme toggle with smooth transitions
  🌗 Smooth theme switching with persistent settings

### 📸👤 **User Profile**

  * Update personal details
  * Upload and view profile image (stored in 📦 MongoDB via GridFS)
  * Change password
  * Delete account (with auto-redirect)

### 🎨 **UI Polishing**

  * Spinners for loading states
  * Toast notifications for feedback
  * Responsive layout for desktop and mobile

- 🪄 **UX Enhancements** — Toasts for feedback, modals, spinners, and more

- ⚡ **Responsive UI** — Built with modern React practices and a clean layout

---

## 🛠🛠️ Tech Stack

### 🧠 Backend (Django + DRF)

* Django REST Framework
* Token Authentication
* MongoDB for storing profile images (GridFS)
* MySQL for core data (students, payments, user info)
- **Django** + **Django REST Framework**
- **MongoDB** (for profile images via GridFS)
- **MySQL** (for core data: students, payments, users)
- **JWT Authentication** using `djangorestframework-simplejwt`

### 🎨 Frontend (React)

* React + React Router DOM
* Axios for API calls
* React Toastify for notifications
* CSS modules & dark/light theming
- **React** (Hooks + functional components)
- **React Router** for routing
- **Axios** for API calls
- **React Toastify** for notifications
- **Tailwind CSS** or custom CSS (based on your setup)

---

## 🧰🏁 Installation Guide

1. Clone the repository:

```bash
git clone https://github.com/yourusername/GyanLedger.git
cd GyanLedger
```

### 🖥 Backend (Django + DRF)

2. Set up and activate a virtual environment:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure `.env` (DB creds, secret key, etc.)

5. Make migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create superuser (optional)
```bash
python manage.py createsuperuser
```

7. Start server
```bash
python manage.py runserver
```

### 🌐 Frontend (React)

1. Go to frontend folder:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

> The app runs on `http://localhost:3000` (frontend) and connects to backend on `http://localhost:8000`

---

## 📁 Folder Structure

```
GyanLedger/
|
├── backend/
|   ├── manage.py
│   ├── core/           # All API logic
│   ├── gyanledger/     # Django project config
│   └── ...
|
├── frontend/
│   ├── public/
│   |   ├── favicon.ico
│   │   └── logo.png
│   └── src/
│       ├── components/ #.jsx files
│       ├── App.js
│       ├── App.css
│       └── ...
|
└── README.md
```

---

## 🧪 Usage

1. Visit the landing page
2. Register or login via the modals
3. Access the dashboard
4. Add students, record payments, view summaries
5. Customize your profile and theme

---

## 📷 Screenshots

<details>
  <summary>🔓 Landing Page</summary>
  (insert image here)
</details>

<details>
  <summary>📊 Dashboard</summary>
  (insert image here)
</details>

<details>
  <summary>👤 Profile Page</summary>
  (insert image here)
</details>

## 🖼 Demo

> *Include 2–3 screenshots of the dashboard, profile page, and landing page here if possible.*


---

## 💡 Future Ideas 📌 Future Improvements

* Role-based access (Admin/Tutor)
* Notifications/Email reminders for pending payments
* Export data for monthly reports as PDF/Excel
* Multi-language support (English/Bengali)
* Mobile App (React Native / Flutter)
* Pagination
* attendance tracking
* time table scheduling
* xam tracker
* admin panel
* password forgor
* email verification

---

## 🧑‍💻 Made with ⚔️ by Tech Comrades

---

## 📄 License
This project is open-source and available under the MIT License.
