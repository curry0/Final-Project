using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class RegisterSaveModel
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$", 
        ErrorMessage = "Password must be at least 8 characters and have 1 uppercase, 1 lowercase, 1 character and 1 number")]
        public string Password { get; set; }
    }
}