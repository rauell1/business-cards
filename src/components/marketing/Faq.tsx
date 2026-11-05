"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { faqs, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 border-t border-ink/8 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              id="faq-heading"
              eyebrow="Questions"
              title={
                <>
                  The things people ask{" "}
                  <span className="italic text-forest">before ordering.</span>
                </>
              }
              body="Still unsure? Message us on WhatsApp — a person replies, usually within the hour during Nairobi business days."
            />
            <div className="mt-7 flex flex-wrap gap-2.5">
              <CTA
                href={`https://wa.me/${site.whatsapp}`}
                variant="secondary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </CTA>
              <CTA href={`mailto:${site.email}`} variant="ghost" size="sm">
                {site.email}
              </CTA>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <ul className="divide-y divide-ink/8 border-y border-ink/8">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="group flex w-full items-start justify-between gap-5 py-5 text-left transition-colors hover:text-forest"
                    >
                      <span className={cn("text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors sm:text-base", isOpen ? "text-forest" : "text-ink/85")}>
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border transition-all duration-400",
                          isOpen
                            ? "rotate-45 border-forest/30 bg-forest/8 text-forest"
                            : "border-ink/12 text-ink/60 group-hover:border-ink/25 group-hover:text-ink/70",
                        )}
                        aria-hidden="true"
                      >
                        <Plus className="size-3.5" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pb-6 pr-8 text-[0.875rem] leading-[1.7] text-ink/60">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
