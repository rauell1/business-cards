"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Nfc } from "lucide-react";

/**
 * Two conversion affordances that only exist on small screens:
 *   1. a hairline reading-progress bar under the sticky header
 *   2. a bottom action bar that appears once the hero is behind you
 * Both are inert for keyboard-only desktop users and hidden from print.
 */
export function MobileCta() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  /* Visible after the hero, hidden again over the final CTA + footer so it
     never covers legal links or duplicate the section's own buttons. */
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("cta");
    const footer = document.querySelector("footer");
    if (!target) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        setNearEnd(seen.size > 0);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(target);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  const visible = show && !nearEnd;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-forest via-moss to-brass print:hidden"
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={reduce ? false : { y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 90, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-40 sm:hidden print:hidden"
          >
            <div className="glass flex items-center gap-3 rounded-2xl p-2.5 pl-3.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest text-paper">
                <Nfc className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.75rem] font-semibold text-ink">
                  One card, unlimited taps
                </p>
                <p className="truncate text-[0.625rem] text-ink/60">From KES 3,500 · ships in 48h</p>
              </div>
              <a
                href="#cta"
                className="inline-flex shrink-0 items-center gap-1 rounded-xl bg-forest px-3 py-2 text-[0.6875rem] font-medium text-paper"
              >
                Order
                <ArrowRight className="size-3" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
