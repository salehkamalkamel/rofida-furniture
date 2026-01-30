import { Product } from "@/db/schema";
import ProductCardContent from "./product-card-content";

export default function SectionProductCard({
  product,
  isInCart,
  isInWishlist,
}: {
  product: Product;
  isInCart: boolean;
  isInWishlist: boolean;
}) {
  return (
    <ProductCardContent
      product={product}
      isInCart={isInCart}
      isInWishlist={isInWishlist}
    />
  );
}
