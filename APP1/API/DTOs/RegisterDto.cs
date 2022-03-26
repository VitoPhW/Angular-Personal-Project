using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public DateTime? DateOfBirth { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 16 characters.")]
        public string Password { get; set; }
    }
}