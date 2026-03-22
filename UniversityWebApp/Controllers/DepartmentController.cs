using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;

namespace UniversityApp.Controllers
{
    [Route("departments")]
    [ApiController]
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
        public async Task<IActionResult> AddDepartment(Department department)
        {
            await departmentService.AddDepartment(department);
            return RedirectToAction("Index");
        }

        [HttpDelete("{id}")]
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