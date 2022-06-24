using System;

namespace API.Helpers
{
    public class ProductParams : PaginationParams
    {
        public string Category { get; set; }
        public int MinPrice { get; set; } = 0;
        public int MaxPrice { get; set; } = 9999;
        public string OrderBy { get; set; } = "category";
        
    }
}