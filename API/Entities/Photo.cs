using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities.Identity;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo : BaseEntity
    {
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public bool IsApproved { get; set; }
        public string PublicId { get; set; }
        [Required]
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}