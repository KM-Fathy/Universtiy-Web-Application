using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        [Phone]
        public string? PhoneNumber { get; set; }
        
    }
}