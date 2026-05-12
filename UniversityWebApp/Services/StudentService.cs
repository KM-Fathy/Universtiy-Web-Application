using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.Database;
using Microsoft.EntityFrameworkCore;
using UniversityWebApp.DTOs;

namespace UniversityWebApp.Services
{
    public class StudentService : IStudentService
    {
        private readonly ApplicationDbContext _context;

        public StudentService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<StudentDto>> GetAllStudents()
        {
            return await _context.Students.Include(s => s.Courses).Include(s => s.Department).AsNoTracking().Select(s => new StudentDto
            {
                Id = s.Id,
                Name = s.Name,
                CourseTitles = s.Courses.Select(c => c.Title).ToList(),
                DepartmentName = s.Department != null ? s.Department.Name : "Unassigned"
            }).ToListAsync();
        }

        public async Task<StudentDto?> GetStudentById(int id)
        {
            var student = await _context.Students.Include(s => s.Courses).Include(s => s.Department).AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
            if (student == null) return null;

            return new StudentDto
            {
                Id = student.Id,
                Name = student.Name,
                CourseTitles = student.Courses.Select(c => c.Title).ToList(),
                DepartmentName = student.Department != null ? student.Department.Name : "Unassigned"
            };
        }

        public async Task AddStudent(Student student)
        {
            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();
        }
        
        public async Task<bool> RegisterStudentInCourse(int studentId, int courseId)
        {
            var student = await _context.Students
                .Include(s => s.Courses)
                .FirstOrDefaultAsync(s => s.Id == studentId);

            var course = await _context.Courses.FindAsync(courseId);

            if (student == null || course == null) return false; 
            if (student.Courses.Any(c => c.Id == courseId)) return false;

            student.Courses.Add(course);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task UpdateStudent(StudentUpdateDto studentDto, int id)
        {
            var existingStudent = await _context.Students.FindAsync(id);

            if (existingStudent != null)
            {
                existingStudent.Name = studentDto.Name;
                existingStudent.Major = studentDto.Major; // If front-end doesn't send this, it becomes null, which is correct!
                existingStudent.DepartmentId = studentDto.DepartmentId;

                _context.Students.Update(existingStudent); 
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student != null)
            {
                _context.Students.Remove(student);
                await _context.SaveChangesAsync();
            }
        }

        // ==========================================
        // NEW: STUDENT DASHBOARD DATA ENGINE
        // ==========================================
        public async Task<object?> GetMyProfile(string userId)
        {
            var student = await _context.Students
                .Include(s => s.Department)
                .Include(s => s.Courses)
                    .ThenInclude(c => c.Students) // Fetch the classmates!
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (student == null) return null;

            // Package the data nicely for the React frontend
            return new
            {
                Name = student.Name,
                Department = student.Department != null ? student.Department.Name : "Unassigned",
                Courses = student.Courses.Select(c => new
                {
                    Title = c.Title,
                    Credits = c.Credits,
                    // Get classmates, but exclude the current student's own name
                    Classmates = c.Students
                        .Where(cs => cs.Id != student.Id)
                        .Select(cs => cs.Name)
                        .ToList()
                })
            };
        }
    }
}