using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class StudentCreateDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Major { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int DepartmentId { get; set; }
    }
}