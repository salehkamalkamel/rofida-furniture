"use client";

export default function Model({
  title,
  description,
  onClose,
  onConfirm,
}: {
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background p-6 max-w-md w-full">
        <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors"
          >
            إلغاء
          </button>
          <button
            className="px-4 py-2 text-sm font-medium bg-offer text-offer-foreground hover:opacity-90 transition-opacity"
            onClick={() => onConfirm()}
          >
            {title}
          </button>
        </div>
      </div>
    </div>
  );
}
