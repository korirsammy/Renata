using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
         public static void SeedData(DataContext context)
        {
            

            if (!context.Colors.Any())
            {
                var colors= new List<Color>{
                    new Color{
                        Id=1,
                        Description="Black",
                    },
                     new Color{
                        Id=2,
                        Description="Grey",
                    },
                    new Color{
                        Id=3,
                        Description="Brown",
                    } ,
                    new Color{
                        Id=4,
                        Description="Purple",
                    }                     
                };

                context.Colors.AddRange(colors);
                context.SaveChanges();
            }

           if (!context.Products.Any())
            {
                var products= new List<Product>{
                    new Product{
                           Id=1,
                        Description="Inifinix",
                    },
                     new Product{
                        Id=2,                        
                        Description="Samsung",
                    },
                     new Product{
                            Id=3,
                        Description="Iphone",
                    }                       
                };

                context.Products.AddRange(products);
                context.SaveChanges();
            }

             if (!context.ProductDetail.Any())
            {
                var productDetails= new List<ProductDetail>{
                    new ProductDetail{
                        Id=1,
                        ProductId=1,
                        ColorId=1,
                        Description="Infinix Hot7 purple",
                       
                    },
                     new ProductDetail{
                        Id=2,
                        ProductId=2,
                        ColorId=2,
                        Description="Inifinix S4 Grey",
                    }  ,
                     new ProductDetail{
                          Id=3,
                          ProductId=3,
                        Description="Y5 Amber Brown ",
                    }                   
                };

                context.ProductDetail.AddRange(productDetails);
                context.SaveChanges();
            }

           

        }
    }
}