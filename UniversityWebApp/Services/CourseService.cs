using System.Collections.Generic;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;

namespace UniversityWebApp.Services
{
    public class CourseService : ICourseService
    {
        private List<Course> courses = new List<Course>();

        public CourseService()
        {
            Course c1 = new Course();
            c1.Id = 101;
            c1.Title = "Web Engineering";
            c1.Credits = 3;
            courses.Add(c1);

            Course c2 = new Course();
            c2.Id = 102;
            c2.Title = "Data Structures";
            c2.Credits = 4;
            courses.Add(c2);
        }

        public IEnumerable<Course> GetAll()
        {
            return courses;
        }

        public Course GetById(int id)
        {
            foreach (var course in courses)
            {
                if (course.Id == id)
                {
                    return course;
                }
            }
            return null;
        }

        public void Add(Course course)
        {
            int newId = courses.Count + 101;
            course.Id = newId;

            courses.Add(course);
        }

        public void Delete(int id)
        {
            Course courseToRemove = null;

            foreach (var course in courses)
            {
                if (course.Id == id)
                {
                    courseToRemove = course;
                    break;
                }
            }

            if (courseToRemove != null)
            {
                courses.Remove(courseToRemove);
            }
        }
    }
}