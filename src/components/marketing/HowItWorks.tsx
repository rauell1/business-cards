"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/lib/site";

export function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative scroll-mt-24 overflow-hidden bg-forest py-20 text-paper sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(110%_70%_at_15%_0%,#1a4a39_0%,#12362a_45%,#0d2a21_100%)]" />
        <div className="animate-drift absolute -right-32 top-1/4 size-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(184,145,47,0.16),transparent_68%)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#f8f5ef_1px,transparent_1px)] [background-size:96px_96px] [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]" />
      </div>

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading
                id="how-heading"
                eyebrow="Three steps, about four minutes"
                tone="light"
                title={
                  <>
                    From parcel to first{" "}
                    <span className="italic text-brass">lasting mark.</span>
                  </>
                }
                body="No technical setup, no app store, no IT department. Commission your card, curate the value on your profile, and let a single tap handle the introduction."
              />
            </Reveal>

            <ol className="mt-10 space-y-0">
              {steps.map((step, i) => (
                <Reveal key={step.number} delay={0.08 * i} as="li">
                  <div className="group relative flex gap-5 border-t border-paper/12 py-6 first:border-t-0 first:pt-0 sm:gap-7">
                    <div className="flex flex-col items-center pt-1">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-paper/20 bg-paper/5 text-[0.6875rem] font-semibold tracking-[0.06em] text-brass transition-colors duration-500 group-hover:border-brass/60 group-hover:bg-brass/10">
                        {step.number}
                      </span>
                      {i < steps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="mt-2 hidden w-px flex-1 bg-gradient-to-b from-paper/18 to-transparent sm:block"
                        />
                      )}
                    </div>
                    <div className="pb-1">
                      <h3 className="text-[1.125rem] font-semibold tracking-[-0.02em] text-paper">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-[42ch] text-[0.9rem] leading-relaxed text-paper/75">
                        {step.body}
                      </p>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-[0.6875rem] tracking-[0.04em] text-brass uppercase">
                        <span className="size-1 rounded-full bg-brass" aria-hidden="true" />
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Tap visual with radiating rings aligned to the card-to-phone NFC contact point */}
          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-paper/12 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
                <Image
                  src="/images/tap.webp"
                  alt="A Kenyan professional tapping a walnut Alama NFC card to the top edge of a smartphone"
                  width={1408}
                  height={788}
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="h-[17rem] w-full object-cover sm:h-[21rem]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/65 via-transparent to-transparent"
                />

                {/* tap connector positioned over the NFC contact edge */}
                <div className="pointer-events-none absolute top-[54%] left-[63%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                  <div className="relative">
                    {!reduce &&
                      [0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/50"
                          initial={{ scale: 0.4, opacity: 0 }}
                          whileInView={{ scale: [0.4, 2.2], opacity: [0.65, 0] }}
                          viewport={{ once: false }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    <span className="relative flex size-8 items-center justify-center rounded-full bg-paper/20 backdrop-blur-md ring-1 ring-paper/50">
                      <span className="size-2 rounded-full bg-brass shadow-[0_0_14px_3px_rgba(184,145,47,0.85)]" />
                    </span>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="glass-dark rounded-xl px-3.5 py-2.5 text-[0.75rem] text-paper/85">
                    <span className="font-medium text-paper">Hold to the top of the phone.</span>{" "}
                    That is the entire instruction.
                  </p>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[
                  ["< 1s", "to open a profile"],
                  ["0", "apps to install"],
                  ["iOS + Android", "natively supported"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-xl border border-paper/12 bg-paper/[0.05] px-2 py-3">
                    <dt className="text-[0.8125rem] font-semibold text-paper">{v}</dt>
                    <dd className="mt-0.5 text-[0.6875rem] leading-tight text-paper/70">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
