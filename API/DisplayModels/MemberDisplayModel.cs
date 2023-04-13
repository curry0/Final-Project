namespace API.DisplayModels
{
    public class MemberDisplayModel
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string PhotoUrl { get; set; }
        public AddressDisplayModel Address { get; set; }
        public List<PhotoDisplayModel> Photos { get; set; }
    }
}