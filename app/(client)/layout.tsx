import Footer from "@/components/footer";
import Header from "@/components/header";
import HeaderSkeleton from "@/components/skeleton/header-skeleton";
import { ReactNode, Suspense } from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}
