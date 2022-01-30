using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Category
    {
        [Key, MaxLength(40)]
        public string CategoryName { get; set; }

        [DataType(DataType.MultilineText), MaxLength(300)]
        public string CategoryDescription { get; set; }

        public string PhotoUrl { get; set; }
        // [DataType(DataType.ImageUrl)]
        // #nullable enable
        // public string? ImageURL { get; set; }
    }
}