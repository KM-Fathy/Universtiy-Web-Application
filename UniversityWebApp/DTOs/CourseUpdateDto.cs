using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class CourseUpdateDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public int Credits { get; set; }

    }
}