using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Domain;
using FluentValidation;

namespace Application.ProductDetails
{
    public class Create
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

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.ProductId).NotEmpty();
                    RuleFor(x => x.Description).NotEmpty();
                    RuleFor(x => x.ImeiNumber).NotEmpty();
                    RuleFor(x => x.SellingPrice).NotEmpty();
                    RuleFor(x => x.VenderPrice).NotEmpty();
                    RuleFor(x => x.VenderId).NotEmpty();
                     RuleFor(x => x.VenderId).NotEmpty();
                }
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var productDetails = new ProductDetail
                {
                    ProductId = request.ProductId,
                    ImeiNumber = request.ImeiNumber,
                    SellingPrice = request.SellingPrice,
                    VenderId = request.VenderId,
                    VenderPrice = request.VenderPrice,
                    ColorId = request.ColorId,
                    Description = request.Description,
                    Image = request.Image,
                    CreatedBy = request.CreatedBy,
                    CreatedOn = DateTime.Now
                };

                _context.ProductDetails.Add(productDetails);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");


            }
        }
    }
}