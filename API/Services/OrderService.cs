using API.Data;
using API.Entities.Order;
using API.Interfaces;

namespace API.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly DataContext _context;
        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepo, DataContext context)
        {
            _context = context;
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            var basket = await _basketRepo.GetBasketAsync(basketId);

            var items = new List<OrderItem>();
            foreach(var item in basket.Items)
            {
                var productItem = await _unitOfWork.ProductRepository.GetProductByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            var deliveryMethod = await _unitOfWork.DeliveryMethodRepository.GetDeliveryMethodByIdAsync(deliveryMethodId);

            var subtotal = items.Sum(x => x.Price * x.Quantity);

            // check if order exists
            var order = await _unitOfWork.OrderRepository.GetOrderByPaymentIntentIdAsync(basket.PaymentIntentId);

            if (order != null) 
            {
                order.ShipToAddress = shippingAddress;
                order.DeliveryMethod = deliveryMethod;
                order.Subtotal = subtotal;
                _unitOfWork.OrderRepository.Update(order);
            }
            else
            {
            order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);
            _unitOfWork.OrderRepository.Add(order);     
            }

            var result = await _unitOfWork.Complete();

            if (!result) return null;
            
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.DeliveryMethodRepository.GetDeliveryMethodsAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            return await _unitOfWork.OrderRepository.GetOrderByIdAsync(id, buyerEmail);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            return await _unitOfWork.OrderRepository.GetOrdersForUserAsync(buyerEmail);
        }
    }
}