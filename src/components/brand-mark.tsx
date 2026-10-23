import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-9 shrink-0", className)}
    >
      <rect width="32" height="32" rx="9" fill="#1f5c54" />
      <path
        d="M16.4 7.2v16.2"
        stroke="#f8f5ef"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M16.4 8.6c4.6 2.3 7 6.5 7 11.4h-7z" fill="#f8f5ef" />
      <path
        d="M15.1 11.6c-3.4 2-5.3 5-5.3 8.4h5.3z"
        fill="#f8f5ef"
        opacity="0.7"
      />
      <path
        d="M8.8 24.2h15.2"
        stroke="#f8f5ef"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
