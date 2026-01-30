"use client";
import {
  availableStatusOptions,
  sections,
} from "@/app/dashboard/products/new/product-config";
import { useState } from "react";

export default function AddProductNav({
  imagesLength,
  colorsLength,
  availableStatus,
}: {
  imagesLength: number;
  colorsLength: number;
  availableStatus: "active" | "draft" | "archived";
}) {
  const [activeSection, setActiveSection] = useState("basic");

  return (
    <div className="xl:col-span-1">
      <div className="bg-background border border-border p-4 sticky top-4">
        <h3 className="font-bold text-foreground mb-4">أقسام المنتج</h3>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors text-right ${
                activeSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <svg
                className="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={section.icon}
                />
              </svg>
              <span>{section.label}</span>
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-border space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">الصور</span>
            <span
              className={`font-medium ${imagesLength > 0 ? "text-green-600" : "text-red-500"}`}
            >
              {imagesLength}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">الألوان</span>
            <span className="font-medium text-foreground">{colorsLength}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">الحالة</span>
            <span
              className={`font-medium ${availableStatus === "active" ? "text-green-600" : "text-yellow-600"}`}
            >
              {
                availableStatusOptions.find((s) => s.value === availableStatus)
                  ?.label
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
