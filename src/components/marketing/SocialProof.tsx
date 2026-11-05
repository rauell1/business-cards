"use client";

import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { sectors } from "@/lib/site";

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
    >
      {sectors.map((s) => (
        <li
          key={s}
          className="flex shrink-0 items-center gap-3 text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap text-ink/60 transition-colors duration-500 hover:text-ink/70"
        >
          <span className="size-1 rotate-45 bg-clay/40" aria-hidden="true" />
          {s}
        </li>
      ))}
    </ul>
  );
}

export function SocialProof() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="proof-heading" className="border-y border-ink/8 bg-paper-2/60 py-12 sm:py-14">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-center gap-2 text-center">
            <p id="proof-heading" className="eyebrow text-ink/60">
              Carried by people who meet people
            </p>
            <p className="text-[0.8125rem] text-ink/60">
              Lawyers, founders, hoteliers, consultants and creative studios across East Africa.
            </p>
          </div>
        </Reveal>
      </div>

      <div
        className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_9%,black_91%,transparent)]"
        role="group"
        aria-label="Sectors using Kadi"
      >
        <div
          className={
            reduce
              ? "flex flex-wrap justify-center gap-x-12 gap-y-4 px-6"
              : "flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          }
        >
          {reduce ? (
            <Row />
          ) : (
            <>
              <Row />
              <Row ariaHidden />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
