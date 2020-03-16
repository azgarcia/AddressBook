using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contacts
{
    public class Edit
    {
        public class Command : IRequest 
        {
            public Guid Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string relatedName { get; set; }
            public string PhoneNumber { get; set; }
            public string Email { get; set; }
            public string StreetAddress { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string PostalCode { get; set; }
            public string Notes { get; set; }
        }

        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(c => c.FirstName).NotEmpty();
                RuleFor(c => c.LastName).NotEmpty();
                RuleFor(c => c.PhoneNumber).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var contact = await _context.Contacts.FindAsync(request.Id);

                if(contact == null)
                    throw new Exception("Could not find contact");

                contact.FirstName = request.FirstName ?? contact.FirstName;
                contact.LastName = request.LastName ?? contact.LastName;
                contact.relatedName = request.relatedName ?? contact.relatedName;
                contact.PhoneNumber = request.PhoneNumber ?? contact.PhoneNumber;
                contact.Email = request.Email ?? contact.Email;
                contact.StreetAddress = request.StreetAddress ?? contact.StreetAddress;
                contact.City = request.City ?? contact.City;
                contact.State = request.State ?? contact.State;
                contact.PostalCode = request.PostalCode ?? contact.PostalCode;
                contact.Notes = request.Notes ?? contact.Notes;

                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Unable to save Contact");
            }
        }

    }
}