using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetEmailClaim(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.Email);
        }

        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.Name);
        }

        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse (user.FindFirstValue(ClaimTypes.NameIdentifier));
        }

        public static string GetDisplayNameClaim(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.GivenName);
        }

    }
}