using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class DepartmentUpdateDto
    {
        [Required]
        public string Name { get; set; }
    }
}