# University Web API Project

This is a RESTful API built for a university system. It manages students, courses, departments, and student profiles, and includes user authentication. 

## Technologies Used
* **C#:** The programming language used for the backend logic.
* **ASP.NET Core Web API:** The framework used to build the API endpoints and handle HTTP requests.
* **Entity Framework Core:** The Object-Relational Mapper (ORM) used to interact with the database using C# objects instead of raw SQL.
* **JWT (JSON Web Tokens):** Used to handle user authentication and secure the API endpoints.
* **Postman:** Used for testing the API endpoints and taking the screenshots.

## How to Run the Project
1. Clone this repository to your local machine.
2. Open the project folder in Visual Studio or VS Code.
3. Open your terminal or package manager console.
4. Run the following command to create the database and apply the tables:
   `dotnet ef database update`
5. Run the project using your IDE's run button, or by typing this in the terminal:
   `dotnet run`
6. The API will start on `http://localhost:5024` (or whatever port is assigned in your launch settings).

## Security: Why HTTP-Only Cookies?
For the authentication part of this project, the JWT token is stored inside an HTTP-only cookie. HTTP-only cookies are considered an industry standard for authentication security because they help prevent Cross-Site Scripting (XSS) attacks. 

When a cookie is set to HTTP-only, client-side scripts (like JavaScript running in the browser) are completely blocked from reading or accessing the cookie. This means that even if a hacker manages to inject malicious JavaScript into the frontend application, they cannot steal the user's session token.

## API Endpoint Documentation

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
