import { Product } from "@/db/schema";
import ProductCardContent from "./product-card-content";

export default async function ProductCard({ product }: { product: Product }) {
  return <ProductCardContent product={product} />;
}
