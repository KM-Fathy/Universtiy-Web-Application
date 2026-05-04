# University Web Portal (Full-Stack Application)

This is a complete, RESTful full-stack web application built for a university system. It manages students, courses, departments, and student profiles. The project features a robust C# backend and a dynamic, role-based React frontend.

## Technologies Used

### Backend
* **C# & ASP.NET Core Web API:** The framework used to build the API endpoints and handle HTTP requests.
* **Entity Framework Core:** The Object-Relational Mapper (ORM) used to interact with the database using C# objects instead of raw SQL.
* **JWT (JSON Web Tokens):** Used to handle user authentication and secure the API endpoints.
* **Postman:** Used for testing the API endpoints during development.

### Frontend
* **React.js:** Used to build the dynamic, component-based user interface.
* **React Router DOM:** Handles client-side routing, enabling seamless navigation without full page reloads.
* **Axios:** Handles API communication with the backend.
* **CSS Variables:** Implements a clean, modern, and consistent design system with support for dark mode.

## Frontend Architecture & Security

This project implements strict security and Role-Based Access Control (RBAC) across both the frontend and backend:

* **HTTP-Only Cookies (`api.js`):** The JWT token is stored inside an HTTP-only cookie to prevent Cross-Site Scripting (XSS) attacks. The frontend uses Axios configured with `withCredentials: true` to securely and automatically attach this cookie to every request.
* **Protected Routing (`ProtectedRoute.jsx` & `AdminRoute.jsx`):** Unauthenticated users are strictly locked out of the application and redirected to the login page. Furthermore, specific administrative pages (like the Profiles page) are guarded by `AdminRoute.jsx`, which kicks non-admin users back to the dashboard if they try to manually access the URL.
* **Dynamic Navigation (`Navbar.jsx`):** The navigation bar reads the user's role and conditionally renders links. For example, standard users will not even see the link to the Student Profiles page.
* **Role-Based UI (`StudentsPage.jsx`, etc.):** The frontend dynamically adapts to the logged-in user. Admins see data creation forms and Action columns (Edit/Delete), while standard users only see a clean, read-only list of the data.
* **Styling (`index.css`):** The application relies on a centralized set of CSS variables to maintain a professional, dark-themed UI that is fully responsive.

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
Users must securely log in or register before accessing the portal.
<img width="1867" height="898" alt="Register" src="https://github.com/user-attachments/assets/02203e7c-ca5e-4459-868a-fb153c23d8a4" />
<img width="1867" height="896" alt="Login" src="https://github.com/user-attachments/assets/29634142-7bb0-4513-8310-86ef92cef3ed" />

### Dashboards (Role-Based)
The dashboard fetches live statistics concurrently and greets the user based on their role.
**Admin Dashboard:**
<img width="1866" height="897" alt="Admin - Dashboard" src="https://github.com/user-attachments/assets/2831eb63-2c8a-4db7-9ddd-498fb6156c69" />

**Student Dashboard:**
<img width="1867" height="896" alt="Student - Dashboard" src="https://github.com/user-attachments/assets/f673babd-0b8b-4816-b012-8dab0d6ba01e" />

### Admin View (Full CRUD Access)
Admins have the ability to create, update, and delete records across the system.
**Create Student:**
<img width="1863" height="893" alt="Admin - Create Student" src="https://github.com/user-attachments/assets/fdd926de-e874-45b3-b315-8ceee058b075" />

**Update Course:**
<img width="1865" height="900" alt="Admin - Update Course" src="https://github.com/user-attachments/assets/7c5cbc37-36e4-4653-b9a8-3b0aa7f51f42" />

**Create Profiles (Admin Only Route):**
<img width="1865" height="892" alt="Admin - Create Profiles" src="https://github.com/user-attachments/assets/1e4f2c44-59cf-4614-ba61-0f16137bfc6c" />

### Student View (Read-Only)
Standard users see a restricted, read-only view. Creation forms and action buttons are safely hidden from the UI.
**Departments List:**
<img width="1867" height="897" alt="Student - Departments" src="https://github.com/user-attachments/assets/1ff48f74-a061-4cd0-b086-6635d13b8336" />


---

## Backend API Endpoint Documentation

### Authentication
* `POST /auth/register` - Registers a new user.
* `POST /auth/login` - Logs in a user and returns an HTTP-only cookie containing the JWT.

### Students
* `GET /students` - Gets a list of all students.
* `GET /students/{id}` - Gets a specific student by their ID.
* `POST /students` - Adds a new student (Requires Admin role).
* `PUT /students/{id}` - Updates an existing student (Requires Admin role).
* `DELETE /students/{id}` - Removes a student (Requires Admin role).
* `POST /students/{id}/courses/{courseId}` - Registers a student for a specific course (Requires Admin role).

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

### 3. Add a New Student
![Add Student](https://github.com/user-attachments/assets/0407331b-dea8-421f-9bc1-fab0511fc43f)

### 4. Register Student in a Course
![Register Course](https://github.com/user-attachments/assets/f396feb5-b433-40d3-bbcb-6e01b9dd4462)

### 5. Remove a Student
![Remove Student](https://github.com/user-attachments/assets/8d91525b-ef8e-4ee6-9149-a86872bf50b0)

### 6. Show a Specific Course
![Show Course](https://github.com/user-attachments/assets/7e1889a3-8a25-487a-a1ac-d15394fcd56f)

### 7. Show Departments
![Show Departmets](https://github.com/user-attachments/assets/bb111f33-e7b0-4052-8e12-a0373bf337e3)

### 8. Update a Student Profile
![Update StudentProfile](https://github.com/user-attachments/assets/88b8de03-e910-4ca5-a14b-9c7360fe19c3)
