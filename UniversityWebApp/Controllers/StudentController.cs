using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;

namespace UniversityApp.Controllers
{
    public class StudentController : Controller
    {
        private readonly IStudentService _service;

        public StudentController(IStudentService service)
        {
            _service = service;
        }

        public IActionResult Index()
        {
            var allStudents = _service.GetAll();
            return View(allStudents);
        }

        public IActionResult Details(int id)
        {
            var student = _service.GetById(id);

            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Student student)
        {
            _service.Add(student);
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var student = _service.GetById(id);
            if (student == null)
            {
                return NotFound();
            }
            return View(student);
        }

        [HttpPost]
        public IActionResult DeleteConfirmed(int id)
        {
            _service.Delete(id);
            return RedirectToAction("Index");
        }
    }
}