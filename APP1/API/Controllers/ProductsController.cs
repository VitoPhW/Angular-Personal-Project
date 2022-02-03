using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize] // required authorization to use the following method
    public class ProductsController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductsController(IProductRepository productRepository, IMapper mapper)
        {
            _mapper = mapper;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var productsToReturn = await _productRepository.GetItemsAsync();
            
            // var products = await _productRepository.GetProductsAsync();
            // var productsToReturn = _mapper.Map<IEnumerable<ProductDto>>(products);
            return Ok(productsToReturn);
        }

        [HttpGet("{productname}")] // :id route parameter : api/Products/Witt
        public async Task<ActionResult<ProductDto>> GetProduct(string productname)
        {
            var productToReturn = await _productRepository.GetItemAsync(productname);
            
            // var product = await _productRepository.GetProductByProductNameAsync(productname);
            // var productToReturn = _mapper.Map<ProductDto>(product);
            return productToReturn;
        }
    }
}