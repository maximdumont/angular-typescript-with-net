using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CodingChallengeUpStack.Models;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CodingChallengeUpStack.Attributes
{
    public class PeopleModelValidatorAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var person = (Person) validationContext.ObjectInstance;
            if (ContainsEmptyProperty(person))
            {
                return new ValidationResult("Error, Can Not Have Empty Field");
            }

            if (!IsValidPhoneNumber(person.Phone))
            {
                return new ValidationResult("Error, Invalid Phone Number");
            }
            return ValidationResult.Success;
        }

        public bool ContainsEmptyProperty(Person person)
        {
            return string.IsNullOrEmpty(person.FirstName) || string.IsNullOrEmpty(person.LastName) ||
                   string.IsNullOrEmpty(person.Phone);
        }
        public bool IsValidPhoneNumber(string number)
        {
            return Regex.Match(number, @"^([0-9]{3}-[0-9]{3}-[0-9]{4})$").Success;
        }
    }
}
