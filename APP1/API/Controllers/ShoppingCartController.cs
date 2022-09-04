using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ShoppingCartController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public ShoppingCartController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPut("setcartitem/{productid}/{quantity}")]
        public async Task<ActionResult> SetCartItem(int productId, int quantity) //TODO set validation of quantity <= unitsInStock
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.ShoppingCartRepository.GetUserAndCart(userId);

            var productToAdd = await _unitOfWork.ProductRepository.GetProductByIdAsync(productId);
            if (productToAdd == null) return NotFound();

            foreach (var cartItem in user.ShoppingCart)
            {
                if (cartItem.ProductId == productToAdd.ProductID)
                {
                    if (quantity < 1)
                    {
                        user.ShoppingCart.Remove(cartItem);
                        if (await _unitOfWork.Complete()) return Ok();
                    }

                    if (cartItem.quantity == quantity)
                        return Ok(cartItem.quantity);

                    cartItem.quantity = quantity;
                    if (await _unitOfWork.Complete()) return Ok(cartItem.quantity);
                }
            }

            if (quantity < 1) return BadRequest("Cannot add product with quantity 0");

            var item = new ShoppingCart()
            {
                ProductId = productToAdd.ProductID,
                UserId = userId,
                quantity = quantity
            };

            user.ShoppingCart.Add(item);
            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Failed to add a product to cart.");
        }

        [HttpPost("addtocart/{productid}")]
        public async Task<ActionResult> AddToCart(int productId) //TODO set validation of quantity <= unitsInStock
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.ShoppingCartRepository.GetUserAndCart(userId);

            var productToAdd = await _unitOfWork.ProductRepository.GetProductByIdAsync(productId);
            if (productToAdd == null) return NotFound();

            foreach (var cartItem in user.ShoppingCart)
            {
                if (cartItem.ProductId == productToAdd.ProductID)
                {
                    cartItem.quantity++;
                    if (await _unitOfWork.Complete()) return Ok(cartItem.quantity);
                }
            }

            var item = new ShoppingCart()
            {
                ProductId = productToAdd.ProductID,
                UserId = userId,
                quantity = 1
            };

            user.ShoppingCart.Add(item);
            if (await _unitOfWork.Complete()) return Ok(item.quantity);
            return BadRequest("Failed to add a product to cart.");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ShoppingCart>>> GetShoppingCart([FromQuery] PaginationParams paginationParams)
        {
            var userId = User.GetUserId();
            var items = await _unitOfWork.ShoppingCartRepository.GetCartItemsByUser(paginationParams, userId);

            Response.AddPaginationHeader(
                items.CurrentPage,
                items.PageSize,
                items.TotalCount,
                items.TotalPages
                );

            return Ok(items);
        }

        [HttpGet("countitems")]
        public async Task<ActionResult<int>> GetItemsCount()
        {
            var userId = User.GetUserId();
            var count = await _unitOfWork.ShoppingCartRepository.GetItemsCount(userId);
            return Ok(count);
        }

        [HttpPut("checkout")]
        public async Task<ActionResult> Checkout()
        {
            var userId = User.GetUserId();
            var user = await _unitOfWork.ShoppingCartRepository.GetUserCartAndProduct(userId);
            
            foreach (var item in user.ShoppingCart)
            {
                item.Product.UnitsInStock -= item.quantity;
                user.ShoppingCart.Remove(item);
            }

            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest("Failed to checkout");
        }
    }
}