using UniversityWebApp.Interfaces;  
using UniversityWebApp.Models;
using UniversityWebApp.Database;
using Microsoft.EntityFrameworkCore;

namespace UniversityWebApp.Services
{
    public class StudentProfileService : IStudentProfileService
    {
        private readonly ApplicationDbContext _context;

        public StudentProfileService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<StudentProfile>> GetAllStudentProfiles()
        {
            return await _context.StudentProfiles.Include(p => p.Student).AsNoTracking().ToListAsync();
        }

        public async Task<StudentProfile?> GetStudentProfileById(int id)
        {
            return await _context.StudentProfiles.Include(p => p.Student).FirstOrDefaultAsync(p => p.Id == id);  
 
        }

        public async Task AddStudentProfile(StudentProfile profile)
        {
            await _context.StudentProfiles.AddAsync(profile);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStudentProfile(int id)
        {
            var profile = await _context.StudentProfiles.FindAsync(id);
            if (profile != null)
            {
                _context.StudentProfiles.Remove(profile);
                await _context.SaveChangesAsync();
            }
        }
    }
}