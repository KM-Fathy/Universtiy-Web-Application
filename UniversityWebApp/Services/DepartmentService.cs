using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.Database;
using Microsoft.EntityFrameworkCore;
using UniversityWebApp.DTOs;

namespace UniversityWebApp.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly ApplicationDbContext _context;

        public DepartmentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DepartmentDto>> GetAllDepartments()
        {
            return await _context.Departments.AsNoTracking().Select(d => new DepartmentDto
            {
                Id = d.Id,
                Name = d.Name
            }).ToListAsync();
        }

        public async Task<DepartmentDto?> GetDepartmentById(int id)
        {
            var department = await _context.Departments.Include(d => d.Students).AsNoTracking().FirstOrDefaultAsync(d => d.Id == id);
            if (department == null) return null;

            return new DepartmentDto
            {
                Id = department.Id,
                Name = department.Name
            }; 
        }

        public async Task AddDepartment(Department department)
        {
            await _context.Departments.AddAsync(department);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateDepartment(DepartmentUpdateDto departmentDto)
        {
            var existing = await _context.Departments.FindAsync(departmentDto.Id);
            if (existing != null)
            {
                existing.Name = departmentDto.Name;
                _context.Departments.Update(existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department != null)
            {
                _context.Departments.Remove(department);
                await _context.SaveChangesAsync();
            }
        }
    }
}