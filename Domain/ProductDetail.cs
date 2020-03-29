using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class ProductDetail
    {
       
        
        public int Id { get; set; }
        public int ProductId { get; set; }

        public string ImeiNumber { get; set; }

        public decimal  SellingPrice { get; set; }
        public decimal  VenderPrice { get; set; }

        public int VenderId { get; set; }

        public int? ColorId { get; set; }
        public string Description { get; set; }

        public string  Image { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedOn { get; set; }


        public virtual Product Product { get; set; }
        public virtual Color Color { get; set; }
         public virtual Vendor Vendor { get; set; }

        

    }
}