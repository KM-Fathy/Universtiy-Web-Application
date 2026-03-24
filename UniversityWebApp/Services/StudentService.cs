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
            return await _context.Students.Include(s => s.Courses).AsNoTracking().Select(s => new StudentDto
            {
                Id = s.Id,
                Name = s.Name,
                CourseTitles = s.Courses.Select(c => c.Title).ToList(),
                DepartmentName = s.Department.Name
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
                DepartmentName = student.Department.Name
            };
        }

        public async Task AddStudent(Student student)
        {
            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();
        }
        
        public async Task<bool> RegisterStudentInCourse(int studentId, int courseId)
        {
            // Get the student and include their courses so we can add to the list
            var student = await _context.Students
                .Include(s => s.Courses)
                .FirstOrDefaultAsync(s => s.Id == studentId);

            // Get the course
            var course = await _context.Courses.FindAsync(courseId);

            // Make sure both exist
            if (student == null || course == null)
            {
                return false; 
            }

            // Prevent adding the same course twice
            if (student.Courses.Any(c => c.Id == courseId))
            {
                return false;
            }

            // Add the course to the student and save
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
                existingStudent.Major = studentDto.Major;
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
    }
}