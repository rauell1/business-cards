import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    `How ${site.name} collects, uses, and protects personal information, in line with Kenya's Data Protection Act, 2019.`,
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    heading: "What this page covers",
    body: `This notice explains what ${site.name} collects when you visit this website, order a card, or open someone's digital profile. It follows Kenya's Data Protection Act, 2019.`,
  },
  {
    heading: "Information we collect",
    body: "When you order, we collect the details needed to fulfil it: name, phone number, email, delivery address, and payment reference. When you build a profile, we store only the fields you choose to publish, plus the fields you keep private. Payment card data is handled by our payment providers and never stored on our servers.",
  },
  {
    heading: "What a profile visitor sees",
    body: "Profile visitors see only the fields you have switched to public. We record privacy-conscious events (such as a profile view, a contact save, or a link click) without collecting visitor names, and we do not build advertising profiles of visitors.",
  },
  {
    heading: "How long we keep it",
    body: "Order records are kept for as long as tax and accounting rules require. Profile analytics are aggregated and event records are retained for a limited period. You can request deletion of your account and profile at any time.",
  },
  {
    heading: "Your rights",
    body: "You may request access to your data, correction, deletion, or a portable export. Write to us and we will respond within the statutory period.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="py-16 sm:py-20">
        <div className="container-x max-w-3xl">
          <p className="eyebrow text-ink/70">Legal</p>
          <h1 className="mt-4 text-display text-[clamp(2rem,5vw,3.2rem)] text-ink">
            Privacy notice
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
                Questions about this notice:{" "}
                <a className="text-forest underline decoration-forest/30 underline-offset-4" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
            </section>
          </div>
          <p className="mt-12 rounded-xl border border-ink/10 bg-white/70 p-4 text-xs leading-relaxed text-ink/70">
            This is a starting notice for the build. Have it reviewed by counsel and
            aligned with your actual data-processing register before launch.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
