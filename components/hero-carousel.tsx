"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/lib/data";
import { ArrowRight, ArrowLeft } from "lucide-react";

const AUTOPLAY_DELAY = 6000;

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slidesCount = heroSlides.length;

  const nextSlide = () => setCurrentSlide((s) => (s + 1) % slidesCount);
  const prevSlide = () =>
    setCurrentSlide((s) => (s - 1 + slidesCount) % slidesCount);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(nextSlide, AUTOPLAY_DELAY);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, currentSlide]);

  return (
    <section
      className="relative w-full h-[55vh] md:h-[90vh] overflow-hidden bg-foreground group border-b-4 border-primary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      dir="rtl"
    >
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isActive
                ? "translate-x-0 opacity-100 z-10"
                : "translate-x-full opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              priority={index === 0}
              className={`object-cover transition-transform duration-6000 ${isActive ? "scale-110" : "scale-100"}`}
            />

            <div className="absolute inset-0 bg-linear-to-l from-black/90 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
                <div className="max-w-3xl space-y-3 md:space-y-6">
                  {/* Technical Label - Shrunk for mobile */}
                  <div
                    className={`flex items-center gap-2 md:gap-4 transition-all delay-300 duration-700 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
                  >
                    <span className="h-0.5 w-6 md:w-12 bg-primary" />
                    <span className="text-primary font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs">
                      ROVIDA_SYS_COLLECTION_2026
                    </span>
                  </div>

                  {/* Title - Responsive sizing to prevent massive text on small screens */}
                  <h2
                    className={`text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase transition-all delay-500 duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  >
                    {slide.title}
                  </h2>

                  {/* Subtitle - Shorter line clamp for mobile */}
                  <p
                    className={`text-sm md:text-xl text-white/70 max-w-sm md:max-w-xl font-bold transition-all delay-700 duration-700 line-clamp-2 md:line-clamp-none ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    {slide.subtitle}
                  </p>

                  <div
                    className={`pt-2 md:pt-4 transition-all delay-1000 duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  >
                    <Link
                      href={slide.link}
                      className="inline-flex items-center gap-4 md:gap-6 bg-primary text-white px-6 md:px-10 py-3 md:py-5 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 group/btn shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]"
                    >
                      {slide.cta}
                      <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover/btn:-translate-x-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* RE-ENGINEERED NAVIGATION FOR MOBILE SIZING */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 backdrop-blur-md bg-black/40">
        <div className="max-w-7xl mx-auto flex h-16 md:h-24">
          {/* Slide Counter */}
          <div className="flex items-center px-4 md:px-8 border-l border-white/10 text-white font-black text-lg md:text-2xl italic">
            <span className="text-primary">0{currentSlide + 1}</span>
            <span className="mx-1 md:mx-2 opacity-20">/</span>
            <span className="opacity-40 text-[10px] md:text-sm">
              0{slidesCount}
            </span>
          </div>

          {/* Progress Bars (Hidden on mobile to save height) */}
          <div className="flex-1 hidden md:flex">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="flex-1 relative group overflow-hidden border-l border-white/10"
              >
                <div
                  className={`absolute inset-0 bg-primary/20 transition-transform duration-500 ${currentSlide === i ? "translate-y-0" : "translate-y-full"}`}
                />
                <div className="relative z-10 px-6 flex flex-col items-start justify-center h-full">
                  <span
                    className={`text-[10px] font-black transition-colors ${currentSlide === i ? "text-primary" : "text-white/40"}`}
                  >
                    PHASE 0{i + 1}
                  </span>
                  <div className="w-full h-0.5 bg-white/10 mt-2 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-6000 linear"
                      style={{
                        width: currentSlide === i && !isPaused ? "100%" : "0%",
                      }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Responsive Arrows */}
          <div className="flex border-r border-white/10">
            <button
              onClick={prevSlide}
              className="w-16 md:w-24 flex items-center justify-center text-white hover:bg-primary transition-colors border-l border-white/10"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-16 md:w-24 flex items-center justify-center text-white hover:bg-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
