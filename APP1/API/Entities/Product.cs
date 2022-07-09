using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }

        [MaxLength(40)]
        public string ProductName { get; set; }

        [MaxLength(300), DefaultValue("NA")]
        public string ProductDescription { get; set; }

        [ForeignKey("CategoryID")]
        public string CategoryName { get; set; }
        public Category Category { get; set; }

        [Required]
        public float UnitPrice { get; set; }

        [Required]
        public int UnitsInStock { get; set; }

        public ICollection<Photo> Photos { get; set; }
        public ICollection<ProductLike> LikedBy { get; set; } = new List<ProductLike>();
    }
}