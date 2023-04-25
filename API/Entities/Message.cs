using System.ComponentModel.DataAnnotations;
using API.Entities.Identity;

namespace API.Entities
{
    public class Message : BaseEntity
    {
        public AppUser Sender { get; set; }
        [Required]
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public AppUser Recipient { get; set; }
        [Required]
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.UtcNow;
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
    }
}