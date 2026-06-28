import { cn } from "@/lib/utils";
import { ReactNode } from "react";

/**
 * Native-feeling horizontal swipe carousel (CSS scroll-snap, GPU-friendly).
 * Bleeds to the screen edges while preserving 16px side padding so the next
 * card "peeks" — a common premium mobile pattern.
 */
export function SwipeRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "snap-row -mx-4 flex gap-4 overflow-x-auto px-4 pb-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default SwipeRow;
