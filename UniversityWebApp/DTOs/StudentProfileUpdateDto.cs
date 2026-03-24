using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class StudentProfileUpdateDto
    {
        [Required]
        public string Address { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}

