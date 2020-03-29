using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vendors
{
    public class Details
    {
        public class Query : IRequest<Vendor>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Vendor>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Vendor> Handle(Query request, CancellationToken cancellationToken)
            {
                var vendor = await _context.Vendors.FindAsync(request.Id);
                
                if (vendor == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Vendor = "Not found" });

                return vendor;
            }
        }
    }
}