using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Domain
{
    public class Product
    {
       

        public int Id { get; set; }
        public string  Description { get; set; }

       
        public virtual ICollection<ProductDetail> ProductDetails { get; set; }

        public Product()
        {
            ProductDetails= new Collection<ProductDetail>();
        }

    }
}