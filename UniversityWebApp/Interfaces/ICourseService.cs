using UniversityWebApp.DTOs;
using UniversityWebApp.Models;

namespace UniversityWebApp.Interfaces
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseDto>> GetAllCourses();
        Task<CourseDto?> GetCourseById(int id);
        Task AddCourse(Course course);
        Task UpdateCourse(CourseUpdateDto courseDto, int id);
        Task DeleteCourse(int id);
    }
}