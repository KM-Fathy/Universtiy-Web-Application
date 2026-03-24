using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace UniversityWebApp.Controllers
{
    [Route("courses")]
    [ApiController]
    [Authorize]
    public class CourseController : Controller
    {
        private readonly ICourseService courseService;

        public CourseController(ICourseService service)
        {
            courseService = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var allCourses = await courseService.GetAllCourses();
            return Ok(allCourses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var course = await courseService.GetCourseById(id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }
        
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddCourse([FromBody] CourseCreateDto courseDto)
        {
            var course = new Course 
            { 
                Title = courseDto.Title, 
                Credits = courseDto.Credits 
            };

            await courseService.AddCourse(course);
            
            return Ok(new { Message = "Course created successfully." });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] CourseUpdateDto courseDto)
        {
            await courseService.UpdateCourse(courseDto, id);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await courseService.GetCourseById(id);
            if (course == null)
            {
                return NotFound();
            }

            await courseService.DeleteCourse(id);
            
            return Ok(course);
        }
    }
}