using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
    {
      // getting the basket with id similar to the one in the cookies.
      // it also returns the basket along its items and the information about the products.
      var basket = await RetrieveBasket(GetBuyerId());

      if (basket == null) return NotFound();

      return BasketExtensions.MapBasketToDTO(basket);
    }

  


    [HttpPost]  // api/basket?productId=3&quantity=2
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity)
        {
            // get basket OR create basket if user does not have one
            var basket = await RetrieveBasket(GetBuyerId());

            if(basket == null) basket = CreateBasket();
            // get product
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return BadRequest(new ProblemDetails{Title = "Product Not Found"});

            // add item
            basket.AddItem(product, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetBasket", BasketExtensions.MapBasketToDTO(basket));

            return BadRequest();
        }



    [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            var basket = await RetrieveBasket(GetBuyerId());

            if(basket == null) return NotFound();
            // remove item or reduce quantity
            basket.RemoveItem(productId, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok();

            return BadRequest(new ProblemDetails{Title="Problem removing item from the basket"});
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if(string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
          return User.Identity? .Name ?? Request.Cookies["buyerId"];
        }

        private Basket CreateBasket()
        {
          // creates a random generated id 
          // var buyerId = Guid.NewGuid().ToString();
          var buyerId = User.Identity?.Name;

          if(string.IsNullOrEmpty(buyerId))
          {
            buyerId = Guid.NewGuid().ToString();
            // initiates a new cookie.   
            var cookieOptions = new CookieOptions{IsEssential=true,Expires=DateTime.Now.AddDays(30)};

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
          }

          var basket = new Basket{BuyerId = buyerId};
          _context.Baskets.Add(basket);
          return basket;
        }

        
    }
}