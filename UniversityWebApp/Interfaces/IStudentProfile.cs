using UniversityWebApp.Models;

namespace UniversityWebApp.Interfaces
{
    public interface IStudentProfileService
    {
        Task<IEnumerable<StudentProfile>> GetAllStudentProfiles();
        Task<StudentProfile?> GetStudentProfileById(int id);
        Task AddStudentProfile(StudentProfile profile);
        Task DeleteStudentProfile(int id);
    }
}