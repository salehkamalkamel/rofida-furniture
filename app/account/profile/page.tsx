import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import {
  User,
  Mail,
  Calendar,
  ShieldCheck,
  Fingerprint,
  Activity,
} from "lucide-react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="space-y-10" dir="rtl">
      {/* HEADER SECTION */}
      <div className="border-b-2 border-foreground pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-primary font-mono text-[10px] font-black tracking-widest uppercase">
            <Fingerprint className="w-3 h-3" />
            SEC_PROFILE_ACCESS
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            المعلومات الشخصية
          </h1>
          <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-tight opacity-60">
            سجل البيانات المعتمد لحساب المستخدم في النظام
          </p>
        </div>
      </div>

      <div className="max-w-3xl border-2 border-foreground bg-background overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* PROFILE BADGE SECTION */}
        <div className="p-8 border-b-2 border-foreground bg-muted/30 flex flex-col sm:flex-row items-center gap-8 relative">
          {/* Decorative Corner Notch */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-foreground -translate-x-4 -translate-y-4 rotate-45" />

          <div className="w-24 h-24 bg-foreground text-background border-4 border-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl font-black shrink-0">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div className="text-center sm:text-right">
            <div className="inline-flex items-center gap-2 bg-primary text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-widest mb-3">
              <Activity className="w-3 h-3" /> Status: Active_User
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight leading-none mb-2">
              {user?.name}
            </h2>
            <p className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              عضو منذ:{" "}
              {format(new Date(user?.createdAt || new Date()), "dd/MM/yyyy")}
            </p>
          </div>
        </div>

        {/* DATA REGISTER GRID */}
        <div className="grid grid-cols-1 divide-y-2 divide-foreground/5 bg-background">
          <InfoRow
            code="REG_NAME"
            icon={<User className="w-4 h-4" />}
            label="الاسم الكامل"
            value={user?.name}
          />
          <InfoRow
            code="REG_EMAIL"
            icon={<Mail className="w-4 h-4" />}
            label="البريد الإلكتروني"
            value={user?.email}
          />
          <InfoRow
            code="REG_ROLE"
            icon={<ShieldCheck className="w-4 h-4" />}
            label="نوع الحساب"
            value={
              user?.role === "admin" ? "مدير النظام / ADMIN" : "عميل / CLIENT"
            }
          />
          <InfoRow
            code="REG_STAMP"
            icon={<Calendar className="w-4 h-4" />}
            label="آخر تحديث"
            value={format(new Date(user?.updatedAt || new Date()), "PPP", {
              locale: ar,
            })}
          />
        </div>

        {/* SYSTEM FOOTER */}
        <div className="p-8 bg-muted/10 border-t-2 border-foreground">
          <div className="flex gap-4 items-start">
            <div className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />
            <p className="text-[10px] font-bold text-muted-foreground leading-loose uppercase tracking-tight italic">
              * ملاحظة أمنية: لتعديل البيانات المسجلة أعلاه أو تحديث مفاتيح
              الوصول (كلمة المرور)، يرجى فتح تذكرة دعم فني من خلال قسم الإرشادات
              التقنية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string | undefined | null;
  icon: React.ReactNode;
  code: string;
}

function InfoRow({ label, value, icon, code }: InfoRowProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center p-8 transition-colors hover:bg-muted/10">
      <div className="flex items-center gap-4 w-full sm:w-1/2 mb-4 sm:mb-0">
        <div className="w-10 h-10 border border-foreground/10 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] font-mono font-black text-primary uppercase tracking-[0.2em] mb-1">
            {code}
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
        </div>
      </div>
      <div className="w-full sm:w-1/2 sm:text-left">
        <p className="font-mono font-black text-foreground text-sm uppercase tracking-tighter">
          {value || "UNDEFINED"}
        </p>
      </div>
    </div>
  );
}
