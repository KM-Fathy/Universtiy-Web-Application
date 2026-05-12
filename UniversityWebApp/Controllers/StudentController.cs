using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims; // REQUIRED FOR EXTRACTING THE USER ID

namespace UniversityApp.Controllers
{
    [Route("students")]
    [ApiController]
    [Authorize] // Everyone logged in can access this controller, but specific roles guard the routes below
    public class StudentController : ControllerBase
    {
        private readonly IStudentService studentService;

        public StudentController(IStudentService service)
        {
            studentService = service;
        }

        // ==========================================
        // NEW: GET MY PROFILE (For standard Students)
        // ==========================================
        [HttpGet("me")]
        public async Task<IActionResult> GetMyProfile()
        {
            // 1. Get the logged-in user's string ID from the JWT token
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            // 2. Ask the service to build the profile
            var profile = await studentService.GetMyProfile(userId);

            if (profile == null) return NotFound(new { Message = "Student profile not found." });

            return Ok(profile);
        }

        // ==========================================
        // ADMIN ONLY ROUTES BELOW THIS LINE
        // ==========================================

        [HttpGet]
        [Authorize(Roles = "Admin")] // Security upgrade!
        public async Task<IActionResult> GetAllStudents()
        {
            var allStudents = await studentService.GetAllStudents();
            return Ok(allStudents);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")] // Security upgrade!
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
                Major = null, // Set to null since we removed it from the UI
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