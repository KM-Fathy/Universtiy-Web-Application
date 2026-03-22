using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.DTOs;

namespace UniversityApp.Controllers
{
    [Route("studentprofiles")]
    [ApiController]
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
        public async Task<IActionResult> UpdateStudentProfile(int id, [FromBody] StudentProfileUpdateDto profileDto)
        {
            if (id != profileDto.Id)
            {
                return BadRequest("ID mismatch.");
            }

            await profileService.UpdateStudentProfile(profileDto);

            return NoContent();
        }

        
        [HttpDelete("{id}")]
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