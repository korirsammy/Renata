using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
         public static async  Task  SeedData(DataContext context, UserManager<AppUser> userManager)
        {
             if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Sammy",
                        UserName = "sammy",
                        Email = "sammy@test.com"
                    },
                     new AppUser
                    {
                        DisplayName = "Ken",
                        UserName = "ken",
                        Email = "ken@test.com"
                    },
                     new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    }
                };

                foreach (var user in users) 
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

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
            if (!context.Vendors.Any())
            {
                var vendors= new List<Vendor>{
                    new Vendor{                          
                        VendorName="Mitsumi",
                        ContactName="Krishna",
                        ContactEmail="Krishna@gmail.com",
                        ContactPhone="0722396789",
                        ContactAddress="Imenti House, 2nd Floor room 301"
                    },
                     new Vendor{                                             
                        VendorName="Hassan imenti",
                        ContactName="Hassan",
                        ContactEmail="Hassan@gmail.com",
                        ContactPhone="0722396789",
                        ContactAddress="Imenti House, 2nd Floor room 504"
                    },
                     new Vendor{                          
                        VendorName="Ali Imenti",
                        ContactName="Ali",
                        ContactEmail="Ali@gmail.com",
                        ContactPhone="0722396789",
                        ContactAddress="Imenti House, 3nd Floor room 200"
                    }                       
                };

                context.Vendors.AddRange(vendors);
                context.SaveChanges();
            }

             if (!context.ProductDetails.Any())
            {
                var productDetails= new List<ProductDetail>{
                    new ProductDetail{                        
                        ProductId=1,
                        ImeiNumber="862213046874810",
                        SellingPrice=26998.03m,
                        VenderPrice=8790,
                        VenderId=1,
                        ColorId=1,
                        Description="Infinix Hot7 purple",
                        CreatedBy="Auto-Seed",
                        CreatedOn=DateTime.Now
                       
                    },
                     new ProductDetail{
                        ProductId=2,
                        ImeiNumber="356874104277320",
                        SellingPrice=13150.00m,
                        VenderPrice=9000,
                        VenderId=2,
                        ColorId=2,
                        Description="Inifinix S4 Grey",
                        CreatedBy="Auto-Seed",
                        CreatedOn=DateTime.Now
                        
                    }  ,
                     new ProductDetail{
                        ProductId=3,
                        ImeiNumber="868205048206300",
                        SellingPrice=12000.00m,
                        VenderPrice=7000,
                        VenderId=3,
                        ColorId=3,
                        Description="Y5 Amber Brown",
                        CreatedBy="Auto-Seed",
                        CreatedOn=DateTime.Now
                       
                    }                   
                };

                context.ProductDetails.AddRange(productDetails);
                context.SaveChanges();
            }

           

        }
    }
}