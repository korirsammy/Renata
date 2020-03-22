using System.Collections.Generic;

namespace Domain
{
    public class Product
    {
        public int Id { get; set; }
        public string  Description { get; set; }

       
        public virtual ICollection<ProductDetail> ProductDetails { get; set; }

    }
}