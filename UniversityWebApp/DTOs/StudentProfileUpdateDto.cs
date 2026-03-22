using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class StudentProfileUpdateDto : StudentProfileCreateDto
    {
        [Required]
        public int Id { get; set; }
    }
}

