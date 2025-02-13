# Appointment Management System

## Description

This is a simple Appointment Management System with authentication, authorization, and role-based access control. Users can book and cancel appointments, while admins have the ability to create and manage appointments. The application ensures secure access based on user roles, providing a seamless experience for both regular users and administrators.

## Features

- **User Authentication and Authorization**: Secure login system using JWT tokens stored in cookies for authentication and role-based access control.
- **User Features**:
  - Create an account.
  - View and cancel appointments.
  - Book appointments.
- **Admin Features**:
  - View all bookings.
  - Create appointments.

## Tools and Technologies Used

- **Backend**: Spring Boot
- **Frontend**: React.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **Styling**: TailwindCSS

## Steps to Set Up and Run the Project Locally

### 1. Clone the repository
```bash
git clone https://github.com/haflannisthar/Appointment_Application.git
```

### 2. Import MySQL Schema

- **Open MySQL Workbench and import the schema and data:**
   - Locate the .mwb file (MySQL Workbench schema file) and open it in MySQL Workbench.
   - Alternatively, use the .sql dump file to import the structure and data:
       - Go to File > Open SQL Script in MySQL Workbench and open the .sql dump file.
       - Execute the script to create the database structure and insert sample data.

### 3. Install Dependancies

- **Navigate to the project directory**
 ```bash
cd Appointment_Application
```
- **Navigate to the backend directory**
    *Backend Setup*
```bash
cd backend
```
- **Install dependencies**
```bash
./mvnw install
```
- **Configure your MySQL database connection  in src/main/resources/application.properties**
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/appointmentapp
spring.datasource.username=your_database_username
spring.datasource.password=your_database_password
spring.jpa.hibernate.ddl-auto=update
```
- **Start the Spring Boot application**
```bash
./mvnw spring-boot:run
```
- **The backend will run on http://localhost:8080**
  
- *Frontend Setup*
- **Navigate to the frontend directory**
```bash
cd frontend
```
- **Install frontend dependencies**
```bash
npm install
```
- **Start the React development server**
```bash
npm run dev
```
- **The frontend will run on http://localhost:5173.**

### 4. Verify the Ports
- **Backend: The Spring Boot backend will be running on port 8081**
- **Frontend: The React app will be running on port 5173.**
- **MySQL: The MySQL database will be running on port 3306.**

### 5. Test the Application
- **After both the backend and frontend are running, open your browser and navigate to http://localhost:5173.**
- **You should be able to:**
   - Register a new user.
   - Log in to your account.
   - View, Book and cancel appointments (as a user and admin ).
   - View and create appointments (as an admin).
  




