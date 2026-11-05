import { cn } from "@/lib/cn";

/**
 * Wordmark: a leaf inside a rounded square — the card, and the commitment.
 * Pure SVG so it stays crisp at any size and inherits currentColor.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("text-forest", className)}
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M21.4 10.6c0 5.1-3.3 8.6-7.9 8.6h-1.2v-1.5c0-4.6 3-7.1 9.1-7.1Z"
        fill="#F8F5EF"
        fillOpacity="0.95"
      />
      <path
        d="M10.6 21.4c0-3.4 1.1-5.9 3.2-7.5"
        stroke="#F8F5EF"
        strokeOpacity="0.7"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="10.6" cy="21.4" r="1.5" fill="#D98D63" />
    </svg>
  );
}
