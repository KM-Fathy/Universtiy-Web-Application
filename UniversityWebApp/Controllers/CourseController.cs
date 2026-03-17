using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;

namespace UniversityWebApp.Controllers
{
    public class CourseController : Controller
    {
        private readonly ICourseService courseService;

        public CourseController(ICourseService service)
        {
            courseService = service;
        }

        public async Task<IActionResult> Index()
        {
            var allCourses = await courseService.GetAllCourses();
            return View(allCourses);
        }

        public async Task<IActionResult> Details(int id)
        {
            var course = await courseService.GetById(id);

            if (course == null)
            {
                return NotFound();
            }

            return View(course);
        }

        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> add(Course course)
        {
            await courseService.Add(course);
            return RedirectToAction("Index");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var course = await courseService.GetById(id);
            if (course == null)
            {
                return NotFound();
            }
            return View(course);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await courseService.Delete(id);
            return RedirectToAction("Index");
        }
    }
}