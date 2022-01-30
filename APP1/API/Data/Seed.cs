using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedCategories(DataContext context)
        {
            if (await context.Category.AnyAsync()) return;

            var CategoryData = await System.IO.File.ReadAllTextAsync("Data/CategorySeedData.json");

            var Categories = JsonSerializer.Deserialize<List<Category>>(CategoryData);

            foreach (var Category in Categories)
            {
                context.Category.Add(Category);
            }

            await context.SaveChangesAsync();
        }
        public static async Task SeedProducts(DataContext context)
        {
            if (await context.Product.AnyAsync()) return;

            var ProductData = await System.IO.File.ReadAllTextAsync("Data/ProductSeedData.json");

            var Products = JsonSerializer.Deserialize<List<Product>>(ProductData);

            foreach (var Product in Products)
            {
                context.Product.Add(Product);
            }

            await context.SaveChangesAsync();
        }
    }
}