# ⚡ EV Charging Slot Booking System – Backend

A scalable and secure backend system built using FastAPI to manage EV charging stations, slots, and bookings with role-based access control.

---

## 🚀 Overview

This backend powers the EV Charging Slot Booking platform by handling:

* 🔐 Authentication (JWT-based)
* 👤 User & Admin management
* 🏢 Charging station management
* ⚡ Slot creation & availability tracking
* 📅 Booking system with conflict prevention

---

## 🧠 Core Features

### 🔐 Authentication & Authorization

* JWT-based login system
* Secure password hashing
* Role-based access (User / Admin)
* Admin creation using secret code

---

### 👤 User Functionalities

* Register new users
* Login and receive JWT token
* View available stations
* View available slots
* Book charging slots
* View booking history

---

### 👨‍💼 Admin Functionalities

* Add new charging stations
* Create time-based slots
* Manage slot availability
* Restricted access via admin role

---

## 🏗️ Architecture

* FastAPI for API development
* SQLAlchemy ORM for database interaction
* PostgreSQL as the database
* Layered architecture:

  * API Layer (Routes)
  * Service Layer (Business Logic)
  * ORM Layer (Database Models)

---

## 🧩 Tech Stack

| Component      | Technology |
| -------------- | ---------- |
| Framework      | FastAPI    |
| Database       | PostgreSQL |
| ORM            | SQLAlchemy |
| Authentication | JWT        |
| Server         | Uvicorn    |
| Validation     | Pydantic   |

---

## 📂 Project Structure

```
app/
│
├── api/            # Route handlers (endpoints)
├── models/         # SQLAlchemy models
├── schemas/        # Pydantic schemas
├── services/       # Business logic
├── core/           # Config, security, utils
│
main.py             # Entry point
requirements.txt
```

---

## 🔐 Authentication Flow

1. User logs in with credentials
2. Backend validates user
3. JWT token is generated
4. Token is sent to client
5. Client uses token for protected APIs

---

## ⚡ Slot Booking Logic

* User selects a station and slot
* Backend verifies:

  * Slot exists
  * Slot is not already booked
* Booking is created
* Slot marked as unavailable

✅ Prevents double booking using database-level validation

---

## 🧪 API Endpoints

### 🔐 Auth

* `POST /auth/login` → Login & get token

---

### 👤 Users

* `POST /users/` → Register user

---

### 🏢 Stations

* `POST /station/` → Create station (Admin only)
* `GET /station/get_stations` → Get all stations

---

### ⚡ Slots

* `POST /slots/` → Create slots (Admin only)
* `GET /slots/get_slots` → Get available slots

---

### 📅 Bookings

* `POST /bookings/` → Book slot
* `GET /bookings/get_my_bookings` → User booking history

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd EV_charging_backend
```

---

### 2️⃣ Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

---

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4️⃣ Configure Database

Update your database URL inside config (e.g., in `core/config.py`):

```
DATABASE_URL=postgresql://user:password@localhost/dbname
```

---

### 5️⃣ Run Server

```bash
uvicorn app.main:app --reload
```

---

## 🌐 API Docs

FastAPI provides automatic documentation:

* Swagger UI → http://127.0.0.1:8000/docs
* ReDoc → http://127.0.0.1:8000/redoc

---

## 🚨 Challenges Solved

* Prevented double booking using backend validation
* Implemented secure JWT authentication
* Handled role-based access (Admin/User)
* Fixed CORS issues for frontend integration
* Managed schema validation errors using Pydantic

---

## 📈 Future Improvements

* Redis for distributed locking (prevent race conditions)
* WebSockets for real-time slot updates
* Docker for containerization
* Rate limiting & security enhancements
* Cloud deployment (AWS / GCP)

---

## 👨‍💻 Author

Venkat
Aspiring Data Engineer | Backend Developer

---

## ⭐ Support

If you found this project useful, give it a ⭐ on GitHub!
