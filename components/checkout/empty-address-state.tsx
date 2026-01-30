export function EmptyAddressState({ onAddNew }: { onAddNew?: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-4 border border-dashed rounded-lg bg-muted/30">
      <div className="text-4xl mb-3">📦</div>

      <p className="font-medium mb-1">لا يوجد عنوان توصيل محفوظ</p>
      <p className="text-sm text-muted-foreground mb-5 max-w-sm">
        أضف عنوانك الآن لتسهيل عملية الشراء في المرات القادمة
      </p>

      <button
        className="px-5 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        onClick={onAddNew}
      >
        إضافة عنوان جديد
      </button>
    </div>
  );
}
