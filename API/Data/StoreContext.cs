using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext : IdentityDbContext<User, Role, int>
  {
    public StoreContext(DbContextOptions options) : base(options)
    {
    }

    // This basically creates a database of the type Product, which was made in ./Entities/Product
    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public DbSet<Order> Orders { get; set; }

    // This part creates different roles for users (Customer OR Admin)
    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<User>()
             .HasOne(a => a.Address)
             .WithOne()
             .HasForeignKey<UserAddress>(a => a.Id)
             .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<Role>().HasData(
        new Role{Id = 1, Name="Member", NormalizedName="MEMBER"},
        new Role{Id = 2, Name="Admin", NormalizedName="ADMIN"}
      );
    }
  }
}