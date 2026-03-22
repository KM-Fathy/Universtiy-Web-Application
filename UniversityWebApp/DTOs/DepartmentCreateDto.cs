using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class DepartmentCreateDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
