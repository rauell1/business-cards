"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RotateCw, Nfc, Sparkles, Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cardFinishes, type CardFinishId, site } from "@/lib/site";
import { cn } from "@/lib/cn";

type CrestStyle = "seal" | "botanical" | "minimal";

export function CardStudio({ qr }: { qr: ReactNode }) {
  const reduce = useReducedMotion();
  const [finishId, setFinishId] = useState<CardFinishId>("walnut");
  const [side, setSide] = useState<"front" | "back">("front");
  const [customName, setCustomName] = useState("Wanjiru Kamau");
  const [customRole, setCustomRole] = useState("Partner · Kamau & Waweru");
  const [crest, setCrest] = useState<CrestStyle>("seal");

  const finish = cardFinishes.find((f) => f.id === finishId) ?? cardFinishes[0];

  const initials =
    customName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "AK";

  const slugPreview =
    customName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 18) || "wanjiru";

  function handleCommission() {
    window.dispatchEvent(
      new CustomEvent("alama:select-order", {
        detail: {
          plan:
            finish.id === "walnut"
              ? "Professional (KES 6,500)"
              : "Atelier (KES 12,000)",
          finish: finish.name,
          engravingName: customName.trim() || "Wanjiru Kamau",
          engravingRole: customRole.trim() || "Partner",
        },
      }),
    );
  }

  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="relative scroll-mt-24 overflow-hidden bg-paper-2/55 py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(85%_65%_at_75%_20%,#e9dfd0_0%,transparent_65%)]" />
      </div>

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          {/* Controls Column */}
          <div>
            <Reveal>
              <SectionHeading
                id="studio-heading"
                eyebrow="Interactive card studio"
                title={
                  <>
                    Design the mark{" "}
                    <span className="italic text-forest">you place on the table.</span>
                  </>
                }
                body="Compare our three sustainably sourced East African timber finishes, test your laser engraving live, and inspect the reverse QR plate."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 space-y-6 rounded-2xl border border-ink/10 bg-white/75 p-6 shadow-lift backdrop-blur-md sm:p-7">
                {/* 1. Wood Finish Selector */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.75rem] font-semibold tracking-[0.04em] text-ink/80 uppercase">
                      1. Select hardwood finish
                    </span>
                    <span className="text-[0.75rem] font-medium text-forest">
                      {finish.tier}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2.5">
                    {cardFinishes.map((item) => {
                      const active = item.id === finishId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFinishId(item.id)}
                          aria-pressed={active}
                          className={cn(
                            "flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-200",
                            active
                              ? "border-forest bg-forest/6 shadow-sm ring-1 ring-forest"
                              : "border-ink/10 bg-white/70 hover:border-ink/25",
                          )}
                        >
                          <span className="flex w-full items-center justify-between">
                            <span
                              className="size-6 rounded-full border border-white/60 shadow-inner"
                              style={{ background: item.surfaceGradient }}
                              aria-hidden="true"
                            />
                            {active && (
                              <Check className="size-3.5 text-forest" aria-hidden="true" />
                            )}
                          </span>
                          <span className="mt-2.5 block text-[0.8125rem] font-semibold text-ink">
                            {item.name}
                          </span>
                          <span className="mt-0.5 block text-[0.6875rem] text-ink/65">
                            {item.priceLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2.5 text-[0.75rem] text-ink/70">{finish.origin}</p>
                </div>

                {/* 2. Live Engraving Inputs */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="studio-name"
                      className="block text-[0.75rem] font-semibold tracking-[0.04em] text-ink/80 uppercase"
                    >
                      2. Laser-etched name
                    </label>
                    <input
                      id="studio-name"
                      type="text"
                      maxLength={28}
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Your full name"
                      className="mt-1.5 w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-[0.875rem] font-medium text-ink transition-colors focus:border-forest focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="studio-role"
                      className="block text-[0.75rem] font-semibold tracking-[0.04em] text-ink/80 uppercase"
                    >
                      Title &amp; firm
                    </label>
                    <input
                      id="studio-role"
                      type="text"
                      maxLength={36}
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="Role · Company"
                      className="mt-1.5 w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-[0.875rem] font-medium text-ink transition-colors focus:border-forest focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. Mark / Crest Style */}
                <div>
                  <span className="block text-[0.75rem] font-semibold tracking-[0.04em] text-ink/80 uppercase">
                    3. Centre mark style
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: "seal", label: "Monogram Seal" },
                        { id: "botanical", label: "Alama Leaf" },
                        { id: "minimal", label: "Pure Minimal" },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setCrest(opt.id);
                          setSide("front");
                        }}
                        aria-pressed={crest === opt.id}
                        className={cn(
                          "rounded-lg border px-3 py-2 text-[0.75rem] font-medium transition-colors",
                          crest === opt.id
                            ? "border-forest bg-forest text-paper"
                            : "border-ink/10 bg-white/70 text-ink/75 hover:text-ink",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/8 pt-4">
                  <button
                    type="button"
                    onClick={() => setSide((s) => (s === "front" ? "back" : "front"))}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-ink transition-colors hover:border-forest hover:text-forest"
                  >
                    <RotateCw className="size-3.5" aria-hidden="true" />
                    Flip to {side === "front" ? "reverse QR" : "front engraving"}
                  </button>

                  <a
                    href="#cta"
                    onClick={handleCommission}
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[0.8125rem] font-medium text-paper shadow-sm transition-colors hover:bg-forest-600"
                  >
                    Carry this configuration to order
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Live 3D Card Preview Column */}
          <Reveal delay={0.12}>
            <div className="flex flex-col items-center">
              {/* Front / Back Pill Switcher */}
              <div className="mb-5 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white/70 p-1 backdrop-blur-md">
                {(["front", "back"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSide(s)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-[0.75rem] font-medium transition-colors",
                      side === s ? "bg-forest text-paper" : "text-ink/70 hover:text-ink",
                    )}
                  >
                    {s === "front" ? "Front · Laser Etched" : "Reverse · Brass QR Plate"}
                  </button>
                ))}
              </div>

              {/* 3D Card Stage */}
              <div className="relative w-full max-w-[29rem] [perspective:1400px]">
                <motion.div
                  animate={{ rotateY: side === "back" ? 180 : 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
                  }
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative aspect-[1.586/1] w-full"
                >
                  {/* FRONT OF CARD */}
                  <div
                    style={{
                      background: finish.surfaceGradient,
                      backfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.35rem] border border-white/25 p-6 shadow-[0_32px_70px_-24px_rgba(16,32,26,0.55)] sm:p-8"
                  >
                    {/* Procedural SVG wood grain */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 600 380"
                      className="pointer-events-none absolute inset-0 h-full w-full opacity-35 mix-blend-overlay"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M-20 40 Q 180 15, 360 50 T 620 35 M-20 95 Q 220 120, 410 85 T 620 105 M-20 160 Q 150 135, 330 175 T 620 155 M-20 225 Q 240 250, 440 215 T 620 235 M-20 295 Q 190 270, 390 310 T 620 290 M-20 345 Q 260 365, 460 335 T 620 355"
                        fill="none"
                        stroke={finish.grainColor}
                        strokeWidth="2.2"
                      />
                    </svg>

                    {/* Subtle warm sheen */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_15%_10%,rgba(255,255,255,0.16),transparent_60%)]"
                    />

                    {/* Card Top Row */}
                    <div className="relative flex items-center justify-between">
                      <span
                        style={{ color: finish.inlayColor }}
                        className="text-[0.6875rem] font-semibold tracking-[0.22em] uppercase opacity-80"
                      >
                        {site.name} · {finish.name}
                      </span>
                      <span
                        style={{ color: finish.inlayColor }}
                        className="inline-flex items-center gap-1.5 text-[0.6875rem] tracking-[0.12em] uppercase opacity-75"
                      >
                        <Nfc className="size-4" aria-hidden="true" />
                        NFC
                      </span>
                    </div>

                    {/* Center Crest / Mark */}
                    <div className="relative my-auto flex items-center justify-center">
                      {crest === "seal" && (
                        <div
                          style={{
                            borderColor: finish.inlayColor,
                            color: finish.inlayColor,
                          }}
                          className="flex size-16 items-center justify-center rounded-full border-2 opacity-90 sm:size-20"
                        >
                          <span className="text-display text-[1.6rem] tracking-[0.06em] sm:text-[1.95rem]">
                            {initials}
                          </span>
                        </div>
                      )}
                      {crest === "botanical" && (
                        <div
                          style={{
                            borderColor: finish.inlayColor,
                            color: finish.inlayColor,
                          }}
                          className="flex size-16 items-center justify-center rounded-full border opacity-90 sm:size-20"
                        >
                          <svg
                            viewBox="0 0 32 32"
                            fill="none"
                            className="size-9 sm:size-11"
                            aria-hidden="true"
                          >
                            <path
                              d="M22.5 9.5c0 6.2-4 10.5-9.6 10.5h-1.4v-1.8c0-5.6 3.6-8.7 11-8.7Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                            <path
                              d="M9.5 22.5c0-4.1 1.4-7.2 4-9.1"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      )}
                      {crest === "minimal" && (
                        <div
                          style={{ color: finish.inlayColor }}
                          className="text-center opacity-90"
                        >
                          <span className="text-display text-[1.9rem] italic tracking-[-0.02em] sm:text-[2.3rem]">
                            {site.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Bottom Row: Live Engraved Name & Role */}
                    <div className="relative flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <p
                          style={{ color: finish.inlayColor }}
                          className="truncate text-display text-[1.35rem] tracking-[-0.01em] sm:text-[1.6rem]"
                        >
                          {customName.trim() || "Your Name"}
                        </p>
                        <p
                          style={{ color: finish.inlayColor }}
                          className="mt-0.5 truncate text-[0.75rem] tracking-[0.04em] opacity-75"
                        >
                          {customRole.trim() || "Your Title · Organisation"}
                        </p>
                      </div>
                      <span
                        style={{
                          backgroundColor: finish.accentColor,
                        }}
                        className="size-2.5 shrink-0 rounded-full opacity-90 shadow-sm"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* REVERSE OF CARD */}
                  <div
                    style={{
                      background: finish.surfaceGradient,
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.35rem] border border-white/25 p-6 shadow-[0_32px_70px_-24px_rgba(16,32,26,0.55)] sm:p-8"
                  >
                    <div className="relative flex items-center justify-between">
                      <span
                        style={{ color: finish.inlayColor }}
                        className="text-[0.6875rem] font-semibold tracking-[0.18em] uppercase opacity-75"
                      >
                        Verified Alama Pass
                      </span>
                      <span
                        style={{ color: finish.inlayColor }}
                        className="text-[0.6875rem] opacity-75"
                      >
                        55% Reforestation Pledge
                      </span>
                    </div>

                    <div className="relative my-auto flex items-center gap-5 sm:gap-7">
                      {/* Brass / Contrast QR Plate */}
                      <div className="shrink-0 rounded-2xl border border-brass/50 bg-[#f8f5ef] p-2.5 shadow-md">
                        <div className="size-20 sm:size-24">{qr}</div>
                      </div>
                      <div className="min-w-0">
                        <p
                          style={{ color: finish.inlayColor }}
                          className="text-[0.75rem] font-semibold tracking-[0.08em] uppercase opacity-80"
                        >
                          Tap phone or scan QR
                        </p>
                        <p
                          style={{ color: finish.inlayColor }}
                          className="mt-1 truncate text-display text-[1.2rem] sm:text-[1.4rem]"
                        >
                          {customName.trim() || "Wanjiru Kamau"}
                        </p>
                        <p
                          style={{ color: finish.inlayColor }}
                          className="mt-1 truncate text-[0.75rem] opacity-80"
                        >
                          {site.domain}/p/{slugPreview}
                        </p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between text-[0.6875rem]">
                      <span style={{ color: finish.inlayColor }} className="opacity-70">
                        Handcrafted in Nairobi, Kenya
                      </span>
                      <span
                        style={{ color: finish.inlayColor }}
                        className="font-mono opacity-75"
                      >
                        ALM-2026-KE
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <p className="mt-5 inline-flex items-center gap-2 text-center text-[0.75rem] text-ink/70">
                <Sparkles className="size-3.5 text-brass" aria-hidden="true" />
                Every card is cut from real timber, so grain patterns are one of a kind.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
