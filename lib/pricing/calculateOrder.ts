import { ShippingRule } from "@/db/schema";

export function calculateOrderTotals({
  items,
  shippingRule,
}: {
  items: {
    price: number;
    quantity: number;
    customizationPrice?: number;
  }[];
  shippingRule: ShippingRule;
}) {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.price + (item.customizationPrice ?? 0)) * item.quantity,
    0,
  );

  const shipping =
    shippingRule.freeOver && subtotal >= Number(shippingRule.freeOver)
      ? 0
      : shippingRule.price;

  const total = subtotal + Number(shipping);

  return {
    subtotal,
    shipping,
    total,
  };
}
