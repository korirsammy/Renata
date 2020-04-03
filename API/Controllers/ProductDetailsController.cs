using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ProductDetails;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductDetailsController(IMediator mediator)
        {
            _mediator = mediator;
        }
       [HttpGet]
        public async Task<ActionResult<List<ProductDetail>>> List(){
            return await _mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        [Authorize]
       public async Task<ActionResult<ProductDetail>> Details(int id){
            return await _mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command){
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
         public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command){
             command.Id=id;
            return await _mediator.Send(command);
        }
        [HttpDelete("{id}")]
         public async Task<ActionResult<Unit>> Delete(int id){
            
            return await _mediator.Send(new Delete.Command{Id=id});
        }

    }
}