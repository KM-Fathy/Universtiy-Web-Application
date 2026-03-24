using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace UniversityApp.Controllers
{
    [Route("studentprofiles")]
    [ApiController]
    [Authorize]
    public class StudentProfileController : Controller
    {
        private readonly IStudentProfileService profileService;

        public StudentProfileController(IStudentProfileService service)
        {
            profileService = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStudentProfiles()
        {
            var allProfiles = await profileService.GetAllStudentProfiles();
            return Ok(allProfiles);
        } 

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudentProfileById(int id)
        {
            var profile = await profileService.GetStudentProfileById(id);

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(profile);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddStudentProfile([FromBody] StudentProfileCreateDto profileDto)
        {
            var profile = new StudentProfile
            {
                Address = profileDto.Address,
                DateOfBirth = profileDto.DateOfBirth,
                StudentId = profileDto.StudentId
            };

            await profileService.AddStudentProfile(profile);

            return Ok(new { Message = "Student profile created successfully." });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateStudentProfile(int id, [FromBody] StudentProfileUpdateDto profileDto)
        {
            await profileService.UpdateStudentProfile(profileDto, id);

            return NoContent();
        }

        
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStudentProfile(int id)
        {
            var profile = await profileService.GetStudentProfileById(id);
            if (profile == null)
            {
                return NotFound();
            }

            await profileService.DeleteStudentProfile(id);

            return Ok(profile);
        }
    }
}