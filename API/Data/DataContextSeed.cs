using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.Identity;
using API.Entities.Order;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context)
        {
            string basePath = Directory.GetCurrentDirectory();
            string brandsPath = Path.Combine(basePath, "Data", "SeedData", "brands.json");
            string typesPath = Path.Combine(basePath, "Data", "SeedData", "types.json");
            string productsPath = Path.Combine(basePath, "Data", "SeedData", "products.json");
            string deliveryPath = Path.Combine(basePath, "Data", "SeedData", "delivery.json");
            if (!context.ProductBrands.Any())
            {
                var brandsData = File.ReadAllText(brandsPath);
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                context.ProductBrands.AddRange(brands);
            }
            if (!context.ProductTypes.Any())
            {
                var typesData = File.ReadAllText(typesPath);
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                context.ProductTypes.AddRange(types);
            }
            if (!context.Products.Any())
            {
                var productsData = File.ReadAllText(productsPath);
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                context.Products.AddRange(products);
            }
            if (!context.DeliveryMethods.Any())
            {
                var deliveryData = File.ReadAllText(deliveryPath);
                var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);
                context.DeliveryMethods.AddRange(methods);
            }
            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }

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
                    Address = new Entities.Identity.Address
                    {
                        FirstName = "Bob",
                        LastName = "Bob",
                        Street = "Brolo",
                        City = "Koper",
                        Country = "Slovenia",
                        ZipCode = "6000"
                    },
                    Gender = "male",
                    DateOfBirth = new DateTime(1990, 1, 1),
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