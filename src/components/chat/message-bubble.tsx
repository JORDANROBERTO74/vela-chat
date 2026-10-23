import { BrandMark } from "@/components/brand-mark";
import type { Dictionary, Message } from "@/i18n/dictionaries/en";

export function MessageBubble({
  message,
  dict,
}: {
  message: Message;
  dict: Dictionary;
}) {
  if (message.role === "user") {
    return (
      <li className="flex justify-end">
        <div className="max-w-[85%] sm:max-w-[75%]">
          <p className="sr-only">
            {dict.thread.messageFrom.replace("{name}", dict.thread.you)}
          </p>
          <div className="whitespace-pre-line rounded-2xl rounded-br-md bg-brand px-4 py-3 text-[14px] leading-6 text-white">
            {message.text}
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="flex gap-3">
      <BrandMark className="mt-0.5 size-8" />
      <div className="min-w-0 flex-1">
        <p className="font-serif text-[14px] leading-none text-brand">
          {dict.thread.assistant}
        </p>
        <div className="mt-1.5 whitespace-pre-line text-[14px] leading-7 text-ink">
          {message.text}
        </div>
      </div>
    </li>
  );
}
