"use client";

import type { RefObject } from "react";
import { ArrowUp, ChevronDown, Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { ChatModel } from "@/lib/chat-store";

type ComposerProps = {
  dict: Dictionary;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  model: ChatModel;
  onModelChange: (model: ChatModel) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};

export function Composer({
  dict,
  value,
  onChange,
  onSubmit,
  disabled,
  model,
  onModelChange,
  textareaRef,
}: ComposerProps) {
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="shrink-0 border-t border-line bg-paper px-4 pb-4 pt-3 md:px-8">
      <div className="mx-auto w-full max-w-[860px]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className="rounded-2xl border border-line bg-surface p-2 shadow-[0_8px_30px_rgba(28,27,24,0.05)] transition focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/10"
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing &&
                event.keyCode !== 229
              ) {
                event.preventDefault();
                if (canSend) {
                  onSubmit();
                }
              }
            }}
            rows={2}
            placeholder={dict.composer.placeholder}
            aria-label={dict.composer.placeholder}
            className="w-full resize-none border-0 bg-transparent px-3 py-2 text-[14px] leading-6 outline-none placeholder:text-ink-soft/70"
          />

          <div className="flex items-center justify-between gap-2 px-1 pb-0.5">
            <label className="relative inline-flex items-center gap-1.5 text-[11px] text-ink-soft">
              <span className="sr-only">{dict.composer.model}</span>
              <Sparkles className="size-3.5 text-brand" />
              <select
                value={model}
                onChange={(event) =>
                  onModelChange(event.target.value as ChatModel)
                }
                className="cursor-pointer appearance-none bg-transparent pr-4 text-[11px] font-medium text-ink outline-none"
              >
                <option value="balanced">
                  {dict.composer.models.balanced}
                </option>
                <option value="fast">{dict.composer.models.fast}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-0 size-3 text-ink-soft" />
            </label>

            <div className="flex items-center gap-3">
              <span className="hidden text-[10px] text-ink-soft md:inline">
                {dict.composer.hint}
              </span>
              <button
                type="submit"
                disabled={!canSend}
                aria-label={dict.composer.send}
                className="flex size-9 items-center justify-center rounded-xl bg-brand text-white transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </div>
        </form>

        <p className="mt-2 text-center text-[10px] text-ink-soft">
          {dict.composer.disclaimer}
        </p>
      </div>
    </div>
  );
}
