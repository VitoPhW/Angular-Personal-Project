using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize] // required authorization to use the following method
    public class ProductsController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public ProductsController(IProductRepository productRepository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _productRepository = productRepository;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProduct(ProductUpdateDto productUpdateDto)
        {
            var productname = User.GetUsername(); //nameid
            var product = await _productRepository.GetProductByProductNameAsync(productname);
            _mapper.Map(productUpdateDto, product);

            _productRepository.Update(product);

            if(await _productRepository.SaveAllAsync()) {
                return NoContent();
            }
            return BadRequest("Failed to update product");
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
    
        [HttpPost("add-photo/{productname}")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, string productname)
        {
            var product = await _productRepository.GetProductByProductNameAsync(productname);
            var result = await _photoService.UploadPhotoAsync(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            photo.isMain = product.Photos.Count == 0;

            product.Photos.Add(photo);

            if (await _productRepository.SaveAllAsync())
            { // 🔻🔻here is the issue. check in recording what this row is doing...🔻🔻
                return CreatedAtRoute("GetUser", new { username = product.ProductName }, _mapper.Map<PhotoDto>(photo));
                // return _mapper.Map<PhotoDto>(photo);
            }

            return BadRequest("Problem adding Photos.");
        }
    }
}