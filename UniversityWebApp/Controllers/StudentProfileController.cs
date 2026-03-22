using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;

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
        public async Task<IActionResult> AddStudentProfile(StudentProfile profile)
        {
            await profileService.AddStudentProfile(profile);
            return RedirectToAction("Index");
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