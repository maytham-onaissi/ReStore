using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly StoreContext _context;
    public ProductsController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet] // api/products/            // from query tells the api to get them from the search queries.
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
    {
        // this basically how to sort the products, search a product, and filter them.
        var query = _context.Products
                    .Sort(productParams.orderBy)
                    .Search(productParams.searchTerm)
                    .Filter(productParams.brands, productParams.types)
                    .AsQueryable();


        var products = await PagedList<Product>.ToPagedList(query,productParams.pageNumber,
         productParams.PageSize);

        Response.AddPaginationHeader(products.MetaData);

        return products; 
    }

    [HttpGet("{id}")] // api/products/"id"
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if(product == null) return NotFound();  

        return Ok(product);
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
      var brands = await _context.Products.Select(p=>p.Brand).Distinct().ToListAsync();
      var types = await _context.Products.Select(p=>p.Type).Distinct().ToListAsync();

      return Ok(new {brands, types});
    }
  }
}