
using API.DisplayModels;
using API.Entities.Identity;
using API.Errors;
using API.Extensions;
using API.Interfaces;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDisplayModel>> GetCurrentUser()
        {
            var user = await _userManager.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.Email == User.GetEmailClaim());
            return new UserDisplayModel
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Gender = user.Gender
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDisplayModel>> GetUserAddress()
        {
            var user = await _userManager.FindUserByAddress(User);

            return _mapper.Map<Address, AddressDisplayModel>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDisplayModel>> UpdateUserAddress(AddressDisplayModel address)
        {
            var user = await _userManager.FindUserByAddress(HttpContext.User);

            user.Address = _mapper.Map<AddressDisplayModel, Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDisplayModel>(user.Address));

            return BadRequest("Problem updating the user");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDisplayModel>> Login(LoginSaveModel loginModel)
        {
            var user = await _userManager.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.Email == loginModel.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _userManager.CheckPasswordAsync(user, loginModel.Password);

            if (!result) return Unauthorized(new ApiResponse(401, "Invalid password or username"));

            return new UserDisplayModel
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Gender = user.Gender
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDisplayModel>> Register(RegisterSaveModel registerModel)
        {
            if (CheckEmailExistsAsync(registerModel.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email address is in use" } });
            }

            var user = _mapper.Map<AppUser>(registerModel);
            user.UserName = registerModel.Email;
            user.Email = registerModel.Email;
            user.Address = new Address
            {
                City = registerModel.City,
                Country = registerModel.Country
            };

            var result = await _userManager.CreateAsync(user, registerModel.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400, result.Errors.ToString()));

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");
            if (!roleResult.Succeeded) return BadRequest(new ApiResponse(400, roleResult.Errors.ToString()));

            return new UserDisplayModel
            {
                DisplayName = user.DisplayName,
                Token = await _tokenService.CreateToken(user),
                Email = user.Email,
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Gender = user.Gender
            };
        }

    }
}