using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Vendors
{
    public class Delete
    {
         public class Command : IRequest
                {
                    public int Id { get; set; }
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
                      var vendor=await _context.Vendors.FindAsync(request.Id);

                       if(vendor==null)
                        throw new RestException(HttpStatusCode.NotFound, new {Vendor = "Not found"});

                       _context.Remove(vendor);


                       var success=  await _context.SaveChangesAsync()>0;
        
                       if(success) return Unit.Value;
        
                       throw new Exception("Problem saving changes");
        
        
                    }
                }
    }
}