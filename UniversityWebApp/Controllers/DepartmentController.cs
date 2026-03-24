using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace UniversityApp.Controllers
{
    [Route("departments")]
    [ApiController]
    [Authorize]
    public class DepartmentController : Controller
    {
        private readonly IDepartmentService departmentService;

        public DepartmentController(IDepartmentService service)
        {
            departmentService = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDepartments()
        {
            var allDepartments = await departmentService.GetAllDepartments();
            return Ok(allDepartments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            var department = await departmentService.GetDepartmentById(id);

            if (department == null)
            {
                return NotFound();
            }

            return Ok(department);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddDepartment([FromBody] DepartmentCreateDto departmentDto)
        {
            var department = new Department
            {
                Name = departmentDto.Name
            };

            await departmentService.AddDepartment(department);

            return Ok(new { Message = "Department created successfully." });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateDepartment(int id, [FromBody] DepartmentUpdateDto departmentDto)
        {
            await departmentService.UpdateDepartment(departmentDto, id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var department = await departmentService.GetDepartmentById(id);
            if (department == null)
            {
                return NotFound();
            }

            await departmentService.DeleteDepartment(id);

            return Ok(department);
        }
    }
}