import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `The terms that apply when you order an ${site.name} card or use an ${site.name} digital profile.`,
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    heading: "These terms",
    body: `By ordering an ${site.name} card or using an ${site.name} digital profile you agree to these terms. They are governed by the laws of Kenya.`,
  },
  {
    heading: "Orders and delivery",
    body: "Prices are shown in Kenyan shillings and include the card and lifetime profile hosting. Delivery timelines are estimates. We dispatch within two working days of a verified payment, and delivery countrywide typically takes two to four days.",
  },
  {
    heading: "Your profile",
    body: "You are responsible for the accuracy of what you publish and for having the right to publish it. Do not use a profile for impersonation, harassment, or unlawful trade. We may suspend a profile that breaches these terms, and will tell you why.",
  },
  {
    heading: "The hardware",
    body: "Each card carries a manufacturing warranty against faults for 14 days from delivery. Wood grain and tone vary between cards; that is a property of the material, not a defect. Loss, theft, and accidental damage are not covered, though replacement cards are available at a reduced price.",
  },
  {
    heading: "Changes to these terms",
    body: "If we change these terms we will update this page and note the date. Orders are governed by the terms in force when the order was placed.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="py-16 sm:py-20">
        <div className="container-x max-w-3xl">
          <p className="eyebrow text-ink/70">Legal</p>
          <h1 className="mt-4 text-display text-[clamp(2rem,5vw,3.2rem)] text-ink">
            Terms of service
          </h1>
          <p className="mt-4 text-sm text-ink/70">
            Last updated 2026 · {site.legalName}, {site.location}
          </p>
          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
                  {s.heading}
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/70">{s.body}</p>
              </section>
            ))}
            <section>
              <h2 className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
                Contact
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/70">
                Questions about these terms:{" "}
                <a className="text-forest underline decoration-forest/30 underline-offset-4" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            </section>
          </div>
          <p className="mt-12 rounded-xl border border-ink/10 bg-white/70 p-4 text-xs leading-relaxed text-ink/70">
            These terms are a working draft for the build. Have them reviewed by counsel
            before you take live orders.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
