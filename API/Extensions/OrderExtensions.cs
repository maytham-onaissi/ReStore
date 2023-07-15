using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> ProjectOrderToDTO(this IQueryable<Order> query)
        {
            // don't get scared by this, it is pretty easy, it is just mapping one object to another.
            // don't worry, just read it. 
            return query
                   .Select(order => new OrderDTO
                   {
                       Id = order.Id,
                       BuyerId = order.BuyerId,
                       OrderDate = order.OrderDate,
                       ShippingAddress = order.ShippingAddress,
                       DeliveryFee = order.DeliveryFee,
                       Subtotal = order.Subtotal,
                       OrderStates = order.OrderStates.ToString(),
                       Total = order.GetTotal(),
                       orderItems = order.orderItems.Select(item => new OrderItemDTO
                       {
                            ProductId = item.ItemOrdered.ProductId,
                            Name = item.ItemOrdered.Name,
                            PictureUrl = item.ItemOrdered.PictureUrl,
                            Price = item.Price,
                            Quantity = item.Quantity
                       }).ToList()
                   }).AsNoTracking();
        }
    }
}