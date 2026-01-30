export const sections = [
  {
    id: "basic",
    label: "المعلومات الأساسية",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: "pricing",
    label: "التسعير والعروض",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "inventory",
    label: "المخزون والتوفر",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    id: "measurements",
    label: "المقاسات والأبعاد",
    icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4",
  },
  {
    id: "colors",
    label: "الألوان المتاحة",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  },
  {
    id: "images",
    label: "الصور",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    id: "customization",
    label: "التخصيص",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

export const stockStatusOptions = [
  { value: "in_stock", label: "متوفر", color: "bg-green-500" },
  { value: "out_of_stock", label: "غير متوفر", color: "bg-red-500" },
  { value: "pre_order", label: "طلب مسبق", color: "bg-blue-500" },
  { value: "limited", label: "كمية محدودة", color: "bg-yellow-500" },
];

export const availableStatusOptions = [
  { value: "active", label: "نشط", description: "المنتج مرئي للعملاء" },
  {
    value: "draft",
    label: "مسودة",
    description: "المنتج محفوظ ولكن غير مرئي",
  },
  { value: "archived", label: "مؤرشف", description: "المنتج مخفي ومؤرشف" },
];

export const labelOptions = [
  { value: "", label: "بدون" },
  { value: "new", label: "جديد" },
  { value: "bestseller", label: "الأكثر مبيعاً" },
  { value: "limited", label: "إصدار محدود" },
  { value: "eco", label: "صديق للبيئة" },
];
