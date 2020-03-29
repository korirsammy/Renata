using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Application.Errors;
using System.Net;

namespace Application.Products
{
    public class Details
    {
        public class Query : IRequest<Product>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Product>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Product> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.Id);

                  if (product == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Product = "Not found" });
                    
                return product;
            }
        }


    }
}