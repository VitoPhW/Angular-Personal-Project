namespace API.DTOs
{
    public class ProductLikeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Categogy { get; set; }
        public string PhotoUrl { get; set; }
        public float Price { get; set; }
        public int InStock { get; set; }
    }
}