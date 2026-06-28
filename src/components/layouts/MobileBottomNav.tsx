"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import useWishlistStore from "@/features/wishlists/useWishlistStore";
import { useMemo } from "react";

type Item = {
  href: string;
  label: string;
  Icon: LucideIcon;
  match: (path: string) => boolean;
  badge?: number;
};

export function MobileBottomNav() {
  const pathname = usePathname();
  const wishlist = useWishlistStore((s) => s.wishlist);
  const wishCount = useMemo(() => Object.keys(wishlist).length, [wishlist]);

  const items: Item[] = [
    { href: "/", label: "Accueil", Icon: Home, match: (p) => p === "/" },
    {
      href: "/shop",
      label: "Catégories",
      Icon: LayoutGrid,
      match: (p) => p.startsWith("/shop") || p.startsWith("/collections"),
    },
    {
      href: "/wish-list",
      label: "Favoris",
      Icon: Heart,
      match: (p) => p.startsWith("/wish-list"),
      badge: wishCount,
    },
    {
      href: "/setting",
      label: "Compte",
      Icon: User,
      match: (p) => p.startsWith("/setting") || p.startsWith("/orders"),
    },
  ];

  return (
    <nav
      aria-label="Navigation principale"
      className="pb-safe fixed inset-x-0 bottom-0 z-50 md:hidden"
    >
      <div className="glass-card mx-3 mb-3 flex items-stretch justify-around rounded-[26px] px-2 py-2 shadow-luxe-lg">
        {items.map(({ href, label, Icon, match, badge }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className="tap-none group relative flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              <span
                className={cn(
                  "relative flex h-9 w-12 items-center justify-center rounded-full transition-all duration-300 ease-out",
                  active
                    ? "-translate-y-0.5 bg-accent/15"
                    : "bg-transparent group-active:bg-foreground/5",
                )}
              >
                <Icon
                  className={cn(
                    "h-[22px] w-[22px] transition-colors duration-300",
                    active
                      ? "text-accent"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                  strokeWidth={active ? 2.1 : 1.7}
                  fill={
                    active && Icon === Heart ? "currentColor" : "transparent"
                  }
                />
                {badge ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-semibold text-accent-foreground">
                    {badge}
                  </span>
                ) : null}
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium tracking-wide transition-colors duration-300",
                  active ? "text-accent" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
