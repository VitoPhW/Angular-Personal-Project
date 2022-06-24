namespace API.Entities
{
    public class ProductLike
    {
        public AppUser User { get; set; } // the user who liked a product
        public int UserId { get; set; }
        public Product Product { get; set; } // the liked product by user
        public int ProductId { get; set; }
    }
}