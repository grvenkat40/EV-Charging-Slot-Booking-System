# ⚡ EV Charging Slot Booking System

A full-stack web application that allows users to book EV charging slots and enables admins to manage stations and slots efficiently.

---

## 🚀 Features

### 👤 User Features
- 🔐 Register & Login (JWT Authentication)
- 🔍 View Charging Stations
- ⚡ View Available Slots (with time)
- 📅 Book Charging Slot
- 📜 View Booking History (Station + Slot Time)

---

### 👨‍💼 Admin Features
- ➕ Add Charging Stations
- ⚡ Create Time-Based Slots
- 🔒 Secure Admin Access (Admin Code Required)
- 📊 Manage Slot Availability

---

## 🧠 System Design

### 🔹 Backend (FastAPI)
- REST APIs using FastAPI
- JWT-based authentication
- Role-based access control (User/Admin)
- SQLAlchemy ORM
- PostgreSQL database

---

### 🔹 Frontend (HTML, CSS, JS)
- Simple UI using Vanilla JS
- Role-based dashboards
- API integration using Fetch
- Dynamic rendering (Stations, Slots, Bookings)

---

## 🏗️ Architecture

```
        ┌───────────────┐
        │   Frontend    │
        │ (HTML/CSS/JS)│
        └──────┬────────┘
               │ HTTP (Fetch API)
               ▼
        ┌───────────────┐
        │   FastAPI     │
        │   Backend     │
        └──────┬────────┘
               │
     ┌─────────┴─────────┐
     │                   │
     ▼                   ▼
┌────────────┐     ┌──────────────┐
│ Auth Layer │     │ Business     │
│ (JWT)      │     │ Logic        │
└────────────┘     └──────┬───────┘
                          │
                          ▼
                  ┌──────────────┐
                  │ SQLAlchemy   │
                  │ ORM Layer    │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │ PostgreSQL   │
                  │ Database     │
                  └──────────────┘
```

## 🧩 Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Frontend     | HTML, CSS, JavaScript |
| Backend      | FastAPI |
| Database     | PostgreSQL |
| ORM          | SQLAlchemy |
| Auth         | JWT |
| Server       | Uvicorn |

---
### Images

## User
<img width="1348" height="633" alt="Screenshot 2026-04-01 173145" src="https://github.com/user-attachments/assets/ceb611f7-c570-4aee-ba00-08b7722775f6" />

<img width="1355" height="558" alt="Screenshot 2026-04-01 173203" src="https://github.com/user-attachments/assets/8f4201ee-5dc0-4d30-b0a6-74cd95dfc770" />

<img width="1352" height="407" alt="Screenshot 2026-04-01 173227" src="https://github.com/user-attachments/assets/8d1e96ba-f735-4977-a7bf-a5e0f311ee95" />

## Admin
<img width="1347" height="636" alt="Screenshot 2026-04-01 173251" src="https://github.com/user-attachments/assets/0d819efc-b3c6-4c71-ad87-f2f524a63445" />


## 📂 Project Structure
```
EV_charging_backend/
│
├── app/
│ ├── api/
│ ├── models/
│ ├── schemas/
│ ├── services/
│ ├── core/
│
├── main.py
└── requirements.txt

EV_charging_frontend/
│
├── login.html
├── register.html
├── dashboard.html
├── admin.html
│
├── static/
│ ├── js/
│ └── css/
```


---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns JWT token
3. Token stored in browser (localStorage)
4. Token used for protected API calls

---

## ⚡ Slot Booking Flow

1. User selects station
2. Views available slots
3. Clicks "Book"
4. Backend:
   - Checks availability
   - Locks slot (no double booking)
5. Slot marked as booked

---

## 🧠 Key Concepts Implemented

- JWT Authentication
- Role-Based Access Control
- REST API Design
- Database Relationships (Foreign Keys)
- Frontend-Backend Integration
- Real-time UI Updates
- Error Handling & Validation

---

## 🔥 Advanced Features

- Slot grouping by station
- Time-based slot system
- Booking history with station mapping
- Admin-only operations
- Secure admin creation with secret code

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

```bash
cd EV_charging_backend

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload

```
### 2️⃣ FrontEnd Setup
```
cd EV_charging_frontend

python -m http.server 5500
```
### 🧪 API Endpoints
```
🔐 Auth
POST /auth/login

👤 Users
POST /users/ → Register

🏢 Stations
POST /station/ → Create (Admin)
GET /station/get_stations

⚡ Slots
POST /slots/ → Create (Admin)
GET /slots/get_slots

📅 Bookings
POST /bookings/ → Book slot
GET /bookings/get_my_bookings
```

### 🚨 Challenges Solved
- Prevent double booking (DB locking)
- Handle JWT authentication flow
- Fix CORS & frontend integration issues
- Handle schema mismatch errors
- Implement clean UI state updates

### 📈 Future Improvements
- 🌍 Map integration (Google Maps)
- 🔔 Notifications
- 📱 Mobile responsive UI
- ☁️ Cloud deployment (AWS / GCP)
- ⚡ Real-time updates (WebSockets)

👨‍💻 Author

Venkat
Aspiring Data Engineer | Full Stack Developer

⭐ If you like this project

Give it a ⭐ on GitHub!
