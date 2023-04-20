using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using API.Entities.Identity;
using API.Entities.Order;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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

        public static async Task SeedUsersAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            string basePath = Directory.GetCurrentDirectory();
            string userPath = Path.Combine(basePath, "Data", "SeedData", "UserSeedData.json");
            if (await userManager.Users.AnyAsync()) return;
            var userData = await File.ReadAllTextAsync(userPath);
            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users) 
            {
                user.UserName = user.DisplayName.ToLower();
                await userManager.CreateAsync(user, "P@ssw0rd");
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                Email = "admin@test.com",
                DisplayName = "Admin",
                UserName = "admin@test.com"
            };

            await userManager.CreateAsync(admin, "P@ssw0rd");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
        }
    }
}