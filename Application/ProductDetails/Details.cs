using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.ProductDetails
{
    public class Details
    {
        public class Query : IRequest<ProductDetail> { 
              public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ProductDetail>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ProductDetail> Handle(Query request, CancellationToken cancellationToken)
            {

                var productDetails = await _context.ProductDetails.FindAsync(request.Id);
                
                 if (productDetails == null)
                    throw new RestException(HttpStatusCode.NotFound, new { ProductDetails = "Not found" });

                return productDetails;
            }
        }
    }
}