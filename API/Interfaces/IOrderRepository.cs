using API.Entities.Order;

namespace API.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string email);
        void Add(Order order);
        void Update(Order order);
        void Delete(Order order);
    }
}