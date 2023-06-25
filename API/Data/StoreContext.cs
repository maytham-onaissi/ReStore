using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext : DbContext
  {
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    // This basically creates a database of the type Product, which was made in ./Entities/Product
    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }
  }
}