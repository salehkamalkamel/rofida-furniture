"use client";

import Link from "next/link";
import { MapPin, ArrowRight, Save, X } from "lucide-react";

export default function NewAddressPage() {
  return (
    <div className="max-w-2xl mx-auto" dir="rtl">
      {/* MODULE HEADER */}
      <div className="mb-8 flex items-center justify-between border-b-2 border-foreground pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
              Entry_Form_V2
            </span>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            إضافة وجهة جديدة
          </h1>
        </div>
        <Link
          href="/account/addresses"
          className="p-2 border-2 border-foreground/10 hover:border-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </Link>
      </div>

      <div className="bg-background border-2 border-foreground p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 left-0 w-12 h-12 bg-muted/50 -rotate-45 -translate-x-6 -translate-y-6 border-b border-foreground/10" />

        <form className="space-y-8 relative z-10">
          {/* FIELD: LABEL */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-primary" />
              اسم العنوان [Label_ID]
            </label>
            <input
              type="text"
              placeholder="مثال: المستودع الرئيسي، المنزل"
              className="w-full h-14 px-5 bg-muted/20 border-2 border-foreground/10 focus:border-foreground focus:bg-background outline-none transition-all font-bold text-sm uppercase tracking-tight placeholder:opacity-30"
            />
          </div>

          {/* FIELD: FULL NAME */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              الاسم الكامل المستلم [Recipient_Name]
            </label>
            <input
              type="text"
              className="w-full h-14 px-5 bg-muted/20 border-2 border-foreground/10 focus:border-foreground focus:bg-background outline-none transition-all font-bold text-sm uppercase"
            />
          </div>

          {/* FIELD: ADDRESS TEXTAREA */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              تفاصيل الموقع [Destination_Details]
            </label>
            <textarea
              rows={3}
              placeholder="الشارع، رقم البناية، الحي..."
              className="w-full px-5 py-4 bg-muted/20 border-2 border-foreground/10 focus:border-foreground focus:bg-background outline-none transition-all font-bold text-sm uppercase resize-none placeholder:opacity-30"
            />
          </div>

          {/* GRID FOR PHONE/CITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                رقم التواصل [Contact_Line]
              </label>
              <input
                type="tel"
                dir="ltr"
                placeholder="+20"
                className="w-full h-14 px-5 bg-muted/20 border-2 border-foreground/10 focus:border-foreground focus:bg-background outline-none transition-all font-mono font-black text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                المدينة [Terminal_City]
              </label>
              <input
                type="text"
                className="w-full h-14 px-5 bg-muted/20 border-2 border-foreground/10 focus:border-foreground focus:bg-background outline-none transition-all font-bold text-sm uppercase"
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-foreground/5">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-3 h-14 bg-foreground text-background font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all active:scale-[0.98]"
            >
              <Save className="w-4 h-4" />
              تأكيد وحفظ البيانات
            </button>

            <Link
              href="/account/addresses"
              className="flex-1 flex items-center justify-center gap-3 h-14 border-2 border-foreground text-foreground font-black uppercase tracking-[0.2em] text-xs hover:bg-muted transition-all"
            >
              إلغاء العملية
            </Link>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center opacity-20 pointer-events-none">
        <p className="text-[9px] font-black uppercase tracking-[0.5em]">
          NORDIC_LOGISTICS_INFRASTRUCTURE
        </p>
      </div>
    </div>
  );
}
