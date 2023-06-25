using API.Data;
using API.DTOs;
using API.Entities;
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
      var basket = await RetrieveBasket();

      if (basket == null) return NotFound();

      return MapBasketDTO(basket);
    }

  


    [HttpPost]  // api/basket?productId=3&quantity=2
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity)
        {
            // get basket OR create basket if user does not have one
            var basket = await RetrieveBasket();

            if(basket == null) basket = CreateBasket();
            // get product
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            // add item
            basket.AddItem(product, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetBasket", MapBasketDTO(basket));

            return BadRequest();
        }



    [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            var basket = await RetrieveBasket();

            if(basket == null) return NotFound();
            // remove item or reduce quantity
            basket.RemoveItem(productId, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok();

            return BadRequest(new ProblemDetails{Title="Problem removing item from the basket"});
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
          // creates a random generated id 
          var buyerId = Guid.NewGuid().ToString();
          // initiates a new cookie.   
          var cookieOptions = new CookieOptions{IsEssential=true,Expires=DateTime.Now.AddDays(30)};

          Response.Cookies.Append("buyerId", buyerId, cookieOptions);

          var basket = new Basket{BuyerId = buyerId};
          _context.Baskets.Add(basket);
          return basket;
        }

          private static BasketDTO MapBasketDTO(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                  ProductId = item.ProductId,
                  Name = item.Product.Name,
                  Price = item.Product.Price,
                  PictureUrl = item.Product.PictureUrl,
                  Brand = item.Product.Brand,
                  Type = item.Product.Type,
                  Quantity = item.Quantity,

                }).ToList()
            };
        }
    }
}