"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Check, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/ui/CTA";
import { individualPlans, teamPlans } from "@/lib/site";
import { cn } from "@/lib/cn";

type Audience = "individual" | "team";

export function Pricing() {
  const [audience, setAudience] = useState<Audience>("individual");
  const reduce = useReducedMotion();
  const plans = audience === "individual" ? individualPlans : teamPlans;

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,#f2ece1_0%,transparent_70%)]" />
      </div>

      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="pricing-heading"
            eyebrow="Pricing"
            align="center"
            title={
              <>
                One card. One payment.{" "}
                <span className="italic text-forest">No subscription.</span>
              </>
            }
            body="You pay for the object and the profile is yours for as long as the card exists. Updates are unlimited and always free."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex justify-center">
            <div
              role="tablist"
              aria-label="Choose audience"
              className="relative inline-flex items-center rounded-full border border-ink/10 bg-white/60 p-1 backdrop-blur-md"
            >
              {(
                [
                  { id: "individual", label: "For individuals" },
                  { id: "team", label: "For teams" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  role="tab"
                  aria-selected={audience === opt.id}
                  onClick={() => setAudience(opt.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300 sm:px-5",
                    audience === opt.id ? "text-paper" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {audience === opt.id && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 rounded-full bg-forest"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:items-start">
          <AnimatePresence mode="popLayout" initial={false}>
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-6 transition-shadow duration-500 sm:p-7",
                  plan.featured
                    ? "border-forest/25 bg-white shadow-card lg:-mt-3 lg:pb-8"
                    : "border-ink/10 bg-white/55 backdrop-blur-sm hover:border-ink/18 hover:bg-white/80 hover:shadow-lift",
                )}
              >
                {plan.badge && (
                  <span
                    className={cn(
                      "absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.625rem] font-semibold tracking-[0.1em] uppercase",
                      plan.featured ? "bg-forest text-paper" : "bg-clay text-paper",
                    )}
                  >
                    <Sparkles className="size-2.5" aria-hidden="true" />
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
                  {plan.name}
                </h3>
                <p className="mt-1.5 min-h-[2.5rem] max-w-[30ch] text-[0.75rem] leading-relaxed text-ink/60">
                  {plan.summary}
                </p>

                <div className="mt-5 flex items-end gap-1.5">
                  <span className="text-display text-[2.1rem] leading-none text-ink">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-[0.6875rem] text-ink/60">{plan.period}</span>
                </div>
                <p className="mt-2 text-[0.6875rem] text-ink/60">{plan.note}</p>

                <div className="my-5 h-px w-full bg-ink/8" />

                <ul className="flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-ink/70">
                      <span
                        className={cn(
                          "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full",
                          plan.featured ? "bg-forest/10" : "bg-moss/12",
                        )}
                      >
                        <Check className="size-2.5 text-forest" aria-hidden="true" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <CTA
                    href={plan.href}
                    variant={plan.featured ? "primary" : "secondary"}
                    size="md"
                    className="w-full"
                    withArrow
                  >
                    {plan.cta}
                  </CTA>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.75rem] text-ink/60">
            <li className="inline-flex items-center gap-1.5">
              <Truck className="size-3.5 text-moss" aria-hidden="true" />
              Free Nairobi delivery · KES 300 countrywide
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-moss" aria-hidden="true" />
              14-day replacement on manufacturing faults
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-moss" aria-hidden="true" />
              M-Pesa &amp; card accepted
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
