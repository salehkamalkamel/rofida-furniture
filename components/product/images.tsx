"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { ProductFormValues } from "@/app/dashboard/products/new/_schema";
import {
  Trash2,
  Star,
  Plus,
  Link as LinkIcon,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export function ImagesSection() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<ProductFormValues>();
  const [newImageUrl, setNewImageUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [localError, setLocalError] = useState("");

  const images = watch("images") || [];

  const validateAndAddImage = async () => {
    setLocalError("");
    const trimmedUrl = newImageUrl.trim();

    if (!trimmedUrl) return;

    // 1. Basic Syntax Check
    try {
      new URL(trimmedUrl);
    } catch (_) {
      setLocalError("رابط غير صحيح (تأكد من وجود http/https)");
      return;
    }

    if (images.includes(trimmedUrl)) {
      setLocalError("هذه الصورة مضافة بالفعل");
      return;
    }

    setLoadingImage(true);

    // 2. Actual Load Check
    try {
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = trimmedUrl;
      });

      // Success
      const newImages = [...images, trimmedUrl];
      setValue("images", newImages, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setNewImageUrl("");
    } catch (e) {
      setLocalError("تعذر تحميل الصورة. تأكد أن الرابط مباشر ويعمل بشكل صحيح.");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setValue(
      "images",
      images.filter((_, i) => i !== indexToRemove),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const handleSetMainImage = (index: number) => {
    const newImages = [...images];
    const [selectedImage] = newImages.splice(index, 1);
    newImages.unshift(selectedImage);
    setValue("images", newImages, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="space-y-8">
      {/* Input Area */}
      <div
        className={`p-4 rounded-xl border-2 border-dashed transition-colors ${localError ? "border-destructive/50 bg-destructive/5" : "border-border bg-muted/30"}`}
      >
        <label className="flex items-center gap-2 text-sm font-bold mb-3">
          <LinkIcon size={16} className="text-primary" />
          إضافة صور بواسطة الرابط
        </label>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newImageUrl}
              disabled={loadingImage}
              onChange={(e) => {
                setNewImageUrl(e.target.value);
                if (localError) setLocalError("");
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), validateAndAddImage())
              }
              className="w-full h-11 pl-4 pr-10 bg-background border rounded-lg text-left ltr focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
              placeholder="https://example.com/image.jpg"
            />
            {loadingImage ? (
              <Loader2
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary animate-spin"
                size={18}
              />
            ) : (
              <ImageIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
            )}
          </div>
          <button
            type="button"
            onClick={validateAndAddImage}
            disabled={loadingImage || !newImageUrl}
            className="h-11 px-6 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
          >
            <Plus size={18} /> إضافة
          </button>
        </div>

        {/* Error Messages */}
        <div className="min-h-6 mt-2">
          {localError && (
            <div className="flex items-center gap-2 text-destructive text-sm animate-in slide-in-from-top-1">
              <AlertCircle size={14} /> <p>{localError}</p>
            </div>
          )}
          {errors.images && !localError && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle size={14} /> <p>{errors.images.message}</p>
            </div>
          )}
        </div>
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in">
          {images.map((url, index) => (
            <div
              key={url}
              className={`group relative aspect-square rounded-xl overflow-hidden border bg-background ${index === 0 ? "ring-2 ring-primary border-primary shadow-lg" : "hover:border-primary/50"}`}
            >
              {/* Using standard img tag for Preview (Next/Image requires config for external domains) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt="Product"
                className="w-full h-full object-cover"
              />

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleSetMainImage(index)}
                    className="bg-white/90 hover:bg-white text-xs text-black px-3 py-1.5 rounded-full font-bold flex items-center gap-1 transition-transform hover:scale-105"
                  >
                    <Star
                      size={12}
                      className="fill-yellow-500 text-yellow-500"
                    />{" "}
                    تعيين كرئيسية
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="bg-destructive/90 hover:bg-destructive text-white p-2 rounded-full transition-transform hover:scale-105"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Badge for Main Image */}
              {index === 0 && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
                  <Star size={10} className="fill-current" /> الرئيسية
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
