using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IShoppingCartRepository
    {
        Task<ShoppingCart> GetCartItemByItemId(int itemId);
        Task<AppUser> GetUserAndCart(int userId);
        Task<AppUser> GetUserCartAndProduct(int userId);
        Task<PagedList<CartItemDto>> GetCartItemsByUser(PaginationParams paginationParams, int userId);
        Task<int> GetItemsCount(int userId);
    }
}