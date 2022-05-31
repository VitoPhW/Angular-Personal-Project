using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ICategoryRepository
    {
         void Create(Category category);
         void Update(Category category);
         Task<bool> SaveAllAsync(); //Database tracking to save changes in appropriate time
         Task<PagedList<Category>> GetCategoriesAsync(CategoryParams categoryParams);
         Task<Category> GetCategoryAsync(string categoryname);
         Task<IEnumerable<string>> GetCategoryNamesAsync();
         Task<bool> CategoryExists(string categoryname);
    }
}