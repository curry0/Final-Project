using API.DisplayModels;
using API.Entities;
using API.Entities.Identity;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(string sourceUserId, string targetUserId);
        Task<AppUser> GetUserWithLikes(string userId);
        Task<PagedList<LikeDisplayModel>> GetUserLikes(LikesParams likesParams);
    }
}