HRMS – Simple Employee & Team Management System

This is a full-stack Human Resource Management System (HRMS) built using React (frontend) and Node.js + Express + MySQL (backend).
The project allows an organization to register, log in, add employees, create teams, assign employees to teams, and manage everything through a clean, simple UI.

Features
Authentication

Register organization

Login using email & password

JWT-based authentication

Private routes on frontend

Employees Module

Add employee

View employee list

Delete employee

Auto-increment serial numbers (not database IDs)

Teams Module

Create teams

Edit team

Delete team

Assign employees to a team

Remove employees from a team

UI

Navbar

Clean and simple responsive layout

Styled tables and forms

Basic button styling

Tech Stack
Frontend

React

Axios

React Router

CSS

Backend

Node.js

Express

MySQL

Sequelize ORM

JWT Authentication

Dotenv

Folder Structure
my_hrms/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
└── README.md

Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/my_hrms.git
cd my_hrms

Backend Setup
2. Navigate to Backend
cd backend

3. Install Backend Dependencies
npm install

4. Configure MySQL Database

Create a database:

CREATE DATABASE hrms_db;

5. Configure .env File

Create a .env file inside /backend:

PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=hrms_db
JWT_SECRET=your_random_secret_key

6. Run Backend
npm run dev


Backend runs on:

http://localhost:5000/

Frontend Setup
7. Navigate to Frontend
cd ../frontend

8. Install Frontend Dependencies
npm install

9. Start Frontend
npm start


Frontend runs on:

http://localhost:3000/

Default Login

After registering an organization, use the login page:

Email: admin email used during registration
Password: password used during registration

API Endpoints
Auth

POST /api/auth/register

POST /api/auth/login

Employees

GET /api/employees

POST /api/employees

DELETE /api/employees/:id

Teams

GET /api/teams

POST /api/teams

PUT /api/teams/:id

DELETE /api/teams/:id

POST /api/teams/:teamId/assign

DELETE /api/teams/:teamId/unassign

Sequelize ORM

JSON Web Tokens (JWT)

Bcrypt
