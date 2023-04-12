namespace API.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IDeliveryMethodRepository DeliveryMethodRepository { get; }
        IOrderRepository OrderRepository { get; }
        IProductRepository ProductRepository { get; }
        Task<int> Complete();
    }
}