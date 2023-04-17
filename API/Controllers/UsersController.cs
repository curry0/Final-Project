using System.Security.Claims;
using API.DisplayModels;
using API.Entities.Identity;
using API.Errors;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        public UsersController(IUserRepository userRepository, IMapper mapper,UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDisplayModel>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDisplayModel>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDisplayModel memberUpdate)
        {
            var username = HttpContext.User.GetEmailClaim();
            var user = await _userRepository.GetUserByUsernameAsync(username);
            var userUpdate = _mapper.Map(memberUpdate, user);

            if (user == null) return NotFound(new ApiResponse(404, "User not found"));

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<AppUser, MemberUpdateDisplayModel>(userUpdate));

            return BadRequest("Problem updating the user");


        }
    }
}