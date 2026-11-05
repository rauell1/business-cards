import { CTA } from "@/components/ui/CTA";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-6 py-24 text-center">
      <div className="max-w-md">
        <Logo className="mx-auto size-12" />
        <p className="mt-8 eyebrow text-ink/70">404</p>
        <h1 className="mt-3 text-display text-[clamp(2rem,6vw,3rem)] text-ink">
          This path leaves no mark.
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/70">
          The page you were looking for may have moved. Your {site.name} profile is
          always reachable at its permanent address.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CTA href="/" variant="primary" size="md" withArrow>
            Back to {site.name}
          </CTA>
          <CTA href="/p/wanjiru" variant="secondary" size="md">
            View sample profile
          </CTA>
        </div>
      </div>
    </main>
  );
}
