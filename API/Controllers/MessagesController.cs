using API.DisplayModels;
using API.Entities;
using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public MessagesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDisplayModel>> CreateMessage(CreateMessageDisplayModel model)
        {
            var username = User.GetEmailClaim();
            if (username == model.RecipientUsername.ToLower()) return BadRequest(new ApiResponse(400, "You cannot send messages to yourself"));

            var sender = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var recipient = await _unitOfWork.UserRepository.GetUserByUsernameAsync(model.RecipientUsername);
            if (recipient == null) return NotFound(new ApiResponse(404));

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.Email,
                RecipientUsername = recipient.Email,
                Content = model.Content
            };

            _unitOfWork.MessageRepository.AddMessage(message);
            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<MessageDisplayModel>(message));
            return BadRequest(new ApiResponse(400, "Problem sending message"));
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDisplayModel>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetEmailClaim();
            var messages = await _unitOfWork.MessageRepository.GetMessagesForUser(messageParams);
            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages));
            return messages;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetEmailClaim();
            var message = await _unitOfWork.MessageRepository.GetMessage(id);
            if (message.SenderUsername != username && message.RecipientUsername != username) return Unauthorized();
            if (message.SenderUsername == username) message.SenderDeleted = true;
            if (message.RecipientUsername == username) message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted) _unitOfWork.MessageRepository.DeleteMessage(message);
            
            if (await _unitOfWork.Complete()) return Ok();
            return BadRequest(new ApiResponse(400, "Problem deleting message"));
        }
    }
}
