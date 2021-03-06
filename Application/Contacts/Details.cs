using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contacts
{
    public class Details
    {
        public class Query : IRequest<Contact>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Contact>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            // Handler, retrieves single contact from the database using Id
            public async Task<Contact> Handle(Query request, CancellationToken cancellationToken)
            {
                var contact = await _context.Contacts.FindAsync(request.Id);
                return contact;
            }
        }
    }
}