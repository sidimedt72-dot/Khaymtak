import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = { className?: string };

function Branding({ className }: Props) {
  return (
    <Link
      href="/"
      className={cn("group flex flex-col items-start leading-none", className)}
      aria-label="Khaymtak Event — accueil"
    >
      <span className="font-display text-2xl font-semibold tracking-tight">
        Khaymtak<span className="text-accent"> Event</span>
      </span>
      <span className="mt-0.5 text-[9px] font-medium uppercase tracking-luxe-wide text-muted-foreground transition-colors group-hover:text-accent">
        Maison Événementielle
      </span>
    </Link>
  );
}

export default Branding;
