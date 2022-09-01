namespace API.Entities
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public int quantity { get; set; }
        
        public AppUser User { get; set; }
        public int UserId { get; set; }

        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}