using UniversityWebApp.DTOs;
using UniversityWebApp.Models;

namespace UniversityWebApp.Interfaces

{
    public interface IStudentService
    {
        Task<IEnumerable<StudentDto>> GetAllStudents();
        Task<StudentDto?> GetById(int id);
        Task Add(Student student);
        Task Delete(int id);
    }
    
}