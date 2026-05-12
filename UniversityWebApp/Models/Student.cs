using System.ComponentModel.DataAnnotations.Schema;

namespace UniversityWebApp.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public string UserId { get; set; }

        public List<Course> Courses { get; set; } = new List<Course>();
        
        // ADD THE QUESTION MARK HERE:
        public StudentProfile? Profile { get; set; }
        
        [ForeignKey("Department")]
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
    }
}