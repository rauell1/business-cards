"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import {
  Nfc,
  QrCode,
  IdCard,
  MessageCircle,
  Mail,
  Phone,
  Globe,
  MapPin,
  Download,
  Check,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { demoProfile, showcase, site } from "@/lib/site";
import { downloadDemoVCard } from "@/lib/vcard";
import { cn } from "@/lib/cn";

const icons = { tap: Nfc, qr: QrCode, profile: IdCard } as const;
const EASE = [0.16, 1, 0.3, 1] as const;

export function Showcase({ qr }: { qr: ReactNode }) {
  const [tab, setTab] = useState<(typeof showcase.tabs)[number]["id"]>("tap");
  const reduce = useReducedMotion();
  const current = showcase.tabs.find((t) => t.id === tab)!;

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_80%_10%,#efe8da_0%,transparent_60%)]" />
      </div>

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          {/* Copy + tabs */}
          <div className="lg:order-1">
            <Reveal>
              <SectionHeading
                id="showcase-heading"
                eyebrow={showcase.eyebrow}
                title={
                  <>
                    An introduction that does the{" "}
                    <span className="italic text-forest">remembering</span> for you.
                  </>
                }
                body={showcase.body}
              />
            </Reveal>

            <div
              role="tablist"
              aria-label="Profile surfaces"
              aria-orientation="horizontal"
              className="mt-8 flex flex-wrap gap-1.5 rounded-full border border-ink/10 bg-white/60 p-1.5 backdrop-blur-md"
            >
              {showcase.tabs.map((t) => {
                const Icon = icons[t.id as keyof typeof icons];
                const selected = tab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${t.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(t.id as typeof tab)}
                    onKeyDown={(e) => {
                      const list = showcase.tabs as unknown as { id: string }[];
                      const idx = list.findIndex((x) => x.id === tab);
                      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        const next =
                          e.key === "ArrowRight"
                            ? list[(idx + 1) % list.length]
                            : list[(idx - 1 + list.length) % list.length];
                        setTab(next.id as typeof tab);
                        document.getElementById(`tab-${next.id}`)?.focus();
                      }
                    }}
                    className={cn(
                      "relative inline-flex flex-1 items-center justify-center gap-2 rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                      selected ? "text-paper" : "text-ink/70 hover:text-ink",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="showcase-pill"
                        className="absolute inset-0 rounded-full bg-forest"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <Icon className="relative size-3.5" aria-hidden="true" />
                    <span className="relative">{t.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`panel-${tab}`}
              aria-labelledby={`tab-${tab}`}
              tabIndex={0}
              className="mt-7 min-h-[14rem] rounded-2xl focus-visible:outline-offset-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <h3 className="text-[1.25rem] font-semibold tracking-[-0.025em] text-ink">
                    {current.title}
                  </h3>
                  <p className="mt-2.5 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink/70">
                    {current.body}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {current.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[0.875rem] text-ink/75">
                        <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-moss/15">
                          <Check className="size-2.5 text-forest" aria-hidden="true" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <Link
                      href="/p/wanjiru"
                      className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
                    >
                      Open full interactive profile (/p/wanjiru)
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Phone mock with consistent height across all three tabs */}
          <Reveal delay={0.1} className="lg:order-2">
            <div className="relative mx-auto w-full max-w-[21.5rem]">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(18,54,42,0.16),transparent_70%)] blur-2xl"
              />

              <div className="relative rounded-[2.4rem] border border-ink/12 bg-ink p-2.5 shadow-[0_50px_100px_-40px_rgba(16,32,26,0.6)]">
                <div className="relative overflow-hidden rounded-[1.9rem] bg-paper">
                  {/* status bar */}
                  <div className="relative flex h-9 items-center justify-between px-5 pt-2">
                    <span className="text-[0.6875rem] font-semibold text-ink/75">9:41</span>
                    <span
                      className="absolute top-1.5 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full bg-ink"
                      aria-hidden="true"
                    />
                    <span className="flex items-center gap-1" aria-hidden="true">
                      <span className="h-1.5 w-1 rounded-sm bg-ink/65" />
                      <span className="h-2 w-1 rounded-sm bg-ink/65" />
                      <span className="h-2.5 w-1 rounded-sm bg-ink/65" />
                      <span className="ml-1 h-2 w-3.5 rounded-[2px] border border-ink/55" />
                    </span>
                  </div>

                  <div className="relative flex min-h-[26.5rem] flex-col justify-between px-4 pt-2 pb-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={tab}
                        initial={reduce ? false : { opacity: 0, scale: 0.985, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, scale: 0.99, y: -6 }}
                        transition={{ duration: 0.38, ease: EASE }}
                        className="flex flex-1 flex-col justify-between"
                      >
                        {tab === "qr" ? (
                          <QrScreen qr={qr} />
                        ) : tab === "tap" ? (
                          <TapScreen />
                        ) : (
                          <ProfileScreen />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* side caption */}
              <motion.div
                className="glass absolute -right-4 bottom-16 hidden rounded-2xl px-3 py-2 text-[0.6875rem] font-medium text-ink/80 sm:block"
                initial={reduce ? false : { opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span className="mr-1.5 inline-block size-1.5 rounded-full bg-moss align-middle" aria-hidden="true" />
                Loaded in 0.7s
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SourceBadge({ kind }: { kind: "nfc" | "qr" | "link" }) {
  const label = kind === "nfc" ? "Opened by NFC tap" : kind === "qr" ? "Opened by QR scan" : "Value & privacy";
  const Icon = kind === "nfc" ? Nfc : kind === "qr" ? QrCode : Globe;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-moss/14 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.06em] text-forest uppercase">
      <Icon className="size-2.5" aria-hidden="true" />
      {label}
    </span>
  );
}

function TapScreen() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-1 flex-col items-center justify-between pt-2 text-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-3 rounded-full bg-clay/15 blur-lg" aria-hidden="true" />
          <Image
            src={demoProfile.portrait}
            alt={`Portrait of ${demoProfile.name}`}
            width={96}
            height={96}
            className="relative size-18 rounded-full object-cover ring-2 ring-white"
          />
        </div>
        <p className="mt-2.5 text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
          {demoProfile.name}
        </p>
        <p className="mt-0.5 text-[0.75rem] text-ink/70">Partner · Kamau &amp; Waweru</p>
        <div className="mt-2.5">
          <SourceBadge kind="nfc" />
        </div>
      </div>

      <div className="mt-3 grid w-full gap-1.5">
        {[
          { icon: Phone, label: demoProfile.phone },
          { icon: Mail, label: demoProfile.email },
          { icon: MessageCircle, label: "Direct WhatsApp" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-xl border border-ink/8 bg-white/80 px-3 py-2 text-left text-[0.75rem] text-ink/75"
          >
            <Icon className="size-3.5 shrink-0 text-forest-400" aria-hidden="true" />
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          downloadDemoVCard();
          setSaved(true);
        }}
        className={cn(
          "mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-[0.75rem] font-medium transition-colors",
          saved
            ? "bg-moss/20 text-forest"
            : "bg-forest text-paper hover:bg-forest-600",
        )}
      >
        <Download className="size-3.5" aria-hidden="true" />
        {saved ? "vCard downloaded" : "Save to contacts (.vcf)"}
      </button>
    </div>
  );
}

function QrScreen({ qr }: { qr: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-between pt-2 text-center">
      <SourceBadge kind="qr" />
      <div className="mt-3 w-full rounded-2xl border border-ink/8 bg-white p-3.5 shadow-[0_14px_40px_-24px_rgba(16,32,26,0.5)]">
        <div className="mx-auto aspect-square w-full max-w-[10.5rem]">{qr}</div>
      </div>
      <div>
        <p className="mt-2.5 text-[0.8125rem] font-semibold text-ink">Scan to open live profile</p>
        <p className="mt-0.5 font-mono text-[0.6875rem] text-forest">{site.domain}/p/wanjiru</p>
      </div>
      <div className="mt-3 grid w-full grid-cols-2 gap-2 text-[0.6875rem]">
        <Link
          href="/p/wanjiru"
          className="inline-flex items-center justify-center gap-1 rounded-xl bg-forest py-2 font-medium text-paper hover:bg-forest-600"
        >
          Open profile
          <ArrowUpRight className="size-3" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={() => downloadDemoVCard()}
          className="rounded-xl border border-ink/12 bg-white/80 py-2 font-medium text-ink hover:border-forest"
        >
          Save .vcf
        </button>
      </div>
      <p className="mt-2 text-[0.6875rem] leading-relaxed text-ink/70">
        Real and scannable. Point your phone camera here to open the demo profile.
      </p>
    </div>
  );
}

function ProfileScreen() {
  const rows = [
    { icon: MapPin, k: "Chambers", v: "Upper Hill, Nairobi" },
    { icon: FileText, k: "Shared Brief", v: "2026 Commercial Dispute Guide (PDF)" },
    { icon: Globe, k: "Practice", v: "kamauwaweru.co.ke" },
  ];
  return (
    <div className="flex flex-1 flex-col justify-between pt-1">
      <div className="flex items-center justify-between">
        <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-ink/70 uppercase">
          {site.name} Profile
        </span>
        <SourceBadge kind="link" />
      </div>
      <div className="mt-2.5 flex items-center gap-3 rounded-2xl border border-ink/8 bg-white/80 p-3">
        <Image
          src={demoProfile.portrait}
          alt={`Portrait of ${demoProfile.name}`}
          width={64}
          height={64}
          className="size-12 rounded-xl object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-[0.875rem] font-semibold text-ink">{demoProfile.name}</p>
          <p className="truncate text-[0.6875rem] text-ink/70">Commercial Litigation · Advocate</p>
        </div>
      </div>
      <div className="mt-2.5 space-y-1.5">
        {rows.map(({ icon: Icon, k, v }) => (
          <div key={k} className="flex items-center gap-2.5 rounded-xl bg-white/70 px-3 py-2">
            <Icon className="size-3.5 shrink-0 text-forest-400" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-[0.625rem] font-semibold tracking-[0.06em] text-ink/65 uppercase">{k}</p>
              <p className="truncate text-[0.75rem] text-ink/80">{v}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 rounded-xl border border-dashed border-moss/45 bg-moss/8 px-3 py-2.5">
        <p className="text-[0.625rem] font-semibold tracking-[0.08em] text-forest uppercase">
          Private field · hidden
        </p>
        <p className="mt-0.5 text-[0.6875rem] text-ink/70">
          Personal number &amp; private email remain hidden from public visitors.
        </p>
      </div>
    </div>
  );
}
