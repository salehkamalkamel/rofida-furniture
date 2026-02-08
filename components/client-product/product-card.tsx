import { isProductInCart } from "@/actions/cart-actions";
import { isProductInWishlist } from "@/actions/wishlist-actions";
import { Product } from "@/db/schema";
import ProductCardContent from "./product-card-content";

export default async function ProductCard({ product }: { product: Product }) {
  const isInWishlist = await isProductInWishlist(product.id);
  const isInCart = await isProductInCart(product.id);

  return (
    <ProductCardContent
      product={product}
      isInWishlist={isInWishlist.success ? isInWishlist.data : false}
      isInCart={isInCart}
    />
  );
}
