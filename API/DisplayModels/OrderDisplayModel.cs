namespace API.DisplayModels
{
    public class OrderDisplayModel
    {
        public string BasketId { get; set; }
        public int DeliveryMethodId { get; set; }
        public AddressDisplayModel ShipToAddress { get; set; }
    }
}