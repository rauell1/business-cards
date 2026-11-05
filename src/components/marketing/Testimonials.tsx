"use client";

import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            id="testimonials-heading"
            eyebrow="In their own words"
            align="center"
            title={
              <>
                The card opens the{" "}
                <span className="italic text-forest">conversation.</span>
              </>
            }
            body="What clients tell us about most is the follow-up: the messages and meetings that happen because a single tap shared their full work and saved their name."
          />
        </Reveal>

        <StaggerGroup as="ul" className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem as="li" key={t.name}>
              <figure className="group relative flex h-full flex-col rounded-2xl border border-ink/10 bg-white/65 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-ink/18 hover:bg-white/95 hover:shadow-lift sm:p-7">
                <Quote
                  aria-hidden="true"
                  className="size-6 text-clay/30 transition-colors duration-500 group-hover:text-clay/50"
                />
                <div className="mt-3 flex gap-0.5" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-brass text-brass" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-3.5 flex-1 text-[0.9375rem] leading-[1.6] text-ink/80">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/8 pt-5">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-forest text-[0.6875rem] font-semibold tracking-wide text-paper">
                    {t.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[0.8125rem] font-semibold text-ink">{t.name}</p>
                    <p className="truncate text-[0.75rem] text-ink/70">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-[0.75rem] text-ink/65">
            Testimonials reflect individual experiences. Names shown with permission.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
