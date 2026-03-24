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
    }
    
}