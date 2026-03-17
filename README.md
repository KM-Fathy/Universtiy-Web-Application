# University Web Application 🎓

## Overview
This is a lightweight ASP.NET Core MVC web application built for a Web Engineering assignment. The project demonstrates the core principles of the MVC (Model-View-Controller) architecture by managing University Students and Courses. 

It features full Create, Read, and Delete operations with an in-memory database using Singleton services.

## Features
* **Student Management:** View a list of students, view individual student details, create new students, and delete students from the roster.
* **Course Management:** View a list of offered courses, view course details (including credit hours), create new courses, and delete courses.
* **In-Memory Data:** Utilizes basic C# data structures and Dependency Injection (`AddSingleton`) to retain data state while the application runs without needing an external database.
* **Clean UI:** Simple, accessible HTML forms and lists.

## Project Screenshots

### 👥 Student Management
Below is the main roster view displaying all currently enrolled students.

<img width="467" height="547" alt="image" src="https://github.com/user-attachments/assets/3c5d467f-82eb-43b1-b1ff-659bc3e32589" />


### ➕ Add New Student
The form used to enroll a new student with their Name and Major.

<img width="467" height="547" alt="image" src="https://github.com/user-attachments/assets/a9e6a014-2714-4560-b5b0-ed3cade9d6e1" />


### 📚 Course Management
The main directory displaying all available university courses and their credit values.

<img width="467" height="547" alt="image" src="https://github.com/user-attachments/assets/79b4154b-a7d2-4e94-81f8-f86082893f03" />


### 📝 Add New Course
The form used to create a new course entry in the system.

<img width="467" height="547" alt="image" src="https://github.com/user-attachments/assets/cd9f2be6-1b6d-46bf-ae02-66a720da9803" />


## Technologies Used
* **C# / .NET**
* **ASP.NET Core MVC**
* **HTML**
* **Visual Studio Code**

## How to Run the Project Locally
1. Clone this repository to your local machine.
2. Open the project folder in Visual Studio Code.
3. Open the integrated terminal and run the following command:
   ```bash
   dotnet run
