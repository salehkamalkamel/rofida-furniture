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
  UserPlus,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  Terminal,
  Chrome,
  Activity,
} from "lucide-react";

const signUpSchema = z
  .object({
    name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
    email: z
      .string()
      .min(1, "البريد الإلكتروني مطلوب")
      .email("البريد الإلكتروني غير صالح"),
    password: z
      .string()
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .regex(/(?=.*[a-z])/, "يجب أن تحتوي على حرف صغير")
      .regex(/(?=.*[A-Z])/, "يجب أن تحتوي على حرف كبير")
      .regex(/(?=.*\d)/, "يجب أن تحتوي على رقم"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "يجب الموافقة على الشروط والأحكام",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const passwordValue = watch("password", "");

  const handleNextStep = async () => {
    const isValid = await trigger(["name", "email"]);
    if (isValid) setStep(2);
  };

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            toast.success("تم إنشاء الحساب بنجاح!");
            router.push("/");
          },
          onError: (ctx) => {
            toast.error("فشل إنشاء الحساب.");
            setError("root", {
              message: ctx.error.message || "حدث خطأ أثناء إنشاء الحساب",
            });
            setIsLoading(false);
          },
        },
      );
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signInGoogle();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    let strength = 0;
    if (passwordValue.length >= 8) strength++;
    if (/[a-z]/.test(passwordValue)) strength++;
    if (/[A-Z]/.test(passwordValue)) strength++;
    if (/\d/.test(passwordValue)) strength++;
    if (/[^a-zA-Z\d]/.test(passwordValue)) strength++;
    return strength;
  };

  const strengthColors = [
    "bg-destructive",
    "bg-destructive",
    "bg-yellow-500",
    "bg-primary",
    "bg-primary",
  ];
  const strengthLabels = ["ضعيفة جداً", "ضعيفة", "متوسطة", "قوية", "قوية جداً"];

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row-reverse bg-background"
      dir="rtl"
    >
      {/* RIGHT SIDE: SYSTEM REGISTRY INFO */}
      <div className="hidden lg:flex lg:w-5/12 bg-secondary relative overflow-hidden flex-col justify-between p-12 border-r-2 border-foreground">
        <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]" />

        <div className="relative z-10">
          <Link href="/" className="inline-block mb-12">
            <div className="bg-foreground text-background p-2 px-4 font-black text-2xl tracking-tighter shadow-[4px_4px_0px_0px_rgba(var(--primary))]">
              ROVIDA_SYS.
            </div>
          </Link>
          <div className="space-y-6 max-w-sm">
            <h2 className="text-5xl font-black text-foreground uppercase tracking-tighter leading-[0.9]">
              بروتوكول <br /> التسجيل
            </h2>
            <p className="text-sm font-bold text-foreground/60 leading-relaxed italic border-r-4 border-primary pr-4">
              انضم إلى المنظومة للحصول على صلاحيات التتبع الكاملة، العروض
              الحصرية، وإدارة المخزون الشخصي.
            </p>

            <div className="space-y-4 pt-6">
              {[
                "شحن مجاني للطلبات القياسية",
                "صلاحية الوصول للعروض الحصرية",
                "سياسة استرجاع مضمونة 15 يوم",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center group-hover:bg-primary transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-tight">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[10px] font-mono font-black text-foreground/30 tracking-[0.3em]">
            USER_REGISTRATION_CORE_v2.0
          </p>
        </div>
      </div>

      {/* LEFT SIDE: ENTRY TERMINAL */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md">
          {/* Progress Header */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary font-mono text-[10px] font-black tracking-widest uppercase">
                <Terminal className="w-4 h-4" />
                {step === 1 ? "PHASE_01: IDENTITY" : "PHASE_02: SECURITY"}
              </div>
              <span className="text-[10px] font-black text-muted-foreground opacity-40">
                STEP {step}/02
              </span>
            </div>
            <div className="flex gap-2">
              <div
                className={`h-2 flex-1 transition-all duration-500 ${step >= 1 ? "bg-foreground" : "bg-muted"}`}
              />
              <div
                className={`h-2 flex-1 transition-all duration-500 ${step >= 2 ? "bg-foreground" : "bg-muted"}`}
              />
            </div>
          </div>

          <div className="bg-background border-2 border-foreground p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            {errors.root && (
              <div className="mb-6 p-4 bg-destructive text-destructive-foreground text-[10px] font-black uppercase tracking-widest">
                <ShieldAlert className="inline w-4 h-4 ml-2" /> [SYS_ERROR]:{" "}
                {errors.root.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* STEP 1: IDENTITY */}
              <div className={step === 1 ? "space-y-6" : "hidden"}>
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={isLoading}
                  className="w-full h-14 flex items-center justify-center gap-3 border-2 border-foreground bg-background hover:bg-muted text-xs font-black uppercase tracking-widest transition-all mb-4"
                >
                  <Chrome className="w-4 h-4" /> التسجيل عبر Google
                </button>

                <div className="relative flex items-center justify-center my-8">
                  <div className="absolute inset-0 border-t-2 border-foreground/5" />
                  <span className="relative px-4 bg-background text-[10px] font-black text-muted-foreground uppercase">
                    Manual_Entry
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">
                    الاسم الكامل [NAME_VAL]
                  </label>
                  <input
                    {...register("name")}
                    className="w-full h-14 px-5 bg-muted/20 border-2 border-foreground/10 focus:border-foreground outline-none font-bold text-sm"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-[10px] font-black text-destructive uppercase">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">
                    البريد الإلكتروني [EMAIL_ADDR]
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full h-14 px-5 bg-muted/20 border-2 border-foreground/10 focus:border-foreground outline-none font-bold text-sm"
                    placeholder="user@network.com"
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-[10px] font-black text-destructive uppercase">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full h-14 bg-foreground text-background font-black uppercase tracking-widest text-xs hover:bg-primary transition-all flex items-center justify-center gap-2"
                >
                  المتابعة <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              {/* STEP 2: SECURITY */}
              <div className={step === 2 ? "space-y-6" : "hidden"}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">
                    كلمة المرور [ENCRYPT_KEY]
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    className="w-full h-14 px-5 bg-muted/20 border-2 border-foreground/10 focus:border-foreground outline-none font-bold text-sm"
                    placeholder="••••••••"
                    dir="ltr"
                  />

                  {passwordValue && (
                    <div className="pt-2">
                      <div className="flex gap-1 mb-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 ${i < getPasswordStrength() ? strengthColors[getPasswordStrength() - 1] : "bg-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-[9px] font-black uppercase text-muted-foreground">
                        قوة التشفير: {strengthLabels[getPasswordStrength() - 1]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block">
                    تأكيد المفتاح [CONFIRM_KEY]
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="w-full h-14 px-5 bg-muted/20 border-2 border-foreground/10 focus:border-foreground outline-none font-bold text-sm"
                    placeholder="••••••••"
                    dir="ltr"
                  />
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/30 border-2 border-foreground/5">
                  <input
                    type="checkbox"
                    {...register("agreeTerms")}
                    className="mt-1 w-4 h-4 accent-primary"
                    id="terms"
                  />
                  <label
                    htmlFor="terms"
                    className="text-[10px] font-bold leading-tight text-muted-foreground"
                  >
                    أوافق على{" "}
                    <Link href="#" className="text-foreground underline">
                      شروط المنظومة
                    </Link>{" "}
                    و{" "}
                    <Link href="#" className="text-foreground underline">
                      سياسة البيانات
                    </Link>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 h-14 border-2 border-foreground font-black uppercase text-[10px] flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" /> رجوع
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-2 h-14 bg-foreground text-background font-black uppercase text-xs hover:bg-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Activity className="animate-spin w-4 h-4" />
                    ) : (
                      "إتمام التسجيل"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-xs font-bold text-muted-foreground uppercase">
            لديك حساب بالفعل؟{" "}
            <Link
              href="/auth/signin"
              className="text-primary hover:underline font-black"
            >
              تسجيل الدخول [SIGN_IN]
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
