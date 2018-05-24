using System.ComponentModel.DataAnnotations;
using CodingChallengeUpStack.Attributes;
using CodingChallengeUpStack.Controllers;
using CodingChallengeUpStack.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CodingChallengeUpStack.Tests.Attributes
{
    [TestClass]
    public class AttributeFixture
    {
        [TestMethod]
        public void AssertCanCheckPhoneNumber()
        {
            var validator = new PeopleModelValidatorAttribute();
            Assert.IsFalse(validator.IsValidPhoneNumber("123"));
            Assert.IsTrue(validator.IsValidPhoneNumber("123-123-1234"));
        }

        [TestMethod]
        public void AssertCanCheckModelForEmptyValues()
        {
            var validator = new PeopleModelValidatorAttribute();
            Assert.IsFalse(validator.ContainsEmptyProperty(new Person
            {
                LastName = "Hello LAst",
                FirstName = "Hello First",
                Phone = "123-123-1234"
            }));
            Assert.IsTrue(validator.ContainsEmptyProperty(new Person()));
        }
    }
}