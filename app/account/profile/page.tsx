import ProfileLayout from "@/components/account/account-profile-layout";
import ProfileSkeleton from "@/components/skeleton/account-profile-skeleton";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileLayout />
    </Suspense>
  );
}
