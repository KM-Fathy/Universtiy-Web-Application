using System.ComponentModel.DataAnnotations;

namespace UniversityWebApp.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string LastName { get; set; }

            [Phone]
        public string? PhoneNumber { get; set; }

    }
}
