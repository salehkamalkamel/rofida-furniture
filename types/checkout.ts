export type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation";
export type CheckoutPricing = {
  itemsCount: number;

  subtotal: number;
  deliveryFee: number;
  discount: number;

  total: number;
  currency: "EGP";

  freeShippingThreshold?: number;
  amountToFreeShipping?: number;
};
