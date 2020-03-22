using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
         public DbSet<Color> Colors { get; set; }
         public DbSet<ProductDetail> ProductDetail { get; set; }
          public DbSet<Product> Products { get; set; }
        
       
        public DbSet<Value> Values { get; set; }
         

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value {Id = 2, Name = "Value 102"},
                    new Value {Id = 3, Name = "Value 103"}
                );
        }
    }
}
