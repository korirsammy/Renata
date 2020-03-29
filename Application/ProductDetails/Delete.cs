using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.ProductDetails
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
                       

                      var productDetails =await _context.ProductDetails.FindAsync(request.Id);

                       if(productDetails==null)
                         throw new RestException(HttpStatusCode.NotFound, new {ProductDetails = "Not found"});

                       _context.Remove(productDetails);

                       var success=  await _context.SaveChangesAsync()>0;
        
                       if(success) return Unit.Value;
        
                       throw new Exception("Problem saving changes");
        
        
                    }
                }
    }
}