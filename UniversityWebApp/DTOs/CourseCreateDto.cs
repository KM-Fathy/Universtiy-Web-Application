using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class CourseCreateDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [Range(1, 6)]
        public int Credits { get; set; }
    }
}