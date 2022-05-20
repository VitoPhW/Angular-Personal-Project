using System;

namespace API.Helpers
{
    public class ProductParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; }
        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize; // getter
            set => _pageSize = Math.Min(MaxPageSize, value); //setter
        }
        
        // public string Category { get; set; }
        // public int MinPrice { get; set; } = 0;
        // public int MaxPrice { get; set; } = 9999;
        
    }
}