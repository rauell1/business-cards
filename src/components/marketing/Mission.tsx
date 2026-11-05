"use client";

import { useState } from "react";
import { Compass, Sparkles, TreePine, ArrowRight, Layers, Users } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { missionVision } from "@/lib/site";

export function Mission() {
  const [teamSize, setTeamSize] = useState(12);

  // Typical active professional uses ~400 paper cards/yr (~KES 4,500/yr with design & reprints)
  const paperCardsSaved3Yr = teamSize * 1200;
  const paperCost3Yr = teamSize * 13500;
  const alamaCost = teamSize >= 25 ? teamSize * 2400 : teamSize >= 10 ? teamSize * 2800 : teamSize * 3500;
  const netSavings = Math.max(0, paperCost3Yr - alamaCost);
  const seedlingsFunded = teamSize * 14;

  function handleApplyTeam() {
    window.dispatchEvent(
      new CustomEvent("alama:select-order", {
        detail: {
          plan: teamSize >= 25 ? "Scale (KES 2,400/person)" : teamSize >= 10 ? "Team (KES 28,000 / 10 cards)" : "Professional (KES 6,500)",
          teamSize,
        },
      }),
    );
  }

  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="relative scroll-mt-24 border-b border-ink/8 bg-paper py-20 sm:py-24 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_20%_15%,#efe8da_0%,transparent_65%)]" />
      </div>

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <Reveal>
            <SectionHeading
              id="mission-heading"
              eyebrow={missionVision.eyebrow}
              title={
                <>
                  Paper shares a number.{" "}
                  <span className="italic text-forest">Alama leaves value.</span>
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[54ch] text-[1rem] leading-relaxed text-ink/72 lg:pb-2">
              {missionVision.lead}
            </p>
          </Reveal>
        </div>

        {/* Mission & Vision Statements */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-forest/18 bg-forest p-7 text-paper shadow-card sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(184,145,47,0.28),transparent_70%)] blur-2xl"
              />
              <div className="relative flex items-center gap-2.5">
                <span className="inline-flex size-8 items-center justify-center rounded-lg border border-paper/15 bg-paper/10 text-brass">
                  <Compass className="size-4" aria-hidden="true" />
                </span>
                <span className="eyebrow text-[0.6875rem] text-brass">
                  {missionVision.mission.label}
                </span>
              </div>
              <blockquote className="relative mt-6 text-display text-[clamp(1.45rem,2.7vw,2.05rem)] leading-[1.18] text-paper">
                “{missionVision.mission.statement}”
              </blockquote>
              <p className="relative mt-6 text-[0.75rem] tracking-[0.04em] text-paper/65 uppercase">
                Alama · Swahili for Mark, Imprint, or Sign
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-white/75 p-7 backdrop-blur-md sm:p-9">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex size-8 items-center justify-center rounded-lg border border-ink/10 bg-paper-2 text-forest">
                  <Sparkles className="size-4" aria-hidden="true" />
                </span>
                <span className="eyebrow text-[0.6875rem] text-forest-400">
                  {missionVision.vision.label}
                </span>
              </div>
              <blockquote className="mt-6 text-display text-[clamp(1.45rem,2.7vw,2.05rem)] leading-[1.18] text-ink">
                “{missionVision.vision.statement}”
              </blockquote>
              <p className="mt-6 text-[0.75rem] tracking-[0.04em] text-ink/65 uppercase">
                Built for partners, founders, and creators in East Africa
              </p>
            </div>
          </Reveal>
        </div>

        {/* Three Pillars of Leaving Value */}
        <StaggerGroup as="ul" className="mt-6 grid gap-4 md:grid-cols-3">
          {missionVision.valuePillars.map((pillar) => (
            <StaggerItem as="li" key={pillar.number}>
              <div className="flex h-full flex-col rounded-2xl border border-ink/8 bg-paper-2/65 p-6 transition-colors duration-300 hover:border-ink/16 hover:bg-white/70 sm:p-7">
                <span className="eyebrow text-[0.6875rem] text-clay">
                  Pillar {pillar.number}
                </span>
                <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/70">
                  {pillar.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Interactive Value & Reforestation Calculator */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-lift backdrop-blur-md sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-forest" aria-hidden="true" />
                  <span className="eyebrow text-[0.6875rem] text-forest">
                    Value &amp; Footprint Calculator
                  </span>
                </div>
                <h3 className="mt-2.5 text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">
                  See what switching your team to Alama replaces
                </h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink/70">
                  Slide to match your firm size. Compare three years of paper card
                  reprints against permanent hardwood cards that plant indigenous trees.
                </p>

                <div className="mt-6">
                  <div className="flex items-baseline justify-between">
                    <label
                      htmlFor="team-size-slider"
                      className="text-[0.8125rem] font-medium text-ink/80"
                    >
                      Team size carrying Alama
                    </label>
                    <span className="text-display text-[1.75rem] text-forest tabular-nums">
                      {teamSize} {teamSize === 1 ? "person" : "people"}
                    </span>
                  </div>
                  <input
                    id="team-size-slider"
                    type="range"
                    min={1}
                    max={100}
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-3 accent-forest"
                  />
                  <div className="mt-1.5 flex justify-between text-[0.6875rem] text-ink/60">
                    <span>Solo (1)</span>
                    <span>Studio (10)</span>
                    <span>Firm (25)</span>
                    <span>Enterprise (100)</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-ink/8 bg-paper/80 p-4">
                  <Layers className="size-4 text-clay" aria-hidden="true" />
                  <p className="mt-3 text-display text-[1.65rem] text-ink tabular-nums">
                    {paperCardsSaved3Yr.toLocaleString("en-KE")}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-snug text-ink/70">
                    paper cards eliminated over 3 years
                  </p>
                </div>

                <div className="rounded-xl border border-ink/8 bg-paper/80 p-4">
                  <Sparkles className="size-4 text-brass" aria-hidden="true" />
                  <p className="mt-3 text-display text-[1.65rem] text-forest tabular-nums">
                    KES {netSavings.toLocaleString("en-KE")}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-snug text-ink/70">
                    estimated 3-year savings on reprints
                  </p>
                </div>

                <div className="rounded-xl border border-forest/15 bg-forest/6 p-4">
                  <TreePine className="size-4 text-forest" aria-hidden="true" />
                  <p className="mt-3 text-display text-[1.65rem] text-forest tabular-nums">
                    {seedlingsFunded.toLocaleString("en-KE")}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-snug text-ink/75">
                    indigenous Kenyan seedlings funded
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <a
                    href="#cta"
                    onClick={handleApplyTeam}
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-[0.8125rem] font-medium text-paper transition-colors hover:bg-forest-600"
                  >
                    Configure order for {teamSize} {teamSize === 1 ? "person" : "people"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
