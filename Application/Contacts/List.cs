using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Contacts
{
    public class List
    {
        public class Query : IRequest<List<Contact>> { }

        public class Handler : IRequestHandler<Query, List<Contact>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }



            // Handler, retrieving all our contacts from the database and returning them
            public async Task<List<Contact>> Handle(Query request, CancellationToken cancellationToken)
            {
                var contacts = await _context.Contacts.ToListAsync();
                return contacts;
            }
        }
    }
}