using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize] // required authorization to use the following method
    public class UsersController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UsersController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpPut] // user/id/*
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.GetUsername(); //nameid
            var user = await _unitOfWork.UserRepository.GetUserByUserNameAsync(username);
            _mapper.Map(memberUpdateDto, user);

            _unitOfWork.UserRepository.Update(user);

            if(await _unitOfWork.Complete())
            {
                return NoContent();
            }
            return BadRequest("Failed to update user");
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MemberDto>>> GetMembers([FromQuery] MemberParams memberParams)
        {
            var members = await _unitOfWork.UserRepository.GetMembersAsync(memberParams);
            Response.AddPaginationHeader(
                members.CurrentPage,
                members.PageSize,
                members.TotalCount,
                members.TotalPages
                );

            return Ok(members);
        }

        [HttpGet("{username}")] // :id route parameter : api/users/angie
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var userToReturn = await _unitOfWork.UserRepository.GetMemberAsync(username);
            return userToReturn;
        }
    }
}