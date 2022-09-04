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
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly DataContext _context;
        public ShoppingCartRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ShoppingCart> GetCartItemByItemId(int itemId)
        {
            return await _context.ShoppingCart.FirstOrDefaultAsync(i => i.Id == itemId);
        }

        public async Task<PagedList<CartItemDto>> GetCartItemsByUser(PaginationParams paginationParams, int userId)
        {
            var cart = _context.ShoppingCart.Include(p=>p.Product).AsQueryable();

            cart = cart.Where(u => u.UserId == userId);

            var cartItems = cart.Select( item => new CartItemDto {
                Id = item.Id,
                Quantity = item.quantity,
                ProductID = item.ProductId,
                Productname = item.Product.ProductName,
                PhotoUrl = item.Product.Photos.FirstOrDefault(p=>p.isMain).Url,
                UnitPrice = item.Product.UnitPrice,
                UnitsInStock = item.Product.UnitsInStock
            });

            return await PagedList<CartItemDto>.CreateAsync(cartItems, paginationParams.PageNumber, paginationParams.PageSize);
        }

        public async Task<AppUser> GetUserAndCart(int userId)
        {
            return await _context.Users
            .Include(p => p.ShoppingCart)
            .FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<AppUser> GetUserCartAndProduct(int userId)
        {
            return await _context.Users
            .Include(sc => sc.ShoppingCart).ThenInclude( p => p.Product)
            .FirstOrDefaultAsync(u => u.Id == userId);            
        }
        
        public async Task<int> GetItemsCount(int userId)
        {
            var cart = _context.ShoppingCart.AsQueryable();
            cart = cart.Where(u => u.UserId == userId);
            return await cart.CountAsync();
        }
    }
}