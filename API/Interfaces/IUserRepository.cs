using API.DisplayModels;
using API.Entities.Identity;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(string id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<PagedList<MemberDisplayModel>> GetMembersAsync(UserParams userParams);
        Task<MemberDisplayModel> GetMemberAsync(string username);

    }
}