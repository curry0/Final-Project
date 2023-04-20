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
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;
        public MessagesController(IUserRepository userRepository, IMessageRepository messageRepository, IMapper mapper)
        {
            _mapper = mapper;
            _messageRepository = messageRepository;
            _userRepository = userRepository;

        }

        [HttpPost]
        public async Task<ActionResult<MessageDisplayModel>> CreateMessage(CreateMessageDisplayModel model)
        {
            var username = User.GetEmailClaim();
            if (username == model.RecipientUsername.ToLower()) return BadRequest(new ApiResponse(400, "You cannot send messages to yourself"));

            var sender = await _userRepository.GetUserByUsernameAsync(username);
            var recipient = await _userRepository.GetUserByUsernameAsync(model.RecipientUsername);
            if (recipient == null) return NotFound(new ApiResponse(404));

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.Email,
                RecipientUsername = recipient.Email,
                Content = model.Content
            };

            _messageRepository.AddMessage(message);
            if (await _messageRepository.SaveAllAsync()) return Ok(_mapper.Map<MessageDisplayModel>(message));
            return BadRequest(new ApiResponse(400, "Problem sending message"));
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDisplayModel>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetEmailClaim();
            var messages = await _messageRepository.GetMessagesForUser(messageParams);
            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages));
            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task <ActionResult<IEnumerable<MessageDisplayModel>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetEmailClaim();
            return Ok(await _messageRepository.GetMessageThread(currentUsername, username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var username = User.GetEmailClaim();
            var message = await _messageRepository.GetMessage(id);
            if (message.SenderUsername != username && message.RecipientUsername != username) return Unauthorized();
            if (message.SenderUsername == username) message.SenderDeleted = true;
            if (message.RecipientUsername == username) message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted) _messageRepository.DeleteMessage(message);
            
            if (await _messageRepository.SaveAllAsync()) return Ok();
            return BadRequest(new ApiResponse(400, "Problem deleting message"));
        }
    }
}
