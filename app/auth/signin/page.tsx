"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, signInGoogle } from "@/lib/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Lock,
  Mail,
  Fingerprint,
  ShieldCheck,
  Activity,
  Chrome,
} from "lucide-react";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صالح"),
  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    await authClient.signIn.email(
      { email: data.email, password: data.password, callbackURL: "/" },
      {
        onSuccess: () => {
          toast.success("تم تسجيل الدخول بنجاح!");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error("فشل تسجيل الدخول. يرجى التحقق من بياناتك.");
          setError("root", {
            message:
              ctx.error.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          });
          setIsLoading(false);
        },
      },
    );
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInGoogle();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-background"
      dir="rtl"
    >
      {/* LEFT SIDE: SYSTEM IDENTITY */}
      <div className="hidden lg:flex lg:w-5/12 bg-foreground relative overflow-hidden flex-col justify-between p-12">
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[30px_30px]" />

        <div className="relative z-10">
          <Link href="/" className="inline-block mb-12">
            <div className="bg-primary text-white p-2 px-4 font-black text-2xl tracking-tighter shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              ROVIDA_IND.
            </div>
          </Link>
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2 text-primary font-mono text-[10px] font-black tracking-[0.3em]">
              <Fingerprint className="w-3 h-3" /> SECURITY_MODULE_01
            </div>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
              مرحباً بعودتك
            </h2>
            <p className="text-sm font-bold text-white/50 leading-relaxed uppercase italic">
              الوصول إلى سجل البيانات الخاص بك لمتابعة عمليات التصنيع والطلبات.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-4 border-l-2 border-primary pl-6 py-2">
            <div className="text-white">
              <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">
                System_Status
              </p>
              <p className="text-sm font-bold flex items-center gap-2 tracking-tight">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Operational_Access
              </p>
            </div>
          </div>
          <p className="text-[8px] font-mono font-black text-white/20 tracking-[0.4em]">
            © ROVIDA_LOGISTICS_2026
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: AUTH TERMINAL */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md">
          {/* Form Header */}
          <div className="mb-10 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 text-primary font-mono text-[10px] font-black tracking-widest uppercase mb-4">
              <ShieldCheck className="w-4 h-4" /> USER_AUTH_GATEWAY
            </div>
            <h1 className="text-4xl font-black text-foreground mb-3 tracking-tighter">
              تسجيل الدخول
            </h1>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-tight opacity-60">
              أدخل مفاتيح الوصول الخاصة بك للمتابعة.
            </p>
          </div>

          <div className="bg-background border-2 border-foreground p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            {/* Global Error */}
            {errors.root && (
              <div className="mb-6 p-4 bg-destructive text-destructive-foreground text-[10px] font-black uppercase tracking-widest">
                [AUTH_ERROR]: {errors.root.message}
              </div>
            )}

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-14 flex items-center justify-center gap-3 border-2 border-foreground bg-background hover:bg-muted text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 mb-8"
            >
              <Chrome className="w-4 h-4" />
              المتابعة باستخدام Google
            </button>

            {/* Divider */}
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center px-2">
                <div className="w-full border-t-2 border-foreground/5" />
              </div>
              <span className="relative px-4 bg-background text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                OR_EMAIL_AUTH
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <Mail className="w-3 h-3" /> البريد الإلكتروني [KEY_ID]
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full h-14 px-5 bg-muted/20 border-2 ${
                    errors.email ? "border-destructive" : "border-foreground/10"
                  } focus:border-foreground focus:bg-background outline-none transition-all font-bold text-sm tracking-tight`}
                  placeholder="name@system.com"
                  dir="ltr"
                />
                {errors.email && (
                  <p className="text-[10px] font-black text-destructive uppercase tracking-tight">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <Lock className="w-3 h-3" /> كلمة المرور [PASS_KEY]
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[9px] font-black text-primary uppercase hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <input
                  type="password"
                  {...register("password")}
                  className={`w-full h-14 px-5 bg-muted/20 border-2 ${
                    errors.password
                      ? "border-destructive"
                      : "border-foreground/10"
                  } focus:border-foreground focus:bg-background outline-none transition-all font-bold text-sm tracking-tight`}
                  placeholder="••••••••"
                  dir="ltr"
                />
                {errors.password && (
                  <p className="text-[10px] font-black text-destructive uppercase tracking-tight">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-foreground text-background font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isLoading ? (
                  <Activity className="animate-spin w-4 h-4" />
                ) : (
                  "تأكيد الدخول"
                )}
              </button>
            </form>
          </div>

          <p className="mt-10 text-center text-xs font-bold text-muted-foreground uppercase tracking-tight">
            ليس لديك حساب؟{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              فتح سجل جديد [SIGN_UP]
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
