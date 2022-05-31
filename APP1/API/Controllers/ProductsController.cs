using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("create")]
        public async Task<ActionResult> Create(ProductCreateDto productCreateDto)
        {
            if(await _productRepository.ProductExists(productCreateDto.Productname)) return BadRequest("This product name already exists.");

            _productRepository.Create(productCreateDto);

            return Ok();
        }

        [HttpPut("{productname}")]
        public async Task<ActionResult> UpdateProduct(ProductUpdateDto productUpdateDto, string productname)
        {
            var product = await _productRepository.GetProductByProductNameAsync(productname);
            _mapper.Map(productUpdateDto, product);

            _productRepository.Update(product);

            if (await _productRepository.SaveAllAsync())
            {
                return NoContent();
            }
            return BadRequest("Failed to update product");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ProductDto>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var products = await _productRepository.GetProductsAsync(productParams);
            Response.AddPaginationHeader(
                products.CurrentPage,
                products.PageSize,
                products.TotalCount,
                products.TotalPages
                );

            return Ok(products);
        }

        [HttpGet("{productname}", Name = "GetProduct")] // :id route parameter : api/Products/Witt
        public async Task<ActionResult<ProductDto>> GetProduct(string productname)
        {
            var productToReturn = await _productRepository.GetProductAsync(productname);

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
            {
                return CreatedAtRoute("GetProduct", new { productname = product.ProductName }, _mapper.Map<PhotoDto>(photo));
                //return _mapper.Map<PhotoDto>(photo);
            }

            return BadRequest("Problem adding Photos.");
        }

        [HttpPut("set-main-photo/{productname}/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId, string productname)
        {
            var product = await _productRepository.GetProductByProductNameAsync(productname);
            var photo = product.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo.isMain) return BadRequest("This is already the main phto.");

            var currentMain = product.Photos.FirstOrDefault(x => x.isMain);
            if (currentMain != null) currentMain.isMain = false;

            photo.isMain = true;

            if (await _productRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Fail to set photo to main");
        }
        [HttpDelete("delete-photo/{productname}/{photoId}")]
        public async Task<ActionResult> DeletePhoto(string productname, int photoId)
        {
            var product = await _productRepository.GetProductByProductNameAsync(productname);
            var photo = product.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo == null) return BadRequest("No photo found.");

            if (photo.isMain) return BadRequest("U cannot delete the main photo.");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            product.Photos.Remove(photo);

            if (await _productRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to delete photo");
        }
    }
}