namespace API.Entities
{
    public class ProductLike
    {
        public AppUser User { get; set; }
        public int UserId { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}