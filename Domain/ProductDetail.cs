namespace Domain
{
    public class ProductDetail
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
         
        public int? ColorId { get; set; }
        public string Description { get; set; }
         public virtual Product Product { get; set; }
        public virtual Color Color { get; set; }
        
    }
}