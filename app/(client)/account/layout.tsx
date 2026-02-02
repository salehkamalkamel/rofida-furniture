import AccountNav from "@/components/account/account-nav";
import AccountNavSkeleton from "@/components/skeleton/account-nav-skeleton";
import { Suspense } from "react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-8">حسابي</h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Suspense fallback={<AccountNavSkeleton />}>
              <AccountNav />
            </Suspense>
            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
