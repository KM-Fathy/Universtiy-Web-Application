using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class StudentProfileCreateDto
    {
        [Required]
        [MaxLength(250)]
        public string Address { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int StudentId { get; set; }
    }
}