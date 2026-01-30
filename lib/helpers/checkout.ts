import { FullCartResult } from "@/actions/cart-actions";

export function calculateCheckoutPricing(cart: FullCartResult) {
  const subtotal = Math.round(cart.total);
  const threshold = 2000;
  const deliveryFee = subtotal >= threshold ? 0 : 150;
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
