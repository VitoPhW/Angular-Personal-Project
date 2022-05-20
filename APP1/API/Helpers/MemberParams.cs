using System;

namespace API.Helpers
{
    public class MemberParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; }
        private int _pageSize;
        public int PageSize
        {
            get => _pageSize; // getter
            set => _pageSize = Math.Min(MaxPageSize, value); //setter
        }
        
    }
}