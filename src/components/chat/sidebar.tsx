"use client";

import { useEffect, useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  MessageSquare,
  Plus,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

export type ChatListItem = {
  id: string;
  title: string;
};

type SidebarProps = {
  dict: Dictionary;
  items: ChatListItem[];
  activeId: string;
  query: string;
  onQueryChange: (value: string) => void;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onReset: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function Sidebar({
  dict,
  items,
  activeId,
  query,
  onQueryChange,
  onSelect,
  onNewChat,
  onReset,
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!resetOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setResetOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetOpen]);

  const hidden = !isDesktop && !mobileOpen;

  const handleReset = () => {
    onReset();
    setResetOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={onCloseMobile}
        aria-label={dict.common.close}
        tabIndex={mobileOpen ? 0 : -1}
        className={cn(
          "fixed inset-0 z-30 bg-ink/25 backdrop-blur-[2px] transition-opacity duration-200 motion-reduce:transition-none lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        aria-label={dict.common.brand}
        aria-hidden={hidden}
        inert={hidden}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[288px] shrink-0 flex-col border-r border-line bg-shell transition-transform duration-200 motion-reduce:transition-none lg:static lg:z-auto lg:translate-x-0",
          collapsed ? "lg:w-[76px]" : "lg:w-[288px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div
          className={cn(
            "flex h-[72px] shrink-0 items-center gap-3 border-b border-line px-5",
            collapsed && "lg:justify-center lg:px-0",
          )}
        >
          <BrandMark />
          <div className={cn("min-w-0 flex-1", collapsed && "lg:hidden")}>
            <p className="font-serif text-[23px] leading-none tracking-tight">
              {dict.common.brand.toLowerCase()}
            </p>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-2 text-ink-soft transition hover:bg-surface hover:text-ink lg:hidden"
            aria-label={dict.common.close}
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-4">
          <button
            type="button"
            onClick={onNewChat}
            className={cn(
              "flex h-10 shrink-0 items-center gap-3 rounded-xl bg-brand px-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-brand-strong",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            <Plus className="size-[18px] shrink-0" />
            <span className={cn("truncate", collapsed && "lg:hidden")}>
              {dict.sidebar.newChat}
            </span>
          </button>

          <div className={cn("mt-4", collapsed && "lg:hidden")}>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                aria-label={dict.sidebar.searchLabel}
                placeholder={dict.sidebar.searchPlaceholder}
                className="h-9 w-full rounded-lg border border-line bg-surface pl-8 pr-3 text-[12px] outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/10"
              />
            </div>
          </div>

          <p
            className={cn(
              "mb-2 mt-6 px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-soft",
              collapsed && "lg:hidden",
            )}
          >
            {dict.sidebar.recent}
          </p>

          <nav
            aria-label={dict.sidebar.recent}
            className={cn("space-y-0.5", collapsed && "lg:hidden")}
          >
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={item.id === activeId ? "page" : undefined}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12.5px] transition",
                  item.id === activeId
                    ? "bg-surface font-medium text-ink shadow-[0_1px_2px_rgba(28,27,24,0.04)]"
                    : "text-ink-soft hover:bg-surface/70 hover:text-ink",
                )}
              >
                <MessageSquare className="size-3.5 shrink-0" />
                <span className="truncate">{item.title}</span>
              </button>
            ))}

            {items.length === 0 && (
              <p className="px-3 py-2 text-[12px] text-ink-soft">
                {dict.sidebar.noResults}
              </p>
            )}
          </nav>
        </div>

        <div className="relative border-t border-line p-3">
          {resetOpen && (
            <div className="absolute bottom-full left-3 z-50 mb-2 w-[248px] rounded-xl border border-line bg-surface p-3 shadow-xl">
              <p className="text-[12px] leading-5">
                {dict.sidebar.resetQuestion}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  autoFocus
                  onClick={handleReset}
                  className="rounded-md bg-brand px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-brand-strong"
                >
                  {dict.sidebar.resetConfirm}
                </button>
                <button
                  type="button"
                  onClick={() => setResetOpen(false)}
                  className="rounded-md px-2 py-1.5 text-[11px] font-medium text-ink-soft transition hover:text-ink"
                >
                  {dict.sidebar.cancel}
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setResetOpen((value) => !value)}
            aria-expanded={resetOpen}
            className={cn(
              "flex h-9 w-full items-center gap-3 rounded-lg px-3 text-[12px] text-ink-soft transition hover:bg-surface hover:text-ink",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            <RotateCcw className="size-4 shrink-0" />
            <span className={cn("truncate", collapsed && "lg:hidden")}>
              {dict.sidebar.reset}
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? dict.sidebar.expand : dict.sidebar.collapse}
            aria-expanded={!collapsed}
            className={cn(
              "mt-1 hidden h-9 w-full items-center gap-3 rounded-lg px-3 text-[12px] text-ink-soft transition hover:bg-surface hover:text-ink lg:flex",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            {collapsed ? (
              <ChevronsRight className="size-4 shrink-0" />
            ) : (
              <ChevronsLeft className="size-4 shrink-0" />
            )}
            <span className={cn("truncate", collapsed && "lg:hidden")}>
              {collapsed ? dict.sidebar.expand : dict.sidebar.collapse}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
