import AccountHomePageLayout from "@/components/account/AccountPageLayout";
import AccountHomeSkeleton from "@/components/skeleton/account-home-skeleton";
import { Suspense } from "react";

export default function AccountHomePage() {
  return (
    <Suspense fallback={<AccountHomeSkeleton />}>
      <AccountHomePageLayout />
    </Suspense>
  );
}
