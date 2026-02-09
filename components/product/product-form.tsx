"use client";

import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  productSchema,
  ProductFormValues,
} from "@/app/dashboard/products/new/_schema";
import { BasicInfoSection } from "./basic-info";
import { PricingSection } from "./pricing";
import { InventorySection } from "./inventory";
import { ImagesSection } from "./images";
import { AttributesSection } from "./attributes-section";
import { ProductPreview } from "./product-preview";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  LayoutGrid,
  Tag,
  Package,
  ImageIcon,
  Palette,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { createProduct } from "@/actions/_actions";
import { useUnsavedChanges } from "@/hooks/use-unsaved-changes";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, if not use template literals

const SECTIONS = [
  {
    id: "basic",
    label: "الأساسية",
    fullLabel: "المعلومات الأساسية",
    icon: LayoutGrid,
    fields: ["name", "nameEn", "sku", "categoryId", "slug"],
  },
  {
    id: "pricing",
    label: "التسعير",
    fullLabel: "التسعير والعروض",
    icon: Tag,
    fields: ["price", "salePrice"],
  },
  {
    id: "inventory",
    label: "المخزون",
    fullLabel: "المخزون",
    icon: Package,
    fields: ["stockStatus", "availableStatus"],
  },
  {
    id: "attributes",
    label: "الخصائص",
    fullLabel: "الألوان والمقاسات",
    icon: Palette,
    fields: ["colors", "measurements"],
  },
  {
    id: "images",
    label: "الصور",
    fullLabel: "الصور",
    icon: ImageIcon,
    fields: ["images"],
  },
] as const;

export default function ProductForm() {
  const [activeSection, setActiveSection] = useState<string>("basic");
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      sku: "",
      stockStatus: "in_stock",
      availableStatus: "archived",
      images: [],
      colors: [],
      measurements: { unit: "cm" },
    },
  });

  const {
    formState: { isDirty, errors },
    handleSubmit,
  } = methods;

  useUnsavedChanges(isDirty);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const isLastStep = currentIndex === SECTIONS.length - 1;

  const onSubmit = (data: ProductFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const result = await createProduct(data);
      console.log(data);

      if (!result.success) {
        if (result.field) {
          methods.setError(result.field as any, {
            type: "server",
            message: result.error,
          });
          setActiveSection("basic");
        }
        toast.error(result.error);
      } else {
        toast.success("تم حفظ المنتج بنجاح!");
        methods.reset();
      }
    });
  };

  const onError = (errors: FieldErrors<ProductFormValues>) => {
    toast.error("يرجى مراجعة الحقول المطلوبة");
    const firstErrorKey = Object.keys(errors)[0];
    const targetSection = SECTIONS.find((section) =>
      section.fields.some((field) => firstErrorKey.startsWith(field)),
    );

    if (targetSection) {
      setActiveSection(targetSection.id);
      setTimeout(() => {
        const errorElement = document.querySelector(
          `[name="${firstErrorKey}"]`,
        );
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
          errorElement.classList.add("animate-pulse");
        }
      }, 100);
    }
  };

  // Helper to handle "Next" button click
  const handleNext = async () => {
    // Optional: Validate current section before moving
    // const currentFields = SECTIONS[currentIndex].fields;
    // const isValid = await trigger(currentFields as any);
    // if (!isValid) return;

    if (isLastStep) {
      handleSubmit(onSubmit, onError)();
    } else {
      setActiveSection(SECTIONS[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="max-w-7xl mx-auto p-4 pb-24 lg:pb-4" // Added padding bottom for mobile fixed bar
      >
        {/* Global Error Alert */}
        {(Object.keys(errors).length > 0 || serverError) && (
          <div className="mb-6 p-4 bg-destructive/5 border border-destructive/20 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertTriangle className="text-destructive shrink-0" size={20} />
            <div>
              <h3 className="font-bold text-destructive text-sm">
                توجد أخطاء تمنع الحفظ
              </h3>
              <p className="text-muted-foreground text-xs mt-1">
                {serverError || "يرجى مراجعة الحقول المميزة باللون الأحمر"}
              </p>
            </div>
          </div>
        )}

        {/* --- MOBILE/TABLET NAVIGATION (Horizontal Scroll) --- */}
        <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-2">
            {SECTIONS.map((section, idx) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const hasError = section.fields.some((field) =>
                Object.keys(errors).some((errKey) => errKey.startsWith(field)),
              );
              // Check if section is "complete" (naive check: no errors and previous index)
              const isComplete = !hasError && idx < currentIndex;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-xl border min-w-20 transition-all
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                        : "bg-background text-muted-foreground border-muted hover:border-primary/50"
                    }
                    ${hasError ? "border-destructive/50 bg-destructive/5 text-destructive" : ""}
                  `}
                >
                  <div className="relative">
                    <Icon size={20} />
                    {hasError && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
                    )}
                    {isComplete && !isActive && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold whitespace-nowrap">
                    {section.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* --- DESKTOP SIDEBAR --- */}
          <aside className="hidden lg:block lg:col-span-3 space-y-4">
            <div className="sticky top-6 space-y-4">
              <div className="bg-background border rounded-xl p-2 shadow-sm">
                <nav className="flex flex-col gap-1">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const hasError = section.fields.some((field) =>
                      Object.keys(errors).some((errKey) =>
                        errKey.startsWith(field),
                      ),
                    );

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all group relative ${
                          activeSection === section.id
                            ? "bg-primary/10 text-primary font-bold"
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={hasError ? "text-destructive" : ""}
                        />
                        <span
                          className={`flex-1 ${hasError ? "text-destructive font-medium" : ""}`}
                        >
                          {section.fullLabel}
                        </span>
                        {hasError && (
                          <span className="absolute left-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                        )}
                        {activeSection === section.id && !hasError && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Desktop Save Button */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Save size={20} /> حفظ المنتج
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* --- MAIN CONTENT CARD --- */}
          <main className="lg:col-span-5 space-y-6">
            <div className="bg-background border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-125">
              {/* Card Header */}
              <div className="px-6 py-4 border-b bg-muted/30 flex justify-between items-center">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  {/* {SECTIONS[currentIndex].icon && <SECTIONS[currentIndex].icon className="lg:hidden text-primary" size={18} />} */}
                  {SECTIONS[currentIndex].fullLabel}
                </h2>
                <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded border">
                  {currentIndex + 1} / {SECTIONS.length}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1">
                {/* We render all sections but hide them with CSS to preserve state */}
                {SECTIONS.map((section) => (
                  <div
                    key={section.id}
                    className={
                      activeSection === section.id
                        ? "block animate-in fade-in slide-in-from-right-4 duration-300"
                        : "hidden"
                    }
                  >
                    {/* Switch component based on ID */}
                    {section.id === "basic" && <BasicInfoSection />}
                    {section.id === "pricing" && <PricingSection />}
                    {section.id === "inventory" && <InventorySection />}
                    {section.id === "attributes" && <AttributesSection />}
                    {section.id === "images" && <ImagesSection />}
                  </div>
                ))}
              </div>

              {/* Internal Navigation Footer (Hidden on mobile if using Sticky Bar, or kept as secondary) */}
              <div className="px-6 py-4 bg-muted/20 border-t flex justify-between items-center">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() =>
                    setActiveSection(SECTIONS[currentIndex - 1].id)
                  }
                  className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded hover:bg-muted disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} /> السابق
                </button>

                {/* On Desktop: Show Next. On Mobile: Show Next (Save is in sticky bar or here) */}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isPending}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium px-6 py-2 rounded transition-colors shadow-sm",
                    isLastStep
                      ? "bg-blue-600 text-white hover:bg-blue-700 lg:hidden" // Show Save style on mobile only here
                      : "bg-primary text-primary-foreground hover:bg-primary/90",
                  )}
                >
                  {isLastStep ? (
                    isPending ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "حفظ"
                    )
                  ) : (
                    <>
                      التالي <ChevronLeft size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </main>

          {/* --- PREVIEW (Hidden on Mobile) --- */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-6">
              <ProductPreview />
            </div>
          </aside>
        </div>

        {/* --- MOBILE STICKY BOTTOM ACTION BAR --- */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t lg:hidden z-50 flex items-center gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <button
            type="button"
            onClick={handleNext}
            disabled={isPending}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-bold text-white shadow-lg transition-transform active:scale-95 ${
              isLastStep
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-foreground hover:bg-foreground/90"
            }`}
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : isLastStep ? (
              <>
                {" "}
                <Save size={20} /> حفظ المنتج{" "}
              </>
            ) : (
              <>
                {" "}
                التالي <ChevronLeft size={20} />{" "}
              </>
            )}
          </button>

          {currentIndex > 0 && (
            <button
              type="button"
              onClick={() => setActiveSection(SECTIONS[currentIndex - 1].id)}
              className="p-3 rounded-lg border bg-background hover:bg-muted text-foreground transition-colors"
              aria-label="Previous Step"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
