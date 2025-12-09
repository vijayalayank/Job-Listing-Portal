# Job Portal Application -> "Job Listing Portal"

A full-stack Job Listing Portal built with a Microservices architecture, featuring a modern React frontend and a robust Node.js/Express backend. Users can browse jobs, apply, and employers can post new opportunities.

## 🚀 Features

*   **Responsive Modern UI**: Built with React and CSS Modules, featuring a premium design with glassmorphism and smooth animations.
*   **Role-Based Access**:
    *   **Job Seekers**: Browse jobs, view details, apply for positions.
    *   **Employers**: Post jobs, manage listings via a dashboard.
*   **Microservices Backend**:
    *   **API Gateway**: Centralized entry point (Port 5000).
    *   **Auth Service**: Handles User Registration, Login, and JWT Authentication (Port 5001).
    *   **Job Service**: Manages Job Listings and Applications (Port 5002).
*   **Advanced Filtering**: Search by title, location, and job type.
*   **Security**: HTTP-only cookies for session management and protected routes.

---

## 🛠️ Technology Stack

*   **Frontend**: React (Vite), React Router DOM, Axios, CSS Modules.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB.
*   **Tools**: Nodemon, Dotenv, CORS, JWT.

---

## ⚙️ Prerequisites

Ensure you have the following installed on your system:
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a Cloud Atlas URI)
*   Git

---

## 📥 Installation & Setup Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Job Listing Portal"
```

### 2. Backend Setup (Microservices)

You need to set up and start all 3 backend services: **Auth Service**, **Job Service**, and **API Gateway**.

#### A. Auth Service
Navigate to the auth-service directory:
```bash
cd job-portal-backend/auth-service
npm install
```
Create a `.env` file in `job-portal-backend/auth-service/.env`:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/jobportal_auth
JWT_SECRET=your_super_secret_key
```
Start the service:
```bash
npm start
```

#### B. Job Service
Open a new terminal, navigate to the job-service directory:
```bash
cd job-portal-backend/job-service
npm install
```
Create a `.env` file in `job-portal-backend/job-service/.env`:
```env
PORT=5002
MONGO_URI=mongodb://localhost:27017/jobportal_jobs
# Ensure this matches the Auth Service secret for verification if needed
JWT_SECRET=your_super_secret_key 
```
Start the service:
```bash
npm start
```

#### C. API Gateway
Open a new terminal, navigate to the API-gateway directory:
```bash
cd job-portal-backend/API-gateway
npm install
```
Create a `.env` file in `job-portal-backend/API-gateway/.env`:
```env
PORT=5000
AUTH_SERVICE_URL=http://localhost:5001
JOB_SERVICE_URL=http://localhost:5002
```
Start the Gateway:
```bash
npm start
```
*The API Gateway will run on `http://localhost:5000` and proxy requests to the other services.*

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory:
```bash
cd JobPortal-FrontEnd
npm install
```
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🏃‍♂️ Running the Project

1.  Ensure MongoDB is running.
2.  Start **Auth Service** (Port 5001).
3.  Start **Job Service** (Port 5002).
4.  Start **API Gateway** (Port 5000).
5.  Start **Frontend** (Port 5173).
6.  Open your browser and visit `http://localhost:5173`.

## 📂 Project Structure

```
Job Listing Portal/
├── JobPortal-FrontEnd/       # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page views (Home, Jobs, Login)
│   │   ├── context/          # Auth Session Context
│   │   └── api/              # Axios configuration
│   └── ...
├── job-portal-backend/       # Backend Microservices
│   ├── API-gateway/          # Main Entry Point
│   ├── auth-service/         # Authentication Logic
│   └── job-service/          # Job Management Logic
└── README.md                 # Project Documentation
```

## 🤝 Contributing

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License.
