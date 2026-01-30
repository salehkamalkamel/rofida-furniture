export default function CheckoutSideBar() {
  return (
    <div className="lg:col-span-1">
      <div className="bg-background p-6 sticky top-24">
        <h3 className="font-bold text-foreground mb-4">ملخص الطلب</h3>

        {/* Items Count */}
        <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-border">
          <span className="text-muted-foreground">
            المنتجات ({items.length})
          </span>
          <button
            onClick={() => goToStep("cart")}
            className="text-primary text-xs hover:underline"
          >
            تعديل
          </button>
        </div>

        {/* Promo Code */}
        <div className="mb-4 pb-4 border-b border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="كود الخصم"
              className="flex-1 h-10 px-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:border-primary"
              disabled={promoApplied}
            />
            {promoApplied ? (
              <button
                onClick={() => {
                  setPromoCode("");
                  setPromoApplied(false);
                  setPromoDiscount(0);
                }}
                className="px-4 h-10 border border-border text-sm text-muted-foreground hover:bg-muted"
              >
                إزالة
              </button>
            ) : (
              <button
                onClick={applyPromoCode}
                disabled={!promoCode.trim()}
                className="px-4 h-10 bg-foreground text-background text-sm hover:opacity-90 disabled:opacity-50"
              >
                تطبيق
              </button>
            )}
          </div>
          {errors.promo && (
            <p className="text-xs text-destructive mt-1">{errors.promo}</p>
          )}
          {promoApplied && (
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              تم تطبيق الكود بنجاح!
            </p>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">المجموع الفرعي</span>
            <span className="text-foreground">
              {subtotal.toLocaleString("ar-EG")} جنيه
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">التوصيل</span>
            <span
              className={
                deliveryFee === 0
                  ? "text-primary font-medium"
                  : "text-foreground"
              }
            >
              {deliveryFee === 0
                ? "مجاني"
                : `${deliveryFee.toLocaleString("ar-EG")} جنيه`}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">الخصم</span>
              <span className="text-primary font-medium">
                -{discount.toLocaleString("ar-EG")} جنيه
              </span>
            </div>
          )}
        </div>

        {deliveryFee > 0 && (
          <div className="p-3 bg-secondary/10 border border-secondary/30 mb-4">
            <p className="text-xs text-foreground">
              أضف منتجات بقيمة{" "}
              <span className="font-bold">
                {(2000 - subtotal).toLocaleString("ar-EG")} جنيه
              </span>{" "}
              للحصول على توصيل مجاني!
            </p>
          </div>
        )}

        {/* Total */}
        <div className="border-t border-border pt-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-bold text-foreground">الإجمالي</span>
            <div className="text-left">
              <span className="font-bold text-xl text-foreground">
                {total.toLocaleString("ar-EG")} جنيه
              </span>
              <p className="text-xs text-muted-foreground">شامل الضريبة</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>دفع آمن 100%</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>استرجاع مجاني خلال 14 يوم</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            <span>ضمان سنة على جميع المنتجات</span>
          </div>
        </div>
      </div>
    </div>
  );
}
