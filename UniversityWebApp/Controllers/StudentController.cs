using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace UniversityApp.Controllers
{
    [Route("students")]
    [ApiController]
    [Authorize]
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
        [Authorize(Roles = "Admin")]
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

        [HttpPost("{id}/courses/{courseId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RegisterInCourse(int id, int courseId)
        {
            var success = await studentService.RegisterStudentInCourse(id, courseId);

            if (!success)
            {
                return BadRequest("Registration failed. Please check if the student and course IDs are correct, or if the student is already registered.");
            }

            return Ok(new { Message = "Student registered in the course successfully." });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] StudentUpdateDto studentDto)
        {     
            await studentService.UpdateStudent(studentDto, id);
            
            return NoContent(); 
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
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