import DashboardProducts from "@/components/product/dashboard-products";
import { getFilteredProductsDashboard } from "./new/_actions";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const query = (await searchParams).search || "";
  const category = (await searchParams).category || "";
  const products = await getFilteredProductsDashboard({ query, category });
  return <DashboardProducts products={products} />;
}
