"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { TreePine, Sprout, Recycle, Users } from "lucide-react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/CTA";
import { impact } from "@/lib/site";

/** Counts up once, when scrolled into view. Instant for reduced motion. */
function Counter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  const suffix = value.replace(/[\d.,]/g, "");
  const [display, setDisplay] = useState(reduce ? value : `0${suffix}`);

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(numeric) || numeric === 0) {
      if (inView) setDisplay(value);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const n = Math.round(numeric * eased);
      setDisplay(`${n.toLocaleString("en-KE")}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, reduce, suffix, value]);

  return (
    <div ref={ref}>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-display text-[clamp(1.75rem,4vw,2.6rem)] text-paper tabular-nums">
          {display}
        </span>
        <span className="mt-1.5 block max-w-[16ch] text-[0.75rem] leading-snug text-paper/70">
          {label}
        </span>
      </dd>
    </div>
  );
}

const pillars = [
  {
    icon: TreePine,
    title: "Indigenous species",
    body: "Partner nurseries grow native species suited to each county's soil, never invasive fast exotics.",
  },
  {
    icon: Users,
    title: "Paid grower network",
    body: "126 partner growers are paid per surviving seedling, creating long-term stewardship rather than one-off charity.",
  },
  {
    icon: Recycle,
    title: "Zero PVC plastic",
    body: "Hardwood, brass, and recycled packaging. No plastic laminate and no throwaway vinyl sleeves.",
  },
] as const;

export function Impact() {
  const reduce = useReducedMotion();

  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="grain relative scroll-mt-24 overflow-hidden bg-[#0d2a21] py-20 text-paper sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_0%,#173f31_0%,#0d2a21_62%)]" />
        <div className="animate-drift-slow absolute -bottom-32 left-1/4 size-[38rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(111,143,99,0.22),transparent_68%)] blur-3xl" />
        <svg
          className="absolute inset-x-0 bottom-0 h-40 w-full text-moss/10"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <path d="M0 160C180 120 260 180 420 140s240 30 380-10 250-60 400-20v90H0Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow tone="light">{impact.eyebrow}</Eyebrow>
              <h2 id="impact-heading" className="mt-5 text-display text-[clamp(2rem,5vw,3.4rem)]">
                More than half of every{" "}
                <span className="italic text-brass">shilling grows something.</span>
              </h2>
              <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-paper/75">
                {impact.body}
              </p>
              <div className="mt-7">
                <TextLink href="/#faq" className="text-paper/85 decoration-paper/35 hover:decoration-brass">
                  Read how the commitment is audited
                </TextLink>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {pillars.map(({ icon: Icon, title, body }, i) => (
                <Reveal key={title} delay={0.06 * i}>
                  <div className="rounded-xl border border-paper/12 bg-paper/[0.045] p-4 backdrop-blur-sm">
                    <Icon className="size-4 text-moss" aria-hidden="true" />
                    <h3 className="mt-2.5 text-[0.8125rem] font-semibold text-paper">{title}</h3>
                    <p className="mt-1.5 text-[0.75rem] leading-relaxed text-paper/70">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.12}>
            <div className="glass-dark relative overflow-hidden rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[0.6875rem] text-brass">Impact ledger · 2026</span>
                <Sprout className="size-4 text-moss" aria-hidden="true" />
              </div>

              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8">
                {impact.stats.map((s) => (
                  <Counter key={s.label} value={s.value} label={s.label} />
                ))}
              </dl>

              <div className="mt-8 border-t border-paper/12 pt-5">
                <div className="flex items-baseline justify-between text-[0.75rem] text-paper/75">
                  <span>Revenue directed to planting</span>
                  <span className="font-semibold text-paper">55%</span>
                </div>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-paper/12">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-moss via-brass to-clay-soft"
                    initial={reduce ? { width: "55%" } : { width: 0 }}
                    whileInView={{ width: "55%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  />
                </div>
                <p className="mt-3 text-[0.6875rem] leading-relaxed text-paper/70">
                  Figures illustrative of programme reporting. Planting certificates are
                  issued per order and recorded in your dashboard.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
