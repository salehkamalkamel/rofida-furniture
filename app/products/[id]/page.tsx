import { isProductInCart } from "@/actions/cart-actions";
import { isProductInWishlist } from "@/actions/wishlist-actions";
import { getProductById } from "@/app/dashboard/products/new/_actions";
import ProductDetailContent from "@/components/client-product/product-details-content";
import ProductsSection from "@/components/products-section";
import db from "@/index";

// export async function generateStaticParams() {
//   const products = await db.query.products.findMany();
//   return products.map((product) => ({ id: String(product.id) }));
// }
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));
  const isInWishlist = await isProductInWishlist(product.id);
  const isInCart = await isProductInCart(product.id);
  return (
    <main className="min-h-screen bg-background text-foreground" dir="rtl">
      <ProductDetailContent
        product={product}
        similarProducts={[product]}
        isInWishlist={isInWishlist}
        isInCart={isInCart}
      />
      <ProductsSection
        category={product.category}
        title="منتجات مشابهة"
        subtitle="المزيد من المنتجات المشابهة"
      />
    </main>
  );
}
