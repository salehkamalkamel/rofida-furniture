import ProductsContent from "@/components/client-products/client-products-content";
import { getFilteredProductsClient } from "../../../actions/products-server-actions";

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
    <div className="min-h-screen flex flex-col">
      <ProductsContent products={products} />
    </div>
  );
}
