using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
            .ForMember(
                dest => dest.Seniority,
                opt => opt.MapFrom( src => src.Created.CalculateSeniority())
            );
            CreateMap<Product, ProductDto>()
            .ForMember(
                dest => dest.PhotoUrl,
                opt => {
                    opt.MapFrom( src => src.Photos.FirstOrDefault(p => p.isMain).Url);
                }
            );

            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<ProductUpdateDto, Product>();
            CreateMap<ProductCreateDto, Product>();

            CreateMap<RegisterDto, AppUser>();
            // The next code could be instead of same action in AccountController.cs:
            // .ForMember(
            //     dest => dest.UserName,
            //     opt => {
            //         opt.MapFrom( src => src.Username.ToLower());
            //     }
            // );

        }
    }
}