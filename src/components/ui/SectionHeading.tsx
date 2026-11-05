import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 eyebrow",
        tone === "dark" ? "text-forest-400" : "text-sand/80",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-7",
          tone === "dark" ? "bg-forest-400/45" : "bg-sand/40",
        )}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "dark",
  className,
  titleClassName,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  id?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "text-display text-[clamp(2.1rem,5.2vw,3.75rem)]",
          tone === "dark" ? "text-ink" : "text-paper",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {body && (
        <p
          className={cn(
            "max-w-[46ch] text-[0.975rem] leading-relaxed sm:text-base",
            align === "center" && "mx-auto max-w-[52ch]",
            tone === "dark" ? "text-ink/62" : "text-paper/62",
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}
