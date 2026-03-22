using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.DTOs;

namespace UniversityApp.Controllers
{
    [Route("students")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService studentService;

        public StudentController(IStudentService service)
        {
            studentService = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllStudents()
        {
            var allStudents = await studentService.GetAllStudents();
            return Ok(allStudents);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudentById(int id)
        {
            var student = await studentService.GetStudentById(id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent([FromBody] StudentCreateDto studentDto)
        {
            var student = new Student
            {
                Name = studentDto.Name,
                Major = studentDto.Major,
                DepartmentId = studentDto.DepartmentId
            };

            await studentService.AddStudent(student);

            return Ok(new { Message = "Student created successfully." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] StudentUpdateDto studentDto)
        {
            if (id != studentDto.Id)
            {
                return BadRequest("ID in URL does not match ID in the request body.");
            }
            
            await studentService.UpdateStudent(studentDto);
            
            return NoContent(); 
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await studentService.GetStudentById(id);
            if (student == null)
            {
                return NotFound();
            }

            await studentService.DeleteStudent(id);
            
            return Ok(student);
        }
    }
}