"use client";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutBtn() {
  const [isPending, startTranstion] = useTransition();
  const router = useRouter();
  function handleSignout() {
    startTranstion(async () => {
      await authClient.signOut();
      router.refresh();
    });
  }
  return (
    <div className="p-2 border-t-2 border-foreground/10 bg-muted/10">
      <button
        disabled={isPending}
        onClick={handleSignout}
        className={`w-full group ${isPending ? "cursor-not-allowed" : "cursor-pointer"}  flex items-center justify-between px-4 py-3 text-destructive hover:bg-destructive hover:text-white transition-all border border-dashed border-destructive/30 hover:border-solid`}
      >
        <div className="flex items-center gap-3">
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-black uppercase tracking-tight">
            {isPending ? "جاري تسجيل الخروج..." : " تسجيل الخروج"}
          </span>
        </div>
        <span className="text-[8px] font-mono opacity-50 group-hover:opacity-100 uppercase">
          Exit_Session
        </span>
      </button>
    </div>
  );
}
