using System.Diagnostics;
using API.DisplayModels;
using API.Entities.Identity;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDisplayModel> GetMemberAsync(string email, bool isCurrentUser)
        {
            var query = _context.Users
                .Where(x => x.Email == email)
                .ProjectTo<MemberDisplayModel>(_mapper.ConfigurationProvider)
                .AsQueryable();

            if (isCurrentUser) query = query.IgnoreQueryFilters();
            return await query.FirstOrDefaultAsync();
        }

        public async Task<PagedList<MemberDisplayModel>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(x => x.Email != userParams.CurrentEmail);
            query = query.Where(x => x.Gender == userParams.Gender);

            if (userParams.MinAge != 0)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1).ToUniversalTime();
                query = query.Where(x => x.DateOfBirth >= minDob);
            }
            if (userParams.MaxAge != 0)
            {
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge).ToUniversalTime();
                query = query.Where(x => x.DateOfBirth <= maxDob);
            }


            if (!userParams.OrderBy.IsNullOrEmpty())
            {
                query = userParams.OrderBy switch
                {
                    "created" => query.OrderByDescending(x => x.Created),
                    _ => query.OrderByDescending(x => x.LastActive)
                };
            }

            return await PagedList<MemberDisplayModel>.CreateAsync
                (query.AsNoTracking().ProjectTo<MemberDisplayModel>(_mapper.ConfigurationProvider),
                userParams.PageNumber,
                userParams.PageSize);

        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByPhotoId(int photoId)
        {
            return await _context.Users
                .Include(x => x.Photos)
                .IgnoreQueryFilters()
                .Where(x => x.Photos.Any(p => p.Id == photoId))
                .FirstOrDefaultAsync();
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .Include(p => p.Address)
                .SingleOrDefaultAsync(x => x.Email == username);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users.Where(x => x.Email == username).Select(x => x.Gender).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .Include(p => p.Address)
                .ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}