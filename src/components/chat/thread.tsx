"use client";

import { useEffect, useRef } from "react";
import { BrandMark } from "@/components/brand-mark";
import type { Dictionary, Message } from "@/i18n/dictionaries/en";
import { EmptyState } from "./empty-state";
import { MessageBubble } from "./message-bubble";

type ThreadProps = {
  dict: Dictionary;
  messages: Message[];
  pending: boolean;
  onSuggestion: (prompt: string) => void;
};

export function Thread({
  dict,
  messages,
  pending,
  onSuggestion,
}: ThreadProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    endRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages.length, pending]);

  return (
    <section
      id="chat"
      tabIndex={-1}
      className="flex min-h-0 flex-1 flex-col overflow-y-auto outline-none"
    >
      <p aria-live="polite" className="sr-only">
        {pending ? dict.thread.typing : ""}
      </p>

      <div className="mx-auto flex w-full max-w-[820px] flex-1 flex-col px-4 py-6 md:px-8 md:py-10">
        {messages.length === 0 ? (
          <EmptyState dict={dict} onSuggestion={onSuggestion} />
        ) : (
          <ol className="flex flex-col gap-7">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} dict={dict} />
            ))}

            {pending && (
              <li aria-hidden="true" className="flex gap-3">
                <BrandMark className="mt-0.5 size-8" />
                <div>
                  <p className="font-serif text-[14px] leading-none text-brand">
                    {dict.thread.assistant}
                  </p>
                  <div className="mt-2.5 flex items-center gap-1">
                    <span className="size-1.5 animate-bounce rounded-full bg-ink-soft/60 motion-reduce:animate-none [animation-delay:-0.3s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-ink-soft/60 motion-reduce:animate-none [animation-delay:-0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-ink-soft/60 motion-reduce:animate-none" />
                  </div>
                </div>
              </li>
            )}
          </ol>
        )}

        <div ref={endRef} className="h-2 shrink-0" />
      </div>
    </section>
  );
}
