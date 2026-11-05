import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource-variable/instrument-sans";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Kadi — The last business card you will ever print",
    template: "%s · Kadi",
  },
  description: site.description,
  keywords: [
    "NFC business card Kenya",
    "wooden business card Nairobi",
    "digital business card",
    "vCard",
    "networking card Africa",
    "Kadi",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: site.url,
    siteName: site.legalName,
    title: "Kadi — The last business card you will ever print",
    description: site.description,
    images: [
      {
        url: "/images/hero-card.webp",
        width: 1376,
        height: 768,
        alt: "A hand-finished walnut NFC business card in warm morning light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kadi — The last business card you will ever print",
    description: site.description,
    images: ["/images/hero-card.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0d2a21" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      url: site.url,
      email: site.email,
      telephone: site.phone,
      description: site.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.legalName,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-KE",
    },
    {
      "@type": "Product",
      name: "Kadi Wooden NFC Business Card",
      brand: { "@type": "Brand", name: "Kadi" },
      description:
        "A hand-finished wooden NFC business card with a printed QR fallback and an editable digital profile.",
      offers: {
        "@type": "Offer",
        price: "3500",
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
        url: `${site.url}/#pricing`,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does the person receiving my card need an app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Your Kadi holds a link, not your data. They tap the card with a phone and your profile opens in the browser they already use.",
          },
        },
        {
          "@type": "Question",
          name: "What if their phone doesn't support NFC?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every card has a printed QR code on the reverse that opens the same profile.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-KE">
      <body className="antialiased">
        <a href="#main" className="skip-link rounded-full bg-forest px-4 py-2 text-sm font-medium text-paper shadow-lift">
          Skip to content
        </a>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
