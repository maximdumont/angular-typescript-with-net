using System.ComponentModel.DataAnnotations;
using CodingChallengeUpStack.Attributes;

namespace CodingChallengeUpStack.Models
{
    [PeopleModelValidator]
    public class Person
    {
        public int PersonId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        
        public string Phone { get; set; }
    }
}