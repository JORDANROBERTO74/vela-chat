import { FileText, ListChecks, Sparkles } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import type { Dictionary } from "@/i18n/get-dictionary";

export function EmptyState({
  dict,
  onSuggestion,
}: {
  dict: Dictionary;
  onSuggestion: (prompt: string) => void;
}) {
  const suggestions = [
    { icon: FileText, ...dict.empty.suggestions.summarize },
    { icon: Sparkles, ...dict.empty.suggestions.brainstorm },
    { icon: ListChecks, ...dict.empty.suggestions.plan },
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
      <BrandMark className="size-12" />
      <h2 className="mt-6 max-w-[460px] text-balance font-serif text-[32px] leading-[1.15] tracking-[-0.02em] sm:text-[38px]">
        {dict.empty.title}
      </h2>
      <p className="mt-3 max-w-[420px] text-[13.5px] leading-6 text-ink-soft">
        {dict.empty.subtitle}
      </p>

      <div className="mt-8 grid w-full max-w-[620px] gap-2 sm:grid-cols-3">
        {suggestions.map(({ icon: Icon, label, prompt }) => (
          <button
            key={label}
            type="button"
            onClick={() => onSuggestion(prompt)}
            className="group rounded-xl border border-line bg-surface p-3 text-left transition hover:border-brand/30 hover:bg-brand-soft/60"
          >
            <Icon className="size-4 text-brand" />
            <span className="mt-3 block text-[12px] font-medium leading-5 text-ink">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
