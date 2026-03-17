using System.Collections.Generic;
using UniversityWebApp.Models;

namespace UniversityWebApp.Interfaces
{
    public interface ICourseService
    {
        Task<IEnumerable<Course>> GetAllCourses();
        Task<Course?> GetById(int id);
        Task Add(Course course);
        Task Delete(int id);
    }
}