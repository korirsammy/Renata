using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Domain
{
    public class Vendor
    {
       

        public int Id { get; set; }
        public string VendorName { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public string ContactAddress { get; set; }

       public virtual ICollection<ProductDetail> ProductDetails { get; set; }

       public int MyProperty { get; set; }

        public Vendor()
        {
            ProductDetails= new Collection<ProductDetail>();
        }
        
    }
}