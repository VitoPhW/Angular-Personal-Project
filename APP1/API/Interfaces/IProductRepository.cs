using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IProductRepository
    {
         void Create(ProductCreateDto productCreateDto);
         void Update(Product user);
        //  Task<bool> SaveAllAsync();
         Task<ProductDto> GetProductAsync(string productname);
        //  Task<IEnumerable<Product>> GetProductsAsync();
         Task<Product> GetProductByIdAsync(int id);
         Task<Product> GetProductByProductNameAsync(string productname);

         Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams);
        //  Task<ProductDto> GetItemAsync(string productname);
         Task<bool> ProductExists(string productname);
    }
}