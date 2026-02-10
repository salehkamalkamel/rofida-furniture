import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col  overflow-hidden">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
