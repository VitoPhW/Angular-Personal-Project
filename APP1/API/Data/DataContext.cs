using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<
        AppUser,
        AppRole,
        int,
        IdentityUserClaim<int>, 
        AppUserRole,
        IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, 
        IdentityUserToken<int>
        >
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Category> Category { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductLike> Likes { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ProductLike>().HasKey(k => new {k.ProductId, k.UserId});

            builder.Entity<ProductLike>()
            .HasOne(p => p.User)
            .WithMany(p => p.LikedProduct)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ProductLike>()
            .HasOne(p => p.Product)
            .WithMany(p => p.LikedBy)
            .HasForeignKey(p => p.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(aur => aur.User)
                .HasForeignKey(aur => aur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(aur => aur.Role)
                .HasForeignKey(aur => aur.RoleId)
                .IsRequired();
        }
    }
}