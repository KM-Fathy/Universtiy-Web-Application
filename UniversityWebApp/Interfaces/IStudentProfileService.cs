using UniversityWebApp.Models;

using UniversityWebApp.DTOs;

namespace UniversityWebApp.Interfaces
{
    public interface IStudentProfileService
    {
        Task<IEnumerable<StudentProfileDto>> GetAllStudentProfiles();
        Task<StudentProfileDto?> GetStudentProfileById(int id);
        Task AddStudentProfile(StudentProfile profile);
        Task UpdateStudentProfile(StudentProfileUpdateDto profileDto, int id);
        Task DeleteStudentProfile(int id);
    }
}