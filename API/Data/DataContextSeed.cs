using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;

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
            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}