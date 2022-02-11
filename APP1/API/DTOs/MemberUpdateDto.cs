namespace API.DTOs
{
    public class MemberUpdateDto
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int Building { get; set; }
        public int Appartment { get; set; }
    }
}