import { Basket } from "../models/basket";

// gets the cookie from local storage.
export function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export const currencyFormat = (amount: number) => {
  return "$" + (amount / 100).toFixed(2);
};

export const basketItemCount = (basket: Basket) => {
  return basket?.items.reduce((sum, item) => sum + item.quantity, 0);
};

export const basketSubTotal = (basket: Basket) => {
  return basket?.items.reduce((sum, item) => {
    const totalPrice = item.quantity * item.price;
    return sum + totalPrice;
  }, 0);
};

export const basketTotalPrice = (basket: Basket) => {
  let deliveryFee: number = 500;
  const subTotal = basketSubTotal(basket);
  if (subTotal / 100 > 100) deliveryFee = 0;

  const totalPrice = basketSubTotal(basket) + deliveryFee;
  return { totalPrice, deliveryFee };
};
