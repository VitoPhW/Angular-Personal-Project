using System.Collections.Generic;
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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CategoryRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> CategoryExists(string categoryname)
        {
            return await _context.Category.AnyAsync( x=> x.CategoryName.ToLower() == categoryname.ToLower());
        }

        public async void Create(Category category)
        {
            _context.Category.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task<PagedList<Category>> GetCategoriesAsync(CategoryParams categoryParams)
        {
            var query = _context.Category.AsQueryable();

            return await PagedList<Category>.CreateAsync
            (
                query.ProjectTo<Category>(_mapper.ConfigurationProvider).AsNoTracking(), //OPTIMIZATION - don't track the unchangeable data 
                categoryParams.PageNumber, 
                categoryParams.PageSize
            );
        }

        public async Task<Category> GetCategoryAsync(string categoryname)
        {
            var category = await _context.Category.SingleOrDefaultAsync(x=>x.CategoryName.ToLower() == categoryname.ToLower());
            return category;
        }

        public void Update(Category category)
        {
            _context.Entry<Category>(category).State = EntityState.Modified;
        }

        public async Task<IEnumerable<string>> GetCategoryNamesAsync()
        {
            return await _context.Category.Select(x=>x.CategoryName).ToListAsync();
        }
    }
}