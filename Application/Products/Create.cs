using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class Create
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Description { get; set; }
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
                var product = new Product{
                    Description=request.Description
                };

                _context.Products.Add(product);

               var success=  await _context.SaveChangesAsync()>0;

               if(success) return Unit.Value;

               throw new Exception("Problem saving changes");


            }
        }


    }

}