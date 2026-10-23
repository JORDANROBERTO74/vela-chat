"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  localeCookie,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const suffix = pathname.split("/").slice(2).join("/");

  // Remember the locale the visitor is actually browsing so a later visit to
  // "/" does not override an explicit choice.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.cookie = `${localeCookie}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, [locale]);

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex items-center rounded-lg border border-line bg-surface p-0.5",
        className,
      )}
    >
      {locales.map((code) => (
        <Link
          key={code}
          href={`/${code}${suffix ? `/${suffix}` : ""}`}
          hrefLang={code}
          aria-current={code === locale ? "true" : undefined}
          className={cn(
            "rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] transition",
            code === locale
              ? "bg-brand text-white"
              : "text-ink-soft hover:bg-brand-soft hover:text-brand",
          )}
        >
          {code}
          <span className="sr-only"> — {localeNames[code]}</span>
        </Link>
      ))}
    </div>
  );
}
