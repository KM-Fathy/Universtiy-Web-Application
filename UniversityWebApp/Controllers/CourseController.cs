using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;

namespace UniversityWebApp.Controllers
{
    public class CourseController : Controller
    {
        private readonly ICourseService _service;

        public CourseController(ICourseService service)
        {
            _service = service;
        }

        public IActionResult Index()
        {
            var allCourses = _service.GetAll();
            return View(allCourses);
        }

        public IActionResult Details(int id)
        {
            var course = _service.GetById(id);

            if (course == null)
            {
                return NotFound();
            }

            return View(course);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Course course)
        {
            _service.Add(course);
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var course = _service.GetById(id);
            if (course == null)
            {
                return NotFound();
            }
            return View(course);
        }

        [HttpPost]
        public IActionResult DeleteConfirmed(int id)
        {
            _service.Delete(id);
            return RedirectToAction("Index");
        }
    }
}