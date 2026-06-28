"use client";

import { useEffect, useState } from "react";
import { Icons } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Lang = { code: string; label: string; dir: "ltr" | "rtl"; flag: string };

const LANGS: Lang[] = [
  { code: "fr", label: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "en", label: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "ar", label: "العربية", dir: "rtl", flag: "🇸🇦" },
];

const STORAGE_KEY = "khaymtak.lang";

/**
 * Locale preference selector. Persists the choice and updates <html lang/dir>.
 * Content translation requires an i18n layer (next-intl / next-i18next) — this
 * component is the UI + preference plumbing, ready to be wired to one.
 */
export function LanguageSelector({
  className,
  triggerClassName,
}: {
  className?: string;
  triggerClassName?: string;
}) {
  const [current, setCurrent] = useState<Lang>(LANGS[0]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const found = LANGS.find((l) => l.code === stored);
    if (found) {
      setCurrent(found);
      applyLang(found);
    }
  }, []);

  function applyLang(lang: Lang) {
    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.dir;
  }

  function select(lang: Lang) {
    setCurrent(lang);
    localStorage.setItem(STORAGE_KEY, lang.code);
    applyLang(lang);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Choisir la langue"
          className={cn(
            "tap-none inline-flex items-center gap-1.5 rounded-full text-foreground/80 transition-colors hover:text-accent",
            triggerClassName,
          )}
        >
          <Icons.globe className="h-[18px] w-[18px]" strokeWidth={1.6} />
          <span className="text-[11px] font-medium uppercase tracking-luxe">
            {current.code}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("min-w-44", className)}>
        {LANGS.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => select(lang)}
            className={cn(
              "cursor-pointer gap-2.5",
              current.code === lang.code && "text-accent",
            )}
          >
            <span aria-hidden>{lang.flag}</span>
            <span className="flex-1">{lang.label}</span>
            {current.code === lang.code && (
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
