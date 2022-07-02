using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Customer"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Assistant"}
            };

            foreach(var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Customer");
            }

            var admin = new AppUser{UserName = "admin", Email = "vitoph@gmail.com"};

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Assistant"});
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