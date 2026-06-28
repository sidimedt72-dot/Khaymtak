"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Avant",
  afterAlt = "Après",
  beforeLabel = "Espace nu",
  afterLabel = "Événement",
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX =
        "touches" in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      if (clientX != null) updateFromClientX(clientX);
    };
    const stop = () => (draggingRef.current = false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl shadow-luxe md:aspect-[16/10]",
        className,
      )}
      onMouseDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        draggingRef.current = true;
        if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
      }}
    >
      {/* After (full) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <span className="absolute right-4 top-4 z-10 rounded-full bg-primary/70 px-3 py-1 text-[10px] font-medium uppercase tracking-luxe text-primary-foreground backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale-[0.25]"
        />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-luxe text-white backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-20 w-px bg-white/80 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-primary shadow-luxe-lg transition-transform group-hover:scale-105">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 7l-5 5 5 5M15 7l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
