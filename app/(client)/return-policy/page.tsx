export default function ReturnPolicyPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white"
      dir="rtl"
    >
      {/* Top Header Label */}
      <div className="border-b border-foreground/10 py-4 bg-muted/5">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">
            Return & Warranty Manifest
          </span>
          <span className="font-mono text-[10px] opacity-40">
            ROFIDA-FURNITURE / POLICY_2026
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Title */}
        <section className="space-y-6">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-none uppercase">
            سياسة الاسترجاع والضمان
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
            في روفيدا للأثاث هدفنا إنك تستلم المنتج وأنت مطمئن 100%. لذلك وضعنا
            سياسة واضحة وعادلة تحافظ على حق العميل وحقنا.
          </p>
        </section>

        {/* Section 1 */}
        <section className="border-t-2 border-foreground pt-8 space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest">
            01 — حق المعاينة عند الاستلام
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            يحق للعميل معاينة المنتج بالكامل عند وصول مندوب الشحن. في حالة
            اختلاف المنتج عن الصور المعروضة على الموقع من حيث الشكل أو اللون أو
            المواصفات الأساسية، يحق للعميل إلغاء الطلب فوراً قبل الاستلام دون أي
            رسوم.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            يتم استرداد المبلغ بالكامل في حالة الدفع المسبق، أو إلغاء الطلب بدون
            دفع في حالة الدفع عند الاستلام.
          </p>
        </section>

        {/* Section 2 */}
        <section className="border-t-2 border-foreground pt-8 space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest">
            02 — سياسة الاسترجاع بعد الاستلام
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            بعد استلام المنتج، يمكن طلب الاسترجاع خلال 14 يوم من تاريخ الاستلام
            بشرط:
          </p>
          <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
            <li>أن يكون المنتج بحالته الأصلية بدون استخدام.</li>
            <li>عدم وجود كسر أو تلف ناتج عن سوء الاستخدام.</li>
            <li>وجود فاتورة أو رقم الطلب.</li>
          </ul>
          <p className="text-muted-foreground">
            في هذه الحالة يتحمل العميل مصاريف الشحن المرتجعة.
          </p>
        </section>

        {/* Section 3 */}
        <section className="border-t-2 border-foreground pt-8 space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest">
            03 — الضمان
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            جميع منتجات روفيدا للأثاث عليها ضمان لمدة سنة كاملة ضد عيوب الصناعة
            في الأخشاب والتجميع.
          </p>
          <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
            <li>الضمان يشمل عيوب التصنيع فقط.</li>
            <li>لا يشمل التلف الناتج عن سوء الاستخدام أو الرطوبة أو الكسر.</li>
            <li>لا يشمل الخدوش الناتجة عن الاستعمال اليومي.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="border-t-2 border-foreground pt-8 space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest">
            04 — المنتجات غير القابلة للاسترجاع
          </h2>
          <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
            <li>المنتجات المصنوعة حسب طلب خاص.</li>
            <li>المنتجات المعدلة بناءً على طلب العميل.</li>
            <li>المنتجات التي تم تركيبها بالفعل.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="border-t-2 border-foreground pt-8 space-y-4">
          <h2 className="text-xl font-black uppercase tracking-widest">
            05 — طريقة طلب الاسترجاع
          </h2>
          <p className="text-muted-foreground">
            لطلب الاسترجاع أو تفعيل الضمان:
          </p>
          <ul className="list-disc pr-6 space-y-2 text-muted-foreground">
            <li>التواصل معنا عبر صفحة اتصل بنا.</li>
            <li>ذكر رقم الطلب وصور توضح الحالة.</li>
            <li>سيتم الرد خلال 24–48 ساعة عمل.</li>
          </ul>
        </section>

        {/* Footer Note */}
        <div className="pt-10 border-t-2 border-foreground">
          <p className="text-xs font-mono opacity-40">
            ROFIDA FURNITURE © 2026 — ALL RIGHTS RESERVED
          </p>
        </div>
      </main>
    </div>
  );
}
