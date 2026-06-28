"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function NavbarShell({ children, className }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "glass-card fixed z-50 w-full border-b transition-all duration-500",
        scrolled ? "border-border/60 shadow-luxe" : "border-transparent",
        className,
      )}
    >
      {children}
    </nav>
  );
}

export default NavbarShell;
