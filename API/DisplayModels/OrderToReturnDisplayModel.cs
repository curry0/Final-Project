using API.Entities.Order;

namespace API.DisplayModels
{
    public class OrderToReturnDisplayModel
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public DateTime OrderedDate { get; set; } = DateTime.UtcNow;
        public Address ShipToAddress { get; set; }
        public string DeliveryMethod { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemDisplayModel> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
    }
}