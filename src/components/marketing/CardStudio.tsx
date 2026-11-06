"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Check,
  Nfc,
  RotateCcw,
  RotateCw,
  Sparkles,
  User,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EngravedQr } from "@/components/ui/EngravedQr";
import { cardFinishes, type CardFinishId, site } from "@/lib/site";
import { cn } from "@/lib/cn";

type Layout = "personal" | "organisation";
type MarkStyle = "monogram" | "wordmark" | "leaf" | "none";
type Side = "front" | "back";

/** Every line a customer can engrave. Nothing on the card is fixed copy. */
type Wording = {
  name: string;
  title: string;
  organisation: string;
  tagline: string;
  markText: string;
  backHeadline: string;
  handle: string;
  backFooter: string;
};

const LIMITS = {
  name: 28,
  title: 40,
  organisation: 36,
  tagline: 40,
  monogram: 3,
  wordmark: 18,
  backHeadline: 34,
  handle: 24,
  backFooter: 40,
} as const;

const PRESETS: Record<Layout, { mark: MarkStyle; wording: Wording }> = {
  personal: {
    mark: "monogram",
    wording: {
      name: "Wanjiru Kamau",
      title: "Partner, Commercial Litigation",
      organisation: "Kamau & Waweru Advocates",
      tagline: "",
      markText: "",
      backHeadline: "Tap your phone or scan to connect",
      handle: "",
      backFooter: "Upper Hill, Nairobi",
    },
  },
  organisation: {
    mark: "monogram",
    wording: {
      name: "",
      title: "",
      organisation: "Kamau & Waweru Advocates",
      tagline: "Counsel for East African growth",
      markText: "K&W",
      backHeadline: "Scan to reach our chambers",
      handle: "",
      backFooter: "Upper Hill, Nairobi · Since 2009",
    },
  },
};

const MARK_OPTIONS: { id: MarkStyle; label: string }[] = [
  { id: "monogram", label: "Monogram" },
  { id: "wordmark", label: "Wordmark" },
  { id: "leaf", label: "Alama leaf" },
  { id: "none", label: "No mark" },
];

/** Incised look: a faint highlight below and a shadow above each stroke. */
const ETCH_FILTER =
  "drop-shadow(0 0.18cqw 0 rgba(255,255,255,0.14)) drop-shadow(0 -0.12cqw 0 rgba(0,0,0,0.32))";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, LIMITS.handle);
}

function initialsOf(value: string) {
  const stop = new Set(["and", "the", "of", "&"]);
  return value
    .trim()
    .split(/\s+/)
    .filter((part) => part && !stop.has(part.toLowerCase()))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Font size in container-width units, shrinking long lines so they still fit
 * the card instead of being clipped. Mirrors how we lay out the real engraving.
 */
function fit(text: string, base: number, comfortableChars: number, minScale = 0.62) {
  const len = Math.max(text.length, 1);
  const scale = len <= comfortableChars ? 1 : Math.max(minScale, comfortableChars / len);
  return `${(base * scale).toFixed(2)}cqw`;
}

export function CardStudio() {
  const reduce = useReducedMotion();
  const [finishId, setFinishId] = useState<CardFinishId>("walnut");
  const [side, setSide] = useState<Side>("front");
  const [layout, setLayout] = useState<Layout>("personal");
  const [mark, setMark] = useState<MarkStyle>(PRESETS.personal.mark);
  const [wording, setWording] = useState<Wording>(PRESETS.personal.wording);
  const [handleTouched, setHandleTouched] = useState(false);
  const [makersMark, setMakersMark] = useState(true);

  const finish = cardFinishes.find((f) => f.id === finishId) ?? cardFinishes[0];
  const ink = finish.inlayColor;

  const w = {
    name: wording.name.trim(),
    title: wording.title.trim(),
    organisation: wording.organisation.trim(),
    tagline: wording.tagline.trim(),
    markText: wording.markText.trim(),
    backHeadline: wording.backHeadline.trim(),
    backFooter: wording.backFooter.trim(),
  };

  const isPersonal = layout === "personal";
  const leadIdentity = isPersonal
    ? w.name || "Your name"
    : w.organisation || "Your organisation";

  // Front layout slots, driven entirely by the customer's wording.
  const frontTop = isPersonal
    ? w.organisation
    : [w.name, w.title].filter(Boolean).join(" · ");
  const frontPrimary = leadIdentity;
  const frontSecondary = isPersonal ? w.title : "";

  const autoMonogram =
    initialsOf(isPersonal ? w.name : w.organisation || w.name) || "A";
  const monogram = (w.markText || autoMonogram).slice(0, LIMITS.monogram).toUpperCase();
  const wordmark = (w.markText || w.organisation || w.name || site.name).slice(
    0,
    LIMITS.wordmark,
  );

  const autoHandle =
    slugify(isPersonal ? w.name : w.organisation || w.name) || "your-name";
  const handle = handleTouched ? slugify(wording.handle) || autoHandle : autoHandle;
  const profileUrl = `${site.url}/p/${handle}`;
  const displayUrl = `${site.domain}/p/${handle}`;

  // Reverse top line mirrors the secondary identity: firm for a person, person for a firm.
  const backTop = isPersonal ? w.organisation : frontTop;

  function update<K extends keyof Wording>(key: K, value: Wording[K]) {
    setWording((prev) => ({ ...prev, [key]: value }));
  }

  function chooseLayout(next: Layout) {
    if (next === layout) return;
    setLayout(next);
    setSide("front");
  }

  function chooseMark(next: MarkStyle) {
    if (next === mark) return;
    setMark(next);
    // Custom mark text is style specific (3 letters vs. a short word).
    update("markText", "");
    setSide("front");
  }

  function resetWording() {
    setWording(PRESETS[layout].wording);
    setMark(PRESETS[layout].mark);
    setHandleTouched(false);
    setMakersMark(true);
  }

  function markDescription() {
    if (mark === "monogram") return `Monogram "${monogram}"`;
    if (mark === "wordmark") return `Wordmark "${wordmark}"`;
    if (mark === "leaf") return "Alama leaf";
    return "None";
  }

  function handleCommission() {
    const line = (label: string, value: string) => (value ? `- ${label}: ${value}` : null);
    const brief = [
      `Layout: ${isPersonal ? "Personal" : "Organisation"}`,
      "Front",
      line("Top line", frontTop),
      line("Centre mark", markDescription()),
      line("Tagline", w.tagline),
      line("Main line", frontPrimary),
      line("Second line", frontSecondary),
      "Back",
      line("Top line", backTop),
      line("Headline", w.backHeadline),
      line("Profile link", displayUrl),
      line("Footer", w.backFooter),
      `- Alama maker's mark: ${makersMark ? "Yes" : "No"}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.dispatchEvent(
      new CustomEvent("alama:select-order", {
        detail: {
          plan:
            finish.id === "walnut"
              ? "Professional (KES 6,500)"
              : "Atelier (KES 12,000)",
          finish: finish.name,
          wording: brief,
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
        {/*
          Mobile order: heading, live card, controls (so the card is visible before editing).
          Desktop: heading and controls on the left, sticky card preview on the right.
        */}
        <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-[0.95fr_1.05fr] lg:grid-rows-[auto_1fr]">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <SectionHeading
              id="studio-heading"
              eyebrow="Interactive card studio"
              title={
                <>
                  Your words, your brand,{" "}
                  <span className="italic text-forest">etched in timber.</span>
                </>
              }
              body="Pick a timber, then write every line on the card in your own words or your organisation's. The QR is laser-etched straight into the reverse, with no sticker and no plate."
            />
          </Reveal>

          {/* Controls Column */}
          <div className="lg:col-start-1 lg:row-start-2">
            <Reveal delay={0.08}>
              <div className="space-y-7 rounded-2xl border border-ink/10 bg-white/75 p-6 shadow-lift backdrop-blur-md sm:p-7">
                {/* 1. Wood Finish Selector */}
                <div>
                  <div className="flex items-center justify-between">
                    <StepLabel>1. Select hardwood finish</StepLabel>
                    <span className="text-[0.75rem] font-medium text-forest">{finish.tier}</span>
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
                            {active && <Check className="size-3.5 text-forest" aria-hidden="true" />}
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

                {/* 2. Layout */}
                <div>
                  <StepLabel>2. Who is the card for?</StepLabel>
                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {(
                      [
                        {
                          id: "personal",
                          label: "A person",
                          hint: "Name leads, firm on top",
                          Icon: User,
                        },
                        {
                          id: "organisation",
                          label: "An organisation",
                          hint: "Brand leads, person optional",
                          Icon: Building2,
                        },
                      ] as const
                    ).map(({ id, label, hint, Icon }) => {
                      const active = layout === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => chooseLayout(id)}
                          aria-pressed={active}
                          className={cn(
                            "flex items-start gap-3 rounded-xl border p-3 text-left transition-all duration-200",
                            active
                              ? "border-forest bg-forest/6 ring-1 ring-forest"
                              : "border-ink/10 bg-white/70 hover:border-ink/25",
                          )}
                        >
                          <Icon
                            className={cn("mt-0.5 size-4 shrink-0", active ? "text-forest" : "text-ink/55")}
                            aria-hidden="true"
                          />
                          <span>
                            <span className="block text-[0.8125rem] font-semibold text-ink">{label}</span>
                            <span className="mt-0.5 block text-[0.6875rem] text-ink/65">{hint}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Wording */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StepLabel>3. Write your wording</StepLabel>
                    <div
                      role="tablist"
                      aria-label="Card side to edit"
                      className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-paper/70 p-0.5"
                    >
                      {(["front", "back"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          role="tab"
                          aria-selected={side === s}
                          aria-controls={`studio-${s}-fields`}
                          onClick={() => setSide(s)}
                          className={cn(
                            "rounded-full px-3.5 py-1 text-[0.75rem] font-medium capitalize transition-colors",
                            side === s ? "bg-forest text-paper" : "text-ink/70 hover:text-ink",
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {side === "front" ? (
                    <div id="studio-front-fields" role="tabpanel" className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Field
                        id="studio-name"
                        label={isPersonal ? "Full name" : "Person on the card"}
                        hint={isPersonal ? undefined : "Optional. Leave blank for a company-wide card."}
                        value={wording.name}
                        max={LIMITS.name}
                        placeholder={isPersonal ? "Your full name" : "e.g. Wanjiru Kamau"}
                        onChange={(v) => update("name", v)}
                      />
                      <Field
                        id="studio-title"
                        label="Title or role"
                        hint={isPersonal ? undefined : "Optional. Engraved beside the name."}
                        value={wording.title}
                        max={LIMITS.title}
                        placeholder="e.g. Managing Partner"
                        onChange={(v) => update("title", v)}
                      />
                      <Field
                        id="studio-org"
                        label="Organisation or brand"
                        value={wording.organisation}
                        max={LIMITS.organisation}
                        placeholder="e.g. Kamau & Waweru Advocates"
                        onChange={(v) => update("organisation", v)}
                      />
                      <Field
                        id="studio-tagline"
                        label="Tagline or motto"
                        hint="Optional. Sits under the centre mark."
                        value={wording.tagline}
                        max={LIMITS.tagline}
                        placeholder="e.g. Counsel for East African growth"
                        onChange={(v) => update("tagline", v)}
                      />
                    </div>
                  ) : (
                    <div id="studio-back-fields" role="tabpanel" className="mt-3 grid gap-3 sm:grid-cols-2">
                      <Field
                        id="studio-back-headline"
                        label="Call to action"
                        value={wording.backHeadline}
                        max={LIMITS.backHeadline}
                        placeholder="e.g. Scan to book a consultation"
                        onChange={(v) => update("backHeadline", v)}
                      />
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <label htmlFor="studio-handle" className={labelClass}>
                            Profile link
                          </label>
                          <span className="text-[0.6875rem] text-ink/45 tabular-nums" aria-hidden="true">
                            {handle.length}/{LIMITS.handle}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center overflow-hidden rounded-xl border border-ink/12 bg-white transition-colors focus-within:border-forest">
                          <span className="shrink-0 pl-3.5 text-[0.8125rem] text-ink/50">
                            {site.domain}/p/
                          </span>
                          <input
                            id="studio-handle"
                            type="text"
                            inputMode="url"
                            autoCapitalize="none"
                            spellCheck={false}
                            maxLength={LIMITS.handle}
                            value={handleTouched ? wording.handle : autoHandle}
                            onChange={(e) => {
                              setHandleTouched(true);
                              update(
                                "handle",
                                e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                              );
                            }}
                            aria-describedby="studio-handle-hint"
                            className="w-full min-w-0 bg-transparent py-2.5 pr-3.5 text-[0.875rem] font-medium text-ink focus:outline-none"
                          />
                        </div>
                        <p id="studio-handle-hint" className="mt-1 text-[0.6875rem] text-ink/55">
                          The etched QR updates live. Scan it to test.
                        </p>
                      </div>
                      <Field
                        id="studio-back-footer"
                        label="Footer line"
                        hint="Address, website, licence number or year founded."
                        value={wording.backFooter}
                        max={LIMITS.backFooter}
                        placeholder="e.g. Upper Hill, Nairobi"
                        onChange={(v) => update("backFooter", v)}
                      />
                      <div className="flex items-end">
                        <label className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-ink/12 bg-white px-3.5 py-2.5">
                          <span>
                            <span className="block text-[0.8125rem] font-medium text-ink">
                              Small Alama maker&apos;s mark
                            </span>
                            <span className="block text-[0.6875rem] text-ink/55">
                              Discreet, bottom right of the reverse
                            </span>
                          </span>
                          <input
                            type="checkbox"
                            checked={makersMark}
                            onChange={(e) => setMakersMark(e.target.checked)}
                            className="size-4 shrink-0 accent-forest"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Centre mark */}
                <div>
                  <StepLabel>4. Centre mark</StepLabel>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {MARK_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => chooseMark(opt.id)}
                        aria-pressed={mark === opt.id}
                        className={cn(
                          "rounded-lg border px-3 py-2 text-[0.75rem] font-medium transition-colors",
                          mark === opt.id
                            ? "border-forest bg-forest text-paper"
                            : "border-ink/10 bg-white/70 text-ink/75 hover:text-ink",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {(mark === "monogram" || mark === "wordmark") && (
                    <div className="mt-3 sm:max-w-[60%]">
                      <Field
                        id="studio-mark-text"
                        label={mark === "monogram" ? "Monogram letters" : "Wordmark text"}
                        hint={
                          mark === "monogram"
                            ? `Up to 3 characters. Leave blank to use "${autoMonogram}".`
                            : "A short brand name engraved large in the centre."
                        }
                        value={wording.markText}
                        max={mark === "monogram" ? LIMITS.monogram : LIMITS.wordmark}
                        placeholder={mark === "monogram" ? autoMonogram : w.organisation || site.name}
                        onChange={(v) => update("markText", v)}
                        onFocus={() => setSide("front")}
                      />
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/8 pt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSide((s) => (s === "front" ? "back" : "front"))}
                      className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-ink transition-colors hover:border-forest hover:text-forest"
                    >
                      <RotateCw className="size-3.5" aria-hidden="true" />
                      Flip card
                    </button>
                    <button
                      type="button"
                      onClick={resetWording}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 text-[0.75rem] font-medium text-ink/60 transition-colors hover:text-ink"
                    >
                      <RotateCcw className="size-3.5" aria-hidden="true" />
                      Reset example
                    </button>
                  </div>

                  <a
                    href="#cta"
                    onClick={handleCommission}
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[0.8125rem] font-medium text-paper shadow-sm transition-colors hover:bg-forest-600"
                  >
                    Carry this wording to order
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Live 3D Card Preview Column */}
          <Reveal
            delay={0.12}
            className="row-start-2 lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-6"
          >
            <div className="flex flex-col items-center">
              {/* Front / Back Pill Switcher */}
              <div className="mb-5 inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white/70 p-1 backdrop-blur-md">
                {(["front", "back"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSide(s)}
                    aria-pressed={side === s}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-[0.75rem] font-medium transition-colors",
                      side === s ? "bg-forest text-paper" : "text-ink/70 hover:text-ink",
                    )}
                  >
                    {s === "front" ? "Front · Laser etched" : "Reverse · Etched QR"}
                  </button>
                ))}
              </div>

              {/* 3D Card Stage. Sized in container units so the engraving scales with the card. */}
              <div className="@container w-full max-w-[29rem]">
                <div className="relative w-full [perspective:1400px]">
                  <motion.div
                    animate={{ rotateY: side === "back" ? 180 : 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative aspect-[1.586/1] w-full"
                  >
                    {/* FRONT OF CARD */}
                    <CardFace background={finish.surfaceGradient} grain={finish.grainColor}>
                      <div className="relative flex items-center justify-between gap-[3cqw]" style={{ color: ink }}>
                        <span
                          className="min-w-0 truncate font-semibold uppercase opacity-80"
                          style={{ fontSize: fit(frontTop, 2.3, 30), letterSpacing: "0.2em" }}
                        >
                          {frontTop}
                        </span>
                        <Nfc
                          className="shrink-0 opacity-75"
                          style={{ width: "3.8cqw", height: "3.8cqw" }}
                          aria-hidden="true"
                        />
                      </div>

                      <div
                        className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-[1.6cqw]"
                        style={{ color: ink }}
                      >
                        <CentreMark mark={mark} monogram={monogram} wordmark={wordmark} />
                        {w.tagline && (
                          <p
                            className="max-w-full truncate text-center italic opacity-80"
                            style={{ fontSize: fit(w.tagline, 2.7, 32) }}
                          >
                            {w.tagline}
                          </p>
                        )}
                      </div>

                      <div className="relative flex items-end justify-between gap-[3cqw]" style={{ color: ink }}>
                        <div className="min-w-0">
                          <p
                            className="truncate text-display tracking-[-0.01em]"
                            style={{ fontSize: fit(frontPrimary, 5.6, 16, 0.58), lineHeight: 1.15 }}
                          >
                            {frontPrimary}
                          </p>
                          {frontSecondary && (
                            <p
                              className="truncate opacity-75"
                              style={{
                                fontSize: fit(frontSecondary, 2.6, 32),
                                letterSpacing: "0.04em",
                                marginTop: "0.5cqw",
                              }}
                            >
                              {frontSecondary}
                            </p>
                          )}
                        </div>
                        <span
                          className="shrink-0 rounded-full opacity-90 shadow-sm"
                          style={{
                            width: "2.2cqw",
                            height: "2.2cqw",
                            backgroundColor: finish.accentColor,
                          }}
                          aria-hidden="true"
                        />
                      </div>
                    </CardFace>

                    {/* REVERSE OF CARD */}
                    <CardFace background={finish.surfaceGradient} grain={finish.grainColor} back>
                      <div className="relative flex items-center justify-between gap-[3cqw]" style={{ color: ink }}>
                        <span
                          className="min-w-0 truncate font-semibold uppercase opacity-75"
                          style={{ fontSize: fit(backTop, 2.3, 30), letterSpacing: "0.18em" }}
                        >
                          {backTop}
                        </span>
                        <Nfc
                          className="shrink-0 opacity-75"
                          style={{ width: "3.8cqw", height: "3.8cqw" }}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="relative flex min-h-0 flex-1 items-center gap-[5.5cqw]" style={{ color: ink }}>
                        {/* QR etched straight into the timber: no plate, no white box. */}
                        <EngravedQr
                          value={profileUrl}
                          ariaLabel={`Etched QR code linking to ${displayUrl}`}
                          className="shrink-0 opacity-90"
                          style={{ width: "23cqw", height: "23cqw", filter: ETCH_FILTER }}
                        />
                        <div className="min-w-0">
                          {w.backHeadline && (
                            <p
                              className="font-semibold uppercase opacity-80"
                              style={{
                                fontSize: fit(w.backHeadline, 2.4, 22, 0.75),
                                letterSpacing: "0.08em",
                                lineHeight: 1.35,
                              }}
                            >
                              {w.backHeadline}
                            </p>
                          )}
                          <p
                            className="truncate text-display"
                            style={{
                              fontSize: fit(leadIdentity, 4.8, 15, 0.58),
                              lineHeight: 1.15,
                              marginTop: "1cqw",
                            }}
                          >
                            {leadIdentity}
                          </p>
                          <p
                            className="truncate opacity-80"
                            style={{ fontSize: fit(displayUrl, 2.5, 28), marginTop: "0.8cqw" }}
                          >
                            {displayUrl}
                          </p>
                        </div>
                      </div>

                      <div
                        className="relative flex items-center justify-between gap-[3cqw]"
                        style={{ color: ink, fontSize: "2.3cqw" }}
                      >
                        <span className="min-w-0 truncate opacity-70">{w.backFooter}</span>
                        {makersMark && (
                          <span className="inline-flex shrink-0 items-center gap-[0.8cqw] opacity-55">
                            <LeafGlyph style={{ width: "2.8cqw", height: "2.8cqw" }} />
                            <span style={{ letterSpacing: "0.14em" }} className="uppercase">
                              {site.name}
                            </span>
                          </span>
                        )}
                      </div>
                    </CardFace>
                  </motion.div>
                </div>
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

const labelClass =
  "block text-[0.6875rem] font-semibold tracking-[0.04em] text-ink/75 uppercase";

function StepLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-[0.75rem] font-semibold tracking-[0.04em] text-ink/80 uppercase">
      {children}
    </span>
  );
}

function Field({
  id,
  label,
  hint,
  value,
  max,
  placeholder,
  onChange,
  onFocus,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  max: number;
  placeholder?: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <span
          className={cn(
            "text-[0.6875rem] tabular-nums",
            value.length >= max ? "text-clay" : "text-ink/45",
          )}
          aria-hidden="true"
        >
          {value.length}/{max}
        </span>
      </div>
      <input
        id={id}
        type="text"
        maxLength={max}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="mt-1.5 w-full rounded-xl border border-ink/12 bg-white px-3.5 py-2.5 text-[0.875rem] font-medium text-ink transition-colors placeholder:font-normal placeholder:text-ink/35 focus:border-forest focus:outline-none"
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.6875rem] text-ink/55">
          {hint}
        </p>
      )}
    </div>
  );
}

function CardFace({
  background,
  grain,
  back = false,
  children,
}: {
  background: string;
  grain: string;
  back?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background,
        backfaceVisibility: "hidden",
        transform: back ? "rotateY(180deg)" : undefined,
        padding: "6.5cqw",
        borderRadius: "4.6cqw",
      }}
      className="absolute inset-0 flex flex-col overflow-hidden border border-white/25 shadow-[0_32px_70px_-24px_rgba(16,32,26,0.55)]"
    >
      {/* Procedural SVG wood grain */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 380"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full opacity-35 mix-blend-overlay",
          back && "-scale-x-100",
        )}
        preserveAspectRatio="none"
      >
        <path
          d="M-20 40 Q 180 15, 360 50 T 620 35 M-20 95 Q 220 120, 410 85 T 620 105 M-20 160 Q 150 135, 330 175 T 620 155 M-20 225 Q 240 250, 440 215 T 620 235 M-20 295 Q 190 270, 390 310 T 620 290 M-20 345 Q 260 365, 460 335 T 620 355"
          fill="none"
          stroke={grain}
          strokeWidth="2.2"
        />
      </svg>
      {/* Subtle warm sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_15%_10%,rgba(255,255,255,0.16),transparent_60%)]"
      />
      {children}
    </div>
  );
}

function CentreMark({
  mark,
  monogram,
  wordmark,
}: {
  mark: MarkStyle;
  monogram: string;
  wordmark: string;
}) {
  if (mark === "none") return null;

  if (mark === "wordmark") {
    return (
      <span
        className="max-w-full truncate text-center text-display italic tracking-[-0.02em] opacity-90"
        style={{ fontSize: fit(wordmark, 7.6, 9, 0.5), lineHeight: 1.1 }}
      >
        {wordmark}
      </span>
    );
  }

  const ring: CSSProperties = {
    width: "17cqw",
    height: "17cqw",
    borderColor: "currentColor",
    borderWidth: mark === "monogram" ? "0.45cqw" : "0.3cqw",
  };

  return (
    <div className="flex items-center justify-center rounded-full border-solid opacity-90" style={ring}>
      {mark === "monogram" ? (
        <span
          className="text-display tracking-[0.04em]"
          style={{ fontSize: monogram.length > 2 ? "5.2cqw" : "6.6cqw" }}
        >
          {monogram}
        </span>
      ) : (
        <LeafGlyph style={{ width: "9.5cqw", height: "9.5cqw" }} />
      )}
    </div>
  );
}

function LeafGlyph({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" style={style} aria-hidden="true">
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
  );
}
