"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-[transform,box-shadow,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform active:scale-[0.985] disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest text-paper shadow-[0_1px_0_rgba(255,255,255,0.14)_inset,0_10px_30px_-12px_rgba(18,54,42,0.65)] hover:bg-forest-600 hover:shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_18px_40px_-14px_rgba(18,54,42,0.7)] hover:-translate-y-0.5",
  secondary:
    "border border-ink/15 bg-white/60 text-ink backdrop-blur-md hover:border-ink/25 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lift",
  ghost: "text-ink/75 hover:text-ink hover:bg-ink/5",
  light:
    "bg-paper text-forest shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)] hover:bg-white hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.875rem]",
  lg: "h-13 px-7 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
};

/**
 * Renders as <a> when href is given, otherwise <button>.
 * The optional sheen sweep is pure CSS and disabled for reduced motion.
 */
export function CTA({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow = false,
  ...rest
}: CommonProps &
  (
    | ({ href: string } & Omit<ComponentProps<"a">, "href" | "children" | "className">)
    | ({ href?: undefined } & Omit<ComponentProps<"button">, "children" | "className">)
  )) {
  const reduce = useReducedMotion();

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1"
          />
        )}
      </span>
      {!reduce && (
        <span
          aria-hidden="true"
          className="sheen-run pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/btn:opacity-100"
        />
      )}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as ComponentProps<"a">)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {content}
    </button>
  );
}

/** Animated arrow link for low-emphasis navigation. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-sm font-medium text-forest underline decoration-forest/25 decoration-1 underline-offset-[5px] transition-colors hover:decoration-forest/70",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1"
      />
    </a>
  );
}

/** Small floating card used for hero + showcase annotations. */
export function FloatChip({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("glass rounded-2xl px-3.5 py-2.5 text-[0.8125rem]", className)}
      initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
