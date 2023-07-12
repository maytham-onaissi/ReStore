using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext : IdentityDbContext<User>
  {
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    // This basically creates a database of the type Product, which was made in ./Entities/Product
    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }

    // This part creates different roles for users (Customer OR Admin)
    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<IdentityRole>().HasData(
        new IdentityRole{Name="Member", NormalizedName="MEMBER"},
        new IdentityRole{Name="Admin", NormalizedName="ADMIN"}
      );
    }
  }
}