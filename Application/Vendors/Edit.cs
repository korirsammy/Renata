using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Vendors
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string VendorName { get; set; }
            public string ContactName { get; set; }
            public string ContactEmail { get; set; }
            public string ContactPhone { get; set; }
            public string ContactAddress { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var vendor = await _context.Vendors.FindAsync(request.Id);

                if (vendor == null)
                      throw new RestException(HttpStatusCode.NotFound, new { Vendor = "Not found" });

                vendor.VendorName = request.VendorName ?? vendor.VendorName;
                vendor.ContactName = request.ContactName ?? vendor.ContactName;
                vendor.ContactEmail = request.ContactEmail ?? vendor.ContactEmail;
                vendor.ContactPhone = request.ContactPhone ?? vendor.ContactPhone;
                vendor.ContactAddress = request.ContactAddress ?? vendor.ContactAddress;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");


            }
        }
    }
}