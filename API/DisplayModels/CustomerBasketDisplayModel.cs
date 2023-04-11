using System.ComponentModel.DataAnnotations;

namespace API.DisplayModels
{
    public class CustomerBasketDisplayModel
    {
        [Required]
        public string Id { get; set; }
        public List<BasketItemDisplayModel> Items { get; set; }
    }
}