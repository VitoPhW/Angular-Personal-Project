using System.Collections.Generic;

namespace API.DTOs
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int ProductID { get; set; }
        public string Productname { get; set; }
        public string PhotoUrl { get; set; }
        public float UnitPrice { get; set; }
        public int UnitsInStock { get; set; }
    }
}