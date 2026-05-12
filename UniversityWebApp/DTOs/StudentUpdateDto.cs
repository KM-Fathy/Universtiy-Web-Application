using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class StudentUpdateDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }

        public int? DepartmentId { get; set; }
    }
}