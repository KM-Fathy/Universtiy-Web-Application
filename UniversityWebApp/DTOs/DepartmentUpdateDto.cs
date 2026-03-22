using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class DepartmentUpdateDto : DepartmentCreateDto
    {
        [Required]
        public int Id { get; set; }
    }
}