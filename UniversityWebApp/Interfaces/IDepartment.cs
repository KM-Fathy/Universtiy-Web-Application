using UniversityWebApp.Models;

namespace UniversityWebApp.Interfaces
{
    public interface IDepartmentService
    {
        Task<IEnumerable<Department>> GetAllDepartments();
        Task<Department?> GetDepartmentById(int id);
        Task AddDepartment(Department department);
        Task DeleteDepartment(int id);
    }
}