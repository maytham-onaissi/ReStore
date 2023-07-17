using System.ComponentModel.DataAnnotations;

namespace API.Entities.OrderAggregate
{
  public class Order
    {
        public int Id { get; set; }        
        public string BuyerId { get; set; }    
        [Required]    
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem> orderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public OrderStates OrderStates { get; set; } = OrderStates.Pending;
        public string PaymentIntentId { get; set; }
        public long GetTotal() {
            return Subtotal + DeliveryFee;
         }

                
    }
}