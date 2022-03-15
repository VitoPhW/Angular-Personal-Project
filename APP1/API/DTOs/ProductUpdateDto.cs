namespace API.DTOs
{
    public class ProductUpdateDto
    {
        public string ProductDescription { get; set; }
        public string CategoryName { get; set; }
        public float UnitPrice { get; set; }
        public int UnitsInStock { get; set; }
    }
}