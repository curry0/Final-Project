using API.Entities.Order;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;
        public OrderRepository(DataContext context)
        {
            _context = context;
        }
        
        public void Add(Order order)
        {
            _context.Orders.Add(order);
        }

        public void Delete(Order order)
        {
            _context.Orders.Remove(order);
        }

        public async Task<Order> GetOrderByIdAsync(int id, string email)
        {
            return await _context.Orders
                .Include(x => x.OrderItems)
                .Include(x => x.DeliveryMethod)
                .OrderByDescending(x => x.OrderedDate)
                .FirstOrDefaultAsync(x => x.Id == id && x.BuyerEmail == email);
        }

        public async Task<Order> GetOrderByPaymentIntentIdAsync(string paymentIntentId)
        {
            return await _context.Orders
                .Include(x => x.OrderItems)
                .Include(x => x.DeliveryMethod)
                .FirstOrDefaultAsync(x => x.PaymentIntentId == paymentIntentId);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string email)
        {
            return await _context.Orders
                .Where(x => x.BuyerEmail == email)
                .Include(x => x.OrderItems)
                .Include(x => x.DeliveryMethod)
                .OrderByDescending(x => x.OrderedDate)
                .ToListAsync();
        }

        public void Update(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
        }
    }
}