using System.Linq;

namespace CodingChallengeUpStack.Models
{
    public class ContextInitializer
    {
        public ContextInitializer(AppDbContext context)
        {
            // check database created
            context.Database.EnsureCreated();

            // already contains seed data, do nothing
            if (context.Persons.Any())
            {
                return;
            }

            context.Persons.Add(new Person
            {
                FirstName = "Hello",
                LastName = "World",
                Phone = "484-321-1916"
            });
            context.Persons.Add(new Person
            {
                FirstName = "Adam",
                LastName = "Adamczyk",
                Phone = "123-456-1234"
            });

            context.SaveChanges();
        }
    }
}