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
            if (string.IsNullOrEmpty(person.FirstName) || string.IsNullOrEmpty(person.LastName) ||
                string.IsNullOrEmpty(person.Phone))
            {
                return new ValidationResult("Error, Can Not Have Empty Field");
            }

            if (!Regex.Match(person.Phone, @"^([0-9]{3}-[0-9]{3}-[0-9]{4})$").Success)
            {
                return new ValidationResult("Erorr, Invalid Phone Number Format");
            }

            return ValidationResult.Success;
        }
    }
}
