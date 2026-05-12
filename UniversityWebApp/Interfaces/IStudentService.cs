using UniversityWebApp.DTOs;
using UniversityWebApp.Models;

namespace UniversityWebApp.Interfaces
{
    public interface IStudentService
    {
        Task<IEnumerable<StudentDto>> GetAllStudents();
        Task<StudentDto?> GetStudentById(int id);
        Task AddStudent(Student student);
        Task<bool> RegisterStudentInCourse(int studentId, int courseId);
        Task UpdateStudent(StudentUpdateDto studentDto, int id);
        Task DeleteStudent(int id);
        
        // NEW: Fetch the specific user's dashboard data
        Task<object?> GetMyProfile(string userId);

        Task<bool> RemoveStudentFromCourse(int studentId, int courseId); // ADD THIS
    }
}