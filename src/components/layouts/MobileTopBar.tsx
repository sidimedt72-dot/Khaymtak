"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import { CartLink, CartNav } from "@/features/carts";

export function MobileTopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Auto-hide on scroll down, reveal on scroll up (native app pattern)
      if (y > 120 && y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "pt-safe fixed inset-x-3 top-0 z-50 transition-transform duration-500 ease-out md:hidden",
        hidden ? "-translate-y-[140%]" : "translate-y-3",
      )}
    >
      <div
        className={cn(
          "glass-card flex h-14 items-center justify-between rounded-full pl-5 pr-3 transition-shadow duration-500",
          scrolled ? "shadow-luxe" : "shadow-sm",
        )}
      >
        <Link
          href="/"
          aria-label="Khaymtak Event — accueil"
          className="tap-none flex items-center"
        >
          <span className="font-display text-xl font-semibold tracking-tight">
            Khaymtak<span className="text-accent"> Event</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <div className="flex h-9 w-9 items-center justify-center">
            <Suspense fallback={<CartLink productCount={0} />}>
              <CartNav />
            </Suspense>
          </div>
          <ThemeToggle />
          <div className="flex h-9 items-center px-1">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileTopBar;
