using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class CategoryController : BaseApiController
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }
        
        [HttpGet]
        public async Task<ActionResult<PagedList<Category>>> GetCategories([FromQuery] CategoryParams categoryParams)
        {
            var categories = await _categoryRepository.GetCategoriesAsync(categoryParams);
            Response.AddPaginationHeader(
                categories.CurrentPage,
                categories.PageSize,
                categories.TotalCount,
                categories.TotalPages
                );

            return Ok(categories);
        }

        [HttpGet("categorynames")]
        public async Task<IEnumerable<string>> GetNames()
        {
            return await _categoryRepository.GetCategoryNamesAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Create(Category category)
        {
            if(await _categoryRepository.CategoryExists(category.CategoryName))
                return BadRequest("This such category already exists.");
            
            _categoryRepository.Create(category);

            return Ok();
        }

        [HttpGet("{categoryname}", Name = "GetCategory")]
        public async Task<ActionResult<Category>> GetCategory(string categoryname)
        {
            var category = await _categoryRepository.GetCategoryAsync(categoryname);
            return category;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCategory(Category categoryToUdate)
        {
            var category = await _categoryRepository.GetCategoryAsync(categoryToUdate.CategoryName);
            _mapper.Map(categoryToUdate,category);

            _categoryRepository.Update(category);

            if (await _categoryRepository.SaveAllAsync())
            {
                return NoContent();
            }
            return BadRequest("Failed to update category");
        }
    
        // [HttpDelete()]
    }
}