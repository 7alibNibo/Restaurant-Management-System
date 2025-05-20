# Restaurant Management System

A full-stack restaurant management system built by a team of 3, using:

- **React.js** for the frontend
- **Express.js + Node.js** for the backend API
- **MongoDB** for database storage
- **MySQL** (SQL schema only) for reference schema and ERD

---

## 🧑‍💻 Team Roles

| Member        | Role               | Responsibilities                                 |
|---------------|--------------------|--------------------------------------------------|
| Person 1      | Frontend Developer | React UI for reservations, orders, staff, etc.  |
| Person 2      | Backend Developer  | API routes, MongoDB models, full CRUD logic      |
| Person 3      | DB Designer/Tester | SQL schema (ERD), `Dump20250518.sql` structure   |

---

## 📁 Project Structure

Restaurant-Management-System/
├── backend/             # Node.js + Express + MongoDB API  
├── frontend/            # React frontend  
├── Dump20250518.sql     # SQL schema (MySQL reference)  
└── README.md            # Project summary

---

## ⚙️ Technologies Used

- **Frontend**: React, Axios, React Icons, HTML2Canvas, jsPDF
- **Backend**: Express.js, Mongoose, Node.js
- **Database**: MongoDB (live), MySQL (for schema)
- **Testing**: Postman, DevTools

---

## 🧪 Features

### ✅ CRUD Operations
- **Reservations**
- **Orders**
- **Inventory**
- **Staff Scheduling**

### ✅ Additional Views
- **Kitchen Dashboard**: filters orders with `status: 'preparing'` or `'ready'`
- **Reports Overview**: pulls data from all modules; includes PDF, Excel, Print

---

## 🚀 Setup Instructions

### Backend
cd backend
npm install
npm start

### Frontend
cd frontend
npm install
npm start

### 🧠 Notes
- All data is stored in MongoDB, structured to reflect the SQL schema provided by Person 3.

- Kitchen and Report pages are now fully connected and synced with backend data.

- The SQL dump is used as a reference and not loaded directly into the running app.