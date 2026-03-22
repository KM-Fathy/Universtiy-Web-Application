using UniversityWebApp.DTOs;
using UniversityWebApp.Models;

namespace UniversityWebApp.Interfaces

{
    public interface IStudentService
    {
        Task<IEnumerable<StudentDto>> GetAllStudents();
        Task<StudentDto?> GetStudentById(int id);
        Task AddStudent(Student student);
        Task UpdateStudent(StudentUpdateDto studentDto);
        Task DeleteStudent(int id);
    }
    
}