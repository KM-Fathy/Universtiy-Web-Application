# University Web Portal (Full-Stack Application)

This is a complete, RESTful full-stack web application built for a university system. It manages students, courses, departments, and student profiles. The project features a robust C# backend and a magnificent, role-based React frontend utilizing a custom Modern Dark SaaS design system.

## Technologies Used

### Backend
* **C# & ASP.NET Core Web API:** The framework used to build the API endpoints and handle HTTP requests.
* **Entity Framework Core:** The Object-Relational Mapper (ORM) used to interact with the database using C# objects instead of raw SQL.
* **JWT (JSON Web Tokens):** Used to handle user authentication, role verification, and secure the API endpoints.
* **Postman:** Used for testing the API endpoints during development.

### Frontend
* **React.js:** Used to build the dynamic, component-based user interface.
* **React Router DOM:** Handles client-side routing, enabling seamless navigation without full page reloads.
* **Axios:** Handles API communication with the backend.
* **Custom CSS Design System:** Implements a premium "Modern Slate Dark Theme" featuring glassmorphism (blurred navbars), card-based grid layouts, and smooth interactive hover states.

## Architecture & Security Features

This project implements strict security, automated data handling, and Role-Based Access Control (RBAC) across both the frontend and backend:

* **Automated Data Binding:** When a standard user registers, the C# backend automatically generates and links their database Student profile, streamlining the onboarding process. 
* **HTTP-Only Cookies (`api.js`):** The JWT token is stored inside an HTTP-only cookie to prevent Cross-Site Scripting (XSS) attacks. The frontend uses Axios configured with `withCredentials: true` to securely and automatically attach this cookie to every request.
* **Protected Routing (`ProtectedRoute.jsx` & `AdminRoute.jsx`):** Unauthenticated users are strictly locked out of the application and redirected to the login page. Administrative pages are guarded by `AdminRoute.jsx`, which redirects non-admin users back to the dashboard.
* **Dynamic Navigation & UI (`Navbar.jsx` & Dashboards):** The UI reads the user's role and conditionally renders elements. Standard users receive a personalized "Academic Schedule" view showing their courses and classmates, while Admins receive a statistical overview and quick-action management buttons.
* **Intuitive Admin Controls:** Instead of bulky forms, the Student Directory utilizes rapid `window.prompt` actions for Admins to instantly assign departments, add courses, or remove enrollments without leaving the page.

## How to Run the Project

### 1. Start the Backend
1. Clone this repository to your local machine.
2. Open the project folder in Visual Studio or VS Code.
3. Open your terminal or package manager console.
4. Run the following command to create the database and apply the tables:
   `dotnet ef database update`
5. Run the project using your IDE's run button, or by typing this in the terminal:
   `dotnet run`
6. The API will start on `http://localhost:5024` (or whatever port is assigned in your launch settings).

### 2. Start the Frontend
1. Open a new terminal window and navigate to your frontend folder.
2. Install the necessary dependencies:
   `npm install`
3. Start the Vite development server:
   `npm run dev`
4. Open the local link (e.g., `http://localhost:5173`) in your browser.

---

## Frontend UI Showcase

### Authentication
Users must securely log in or register before accessing the portal. The forms feature a sleek, centered card layout with interactive input focuses.
<img width="1867" height="897" alt="image" src="https://github.com/user-attachments/assets/ba1a421e-646f-4ba7-9e38-68816fd03a96" />
<img width="1866" height="900" alt="image" src="https://github.com/user-attachments/assets/2b64be04-3086-4352-acc5-4e7cdc9fb498" />


### Dashboards (Role-Based)
The dashboard fetches live statistics concurrently and renders tailored views based on the user's role.
**Admin Dashboard:** Features a responsive 3-column grid displaying live counts for Students, Courses, and Departments.
<img width="1866" height="897" alt="image" src="https://github.com/user-attachments/assets/b6a96b11-6227-4e81-a31c-f4023606c4a4" />


**Student Dashboard:** Features a split-screen layout showing the student's active status, department, and detailed academic schedule (including assigned credits and classmate lists).
<img width="1866" height="895" alt="image" src="https://github.com/user-attachments/assets/6c15b42a-5cd1-4eb8-934d-aaac18c2ba51" />


### Admin Management Hub
Admins have the ability to rapidly update and delete records across the system using intuitive inline action buttons and side-panel forms.
**Student Directory:**
<img width="1866" height="895" alt="image" src="https://github.com/user-attachments/assets/ce4eb739-53bc-4b94-abf6-5db8df3e6132" />

**Course & Department Management:**
<img width="1842" height="892" alt="image" src="https://github.com/user-attachments/assets/e70bc32c-9f42-46a5-bca6-cc93768ae181" />
<img width="1866" height="896" alt="image" src="https://github.com/user-attachments/assets/c7d2bcf9-9867-4759-b6bd-3969e0bfc726" />

---

## Backend API Endpoint Documentation

### Authentication
* `POST /auth/register` - Registers a new user and auto-generates a linked Student profile (if role is Student).
* `POST /auth/login` - Logs in a user and returns an HTTP-only cookie containing the JWT.

### Students
* `GET /students` - Gets a list of all students and their assigned data.
* `GET /students/me` - Retrieves the profile, courses, and classmates for the currently authenticated student.
* `GET /students/{id}` - Gets a specific student by their ID.
* `POST /students` - Adds a new student (Requires Admin role).
* `PUT /students/{id}` - Updates an existing student's department (Requires Admin role).
* `DELETE /students/{id}` - Removes a student entirely (Requires Admin role).
* `POST /students/{id}/courses/{courseId}` - Registers a student for a specific course (Requires Admin role).
* `DELETE /students/{id}/courses/{courseId}` - Removes a student from a specific course (Requires Admin role).

### Courses
* `GET /courses` - Gets all courses.
* `GET /courses/{id}` - Gets a specific course by ID.
* `POST /courses` - Adds a new course.
* `PUT /courses/{id}` - Updates a course.
* `DELETE /courses/{id}` - Deletes a course.

### Departments
* `GET /departments` - Gets all departments.
* `GET /departments/{id}` - Gets a specific department.
* `POST /departments` - Adds a new department.
* `PUT /departments/{id}` - Updates a department.
* `DELETE /departments/{id}` - Deletes a department.

### Student Profiles
* `GET /studentprofiles` - Gets all profiles.
* `GET /studentprofiles/{id}` - Gets a specific profile.
* `POST /studentprofiles` - Creates a new profile.
* `PUT /studentprofiles/{id}` - Updates profile details (like address and date of birth).
* `DELETE /studentprofiles/{id}` - Deletes a profile.

## Postman Screenshots

Here are the demonstrations of the working endpoints:

### 1. User Registration
![Register](https://github.com/user-attachments/assets/dacc3026-b436-4945-bc4c-79a7aaa48306)

### 2. User Login (Showing the HTTP-only cookie being set)
![Login](https://github.com/user-attachments/assets/5ee207f9-165c-465d-beed-69bb37d91c2c)

### 3. Register Student in a Course
![Register Course](https://github.com/user-attachments/assets/f396feb5-b433-40d3-bbcb-6e01b9dd4462)

### 4. Remove a Student
![Remove Student](https://github.com/user-attachments/assets/8d91525b-ef8e-4ee6-9149-a86872bf50b0)

### 5. Show a Specific Course
![Show Course](https://github.com/user-attachments/assets/7e1889a3-8a25-487a-a1ac-d15394fcd56f)

### 6. Show Departments
![Show Departmets](https://github.com/user-attachments/assets/bb111f33-e7b0-4052-8e12-a0373bf337e3)

### 7. Update a Student Profile
![Update StudentProfile](https://github.com/user-attachments/assets/88b8de03-e910-4ca5-a14b-9c7360fe19c3)
