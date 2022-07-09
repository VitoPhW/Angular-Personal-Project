using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
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

        public async void Create(ProductCreateDto productCreateDto)
        {
            var product = _mapper.Map<Product>(productCreateDto);

            _context.Product.Add(product);
            await _context.SaveChangesAsync();
        }
        public async Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams)
        {
            var query = _context.Product.AsQueryable();
            query = query.Where(x => x.UnitsInStock > 0);

            query = query.Where( x=>x.UnitPrice >= productParams.MinPrice && x.UnitPrice <= productParams.MaxPrice);

            if(productParams.Category != null && productParams.Category != "")
                query = query.Where(x=>x.CategoryName == productParams.Category);

            query = productParams.OrderBy switch
            {
                "category" => query.OrderBy(x=>x.CategoryName.ToLower()),
                "productname" => query.OrderBy(x=>x.ProductName.ToLower()),
                "price" => query.OrderBy(x=>x.UnitPrice),
                "instock" => query.OrderByDescending(x=>x.UnitsInStock),
                _ => query.OrderBy(x=>x.CategoryName.ToLower())
            };

            return await PagedList<ProductDto>.CreateAsync
            (
                query.ProjectTo<ProductDto>(_mapper.ConfigurationProvider).AsNoTracking(), //OPTIMIZATION - don't track the unchangeable data 
                productParams.PageNumber, 
                productParams.PageSize
            );
        }
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