using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProductDetails
{
    public class List
    {
         public class Query : IRequest<List<ProductDetail>> { }
        
                public class Handler : IRequestHandler<Query, List<ProductDetail>>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
        
                    public async Task<List<ProductDetail>> Handle(Query request, CancellationToken cancellationToken)
                    {
                         var productDetails = await _context.ProductDetails.ToListAsync();
                
                        return productDetails;
                    }
                }
    }
}