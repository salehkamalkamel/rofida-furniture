import ProductsContent from "@/components/client-products/client-products-content";
import { getFilteredProductsClient } from "../../../actions/products-server-actions";

import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}): Promise<Metadata> {
  const search = (await searchParams).search;
  const category = (await searchParams).category;

  const title = category
    ? `روفيدا للأثاث | ${category} مودرن بجودة عالية في مصر`
    : "روفيدا للأثاث | جميع المنتجات – أثاث عصري بأسعار تنافسية";

  const description = category
    ? `تصفح مجموعة ${category} المودرن من روفيدا للأثاث. تصميمات عصرية، جودة عالية، أسعار تنافسية، وشحن سريع لجميع محافظات مصر.`
    : "اكتشف جميع منتجات روفيدا للأثاث من تربيزة تلفزيون، تسريحات، مكاتب وأثاث مودرن بجودة عالية وأسعار تنافسية مع ضمان على جميع المنتجات.";

  return {
    title,
    description,
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search: string | undefined;
    category: string | undefined;
  }>;
}) {
  const query = (await searchParams).search || "";
  const category = (await searchParams).category || "";

  const products = await getFilteredProductsClient({ query, category });

  return (
    <div className="min-h-screen flex flex-col ">
      <ProductsContent products={products} />
    </div>
  );
}
