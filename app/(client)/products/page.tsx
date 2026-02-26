import ProductsContent from "@/components/client-products/client-products-content";
import { getFilteredProductsClient } from "../../../actions/products-server-actions";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "منتجات روفيدا للأثاث - تربيزة تلفزيون، تسريحات، مكاتب وأثاث مودرن بجودة عالية وأسعار تنافسية";
  const description =
    "اكتشف مجموعة روفيدا للأثاث: تربيزة تلفزيون، تسريحات، مكاتب وأثاث مودرن بجودة عالية وأسعار تنافسية. تصفح تشكيلتنا الواسعة الآن!";
  return {
    title,
    description,
  };
}

export default async function ProductsPage() {
  const products = await getFilteredProductsClient({});

  return (
    <div className="min-h-screen flex flex-col ">
      <ProductsContent products={products} />
    </div>
  );
}
