using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products.Vendors
{
    public class List
    {
         public class Query : IRequest<List<Vendor>> { }
        
                public class Handler : IRequestHandler<Query,List<Vendor>>
                {
                    private readonly DataContext _context;
                    public Handler(DataContext context)
                    {
                        _context = context;
                    }
        
                    public async Task<List<Vendor>> Handle(Query request, CancellationToken cancellationToken)
                    {
                        var vendors = await _context.Vendors.ToListAsync();                
                        return vendors;

                    }
                }
    }
}