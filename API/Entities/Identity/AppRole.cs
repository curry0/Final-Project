using Microsoft.AspNetCore.Identity;

namespace API.Entities.Identity
{
    public class AppRole : IdentityRole
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}