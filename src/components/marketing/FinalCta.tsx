"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { CTA } from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Team Kadi enquiry",
)}&body=${encodeURIComponent(
  "Hi Kadi team,\n\nWe would like to order cards for our team.\n\nCompany:\nTeam size:\nTimeline:\n\nThank you.",
)}`;

export function FinalCta() {
  const reduce = useReducedMotion();

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
              <span className="eyebrow text-[0.625rem] text-brass">Ready when you are</span>
              <h2 id="cta-heading" className="mt-5 text-display text-[clamp(2.1rem,5.6vw,3.75rem)]">
                Walk into the next room with{" "}
                <span className="italic text-brass">one card.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-paper/65">
                Order on WhatsApp in a couple of minutes, or drop us a line for team
                orders and custom finishes. Dispatch within 48 hours from Nairobi.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CTA
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                    "Hi Kadi! I'd like to order a wooden NFC card.",
                  )}`}
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
                  href={mailto}
                  variant="secondary"
                  size="lg"
                  className="border-paper/25 bg-paper/8 text-paper hover:border-paper/40 hover:bg-paper/15"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Request team pricing
                </CTA>
              </div>

              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[0.75rem] text-paper/55">
                <li className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-brass/80" aria-hidden="true" />
                  {site.location}
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5 text-brass/80" aria-hidden="true" />
                  Mon–Sat, 8am–6pm EAT
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Mail className="size-3.5 text-brass/80" aria-hidden="true" />
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
