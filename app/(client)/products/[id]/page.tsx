import { getProductById } from "@/actions/_actions";
import ProductDetailContent from "@/components/client-product/product-details-content";
import ProductsSection from "@/components/products-section";
import db from "@/index";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const product = await getProductById(Number(id));

  if (!product) {
    return {
      title: "المنتج غير موجود | روفيدا للأثاث",
    };
  }

  return {
    title: `روفيدا للأثاث | ${product.name} – ${product.category} مودرن`,
    description: `
${product.name} من روفيدا للأثاث.
تصميم عصري، جودة عالية، وإمكانية التعديل حسب الطلب.
شحن لجميع محافظات مصر مع ضمان على جميع المنتجات.
    `,
    openGraph: {
      title: product.name,
      description: `أثاث مودرن قابل للتخصيص – شحن سريع داخل مصر`,
      images: product.images
        ? [
            {
              url: product.images[0],
              alt: product.name,
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const products = await db.query.products.findMany();
  return products.map((product) => ({ id: String(product.id) }));
}
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  return (
    <main className="min-h-screen bg-background text-foreground" dir="rtl">
      <ProductDetailContent product={product} similarProducts={[product]} />
      <ProductsSection
        category={product.category}
        title="منتجات مشابهة"
        subtitle="المزيد من المنتجات المشابهة"
      />
    </main>
  );
}
