using API.Entities.OrderAggregate;

namespace API.DTOs
{
  public class OrderDTO
    {
        public int Id { get; set; }        
        public string BuyerId { get; set; }        
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItemDTO> orderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public string OrderStates { get; set; } 
        public long Total { get; set; } 

    }
}