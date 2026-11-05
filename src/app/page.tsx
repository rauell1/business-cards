import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { SocialProof } from "@/components/marketing/SocialProof";
import { Features } from "@/components/marketing/Features";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Showcase } from "@/components/marketing/Showcase";
import { Benefits } from "@/components/marketing/Benefits";
import { Impact } from "@/components/marketing/Impact";
import { Testimonials } from "@/components/marketing/Testimonials";
import { Pricing } from "@/components/marketing/Pricing";
import { Faq } from "@/components/marketing/Faq";
import { FinalCta } from "@/components/marketing/FinalCta";
import { Footer } from "@/components/marketing/Footer";
import { MobileCta } from "@/components/marketing/MobileCta";
import { QrCodeSvg } from "@/components/ui/QrCodeSvg";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <MobileCta />
      <main id="main">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Showcase qr={<QrCodeSvg value={`${site.url}/p/wanjiru`} ariaLabel="Demo QR code linking to the sample Kadi profile" />} />
        <Benefits />
        <Impact />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
