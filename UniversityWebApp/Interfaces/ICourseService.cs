using System.Collections.Generic;
using UniversityWebApp.Models;

namespace UniversityWebApp.Interfaces
{
    public interface ICourseService
    {
        Task<IEnumerable<Course>> GetAllCourses();
        Task<Course?> GetCourseById(int id);
        Task AddCourse(Course course);
        Task DeleteCourse(int id);
    }
}