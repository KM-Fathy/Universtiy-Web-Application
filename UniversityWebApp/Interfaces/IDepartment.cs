using UniversityWebApp.Models;

using UniversityWebApp.DTOs;


namespace UniversityWebApp.Interfaces
{
    public interface IDepartmentService
    {
        Task<IEnumerable<DepartmentDto>> GetAllDepartments();
        Task<DepartmentDto?> GetDepartmentById(int id);
        Task AddDepartment(Department department);
        Task UpdateDepartment(DepartmentUpdateDto departmentDto, int id);
        Task DeleteDepartment(int id);
    }
}