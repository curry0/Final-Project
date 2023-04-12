using API.Interfaces;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        public UnitOfWork(DataContext context)
        {
            _context = context;
        }


        public IDeliveryMethodRepository DeliveryMethodRepository => new DeliveryMethodRepository(_context);

        public IOrderRepository OrderRepository => new OrderRepository(_context);

        public IProductRepository ProductRepository => new ProductRepository(_context);

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}