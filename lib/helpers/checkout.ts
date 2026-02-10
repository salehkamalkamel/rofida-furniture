import { FullCart } from "@/actions/cart-actions";

export function calculateCheckoutPricing(cart: FullCart) {
  const subtotal = Math.round(cart.total);
  const threshold = 10000;
  const deliveryFee = subtotal >= threshold ? 0 : 200;
  const discount = 0;

  return {
    itemsCount: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal,
    deliveryFee,
    discount,
    total: Math.round(subtotal + deliveryFee - discount),
    currency: "EGP" as const,
    amountToFreeShipping: Math.max(0, threshold - subtotal),
  };
}
