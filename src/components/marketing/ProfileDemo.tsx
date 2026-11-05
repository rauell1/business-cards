"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useState } from "react";
import { demoProfile, site } from "@/lib/site";
import { downloadDemoVCard } from "@/lib/vcard";

const actions = [
  { id: "call", icon: Phone, label: "Call", detail: demoProfile.phone },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp", detail: "Chat on WhatsApp" },
  { id: "email", icon: Mail, label: "Email", detail: demoProfile.email },
] as const;

const socials = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Globe, label: "Website" },
] as const;

/**
 * Interactive mock of the public Alama profile screen.
 * Buttons trigger live feedback, "Save contact" downloads a real .vcf file,
 * and the top pill links directly to the live /p/wanjiru route.
 */
export function ProfileDemo({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [saved, setSaved] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const activeInfo = actions.find((a) => a.id === selectedAction);

  function handleSave() {
    downloadDemoVCard();
    setSaved(true);
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-white/75 bg-white/85 shadow-card backdrop-blur-xl",
        className,
      )}
    >
      {/* soft top wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-forest/10 to-transparent"
      />

      <div className="relative px-5 pt-5 pb-5">
        <div className="flex items-start justify-between gap-2">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-brass/45 to-moss/25 blur-[6px]" aria-hidden="true" />
            <Image
              src={demoProfile.portrait}
              alt={`Portrait of ${demoProfile.name}`}
              width={112}
              height={112}
              priority
              className="relative size-15 rounded-full object-cover ring-2 ring-white"
            />
            <span className="absolute -right-0.5 -bottom-0.5 size-4 rounded-full border-2 border-white bg-moss" aria-hidden="true" />
          </div>
          <Link
            href="/p/wanjiru"
            className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white/85 px-2.5 py-1 text-[0.6875rem] font-medium text-ink/75 transition-colors hover:border-forest hover:text-forest"
          >
            <span className="size-1.5 rounded-full bg-moss" aria-hidden="true" />
            {site.domain}/p/wanjiru
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-3.5">
          <p className="text-[1.125rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
            {demoProfile.name}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[0.75rem] text-ink/70">
            <Briefcase className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate">Partner · Kamau &amp; Waweru</span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[0.75rem] text-ink/65">
            <MapPin className="size-3 shrink-0" aria-hidden="true" />
            {demoProfile.location}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {actions.map(({ id, icon: Icon, label }) => {
            const isSelected = selectedAction === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedAction(isSelected ? null : id)}
                aria-pressed={isSelected}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border py-2.5 text-[0.6875rem] font-medium transition-all duration-200",
                  isSelected
                    ? "border-forest bg-forest/8 text-forest"
                    : "border-ink/10 bg-white/75 text-ink/75 hover:-translate-y-0.5 hover:border-forest/30 hover:bg-white hover:text-forest",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence initial={false}>
          {activeInfo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-2 flex items-center justify-between rounded-xl border border-forest/15 bg-forest/6 px-3 py-2 text-[0.6875rem]">
                <span className="truncate font-medium text-forest">{activeInfo.detail}</span>
                <Link
                  href="/p/wanjiru"
                  className="ml-2 shrink-0 font-semibold text-forest underline underline-offset-2"
                >
                  Open
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={handleSave}
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
              vCard downloaded
            </>
          ) : (
            <>
              <Download className="size-3.5 transition-transform duration-300 group-hover/save:translate-y-0.5" aria-hidden="true" />
              Save contact (.vcf)
            </>
          )}
        </button>

        <div className="mt-3.5 flex items-center justify-between border-t border-ink/8 pt-3">
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="/p/wanjiru"
                title={`${label} on live profile`}
                className="inline-flex size-7 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink/70 transition-colors hover:border-forest hover:text-forest"
              >
                <Icon className="size-3.5" aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/p/wanjiru"
            className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-forest hover:underline"
          >
            Full profile
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
