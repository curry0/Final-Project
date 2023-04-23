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

        public async Task<MemberDisplayModel> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.Email == username)
                .ProjectTo<MemberDisplayModel>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDisplayModel>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(x => x.UserName != userParams.CurrentUsername);
            query = query.Where(x => x.Gender == userParams.Gender);

            if (userParams.MinAge != 0)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                query = query.Where(x => x.DateOfBirth >= minDob);
            }
            if (userParams.MaxAge != 0)
            {
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
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

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .Include(p => p.Address)
                .SingleOrDefaultAsync(x => x.Email == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .Include(p => p.Address)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}