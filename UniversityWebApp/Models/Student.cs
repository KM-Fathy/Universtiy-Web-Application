using System.ComponentModel.DataAnnotations.Schema;

namespace UniversityWebApp.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        
        // 1. Made nullable because an auto-created student won't have a major yet
        public string? Major { get; set; }

        // 2. The link to the authentication User account
        public string UserId { get; set; }

        public List<Course> Courses { get; set; } = new List<Course>();
        
        public StudentProfile Profile { get; set; }
        
        // 3. Made nullable (int?) so the Admin can assign it later
        [ForeignKey("Department")]
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
    }
}