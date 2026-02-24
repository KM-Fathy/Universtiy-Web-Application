using System.Collections.Generic;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;

namespace UniversityWebApp.Services
{
    public class StudentService : IStudentService
    {
        // Simple list declaration
        private List<Student> students = new List<Student>();

        // Constructor to add dummy data the "long" way
        public StudentService()
        {
            Student s1 = new Student();
            s1.Id = 1;
            s1.Name = "Mohamed";
            s1.Major = "Computer Engineering";
            students.Add(s1);

            Student s2 = new Student();
            s2.Id = 2;
            s2.Name = "Kareem";
            s2.Major = "Electonics and Communication Engineering";
            students.Add(s2);

            Student s3 = new Student();
            s3.Id = 3;
            s3.Name = "Ahmed";
            s3.Major = "Mechanical Engineering";
            students.Add(s3);

            Student s4 = new Student();
            s4.Id = 4;
            s4.Name = "Ali";
            s4.Major = "Compputer Science";
            students.Add(s4);
        }

        public IEnumerable<Student> GetAll()
        {
            return students;
        }

        public Student GetById(int id)
        {
            // Using a basic foreach loop instead of advanced LINQ
            foreach (var student in students)
            {
                if (student.Id == id)
                {
                    return student;
                }
            }
            return null;
        }

        public void Add(Student student)
        {
            int newId = students.Count + 1;
            student.Id = newId;

            students.Add(student);
        }

        public void Delete(int id)
        {
            Student studentToRemove = null;

            foreach (var student in students)
            {
                if (student.Id == id)
                {
                    studentToRemove = student;
                    break;
                }
            }

            if (studentToRemove != null)
            {
                students.Remove(studentToRemove);
            }
        }
    }
}