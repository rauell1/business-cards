"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, Building2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { benefits, site, teamBenefits } from "@/lib/site";

export function Benefits() {
  const reduce = useReducedMotion();

  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      className="relative scroll-mt-24 border-y border-ink/8 bg-paper-2/50 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="benefits-heading"
            eyebrow="Why professionals switch"
            align="center"
            title={
              <>
                Paper cards cost more than{" "}
                <span className="italic text-forest">the paper.</span>
              </>
            }
            body={`They cost a reprint every time something changes, a follow-up you never made, and a name someone could not quite remember. ${site.name} solves all three.`}
          />
        </Reveal>

        <StaggerGroup as="ul" className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/8 bg-ink/8 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <StaggerItem as="li" key={b.title} className="group bg-paper">
              <motion.div
                whileHover={reduce ? undefined : { backgroundColor: "rgba(255,255,255,0.72)" }}
                transition={{ duration: 0.3 }}
                className="relative h-full p-6 sm:p-8"
              >
                <span className="eyebrow text-[0.6875rem] text-clay">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
                  {b.title}
                </h3>
                <p className="mt-2 max-w-[40ch] text-[0.875rem] leading-relaxed text-ink/70">
                  {b.body}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute right-0 bottom-0 h-10 w-10 origin-bottom-right scale-0 bg-[linear-gradient(135deg,transparent_50%,rgba(184,97,58,0.12)_50%)] transition-transform duration-500 group-hover:scale-100"
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Team strip */}
        <Reveal delay={0.1}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-forest/15 bg-gradient-to-br from-forest to-forest-600 p-6 text-paper sm:p-9">
            <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 eyebrow text-[0.6875rem] text-brass">
                  <Building2 className="size-3.5" aria-hidden="true" />
                  For teams &amp; firms
                </span>
                <h3 className="mt-3 text-display text-[clamp(1.5rem,3vw,2.15rem)]">
                  Put the whole firm behind{" "}
                  <span className="italic text-brass">one mark.</span>
                </h3>
                <p className="mt-2.5 max-w-[42ch] text-[0.875rem] leading-relaxed text-paper/75">
                  Business development teams, law firms, and advisory studios issue{" "}
                  {site.name} cards as standard kit, with consistent branding, central
                  admin, and a single invoice.
                </p>
                <div className="mt-6">
                  <CTA href="/#cta" variant="light" size="md" withArrow>
                    Request team pricing
                  </CTA>
                </div>
              </div>
              <ul className="grid gap-2.5">
                {teamBenefits.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[0.8125rem] text-paper/85">
                    <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-brass/20">
                      <Check className="size-2.5 text-brass" aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
