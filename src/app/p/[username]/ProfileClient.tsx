"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Download,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Briefcase,
  Globe,
  FileText,
  Calendar,
  Award,
  TreePine,
  QrCode,
  Check,
  ArrowLeft,
  ArrowUpRight,
  X,
  Share2,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { demoProfile, site } from "@/lib/site";
import { downloadDemoVCard } from "@/lib/vcard";
import { cn } from "@/lib/cn";

export function ProfileClient({
  username,
  qr,
}: {
  username: string;
  qr: ReactNode;
}) {
  const [saved, setSaved] = useState(false);
  const [activeResource, setActiveResource] = useState<number | null>(0);
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayName =
    username.toLowerCase() === "wanjiru"
      ? demoProfile.name
      : username
          .replace(/[-_]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

  function handleSaveContact() {
    downloadDemoVCard();
    setSaved(true);
  }

  async function handleShare() {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} · ${site.name} Profile`,
          text: `${displayName} (${demoProfile.role} at ${demoProfile.company})`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setQrOpen(true);
    }
  }

  const resourceIcons = [FileText, Calendar, Award] as const;

  return (
    <div className="min-h-dvh bg-paper pb-16 text-ink">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-ink/8 bg-paper/80 backdrop-blur-xl">
        <div className="container-x flex h-14 max-w-2xl items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink/75 transition-colors hover:text-forest"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to {site.name}
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-white/80 px-3 py-1.5 text-[0.75rem] font-medium text-ink transition-colors hover:border-forest hover:text-forest"
            >
              <QrCode className="size-3.5" aria-hidden="true" />
              Pass QR
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/12 bg-white/80 px-3 py-1.5 text-[0.75rem] font-medium text-ink transition-colors hover:border-forest hover:text-forest"
            >
              <Share2 className="size-3.5" aria-hidden="true" />
              {copied ? "Link copied" : "Share"}
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="container-x mt-6 max-w-xl">
        {/* Identity Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-card">
          {/* Header Banner */}
          <div className="relative h-28 bg-gradient-to-br from-forest via-forest-600 to-[#0d2a21] px-6 pt-5">
            <div className="flex items-center justify-between text-[0.6875rem] font-medium text-paper/80">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/12 px-3 py-1 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-brass" aria-hidden="true" />
                Verified {site.name} Identity
              </span>
              <span className="text-paper/70">{demoProfile.cardFinish}</span>
            </div>
          </div>

          <div className="px-6 pb-7 sm:px-8">
            {/* Avatar & Save Pill */}
            <div className="-mt-12 flex items-end justify-between gap-4">
              <div className="relative">
                <Image
                  src={demoProfile.portrait}
                  alt={`Portrait of ${displayName}`}
                  width={120}
                  height={120}
                  priority
                  className="size-24 rounded-2xl object-cover ring-4 ring-white shadow-md sm:size-28"
                />
                <span
                  title="Verified active card"
                  className="absolute -right-1 -bottom-1 inline-flex size-6 items-center justify-center rounded-full border-2 border-white bg-forest text-paper"
                >
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
              </div>

              <button
                type="button"
                onClick={handleSaveContact}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.8125rem] font-semibold transition-all duration-300",
                  saved
                    ? "bg-moss/15 text-forest ring-1 ring-forest/20"
                    : "bg-forest text-paper shadow-sm hover:bg-forest-600",
                )}
              >
                {saved ? (
                  <>
                    <Check className="size-4" aria-hidden="true" />
                    vCard Downloaded
                  </>
                ) : (
                  <>
                    <Download className="size-4" aria-hidden="true" />
                    Save Contact (.vcf)
                  </>
                )}
              </button>
            </div>

            {/* Identity Details */}
            <div className="mt-5">
              <h1 className="text-display text-[2rem] leading-tight text-ink sm:text-[2.3rem]">
                {displayName}
              </h1>
              <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[0.9375rem] font-medium text-forest">
                <Briefcase className="size-4 shrink-0" aria-hidden="true" />
                {demoProfile.role} · {demoProfile.company}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-[0.8125rem] text-ink/70">
                <MapPin className="size-3.5 shrink-0 text-clay" aria-hidden="true" />
                {demoProfile.location} · {demoProfile.Honorific}
              </p>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink/75">
                {demoProfile.bio}
              </p>
            </div>

            {/* Direct Contact Actions */}
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              <a
                href={`tel:${demoProfile.phoneRaw}`}
                className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-ink/10 bg-paper/75 py-3 text-[0.75rem] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-forest hover:bg-white hover:text-forest"
              >
                <Phone className="size-4 text-forest" aria-hidden="true" />
                Call Direct
              </a>
              <a
                href={`https://wa.me/${demoProfile.whatsapp}?text=${encodeURIComponent(
                  `Hi ${displayName}, great connecting via your Alama card.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-ink/10 bg-paper/75 py-3 text-[0.75rem] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-forest hover:bg-white hover:text-forest"
              >
                <MessageCircle className="size-4 text-forest" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`mailto:${demoProfile.email}?subject=${encodeURIComponent(
                  "Following up from your Alama card",
                )}`}
                className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-ink/10 bg-paper/75 py-3 text-[0.75rem] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-forest hover:bg-white hover:text-forest"
              >
                <Mail className="size-4 text-forest" aria-hidden="true" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Value Shared With You (Core Alama differentiator) */}
        <section aria-labelledby="value-shared-heading" className="mt-6">
          <div className="rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-lift sm:p-7">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[0.6875rem] text-clay">
                Value left for you
              </span>
              <span className="text-[0.75rem] text-ink/65">
                Instant access · No login required
              </span>
            </div>
            <h2
              id="value-shared-heading"
              className="mt-2 text-[1.15rem] font-semibold tracking-[-0.02em] text-ink"
            >
              Briefs, calendar &amp; credentials from {displayName.split(" ")[0]}
            </h2>

            <ul className="mt-4 space-y-2.5">
              {demoProfile.resources.map((res, idx) => {
                const Icon = resourceIcons[idx % resourceIcons.length];
                const isOpen = activeResource === idx;
                return (
                  <li
                    key={res.title}
                    className="overflow-hidden rounded-2xl border border-ink/10 bg-paper/55 transition-colors hover:border-ink/20"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveResource(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3.5 p-4 text-left"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-forest text-paper">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[0.875rem] font-semibold text-ink">
                            {res.title}
                          </p>
                          <p className="mt-0.5 truncate text-[0.75rem] text-ink/65">
                            {res.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full border border-ink/12 bg-white px-3 py-1 text-[0.6875rem] font-medium text-forest">
                        {isOpen ? "Hide" : res.actionLabel}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-ink/8 bg-white/80 px-4 py-3.5 text-[0.8125rem] leading-relaxed text-ink/75">
                            <p>{res.summary}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <a
                                href={`mailto:${demoProfile.email}?subject=${encodeURIComponent(
                                  `Request: ${res.title}`,
                                )}`}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-forest px-3 py-1.5 text-[0.75rem] font-medium text-paper hover:bg-forest-600"
                              >
                                Request via Email
                                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                              </a>
                              <button
                                type="button"
                                onClick={handleSaveContact}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-[0.75rem] font-medium text-ink hover:border-forest"
                              >
                                Save {displayName.split(" ")[0]}&apos;s vCard
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Reforestation Impact Record */}
        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-forest/15 bg-forest p-5 text-paper">
          <div className="flex items-start gap-3.5">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper/10 text-brass">
              <TreePine className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[0.8125rem] font-semibold text-paper">
                {demoProfile.treesPlanted} indigenous trees funded by this card
              </p>
              <p className="mt-0.5 text-[0.75rem] text-paper/75">
                Planted with partner growers in {demoProfile.countySupported} · 55% revenue pledge
              </p>
            </div>
          </div>
          <Link
            href="/#impact"
            className="shrink-0 rounded-full border border-paper/20 bg-paper/10 px-3 py-1.5 text-[0.6875rem] font-medium text-paper transition-colors hover:bg-paper/20"
          >
            Audit
          </Link>
        </div>

        {/* Practice Links */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/8 bg-white/70 px-5 py-4 text-[0.8125rem]">
          <span className="inline-flex items-center gap-2 text-ink/75">
            <Globe className="size-4 text-forest" aria-hidden="true" />
            {demoProfile.websiteLabel}
          </span>
          <span className="text-[0.75rem] text-ink/65">{demoProfile.phone}</span>
        </div>

        {/* Footer CTA to get an Alama card */}
        <div className="mt-8 rounded-2xl border border-ink/10 bg-paper-2/80 p-6 text-center">
          <Logo className="mx-auto size-8" />
          <p className="mt-3 text-display text-[1.45rem] text-ink">
            Don&apos;t just hand over a card.{" "}
            <span className="italic text-forest">Leave a mark.</span>
          </p>
          <p className="mx-auto mt-1.5 max-w-sm text-[0.8125rem] text-ink/70">
            Create your own hand-finished wooden NFC card and digital identity with{" "}
            {site.name}.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            <Link
              href="/#studio"
              className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-[0.8125rem] font-medium text-paper hover:bg-forest-600"
            >
              Design your {site.name} card
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-5 py-2.5 text-[0.8125rem] font-medium text-ink hover:border-forest"
            >
              View pricing
            </Link>
          </div>
        </div>
      </main>

      {/* QR Pass Modal */}
      <AnimatePresence>
        {qrOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
            onClick={() => setQrOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${displayName} QR Pass`}
              className="w-full max-w-xs rounded-3xl border border-ink/10 bg-paper p-6 text-center shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[0.6875rem] text-forest">
                  {site.name} Lock-Screen Pass
                </span>
                <button
                  type="button"
                  onClick={() => setQrOpen(false)}
                  aria-label="Close QR modal"
                  className="inline-flex size-8 items-center justify-center rounded-full border border-ink/10 bg-white text-ink"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-4 rounded-2xl border border-ink/8 bg-white p-4">
                <div className="mx-auto aspect-square w-48">{qr}</div>
              </div>
              <p className="mt-4 text-[0.9375rem] font-semibold text-ink">
                {displayName}
              </p>
              <p className="mt-0.5 text-[0.75rem] text-ink/70">
                {demoProfile.role} · {demoProfile.company}
              </p>
              <p className="mt-2 font-mono text-[0.6875rem] text-forest">
                {site.domain}/p/{username.toLowerCase()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
