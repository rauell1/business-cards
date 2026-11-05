"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { nav, site } from "@/lib/site";
import { CTA } from "@/components/ui/CTA";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 16));

  /* Scroll spy: highlights the section currently in the reading band. */
  useEffect(() => {
    const ids = nav.map((n) => n.href.replace(/^\/?#/, ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`/#${visible.target.id}`);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock scroll + escape handling while the mobile sheet is open. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 120);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  return (
    <>
      {/* Announcement strip: stays in natural document flow to avoid first-scroll layout shift. */}
      <div className="relative z-40 bg-forest text-paper/90">
        <div className="container-x flex h-9 items-center justify-center gap-2 text-[0.75rem] tracking-[0.02em]">
          <span className="hidden size-1.5 rounded-full bg-clay-soft sm:block" aria-hidden="true" />
          <p className="truncate">
            Free delivery within Nairobi this month. Over 55% of every order funds
            Kenyan reforestation.
          </p>
        </div>
      </div>

      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className={cn(
          "sticky top-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-b border-ink/8 bg-paper/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="container-x flex h-16 items-center justify-between gap-6 md:h-[4.5rem]"
        >
          <a
            href="/#top"
            className="group flex shrink-0 items-center gap-2.5 rounded-lg"
            aria-label={`${site.name} home`}
          >
            <Logo className="size-8 transition-transform duration-500 group-hover:rotate-[8deg]" />
            <span className="flex flex-col leading-none">
              <span className="text-[1.08rem] font-semibold tracking-[-0.03em] text-ink">
                {site.name}
              </span>
              <span className="mt-0.5 eyebrow text-[0.625rem] text-ink/70">
                {site.subLabel}
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={cn(
                    "relative inline-flex h-9 items-center rounded-full px-3.5 text-[0.8125rem] font-medium transition-colors duration-300",
                    active === item.href
                      ? "text-ink"
                      : "text-ink/70 hover:text-ink",
                  )}
                >
                  {item.label}
                  {active === item.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-ink/8"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <CTA href="/p/wanjiru" variant="ghost" size="sm" className="hidden sm:inline-flex">
              Live profile
            </CTA>
            <CTA href="/#cta" variant="primary" size="sm" className="hidden sm:inline-flex" withArrow>
              Get your {site.name}
            </CTA>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink/12 bg-white/70 text-ink backdrop-blur transition-colors hover:bg-white lg:hidden"
            >
              {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-ink/35 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-nav"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-0 overflow-hidden rounded-b-[2rem] border-b border-ink/10 bg-paper shadow-card"
            >
              <div className="container-x flex h-16 items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Logo className="size-7" />
                  <span className="text-[1rem] font-semibold tracking-[-0.03em]">{site.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-ink/12 bg-white/70"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              <ul className="container-x flex flex-col pb-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.38 }}
                    className="border-b border-ink/6 last:border-0"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-3.5 text-[1.3rem] text-display text-ink"
                    >
                      {item.label}
                      <span className="eyebrow text-[0.6875rem] text-ink/65">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="container-x flex flex-col gap-2.5 pt-3 pb-7">
                <CTA href="/#cta" variant="primary" size="lg" withArrow onClick={() => setOpen(false)}>
                  Get your {site.name}
                </CTA>
                <CTA href="/p/wanjiru" variant="secondary" size="lg" onClick={() => setOpen(false)}>
                  Try live demo profile
                </CTA>
                <p className="pt-2 text-center text-xs text-ink/70">
                  {site.location} · Dispatch in 48 hours
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
