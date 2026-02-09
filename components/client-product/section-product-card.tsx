import { Product } from "@/db/schema";
import ProductCardContent from "./product-card-content";

export default function SectionProductCard({ product }: { product: Product }) {
  return <ProductCardContent product={product} />;
}
