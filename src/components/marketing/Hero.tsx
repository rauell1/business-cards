"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import { useRef } from "react";
import { Nfc, QrCode, Sparkles, TrendingUp, Leaf } from "lucide-react";
import { CTA, FloatChip } from "@/components/ui/CTA";
import { ProfileDemo } from "@/components/marketing/ProfileDemo";
import { heroStats, site, trustChips } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  /* Cursor-follow tilt on the hero card, spring-damped and disabled for reduced motion. */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 160,
    damping: 22,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 160,
    damping: 22,
  });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-heading"
      className="grain relative overflow-hidden pt-10 pb-16 sm:pt-14 md:pt-16 lg:pb-24"
    >
      {/* Ambient background: warm radial light + slow drifting orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#fdfbf6_0%,#f8f5ef_38%,#f2ece1_100%)]" />
        <div className="animate-drift absolute -top-40 -left-32 size-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(111,143,99,0.24),transparent_66%)] blur-3xl" />
        <div className="animate-drift-slow absolute -top-24 right-0 size-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(184,145,47,0.2),transparent_66%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-[26rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(184,97,58,0.12),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#10201a_1px,transparent_1px),linear-gradient(to_bottom,#10201a_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          {/* Copy column */}
          <div className="relative max-w-xl">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2.5 rounded-full border border-forest/15 bg-white/65 py-1.5 pr-4 pl-1.5 backdrop-blur-md"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-paper uppercase">
                Alama
              </span>
              <span className="text-[0.75rem] font-medium text-ink/75">
                Swahili for mark · Hardwood NFC identity
              </span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: EASE, delay: 0.08 }}
              className="mt-6 text-display text-[clamp(2.75rem,7vw,4.85rem)] text-ink"
            >
              Don&apos;t just hand over a card.
              <br className="hidden sm:block" />{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-forest">Leave a mark.</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 16"
                  className="absolute -bottom-1 left-0 h-3 w-full text-clay/50"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2 11C60 4 140 3 298 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
              className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-ink/75 sm:text-[1.125rem]"
            >
              A hand-finished wooden NFC card that shares your full professional
              identity, briefs, and direct value with a single tap. No app on their
              side, no paper reprints on yours, and over half of every order plants
              indigenous trees in Kenya.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <CTA href="/#cta" variant="primary" size="lg" withArrow>
                Get your {site.name} · KES 3,500
              </CTA>
              <CTA href="/#studio" variant="secondary" size="lg">
                Design in Card Studio
              </CTA>
            </motion.div>

            <motion.ul
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {trustChips.map((chip) => (
                <li key={chip} className="flex items-center gap-1.5 text-[0.75rem] text-ink/70">
                  <svg viewBox="0 0 12 12" className="size-3 text-moss" aria-hidden="true">
                    <path
                      d="M2 6.4 4.6 9 10 3.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {chip}
                </li>
              ))}
            </motion.ul>

            <motion.dl
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
              className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ink/10 pt-6"
            >
              {heroStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-display text-[1.6rem] text-forest sm:text-[1.85rem]">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-[0.75rem] leading-snug text-ink/70">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Visual column */}
          <motion.div
            style={reduce ? undefined : { y: cardY }}
            className="relative mx-auto w-full max-w-[30rem] lg:max-w-none"
          >
            <div
              onPointerMove={handleMove}
              onPointerLeave={handleLeave}
              className="relative [perspective:1400px]"
            >
              {/* main photo card */}
              <motion.div
                style={reduce ? undefined : { y: imgY, rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
                initial={reduce ? false : { opacity: 0, scale: 0.94, y: 26 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.18 }}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/60 shadow-card"
              >
                <Image
                  src="/images/hero-card.webp"
                  alt="A hand-finished walnut Alama NFC business card resting on warm sand-coloured paper in morning light"
                  width={1400}
                  height={788}
                  priority
                  sizes="(max-width: 1024px) 90vw, 46vw"
                  className="h-[19rem] w-full object-cover object-[28%_center] sm:h-[23rem] lg:h-[26rem]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-forest/18 via-transparent to-brass/10"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/30" />
              </motion.div>

              {/* floating profile card, overlapping */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.42 }}
                className="relative z-20 -mt-20 ml-auto w-[16.5rem] sm:-mt-24 sm:w-[17.5rem] lg:-mt-28 lg:mr-2"
              >
                <div className="animate-float-slow">
                  <ProfileDemo />
                </div>
              </motion.div>

              {/* annotation chips */}
              <FloatChip delay={0.85} className="absolute -top-3 -left-2 z-30 hidden items-center gap-2 text-ink/80 sm:flex">
                <span className="relative flex size-6 items-center justify-center">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-clay/30" aria-hidden="true" />
                  <Nfc className="relative size-3.5 text-clay" aria-hidden="true" />
                </span>
                <span className="font-medium">NFC · tap to share value</span>
              </FloatChip>

              <FloatChip delay={1} className="absolute -bottom-4 left-0 z-30 hidden items-center gap-2 text-ink/80 md:flex">
                <QrCode className="size-3.5 text-forest-400" aria-hidden="true" />
                <span className="font-medium">QR etched on reverse</span>
              </FloatChip>

              <FloatChip delay={1.15} className="absolute top-1/3 -right-3 z-30 hidden items-center gap-2 text-ink/80 xl:flex">
                <TrendingUp className="size-3.5 text-moss" aria-hidden="true" />
                <span className="font-medium">18 introductions this week</span>
              </FloatChip>
            </div>

            {/* under-glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 left-1/2 -z-10 h-32 w-[85%] -translate-x-1/2 rounded-[50%] bg-forest/18 blur-3xl"
            />
          </motion.div>
        </div>

        {/* quiet footer line inside hero */}
        <motion.div
          style={reduce ? undefined : { opacity: fade }}
          className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 lg:mt-20"
        >
          <p className="inline-flex items-center gap-2 text-[0.75rem] text-ink/70">
            <Leaf className="size-3.5 text-moss" aria-hidden="true" />
            Handcrafted in {site.location}. Planted for Kenya.
          </p>
          <p className="inline-flex items-center gap-2 text-[0.75rem] text-ink/70">
            <Sparkles className="size-3.5 text-brass" aria-hidden="true" />
            Unlimited profile updates for the life of your card
          </p>
        </motion.div>
      </div>
    </section>
  );
}
