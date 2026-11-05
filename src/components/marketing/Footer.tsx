import { ArrowUp, Linkedin, Instagram } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Card Studio", href: "/#studio" },
      { label: "The wooden card", href: "/#card" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Digital profiles", href: "/#showcase" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Ethos & Impact",
    links: [
      { label: "Mission & vision", href: "/#mission" },
      { label: "Reforestation ledger", href: "/#impact" },
      { label: "For teams & firms", href: "/#benefits" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Identity & Legal",
    links: [
      { label: "Live demo profile", href: "/p/wanjiru" },
      { label: "Commission a card", href: "/#cta" },
      { label: "Privacy notice", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
] as const;

/* Brand glyphs: use the real marks rather than a lookalike icon. */
function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.53 3H21l-7.19 8.21L21.8 21h-6.3l-4.55-5.95L5.7 21H2.23l7.5-8.57L2 3h6.3l4.29 5.66L17.53 3Zm-1.1 16.1h1.74L7.44 4.79H5.58L16.43 19.1Z" />
    </svg>
  );
}

function TikTokMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82A5.9 5.9 0 0 0 15.3 3h-3.1v12.2a2.6 2.6 0 1 1-1.85-2.49V9.5a5.7 5.7 0 1 0 4.95 5.65V8.9a8.7 8.7 0 0 0 4.2 1.08V6.9a5.6 5.6 0 0 1-2.9-1.08Z" />
    </svg>
  );
}

const socialIcons = {
  linkedin: Linkedin,
  instagram: Instagram,
  tiktok: TikTokMark,
  x: XMark,
} as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink/8 bg-paper-2/60 pt-14 pb-10">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,minmax(0,0.8fr))] md:gap-8">
          <div className="max-w-xs">
            <a href="/#top" className="inline-flex items-center gap-2.5" aria-label={`${site.name} home`}>
              <Logo className="size-8" />
              <span className="flex flex-col leading-none">
                <span className="text-[1.08rem] font-semibold tracking-[-0.03em] text-ink">
                  {site.name}
                </span>
                <span className="mt-0.5 eyebrow text-[0.625rem] text-ink/70">
                  {site.subLabel}
                </span>
              </span>
            </a>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink/70">
              Hand-finished wooden NFC business cards crafted in Nairobi. One tap shares
              your full professional identity and lasting value, while over half of every
              order plants indigenous trees in Kenya.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-8 items-center justify-center rounded-full border border-ink/12 bg-white/60 text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest/30 hover:bg-white hover:text-forest"
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow text-[0.6875rem] text-ink/70">{col.title}</h3>
              <ul className="mt-3.5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-1 text-[0.8125rem] text-ink/70 transition-colors hover:text-forest"
                    >
                      <span className="h-px w-0 bg-forest transition-all duration-300 group-hover:w-3" aria-hidden="true" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-ink/70">
            © {year} {site.legalName}. Handcrafted in {site.location}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] text-ink/70">
            <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-ink">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
              {site.email}
            </a>
            <a href="/#top" className="inline-flex items-center gap-1 transition-colors hover:text-ink">
              Back to top
              <ArrowUp className="size-3" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-4 text-[0.6875rem] leading-relaxed text-ink/65">
          {site.name} is an independent East African identity brand. Hardwood grain and
          tones vary naturally between cards. Nothing on this page replaces the terms
          agreed at checkout.
        </p>
      </div>
    </footer>
  );
}
