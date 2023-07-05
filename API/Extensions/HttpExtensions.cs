using System.Text.Json;
using API.RequestHelpers;

namespace API.Extensions
{
  public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
        {
            var  options = new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};

            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
            //this part allows for the pagination header to be exposed to other urls. 
            // for example the client url.
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");

        }
    }
}