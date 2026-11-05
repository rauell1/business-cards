"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Nfc,
  QrCode,
  PencilLine,
  Contact,
  BarChart3,
  ScanLine,
  WifiOff,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { features } from "@/lib/site";
import { cn } from "@/lib/cn";

const icons = {
  nfc: Nfc,
  qr: QrCode,
  pencil: PencilLine,
  contact: Contact,
  chart: BarChart3,
  scan: ScanLine,
  offline: WifiOff,
} as const;

export function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="card" aria-labelledby="features-heading" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <Reveal>
            <SectionHeading
              id="features-heading"
              eyebrow="What it actually does"
              title={
                <>
                  Not a gimmick.{" "}
                  <span className="italic text-forest">A working tool</span> for
                  meeting people.
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[52ch] text-[0.975rem] leading-relaxed text-ink/60 lg:pb-3">
              An NFC card is only as good as the profile behind it. Kadi pairs a
              physical object people keep with a digital identity you control
              forever — plus the quiet machinery that tells you it is working.
            </p>
          </Reveal>
        </div>

        <StaggerGroup
          as="ul"
          className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-12"
        >
          {features.map((f) => {
            const Icon = icons[f.icon];
            const accent = "accent" in f && f.accent;
            return (
              <StaggerItem
                as="li"
                key={f.id}
                className={cn("group relative", f.span)}
              >
                <motion.div
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-[border-color,box-shadow,background-color] duration-400 sm:p-7",
                    accent
                      ? "border-forest/20 bg-forest text-paper shadow-[0_30px_70px_-32px_rgba(18,54,42,0.7)]"
                      : "border-ink/8 bg-white/55 backdrop-blur-sm hover:border-ink/16 hover:bg-white/85 hover:shadow-lift",
                  )}
                >
                  {accent && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(184,145,47,0.35),transparent_70%)] blur-2xl"
                    />
                  )}

                  <div className="relative flex items-start justify-between">
                    <span
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-105",
                        accent
                          ? "border-white/15 bg-white/10 text-paper"
                          : "border-ink/8 bg-paper-2/70 text-forest",
                      )}
                    >
                      <Icon className="size-[1.15rem]" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={cn(
                        "size-4 -translate-y-1 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100",
                        accent ? "text-paper/60" : "text-ink/60",
                      )}
                    />
                  </div>

                  <h3
                    className={cn(
                      "relative mt-5 text-[1.0625rem] font-semibold tracking-[-0.02em]",
                      accent ? "text-paper" : "text-ink",
                    )}
                  >
                    {f.title}
                  </h3>
                  <p
                    className={cn(
                      "relative mt-2 text-[0.875rem] leading-relaxed",
                      accent ? "text-paper/70" : "text-ink/60",
                    )}
                  >
                    {f.body}
                  </p>

                  {accent && (
                    <div
                      aria-hidden="true"
                      className="relative mt-6 flex items-center gap-2 overflow-hidden"
                    >
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.span
                          key={i}
                          className="h-px flex-1 bg-gradient-to-r from-transparent via-paper/40 to-transparent"
                          animate={reduce ? undefined : { opacity: [0.15, 0.6, 0.15] }}
                          transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            delay: i * 0.22,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
