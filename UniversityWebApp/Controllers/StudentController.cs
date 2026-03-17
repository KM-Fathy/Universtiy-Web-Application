using Microsoft.AspNetCore.Mvc;
using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;

namespace UniversityApp.Controllers
{
    public class StudentController : Controller
    {
        private readonly IStudentService studentService;

        public StudentController(IStudentService service)
        {
            studentService = service;
        }

        public async Task<IActionResult> Index()
        {
            var allStudents = await studentService.GetAllStudents();
            return View(allStudents);
        }

        public async Task<IActionResult> Details(int id)
        {
            var student = await studentService.GetById(id);

            if (student == null)
            {
                return NotFound();
            }

            return View(student);
        }

        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> add(Student student)
        {
            await studentService.Add(student);
            return RedirectToAction("Index");
        
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await studentService.GetById(id);
            if (student == null)
            {
                return NotFound();
            }
            return View(student);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await studentService.Delete(id);
            return RedirectToAction("Index");
        }
    }
}