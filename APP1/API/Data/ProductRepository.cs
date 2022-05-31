using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async void Create(ProductCreateDto productCreateDto)
        {
            var product = _mapper.Map<Product>(productCreateDto);

            _context.Product.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams)
        {
            var query = _context.Product.AsQueryable();
            // Filter off products which not in stock.
            query = query.Where(x => x.UnitsInStock > 0);

            // Filter by minimum and maximum price.
            var minPrice = productParams.MinPrice;
            var maxPrice = productParams.MaxPrice;
            query = query.Where( x=>x.UnitPrice >= minPrice && x.UnitPrice <= maxPrice);

            // Filter by Category name
            if(productParams.Category != null && productParams.Category != "")
            {
                var category = productParams.Category;
                query = query.Where(x=>x.CategoryName == category);
            } 


            return await PagedList<ProductDto>.CreateAsync
            (
                query.ProjectTo<ProductDto>(_mapper.ConfigurationProvider).AsNoTracking(), //OPTIMIZATION - don't track the unchangeable data 
                productParams.PageNumber, 
                productParams.PageSize
            );
        }
        // public async Task<IEnumerable<Product>> GetProductsAsync()
        // {
        //     return await _context.Product
        //     .Include(x => x.Photos)
        //     .ToListAsync();
        // }

        public async Task<ProductDto> GetProductAsync(string productname)
        {
            return await _context.Product
            .Where(x => x.ProductName == productname)
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Product.FindAsync(id);
        }

        public async Task<Product> GetProductByProductNameAsync(string productname)
        {
            return await _context.Product
            .Include(x => x.Photos)
            .SingleOrDefaultAsync(x => x.ProductName == productname);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            _context.Entry<Product>(product).State = EntityState.Modified;
        }

        public async Task<bool> ProductExists(string productname)
        {
            return await _context.Product.AnyAsync(x => x.ProductName.ToLower() == productname.ToLower());
        }
    }
}