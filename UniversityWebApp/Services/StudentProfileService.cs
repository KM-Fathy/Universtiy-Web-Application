using UniversityWebApp.Interfaces;  
using UniversityWebApp.Models;
using UniversityWebApp.Database;
using Microsoft.EntityFrameworkCore;
using UniversityWebApp.DTOs;

namespace UniversityWebApp.Services
{
    public class StudentProfileService : IStudentProfileService
    {
        private readonly ApplicationDbContext _context;

        public StudentProfileService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<StudentProfileDto>> GetAllStudentProfiles()
        {
            return await _context.StudentProfiles.AsNoTracking().Select(sp => new StudentProfileDto
            {
                Id = sp.Id,
                Address = sp.Address,
                DateOfBirth = sp.DateOfBirth,
                StudentId = sp.Student.Id
            }).ToListAsync();
        }

        public async Task<StudentProfileDto?> GetStudentProfileById(int id)
        {
            var studentProfile = await _context.StudentProfiles.Include(sp => sp.Student).AsNoTracking().FirstOrDefaultAsync(sp => sp.Id == id);
            if (studentProfile == null) return null;

            return new StudentProfileDto
            {
                Id = studentProfile.Id,
                Address = studentProfile.Address,
                DateOfBirth = studentProfile.DateOfBirth,
                StudentId = studentProfile.Student.Id
            };
        }

        public async Task AddStudentProfile(StudentProfile profile)
        {
            await _context.StudentProfiles.AddAsync(profile);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStudentProfile(StudentProfileUpdateDto profileDto, int id)
        {
            var existing = await _context.StudentProfiles.FindAsync(id);

            if (existing != null)
            {
                existing.Address = profileDto.Address;
                existing.DateOfBirth = profileDto.DateOfBirth;
                
                _context.StudentProfiles.Update(existing);
                await _context.SaveChangesAsync();
            }
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