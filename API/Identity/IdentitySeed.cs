using API.Entities;
using API.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace API.Identity
{
    public class IdentitySeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            string basePath = Directory.GetCurrentDirectory();
            string userPath = Path.Combine(basePath, "Data", "SeedData", "UserSeedData.json");
            if (!userManager.Users.Any())
            {
                var userData = await File.ReadAllTextAsync(userPath);
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Bob",
                        Street = "Brolo",
                        City = "Koper",
                        Country = "Slovenia",
                        ZipCode = "6000"
                    },
                    Gender = "male",
                    DateOfBirth = new DateOnly(1990, 1, 1),
                    KnownAs = "Bob",
                    Introduction = "I am Bob",
                    LookingFor = "I am looking for women",
                    Interests = "I like to play football",
                    Photos = new List<Photo>
                    {
                        new Photo
                        {
                            Url = "https://randomuser.me/api/portraits/men/90.jpg",
                            IsMain = true
                        }
                    }
                };

                await userManager.CreateAsync(user, "P@ssw0rd");
            }
        }
    }
}