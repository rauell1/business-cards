/**
 * Single source of truth for marketing copy.
 *
 * NOTE ON FIGURES: metrics, testimonials and example profiles below are
 * illustrative demo content for the landing page build. Swap them for verified
 * production numbers before launch. Every number lives here so that is a
 * one-file change.
 */

export const site = {
  name: "Kadi",
  legalName: "Kadi Africa",
  domain: "kadi.africa",
  url: "https://kadi.africa",
  tagline: "The last business card you will ever print.",
  description:
    "Kadi is a hand-finished wooden NFC business card. Tap any phone and your whole professional identity opens — no app, no typing, no reprints. Made in Nairobi, with over half of revenue funding reforestation in Kenya.",
  email: "hello@kadi.africa",
  phone: "+254 712 000 000",
  phoneHref: "+254712000000",
  location: "Nairobi, Kenya",
  whatsapp: "254712000000",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "X", href: "https://x.com/", icon: "x" },
    { label: "TikTok", href: "https://www.tiktok.com/", icon: "tiktok" },
  ],
} as const;

export const nav = [
  { label: "The card", href: "#card" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Your profile", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
  { label: "Impact", href: "#impact" },
  { label: "FAQ", href: "#faq" },
] as const;

export const heroStats = [
  { value: "2,400+", label: "professionals carrying Kadi" },
  { value: "18,000+", label: "taps exchanged this year" },
  { value: "55%", label: "of revenue to reforestation" },
] as const;

export const trustChips = [
  "Works on iPhone & Android",
  "No app required",
  "Dispatched in 48h from Nairobi",
] as const;

/** Sectors rather than borrowed logos — we never imply an endorsement we can't verify. */
export const sectors = [
  "Fintech",
  "Legal",
  "Hospitality",
  "Creative studios",
  "Consulting",
  "Universities",
  "Health",
  "Logistics",
  "Agriculture",
  "Agencies",
  "Real estate",
  "NGOs",
] as const;

export const features = [
  {
    id: "nfc",
    icon: "nfc",
    title: "Tap, don't talk",
    body: "One tap against any modern phone and your profile is open — before you've finished saying hello. No app, no downloads, no fumbling for a card holder.",
    span: "lg:col-span-6",
    accent: true,
  },
  {
    id: "qr",
    icon: "qr",
    title: "QR on the back",
    body: "Every card carries a printed QR code, so older phones and printed materials still work perfectly.",
    span: "lg:col-span-6",
  },
  {
    id: "live",
    icon: "pencil",
    title: "Edit once, live forever",
    body: "Promoted? Moved? New number? Update your profile in the dashboard and every card you've ever handed out is instantly current.",
    span: "lg:col-span-4",
  },
  {
    id: "contact",
    icon: "contact",
    title: "One tap to save",
    body: "Recipients save your full contact record — photo, numbers, WhatsApp, links — straight into their phone book.",
    span: "lg:col-span-4",
  },
  {
    id: "analytics",
    icon: "chart",
    title: "Know what happens next",
    body: "See taps, QR scans, contact saves and link clicks. Find out which room, and which card, actually opens doors.",
    span: "lg:col-span-4",
  },
  {
    id: "scanner",
    icon: "scan",
    title: "AI paper-card scanner",
    body: "Photograph a traditional card and Kadi extracts the name, company and numbers into your contacts. Nothing gets lost in a drawer again.",
    span: "lg:col-span-6",
  },
  {
    id: "pwa",
    icon: "offline",
    title: "Your card, on your home screen",
    body: "Install Kadi as an app and share your QR from the lock screen — with your profile cached for the moments the network isn't.",
    span: "lg:col-span-6",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Order your card",
    body: "Choose a finish, pay with M-Pesa or card, and we hand-finish and dispatch from Nairobi within 48 hours.",
    detail: "Delivery countrywide in 2–4 days",
  },
  {
    number: "02",
    title: "Build your profile",
    body: "Add your photo, role, company, WhatsApp, website and socials. Pick your colours. Publish in about four minutes.",
    detail: "Live preview while you edit",
  },
  {
    number: "03",
    title: "Tap and be remembered",
    body: "Hold your Kadi to a phone. Your profile opens instantly, and your new contact has everything they need to follow up.",
    detail: "Works offline via printed QR",
  },
] as const;

export const benefits = [
  {
    title: "You never run out of cards",
    body: "One card, unlimited introductions. No reprints when you change role, number or company — just edit and publish.",
  },
  {
    title: "You are remembered",
    body: "A wooden card is kept. Paper cards go in a drawer. Your tap lands in their phone, with a photo attached to the name.",
  },
  {
    title: "You follow up with context",
    body: "Every tap is logged, so you know who opened your card and what they were interested in before the call.",
  },
  {
    title: "You don't need a budget line",
    body: "Reprinting 500 paper cards costs more than one Kadi — and every Kadi plants trees back home.",
  },
] as const;

export const teamBenefits = [
  "Branded profiles with your company colours and logo",
  "Bulk ordering and per-seat card assignment",
  "Central admin — add or remove team members in seconds",
  "Organisation-wide analytics on one dashboard",
  "Consistent identity across the whole client-facing team",
] as const;

export const testimonials = [
  {
    quote:
      "I hand out one card at every pitch. Clients tap it, save me, and message on WhatsApp before I've left the building. My callback rate has genuinely doubled.",
    name: "Wanjiru Kamau",
    role: "Partner, Commercial Litigation",
    company: "Nairobi",
    initials: "WK",
  },
  {
    quote:
      "We replaced six hundred paper cards a year with Kadis for the whole business development team. The admin side is what sold our finance director.",
    name: "Otieno Odhiambo",
    role: "Head of Business Development",
    company: "Fintech, Westlands",
    initials: "OO",
  },
  {
    quote:
      "The card itself is beautiful — people keep it on their desk. But the part that changed my work is the scanner: a decade of paper cards is now a searchable address book.",
    name: "Aisha Mohamed",
    role: "Independent Consultant",
    company: "Mombasa",
    initials: "AM",
  },
] as const;

export type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  note: string;
  summary: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
};

export const individualPlans: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    price: "KES 3,500",
    period: "one-time",
    note: "One wooden NFC card · free lifetime profile",
    summary: "For the professional who meets people for a living.",
    features: [
      "Hand-finished walnut NFC card",
      "Unlimited profile edits, forever",
      "QR code on the reverse",
      "vCard download & WhatsApp share",
      "Basic tap & scan analytics",
      "Nairobi dispatch in 48 hours",
    ],
    cta: "Order a Kadi",
    href: "#cta",
  },
  {
    id: "professional",
    name: "Professional",
    price: "KES 6,500",
    period: "one-time",
    note: "Two cards + AI paper-card scanner",
    summary: "For founders, consultants and anyone always closing.",
    features: [
      "Everything in Solo, plus a spare card",
      "AI paper-card scanner (12 months)",
      "Custom profile theme & brand colours",
      "Documents, portfolio & booking links",
      "Advanced analytics with link-level detail",
      "Priority WhatsApp support",
    ],
    cta: "Order Professional",
    href: "#cta",
    featured: true,
    badge: "Most chosen",
  },
  {
    id: "collector",
    name: "Atelier",
    price: "KES 12,000",
    period: "one-time",
    note: "Limited batch, laser-etched detail",
    summary: "For those who treat a first impression as a craft.",
    features: [
      "Everything in Professional",
      "Hand-oiled ebony or olive wood finish",
      "Custom laser-etched name or monogram",
      "Presentation box & desk stand",
      "Engraved brass QR plate",
      "Lifetime AI scanner access",
    ],
    cta: "Request a finish",
    href: "#cta",
  },
];

export const teamPlans: Plan[] = [
  {
    id: "team-10",
    name: "Team",
    price: "KES 28,000",
    period: "per 10 people",
    note: "Branded wooden cards for your team",
    summary: "A consistent front door for a growing client-facing team.",
    features: [
      "10 wooden NFC cards, your logo etched",
      "Organisation profile & member management",
      "Bulk card assignment from one dashboard",
      "Team analytics and reporting",
      "Onboarding session for your admins",
      "Dedicated account contact",
    ],
    cta: "Talk to sales",
    href: "#cta",
  },
  {
    id: "team-scale",
    name: "Scale",
    price: "KES 2,400",
    period: "per person",
    note: "25 people and above, invoiced",
    summary: "For firms standardising how the whole company introduces itself.",
    features: [
      "Everything in Team, at volume pricing",
      "Custom domain for every profile",
      "SSO-ready organisation accounts",
      "Quarterly identity & brand review",
      "Finance-friendly invoicing and LPOs",
      "Replacement cards at cost",
    ],
    cta: "Book a walkthrough",
    href: "#cta",
    featured: true,
    badge: "Best for firms",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "annual",
    note: "Travel, events and multi-country teams",
    summary: "For organisations issuing identity across borders and events.",
    features: [
      "Everything in Scale",
      "Event & conference bulk issue",
      "API access and data export",
      "Security review & DPA support",
      "Multiple brands under one account",
      "Named success manager",
    ],
    cta: "Speak to our team",
    href: "#cta",
  },
];

export const faqs = [
  {
    q: "Does the person receiving my card need an app?",
    a: "No. Your Kadi holds a link, not your data. They tap the card with a phone and your profile opens in the browser they already use. Apple and Android devices from 2019 onwards handle this natively, with no setup on their side.",
  },
  {
    q: "What if their phone doesn't support NFC?",
    a: "Every card has a printed QR code on the reverse that opens exactly the same profile. We also give you a shareable link and a downloadable QR you can drop into slides, email signatures or an event badge.",
  },
  {
    q: "What happens if I change jobs or phone numbers?",
    a: "You edit your profile in the Kadi dashboard and hit publish. That is the whole process. The card in someone's wallet keeps working, and it is already showing your new details — no reprint, no mailing cards back.",
  },
  {
    q: "Can I really never run out of cards?",
    a: "One card covers unlimited introductions. People tap it, they save your details to their own phone. Ordering a second card is about having a spare and a different finish, not because the first one ran dry.",
  },
  {
    q: "Is my personal information public?",
    a: "Only what you switch on. Your dashboard controls each field individually, and profiles are unlisted by default until you publish them. The card's chip stores a URL, never your phone number, email or ID.",
  },
  {
    q: "How does the environmental commitment work?",
    a: "More than half of every payment is directed into reforestation partners planting indigenous trees in Kenya. You get a certificate with your order and an impact record in your dashboard, so the number is yours to check, not just a claim on a website.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "M-Pesa for Kenyan customers, with card payments for international orders. Team and enterprise orders can be invoiced against an LPO.",
  },
  {
    q: "Can I use Kadi offline?",
    a: "You can install your Kadi as a web app with your profile and QR cached for low-signal moments. Tap-to-open still needs a connection the first time a recipient loads it, because the profile lives online — that is what lets you edit it forever.",
  },
] as const;

export const impact = {
  eyebrow: "Impact, measured",
  heading: "More than half of every shilling grows something.",
  body: "Wood, not plastic. Indigenous seedlings, not quick-growing exotics. Every Kadi payment directs over 50% into reforestation work with Kenyan planting partners, and your dashboard shows the trees attached to your card — because a claim you can audit is worth more than a badge on a website.",
  stats: [
    { value: "55%", label: "of revenue to reforestation" },
    { value: "41,600", label: "seedlings planted to date" },
    { value: "126", label: "partner growers in 11 counties" },
    { value: "0", label: "grams of PVC per card" },
  ],
} as const;

export const showcase = {
  eyebrow: "The digital identity",
  heading: "A profile that does the remembering for you.",
  body: "Your tap opens one page: who you are, where you work, and every way to reach you. Visitors can save you as a contact in one press, message you on WhatsApp, or download your company profile — all without an account.",
  tabs: [
    {
      id: "tap",
      label: "NFC tap",
      title: "One tap, zero typing",
      body: "Hold the card near the top of any phone. The profile opens in the default browser in under a second. The chip only stores the link, which is why your details can change forever without touching the card.",
      points: ["No app on either side", "Works on iOS 13+ and Android 5+", "Chip stores a URL, never your data"],
    },
    {
      id: "qr",
      label: "QR fallback",
      title: "A QR that matches your card",
      body: "Printed on the reverse in a finish that survives a wallet. Recipients scan with the camera they already have, and you can download the same code as PNG or SVG for decks, badges and signage.",
      points: ["High-resolution PNG & SVG export", "Tracked separately from taps", "Never expires, never reprints"],
    },
    {
      id: "profile",
      label: "Live profile",
      title: "Everything they need, in order",
      body: "Photo, role, company and location at the top. Then call, WhatsApp and email. Then socials, portfolio, documents and booking links. All editable from your dashboard, reflected instantly.",
      points: ["Save-to-contacts on every profile", "Privacy controls per field", "Loads in under a second"],
    },
  ],
} as const;
