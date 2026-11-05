"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  Download,
  Linkedin,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  Globe,
  MapPin,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useState } from "react";

const actions = [
  { icon: Phone, label: "Call" },
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: Mail, label: "Email" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Globe, label: "Website" },
];

/**
 * A faithful mock of the public profile screen. Deliberately interactive:
 * buttons press in, "Save contact" fires a toast, so the demo feels alive
 * rather than being a screenshot.
 */
export function ProfileDemo({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [saved, setSaved] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-card backdrop-blur-xl",
        className,
      )}
    >
      {/* soft top wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-forest/10 to-transparent"
      />

      <div className="relative px-5 pt-5 pb-5">
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-brass/45 to-moss/25 blur-[6px]" aria-hidden="true" />
            <Image
              src="/images/portrait.webp"
              alt="Portrait of Wanjiru Kamau"
              width={112}
              height={112}
              priority
              className="relative size-16 rounded-full object-cover ring-2 ring-white"
            />
            <span className="absolute -right-0.5 -bottom-0.5 size-4 rounded-full border-2 border-white bg-moss" aria-hidden="true" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/8 bg-white/70 px-2.5 py-1 text-[0.625rem] font-medium tracking-wide text-ink/60">
            <span className="size-1.5 rounded-full bg-moss" aria-hidden="true" />
            kadi.africa/p/wanjiru
          </span>
        </div>

        <div className="mt-3.5">
          <p className="text-[1.15rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
            Wanjiru Kamau
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[0.8125rem] text-ink/60">
            <Briefcase className="size-3" aria-hidden="true" />
            Partner · Kamau &amp; Waweru Advocates
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[0.75rem] text-ink/60">
            <MapPin className="size-3" aria-hidden="true" />
            Upper Hill, Nairobi
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {actions.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              onPointerDown={() => setPressed(label)}
              onPointerUp={() => setPressed(null)}
              onPointerLeave={() => setPressed(null)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border border-ink/8 bg-white/70 py-2.5 text-[0.6875rem] font-medium text-ink/70 transition-all duration-200",
                "hover:-translate-y-0.5 hover:border-forest/25 hover:bg-white hover:text-forest hover:shadow-lift",
                pressed === label && "scale-95",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setSaved(true)}
          className={cn(
            "group/save mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[0.8125rem] font-medium transition-all duration-300",
            saved
              ? "bg-moss/15 text-forest"
              : "bg-forest text-paper hover:bg-forest-600",
          )}
        >
          {saved ? (
            <>
              <motion.span
                initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="text-[0.8125rem]"
              >
                ✓
              </motion.span>
              Saved to contacts
            </>
          ) : (
            <>
              <Download className="size-3.5 transition-transform duration-300 group-hover/save:translate-y-0.5" aria-hidden="true" />
              Save contact
            </>
          )}
        </button>

        <div className="mt-3.5 flex items-center justify-center gap-2.5">
          {socials.map(({ icon: Icon, label }) => (
            <span
              key={label}
              title={label}
              className="inline-flex size-8 items-center justify-center rounded-full border border-ink/8 bg-white/60 text-ink/60 transition-colors hover:border-forest/25 hover:text-forest"
            >
              <Icon className="size-3.5" aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
