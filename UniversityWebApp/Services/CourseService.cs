using UniversityWebApp.Interfaces;
using UniversityWebApp.Models;
using UniversityWebApp.Database;
using Microsoft.EntityFrameworkCore;
using UniversityWebApp.DTOs;

namespace UniversityWebApp.Services
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _context;

        public CourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CourseDto>> GetAllCourses()
        {
            return await _context.Courses.AsNoTracking().Select(c => new CourseDto
            {
                Id = c.Id,
                Title = c.Title,
                Credits = c.Credits
            }).ToListAsync();
        }

        public async Task<CourseDto?> GetCourseById(int id)
        {
            var course = await _context.Courses.Include(c => c.Students).AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
            if (course == null) return null;

            return new CourseDto
            {
                Id = course.Id,
                Title = course.Title,
                Credits = course.Credits
            };           
        }

        public async Task AddCourse(Course course)
        {
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCourse(CourseUpdateDto courseDto, int id)
        {
            var existing = await _context.Courses.FindAsync(id);
            if (existing != null)
            {
                existing.Title = courseDto.Title;
                existing.Credits = courseDto.Credits;

                _context.Courses.Update(existing);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course != null)
            {
                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
            }
        }

        
    }
}
                 