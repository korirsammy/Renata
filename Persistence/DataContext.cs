using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        
         public DbSet<Color> Colors { get; set; }
         public DbSet<ProductDetail> ProductDetails { get; set; }
          public DbSet<Product> Products { get; set; }

        public DbSet<Vendor> Vendors { get; set; }
        
       
        public DbSet<Value> Values { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Create composite key for phone details: IMEI+ProdID= promary Key
           // builder.Entity<ProductDetail>().HasKey( pd => 
           // new {pd.Id, pd.ImeiNumber}
          //  );
          
            base.OnModelCreating(builder);

            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 2, Name = "Value 102"},
                    new Value {Id = 3, Name = "Value 103"}
                );
        }
    }
}
