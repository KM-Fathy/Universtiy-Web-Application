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

        // ADD THIS: It configures the database rules
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); // Critical for Identity

            // Link the Student table to the User table
            builder.Entity<Student>()
                .HasOne<User>()
                .WithOne()
                .HasForeignKey<Student>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade); // If a User account is deleted, delete their Student record too
        }
    }
}