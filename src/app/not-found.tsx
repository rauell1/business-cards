import { CTA } from "@/components/ui/CTA";
import { Logo } from "@/components/ui/Logo";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-6 py-24 text-center">
      <div className="max-w-md">
        <Logo className="mx-auto size-12" />
        <p className="mt-8 eyebrow text-ink/60">404</p>
        <h1 className="mt-3 text-display text-[clamp(2rem,6vw,3rem)] text-ink">
          This card leads nowhere.
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/60">
          The page you were looking for may have moved. Your Kadi profile is always at
          its own permanent address.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <CTA href="/" variant="primary" size="md" withArrow>
            Back to Kadi
          </CTA>
        </div>
      </div>
    </main>
  );
}
