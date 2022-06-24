using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class ProductDto
    {
        public int ProductID { get; set; }
        public string Productname { get; set; }
        public string ProductDescription { get; set; }
        public string PhotoUrl { get; set; }
        public string CategoryName { get; set; }
        public float UnitPrice { get; set; }
        public int UnitsInStock { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
        public bool isLiked { get; set; }

    }
}