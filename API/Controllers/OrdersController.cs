using System.Security.Claims;
using API.DisplayModels;
using API.Entities.Order;
using API.Errors;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDisplayModel model)
        {
            var email = HttpContext.User.GetEmailClaim();

            var address = _mapper.Map<AddressDisplayModel, Address>(model.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email, model.DeliveryMethodId, model.BasketId, address);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem creating order"));

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDisplayModel>>> GetOrdersForUser()
        {
            var email = HttpContext.User.GetEmailClaim();

            var orders = await _orderService.GetOrdersForUserAsync(email);

            return Ok(_mapper.Map<IReadOnlyList<OrderToReturnDisplayModel>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDisplayModel>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.GetEmailClaim();

            var order = await _orderService.GetOrderByIdAsync(id, email);

            if (order == null) return NotFound(new ApiResponse(404, "Order not found"));

            return _mapper.Map<OrderToReturnDisplayModel>(order);
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDeliveryMethodsAsync());
        }
    }
}