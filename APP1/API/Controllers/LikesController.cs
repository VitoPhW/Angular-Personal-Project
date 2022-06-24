using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikeRepository _likeRepository;
        private readonly IProductRepository _productRepository;

        public LikesController(IUserRepository userRepository, ILikeRepository likeRepository, IProductRepository productRepository)
        {
            _productRepository = productRepository;
            _userRepository = userRepository;
            _likeRepository = likeRepository;
        }

        [HttpPut("addlike/{productname}")] // PUT like/addlike/{productname}
        public async Task<ActionResult> AddLike(string productname)
        {
            var userId = User.GetUserId();
            var user = await _likeRepository.GetUserWithLikes(userId);
            
            var likedProduct = await _productRepository.GetProductByProductNameAsync(productname);
            if(likedProduct == null) return NotFound();

            var productLike = await _likeRepository.GetProductLike(userId, likedProduct.ProductID);
            if(productLike != null) return BadRequest("You already liked this product.");

            productLike = new ProductLike() {
                ProductId = likedProduct.ProductID,
                UserId = userId
            };

            user.LikedProduct.Add(productLike);
            if(await _userRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to like a product.");
        }

        [HttpPut("removelike/{productname}")] // PUT like/addlike/{productname}
        public async Task<ActionResult> RemoveLike(string productname)
        {
            var userId = User.GetUserId();
            var user = await _likeRepository.GetUserWithLikes(userId);
            
            var unlikedProduct = await _productRepository.GetProductByProductNameAsync(productname);
            if(unlikedProduct == null) return NotFound();

            var productLike = await _likeRepository.GetProductLike(userId, unlikedProduct.ProductID);
            if(productLike == null) return BadRequest("You already unliked this product.");

            user.LikedProduct.Remove(productLike);
            if(await _userRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to unlike a product.");
        }

        [HttpGet("{productname}")]
        public async Task<ActionResult<IEnumerable<MemberLikeDto>>> GetProductLikes(string productname)
        {
            var product = await _productRepository.GetProductByProductNameAsync(productname);
            var users = await _likeRepository.GetProductLikes(product.ProductID);
            return Ok(users);
        }
    
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsLikedByUser([FromQuery]LikesParams likesParams)
        {
            var likedProducts = await _likeRepository.GetProductsLikedByUser(likesParams);
            Response.AddPaginationHeader(likedProducts.CurrentPage, likedProducts.PageSize, likedProducts.TotalCount, likedProducts.TotalPages);
            return Ok(likedProducts);
        }

    }
}