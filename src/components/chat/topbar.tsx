"use client";

import { Menu, PenLine } from "lucide-react";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { formatMessageCount } from "@/lib/format";

type TopbarProps = {
  dict: Dictionary;
  locale: Locale;
  title: string;
  messageCount: number;
  renaming: boolean;
  titleDraft: string;
  onTitleDraftChange: (value: string) => void;
  onStartRename: () => void;
  onSaveRename: () => void;
  onCancelRename: () => void;
  onOpenMenu: () => void;
};

export function Topbar({
  dict,
  locale,
  title,
  messageCount,
  renaming,
  titleDraft,
  onTitleDraftChange,
  onStartRename,
  onSaveRename,
  onCancelRename,
  onOpenMenu,
}: TopbarProps) {
  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between gap-3 border-b border-line bg-paper px-4 md:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenMenu}
          className="rounded-lg p-2 text-ink-soft transition hover:bg-surface hover:text-ink lg:hidden"
          aria-label={dict.topbar.openMenu}
        >
          <Menu className="size-5" />
        </button>

        <div className="min-w-0">
          {renaming ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                onSaveRename();
              }}
              className="flex items-center gap-2"
            >
              <input
                autoFocus
                value={titleDraft}
                onChange={(event) => onTitleDraftChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    onCancelRename();
                  }
                }}
                aria-label={dict.topbar.renameLabel}
                maxLength={80}
                className="h-8 w-[200px] rounded-md border border-line bg-surface px-2 text-[13px] outline-none focus:border-brand/50 focus:ring-2 focus:ring-brand/10 sm:w-[280px]"
              />
              <button
                type="submit"
                className="text-[11px] font-semibold text-brand transition hover:text-brand-strong"
              >
                {dict.topbar.save}
              </button>
              <button
                type="button"
                onClick={onCancelRename}
                className="text-[11px] text-ink-soft transition hover:text-ink"
              >
                {dict.topbar.cancel}
              </button>
            </form>
          ) : (
            <div className="flex min-w-0 items-center gap-2">
              <h1 className="truncate text-[14px] font-semibold tracking-[-0.01em]">
                {title}
              </h1>
              <button
                type="button"
                onClick={onStartRename}
                aria-label={dict.topbar.rename}
                className="rounded-md p-1 text-ink-soft transition hover:bg-surface hover:text-brand"
              >
                <PenLine className="size-3.5" />
              </button>
              <span className="hidden rounded-full border border-line px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-soft sm:inline">
                {dict.common.demo}
              </span>
            </div>
          )}

          <p className="mt-0.5 text-[11px] text-ink-soft">
            {formatMessageCount(
              messageCount,
              locale,
              dict.topbar.messages,
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <LocaleSwitcher locale={locale} label={dict.common.language} />

        <div className="ml-1 flex items-center gap-2 border-l border-line pl-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-brand-soft text-[10px] font-semibold text-brand">
            {dict.topbar.user.initials}
          </div>
          <p className="hidden text-[11px] font-medium lg:block">
            {dict.topbar.user.name}
          </p>
        </div>
      </div>
    </header>
  );
}
