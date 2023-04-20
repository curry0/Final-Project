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
        public string PublicId { get; set; }
        [Required]
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}