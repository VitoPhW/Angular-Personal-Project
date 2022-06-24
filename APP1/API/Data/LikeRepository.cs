using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikeRepository : ILikeRepository
    {
        private readonly DataContext _context;
        public LikeRepository(DataContext context)
        {
            _context = context;

        }

        // get the like of particullar user of particular product
        public async Task<ProductLike> GetProductLike(int userId, int productId)
        {
            return await _context.Likes.FindAsync(productId, userId);
        }

        // get users that likes this product
        public async Task<IEnumerable<MemberLikeDto>> GetProductLikes(int productId)
        {
            // throw new System.NotImplementedException();
        
            IQueryable<AppUser> users;
            var likes = _context.Likes.AsQueryable();

                likes = likes.Where( like => like.ProductId == productId);
                users = likes.Select(like => like.User);

                return await users.Select( user => new MemberLikeDto {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = user.UserName,
                    City = user.City
                }).ToListAsync();
        }

        public async Task<PagedList<ProductDto>> GetProductsLikedByUser(LikesParams likesParams)
        {
            
            IQueryable<Product> products;
            var likes = _context.Likes.AsQueryable();

                likes = likes.Where(like => like.User.UserName == likesParams.username);
                products = likes.Select(like => like.Product);

                var likedProducts = products.Select( product => new ProductDto {
                    ProductID = product.ProductID,
                    Productname = product.ProductName,
                    ProductDescription = product.ProductDescription,
                    PhotoUrl = product.Photos.FirstOrDefault(p=>p.isMain).Url,
                    CategoryName = product.CategoryName,
                    UnitPrice = product.UnitPrice,
                    UnitsInStock = product.UnitsInStock
                });

                return await PagedList<ProductDto>.CreateAsync(likedProducts, likesParams.PageNumber, likesParams.PageSize);
        }

        // get user with products user likes
        public async Task<AppUser> GetUserWithLikes(int userId) 
        {
            return await _context.Users
            .Include(p => p.LikedProduct)
            .FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}