using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class CourseUpdateDto : CourseCreateDto
    {
        [Required]
        public int Id { get; set; }
    }
}