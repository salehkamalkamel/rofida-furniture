import { Truck, MessageSquare, MapPin, Globe } from "lucide-react";
import Link from "next/link";

export default function ShippingCoverage() {
  const cities = ["القاهرة", "الجيزة", "القليوبية"];

  return (
    <section
      className="my-16 border-4 border-foreground bg-background overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      dir="rtl"
    >
      {/* Top Status Bar */}
      <div className="bg-foreground text-background px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">
            Logistics_Status: Active
          </span>
        </div>
        <Globe className="w-4 h-4 opacity-50" />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Main Info */}
        <div className="flex-1 p-8 sm:p-12 border-b-4 md:border-b-0 md:border-l-4 border-foreground">
          <div className="inline-block bg-primary text-primary-foreground px-3 py-1 text-[10px] font-black uppercase mb-4">
            تغطية الشحن الحالية
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6 leading-tight">
            نشحن حالياً داخل <br />
            <span className="text-primary underline decoration-foreground underline-offset-8">
              جمهورية مصر العربية
            </span>
          </h2>
          <p className="text-muted-foreground font-bold max-w-md italic border-r-4 border-muted px-4">
            نحن نتوسع باستمرار، ولكن حالياً يتم توجيه أسطولنا لتغطية مناطق
            القاهرة الكبرى لضمان أعلى جودة في التركيب والتوصيل.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="flex-1 bg-secondary/30 p-8 sm:p-12 flex flex-col justify-center">
          <div className="grid grid-cols-1 gap-4">
            {cities.map((city, index) => (
              <div
                key={city}
                className="group flex items-center justify-between bg-background border-2 border-foreground p-4 hover:-translate-x-2 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs opacity-30">
                    0{index + 1}
                  </span>
                  <span className="font-black text-xl tracking-tight">
                    {city}
                  </span>
                </div>
                <MapPin className="w-5 h-5 text-primary group-hover:fill-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Shipping CTA */}
      <div className="bg-primary/10 p-6 border-t-4 border-foreground flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-foreground text-background">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-sm uppercase tracking-wide">
              هل أنت خارج نطاق التغطية؟
            </h4>
            <p className="text-xs font-bold opacity-70">
              نقدم حلول شحن مخصصة للمحافظات الأخرى بناءً على حجم الطلب.
            </p>
          </div>
        </div>

        <Link
          href="/contact"
          className="w-full md:w-auto px-8 py-4 bg-foreground text-background font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all group shadow-[6px_6px_0px_0px_rgba(var(--primary),0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
        >
          <MessageSquare className="w-4 h-4 group-hover:scale-125 transition-transform" />
          طلب شحن مخصص
        </Link>
      </div>
    </section>
  );
}
