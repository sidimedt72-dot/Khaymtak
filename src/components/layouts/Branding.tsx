import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = { className?: string };

function Branding({ className }: Props) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold transition-transform group-hover:scale-105">
        LE
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        Loca<span className="text-accent">Event</span>
      </span>
    </Link>
  );
}

export default Branding;
