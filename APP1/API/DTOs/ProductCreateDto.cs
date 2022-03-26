using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class ProductCreateDto
    {
        public string Productname { get; set; }
        public string ProductDescription { get; set; }
        public string CategoryName { get; set; }
        public float UnitPrice { get; set; }
        public int UnitsInStock { get; set; }
    }
}