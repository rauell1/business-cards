"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const planOptions = [
  "Solo (KES 3,500)",
  "Professional (KES 6,500)",
  "Atelier (KES 12,000)",
  "Team (KES 28,000 / 10 cards)",
  "Scale (KES 2,400/person)",
  "Enterprise (Custom)",
] as const;

const finishOptions = [
  "Highland Walnut",
  "Mpingo Ebony",
  "Rift Olive Wood",
] as const;

export function FinalCta() {
  const reduce = useReducedMotion();
  const [selectedPlan, setSelectedPlan] = useState<string>("Professional (KES 6,500)");
  const [selectedFinish, setSelectedFinish] = useState<string>("Highland Walnut");
  const [engraving, setEngraving] = useState<string>("");

  useEffect(() => {
    const onSelect = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        plan?: string;
        finish?: string;
        wording?: string;
        engravingName?: string;
        engravingRole?: string;
        teamSize?: number;
      };
      if (detail?.plan) setSelectedPlan(detail.plan);
      if (detail?.finish) setSelectedFinish(detail.finish);
      if (detail?.wording) {
        setEngraving(detail.wording);
      } else if (detail?.engravingName) {
        setEngraving(
          detail.engravingRole
            ? `${detail.engravingName} · ${detail.engravingRole}`
            : detail.engravingName,
        );
      } else if (detail?.teamSize) {
        setEngraving(`Team of ${detail.teamSize} people`);
      }
    };
    window.addEventListener("alama:select-order", onSelect);
    return () => window.removeEventListener("alama:select-order", onSelect);
  }, []);

  const wordingLines = engraving.split("\n").length;

  const whatsappMessage = [
    `Hi ${site.name}! I would like to commission an ${site.name} card.`,
    `Tier: ${selectedPlan}`,
    `Wood finish: ${selectedFinish}`,
    engraving.trim() ? `Card wording:\n${engraving.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `${site.name} Order / Team Enquiry: ${selectedPlan}`,
  )}&body=${encodeURIComponent(
    `Hi ${site.name} team,\n\nI would like to order or request an invoice for:\n- Plan: ${selectedPlan}\n- Finish: ${selectedFinish}\n\nCard wording:\n${
      engraving.trim() || "To be confirmed"
    }\n\nThank you.`,
  )}`;

  return (
    <section id="cta" aria-labelledby="cta-heading" className="relative scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[1.75rem] border border-forest/15 bg-forest px-6 py-14 text-center text-paper sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_-20%,#1d5340_0%,#12362a_48%,#0c261e_100%)]" />
              <motion.div
                className="absolute -top-1/3 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(184,145,71,0.16),transparent_60%)] blur-2xl"
                animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-paper/20 to-transparent" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow text-[0.6875rem] text-brass">Ready when you are</span>
              <h2 id="cta-heading" className="mt-5 text-display text-[clamp(2.1rem,5.6vw,3.75rem)]">
                Walk into the next room and{" "}
                <span className="italic text-brass">leave your mark.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[48ch] text-[0.9375rem] leading-relaxed text-paper/75">
                Confirm your tier and timber finish below. Order directly on WhatsApp in
                under two minutes, or request a formal invoice for your firm. Dispatched
                within 48 hours from Nairobi.
              </p>

              {/* Inline Order Configurator */}
              <div className="mt-8 rounded-2xl border border-paper/15 bg-paper/[0.06] p-4 text-left backdrop-blur-md sm:p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="cta-plan"
                      className="block text-[0.6875rem] font-semibold tracking-[0.06em] text-brass uppercase"
                    >
                      Plan tier
                    </label>
                    <select
                      id="cta-plan"
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-paper/20 bg-[#0d2a21] px-3 py-2 text-[0.8125rem] font-medium text-paper focus:border-brass focus:outline-none"
                    >
                      {planOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="cta-finish"
                      className="block text-[0.6875rem] font-semibold tracking-[0.06em] text-brass uppercase"
                    >
                      Hardwood finish
                    </label>
                    <select
                      id="cta-finish"
                      value={selectedFinish}
                      onChange={(e) => setSelectedFinish(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-paper/20 bg-[#0d2a21] px-3 py-2 text-[0.8125rem] font-medium text-paper focus:border-brass focus:outline-none"
                    >
                      {finishOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <label
                        htmlFor="cta-engraving"
                        className="block text-[0.6875rem] font-semibold tracking-[0.06em] text-brass uppercase"
                      >
                        Card wording
                      </label>
                      <a
                        href="#studio"
                        className="text-[0.6875rem] font-medium text-paper/70 underline-offset-2 hover:text-paper hover:underline"
                      >
                        Design it in the studio
                      </a>
                    </div>
                    <textarea
                      id="cta-engraving"
                      rows={Math.min(Math.max(wordingLines, 2), 14)}
                      value={engraving}
                      onChange={(e) => setEngraving(e.target.value)}
                      placeholder="Every line you want engraved: name, title, organisation, tagline, and the reverse call to action"
                      className="mt-1.5 w-full resize-y rounded-xl border border-paper/20 bg-[#0d2a21] px-3 py-2 font-mono text-[0.75rem] leading-relaxed text-paper placeholder:font-sans placeholder:text-paper/45 focus:border-brass focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CTA
                  href={whatsappHref}
                  variant="light"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  withArrow
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Order on WhatsApp
                </CTA>
                <CTA
                  href={mailtoHref}
                  variant="secondary"
                  size="lg"
                  className="border-paper/25 bg-paper/10 text-paper hover:border-paper/45 hover:bg-paper/18"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Request invoice / team quote
                </CTA>
              </div>

              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[0.75rem] text-paper/70">
                <li className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-brass" aria-hidden="true" />
                  {site.location}
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5 text-brass" aria-hidden="true" />
                  Mon to Sat, 8am to 6pm EAT
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Mail className="size-3.5 text-brass" aria-hidden="true" />
                  {site.email}
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
