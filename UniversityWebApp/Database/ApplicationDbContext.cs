using Microsoft.EntityFrameworkCore;
using UniversityWebApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace UniversityWebApp.Database
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }
        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<StudentProfile> StudentProfiles { get; set; }
    }
}