using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if(!context.Contacts.Any())
            {
                var contacts = new List<Contact>
                {
                   new Contact
                   {
                       FirstName = "Amanda",
                       LastName = "Perez",
                       relatedName = "",
                       PhoneNumber = "(714) 555-0049",
                       Email = "amanda@gmail.com",
                       StreetAddress = "555 Maine Drive Apt 107",
                       City = "Orange",
                       State = "CA",
                       PostalCode = "92341",
                       Notes = "Random Notes"
                   } ,
                   new Contact
                   {
                       FirstName = "John",
                       LastName = "Smith",
                       relatedName = "Jonny",
                       PhoneNumber = "(715) 555-9856",
                       Email = "JohnnyAt@gmail.com",
                       StreetAddress = "345 Brooklyn Drive",
                       City = "San Jose",
                       State = "CA",
                       PostalCode = "98745",
                       Notes = "Some more notes"
                   },
                   new Contact
                   {
                       FirstName = "Nick",
                       LastName = "Thomas",
                       relatedName = "Nick",
                       PhoneNumber = "(714) 555-8987",
                       Email = "randomEmail@gmail.com",
                       StreetAddress = "897 Beach Blvd Apt 1",
                       City = "Costa Mesa",
                       State = "CA",
                       PostalCode = "98756",
                       Notes = ""
                   },
                   new Contact
                   {
                       FirstName = "Mary",
                       LastName = "Wright",
                       relatedName = "May",
                       PhoneNumber = "(714) 555-8974",
                       Email = "MaryWright@yahoo.com",
                       StreetAddress = "597 Cherry Creek",
                       City = "Ogden",
                       State = "UT",
                       PostalCode = "84405",
                       Notes = "more notes"
                   },
                   new Contact
                   {
                       FirstName = "Patricia",
                       LastName = "Gonzalez",
                       relatedName = "Pat",
                       PhoneNumber = "(714) 555-8794",
                       Email = "patgonzalez@hotmail.com",
                       StreetAddress = "23rd Street Apt 45",
                       City = "New York",
                       State = "NY",
                       PostalCode = "10158",
                       Notes = ""
                   },
                };

                context.Contacts.AddRange(contacts);
                context.SaveChanges();
            }
        }
    }
}