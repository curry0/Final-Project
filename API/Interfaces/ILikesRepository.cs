using API.DisplayModels;
using API.Entities;
using API.Entities.Identity;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<LikeDisplayModel>> GetUserLikes(LikesParams likesParams);
    }
}