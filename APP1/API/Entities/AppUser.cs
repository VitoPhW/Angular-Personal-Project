using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        [MaxLength(40)]
        public string FirstName { get; set; }
        [MaxLength(50)]
        public string LastName { get; set; }
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int Building { get; set; }
        public int Appartment { get; set; }
        public ICollection<ProductLike> LikedProduct { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}