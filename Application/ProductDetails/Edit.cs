using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.ProductDetails
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public int ProductId { get; set; }

            public string ImeiNumber { get; set; }

            public decimal SellingPrice { get; set; }
            public decimal VenderPrice { get; set; }

            public int VenderId { get; set; }

            public int? ColorId { get; set; }
            public string Description { get; set; }

            public string Image { get; set; }

            public string CreatedBy { get; set; }
            public DateTime CreatedOn { get; set; }
            public string LastUpdatedBy { get; set; }
            public DateTime? LastUpdatedOn { get; set; }
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
                var productDetails= await _context.ProductDetails.FindAsync(request.Id);

                if(productDetails==null) 
                     throw new RestException(HttpStatusCode.NotFound, new { ProductDetails = "Not found" });
                        
                productDetails.ProductId=request.ProductId;
                productDetails.ImeiNumber=request.ImeiNumber?? productDetails.ImeiNumber;
                productDetails.SellingPrice=request.SellingPrice;
                productDetails.VenderPrice=request.VenderPrice;
                productDetails.ColorId=request.ColorId ?? productDetails.ColorId;
                productDetails.Description=request.Description?? productDetails.Description;
                productDetails.Image=request.Image?? productDetails.Image;
                productDetails.LastUpdatedBy=request.LastUpdatedBy?? productDetails.LastUpdatedBy;
                productDetails.LastUpdatedOn=DateTime.Now ;//request.LastUpdatedOn?? productDetails.LastUpdatedOn;
                        

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");


            }
        }
    }
}