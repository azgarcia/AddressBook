using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using FluentValidation;

namespace Application.Contacts
{
    public class Create
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
                var contact = new Contact
                {
                    Id = request.Id,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    relatedName = request.relatedName,
                    PhoneNumber = request.PhoneNumber,
                    Email = request.Email,
                    StreetAddress = request.StreetAddress,
                    City = request.City,
                    State = request.State,
                    PostalCode = request.PostalCode,
                    Notes = request.Notes

                };

                _context.Contacts.Add(contact);
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Unable to save Contact");
            }
        }
    }
}