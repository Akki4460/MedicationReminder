# Medication Reminder

Built a Medication Reminder App with a backend focus while ensuring minimal yet functional frontend integration. This project evaluates proficiency in React Ionic, Node.js, MySQL, and related technologies, along with secure API implementation using JWT and HTTPS.
## Table of Contents

- [Project Setup](#project-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)

## Project Setup

- **Backend URL and Port**: The backend runs at **`http://localhost:5000`**.
- **Frontend URL and Port**: The frontend runs at **`http://localhost:8001`**.
  
The backend API serves data to the frontend application. Both the frontend and backend should be running simultaneously during development.

---

## Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/Akki4460/MedicationReminder.git
```
### 2. Navigate to the backend directory

```bash
cd medicationreminder/backend
```

### 3. Install backend dependencies
Ensure you have Node.js installed. Run the following command to install all necessary backend dependencies:

```bash
npm install
```

### 4. Set up environment variables
Create a .env file in the backend directory with the following content:

```bash
env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=medication_app
```

5. Start the backend server
Run the following command to start the backend server:

```bash
npm run dev
```

#### .sql file is included into it export it to use mysql

---

## Frontend Setup

### 1. Navigate to the frontend directory
```bash
cd medicationreminder/frontend/medicationreminder
```

### 2. Install frontend dependencies
Ensure you have Node.js installed. Then, install the frontend dependencies using:

```bash
npm install
```

### 3. Configure the API URL
In the frontend directory, configure the API URL to point to the backend if needed:

### 4. Start the frontend server
Run the following command to start the frontend application:

```bash
npm start
```
The frontend will be running at http://localhost:8001.

---
---

## Backend API Documentation
---
## API Endpoints

### Authentication Routes
- **POST** `/auth/register`
  - Register a new user.
  - **Request Body**: `{ "name": "string", "email": "string", "password": "string", "role": "string"  }`
  - **Response**: `{ "message": "User registered successfully" }`

- **POST** `/auth/login`
  - Log in and generate a JWT token.
  - **Request Body**: `{ "email": "string", "password": "string" }`
  - **Response**: `{ "token": "jwt_token_here" }`

### Acknowledgment Routes
- **POST** `/api/acknowledgment`
  - Log acknowledgment (user takes medicine).
  - **Request Body**: `{ "user_id": "string", "medicine_id": "string", "status": "string" }`
  - **Response**: `{ "message": "Acknowledgment logged" }`

- **GET** `/api/acknowledgment/user/:user_id`
  - Get all acknowledgment logs by user ID.
  - **Response**: `[ { "id": "string", "user_id": "string", "medicine_id": "string", "status": "string", "timestamp": "string" } ]`

- **GET** `/api/acknowledgment/medicine/:medicine_id`
  - Get all acknowledgment logs by medicine ID.
  - **Response**: `[ { "id": "string", "user_id": "string", "medicine_id": "string", "status": "string", "timestamp": "string" } ]`

### Medicine Routes
- **POST** `/api/medicines`
  - Create a new medicine.
  - **Request Body**: `{ "name": "string", "description": "string", "dosage": "string" }`
  - **Response**: `{ "message": "Medicine created successfully" }`

- **GET** `/api/medicines`
  - Get all medicines.
  - **Response**: `[ { "id": "string", "name": "string", "description": "string", "dosage": "string" } ]`

- **GET** `/api/medicines/:id`
  - Get a medicine by ID.
  - **Response**: `{ "id": "string", "name": "string", "description": "string", "dosage": "string" }`

- **PUT** `/api/medicines/:id`
  - Update a medicine by ID.
  - **Request Body**: `{ "name": "string", "description": "string", "dosage": "string" }`
  - **Response**: `{ "message": "Medicine updated successfully" }`

- **DELETE** `/api/medicines/:id`
  - Delete a medicine by ID.
  - **Response**: `{ "message": "Medicine deleted successfully" }`

### Admin Routes
- **GET** `/admin/acknowledgment-logs`
  - Get filtered acknowledgment logs (admin only).
  - **Response**: `[ { "id": "string", "user_id": "string", "medicine_id": "string", "status": "string", "timestamp": "string" } ]`


---
### Use Postman or ThunderClient vs code extention to check APIs
---

## I focused more on backend part and APIs and less on frontend as requirement of task and if you have any query feel free to contact on **akhilesh.k.bhosale@gmail.com**



