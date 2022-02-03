using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        public async Task<IEnumerable<ProductDto>> GetItemsAsync()
        {
            return await _context.Product
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<ProductDto> GetItemAsync(string productame)
        {
            return await _context.Product
            .Where(x => x.ProductName == productame)
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

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Product
            .Include(x => x.Photos)
            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Product product)
        {
            _context.Entry<Product>(product).State = EntityState.Modified;
        }
    }
}