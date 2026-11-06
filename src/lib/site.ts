/**
 * Single source of truth for marketing copy, brand identity, and demo data.
 *
 * NOTE ON FIGURES: metrics, testimonials, and example profiles below are
 * illustrative demo content for the landing page build. Swap them for verified
 * production numbers before launch. Every number lives here so that is a
 * one-file change.
 */

export const site = {
  name: "Alama",
  subLabel: "Identity",
  legalName: "Alama Identity",
  domain: "alama.africa",
  url: "https://alama.africa",
  tagline: "Don't just hand over a card. Leave a mark.",
  description:
    "Alama is Swahili for mark. We craft hand-finished wooden NFC cards that share your full professional identity, portfolio, and lasting value with a single tap. No app, no typing, no reprints. Made in Nairobi, with over half of revenue funding reforestation in Kenya.",
  email: "hello@alama.africa",
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
  { label: "Our ethos", href: "/#mission" },
  { label: "Card studio", href: "/#studio" },
  { label: "Features", href: "/#card" },
  { label: "Your profile", href: "/#showcase" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Impact", href: "/#impact" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const heroStats = [
  { value: "2,400+", label: "professionals carrying Alama" },
  { value: "18,000+", label: "introductions made this year" },
  { value: "55%", label: "of revenue to reforestation" },
] as const;

export const trustChips = [
  "Works on iPhone & Android",
  "No app required",
  "Dispatched in 48h from Nairobi",
] as const;

export const missionVision = {
  eyebrow: "The philosophy of the mark",
  heading: "Paper shares a number. Alama leaves value.",
  lead: "In Swahili, Alama means a mark, an imprint, or a sign. Anyone who carries an Alama card is choosing to leave real value with the person across the table, not another slip of paper destined for a desk drawer.",
  mission: {
    label: "Our Mission",
    statement:
      "To turn every first handshake into lasting professional value, replacing disposable paper with a permanent craft object that plants indigenous forests across Kenya.",
  },
  vision: {
    label: "Our Vision",
    statement:
      "A standard of African professional identity where sharing your contact means leaving something worth keeping: context, utility, and a living footprint.",
  },
  valuePillars: [
    {
      number: "01",
      title: "Leave utility, not homework",
      body: "Instead of making someone type your email from cardstock, your tap gives them instant access to your calendar, pitch deck, case studies, and one-press contact save.",
    },
    {
      number: "02",
      title: "Command the room quietly",
      body: "Hand-oiled hardwood and engraved brass carry weight. When you place an Alama on the table, the craft speaks before you say a word.",
    },
    {
      number: "03",
      title: "Rooted in Kenyan soil",
      body: "Every card replaces thousands of paper reprints and directs 55% of revenue into audited indigenous tree planting with smallholder growers.",
    },
  ],
} as const;

export type CardFinishId = "walnut" | "ebony" | "olive";

export const cardFinishes = [
  {
    id: "walnut" as const,
    name: "Highland Walnut",
    tier: "Included in Solo & Professional",
    origin: "Warm medium-dark grain, hand-rubbed with beeswax and linseed oil",
    swatch: "#5a3d28",
    surfaceGradient:
      "linear-gradient(135deg, #684730 0%, #4b311f 48%, #3a2416 100%)",
    grainColor: "rgba(26, 14, 6, 0.32)",
    inlayColor: "#e8dcc8",
    accentColor: "#d4af63",
    priceLabel: "KES 3,500",
    planId: "solo",
  },
  {
    id: "ebony" as const,
    name: "Mpingo Ebony",
    tier: "Atelier Edition",
    origin: "Deep charcoal-black hardwood with high-contrast brass engraving",
    swatch: "#1e1b18",
    surfaceGradient:
      "linear-gradient(135deg, #2b2723 0%, #191714 55%, #100e0c 100%)",
    grainColor: "rgba(255, 255, 255, 0.07)",
    inlayColor: "#d9b45b",
    accentColor: "#d9b45b",
    priceLabel: "KES 12,000",
    planId: "collector",
  },
  {
    id: "olive" as const,
    name: "Rift Olive Wood",
    tier: "Atelier Edition",
    origin: "Golden honey tones with dramatic wild-growth figure from pruned trees",
    swatch: "#9c7444",
    surfaceGradient:
      "linear-gradient(135deg, #b58952 0%, #8e6535 50%, #704d24 100%)",
    grainColor: "rgba(56, 33, 12, 0.35)",
    inlayColor: "#1a140e",
    accentColor: "#12362a",
    priceLabel: "KES 12,000",
    planId: "collector",
  },
] as const;

/** Sectors rather than borrowed logos. We never imply an endorsement we cannot verify. */
export const sectors = [
  "Fintech",
  "Commercial Law",
  "Hospitality",
  "Creative Studios",
  "Management Consulting",
  "Universities",
  "Private Healthcare",
  "Logistics",
  "Agribusiness",
  "Architecture",
  "Real Estate",
  "Climate & NGOs",
] as const;

export const features = [
  {
    id: "nfc",
    icon: "nfc",
    title: "Tap, don't dictate",
    body: "One tap against any modern phone opens your full profile before you finish saying hello. No app, no downloads, no fumbling for a card holder.",
    span: "lg:col-span-6",
    accent: true,
    href: "/#showcase",
  },
  {
    id: "qr",
    icon: "qr",
    title: "Engraved QR on the reverse",
    body: "Every Alama carries a QR code laser-etched straight into the back, with no sticker or plate, so older phones, laptops, and conference badges scan effortlessly.",
    span: "lg:col-span-6",
    href: "/#studio",
  },
  {
    id: "live",
    icon: "pencil",
    title: "Edit once, current forever",
    body: "Promoted? New office? New pitch deck? Update your dashboard in seconds and every introduction you have ever made stays up to date.",
    span: "lg:col-span-4",
    href: "/p/wanjiru",
  },
  {
    id: "contact",
    icon: "contact",
    title: "Leave real value behind",
    body: "Recipients save your vCard, portrait, WhatsApp, and downloadable briefs straight into their phone book with one press.",
    span: "lg:col-span-4",
    href: "/p/wanjiru",
  },
  {
    id: "analytics",
    icon: "chart",
    title: "Know which room converts",
    body: "Track taps, QR scans, contact saves, and document downloads. See which meetings and events turn into real follow-ups.",
    span: "lg:col-span-4",
    href: "/#showcase",
  },
  {
    id: "scanner",
    icon: "scan",
    title: "AI paper-card scanner",
    body: "Photograph any traditional paper card you receive and Alama extracts the name, role, company, and numbers into your searchable contacts.",
    span: "lg:col-span-6",
    href: "/#pricing",
  },
  {
    id: "pwa",
    icon: "offline",
    title: "Your mark on your lock screen",
    body: "Install Alama as a lightweight web app with your QR and vCard cached locally for boardrooms and flights with weak signal.",
    span: "lg:col-span-6",
    href: "/p/wanjiru",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Craft your physical mark",
    body: "Choose Walnut, Ebony, or Olive wood, preview your engraving, and pay via M-Pesa or card. We hand-finish and dispatch from Nairobi within 48 hours.",
    detail: "Delivery countrywide in 2 to 4 days",
  },
  {
    number: "02",
    title: "Curate the value you share",
    body: "Add your portrait, role, WhatsApp, booking link, and key documents. Tailor what visitors receive when they meet you in about four minutes.",
    detail: "Live preview while you edit",
  },
  {
    number: "03",
    title: "Tap and leave a lasting imprint",
    body: "Hold your Alama to their phone. Your profile opens immediately, giving your new connection everything they need to remember and act.",
    detail: "Works offline via reverse QR",
  },
] as const;

export const benefits = [
  {
    title: "You never run out of introductions",
    body: "One hardwood card serves unlimited meetings. No reprints when you change title, number, or firm. Simply edit and publish.",
  },
  {
    title: "You give value in the first second",
    body: "A paper card gives someone data entry. An Alama gives them your direct WhatsApp, your portfolio, your calendar link, and your photo saved to their contacts.",
  },
  {
    title: "You follow up with clear context",
    body: "Every tap and link click is logged privately, so you know which document or service caught their attention before your next call.",
  },
  {
    title: "You replace waste with indigenous forest",
    body: "Reprinting 500 paper cards costs more than one Alama, and every Alama funds audited indigenous tree planting in Kenya.",
  },
] as const;

export const teamBenefits = [
  "Your firm's own wording, monogram, and tagline etched on every card",
  "Branded profiles with your logo and shared pitch documents",
  "Central admin to onboard or reassign team members in seconds",
  "Organisation-wide tap and conversion analytics on one dashboard",
  "Consistent executive presence across every client-facing partner",
] as const;

export const testimonials = [
  {
    quote:
      "I carry one Alama to every client pitch. Opposing counsel and founders tap it, save my vCard, and download our firm brief before I leave the boardroom. My callback rate has genuinely doubled.",
    name: "Wanjiru Kamau",
    role: "Partner, Commercial Litigation",
    company: "Nairobi",
    initials: "WK",
  },
  {
    quote:
      "We replaced six hundred paper cards a year with Alama cards for our entire business development team. Giving clients instant access to our product deck on tap is what sold our directors.",
    name: "Otieno Odhiambo",
    role: "Head of Business Development",
    company: "Fintech, Westlands",
    initials: "OO",
  },
  {
    quote:
      "The olive wood finish is a genuine craft piece that people ask to hold. And the AI scanner turned a decade of loose paper cards in my desk into a clean, searchable address book.",
    name: "Aisha Mohamed",
    role: "Principal Advisory Consultant",
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
    note: "One Highland Walnut NFC card · free lifetime profile",
    summary: "For the independent professional who wants every meeting to count.",
    features: [
      "Hand-finished Highland Walnut NFC card",
      "Unlimited profile edits for life",
      "QR code laser-etched into the reverse",
      "One-tap vCard save & WhatsApp action",
      "Core tap & scan analytics",
      "Nairobi dispatch in 48 hours",
    ],
    cta: "Order Solo",
    href: "/#cta",
  },
  {
    id: "professional",
    name: "Professional",
    price: "KES 6,500",
    period: "one-time",
    note: "Two cards + AI paper-card scanner + custom engraving",
    summary: "For founders, partners, and consultants who share decks and close deals.",
    features: [
      "Everything in Solo, plus a spare card",
      "Your own wording etched on front and back",
      "AI paper-card scanner (12 months included)",
      "Share PDF briefs, portfolio & booking links",
      "Advanced link-level conversion analytics",
      "Priority WhatsApp concierge support",
    ],
    cta: "Order Professional",
    href: "/#cta",
    featured: true,
    badge: "Most chosen",
  },
  {
    id: "collector",
    name: "Atelier",
    price: "KES 12,000",
    period: "one-time",
    note: "Mpingo Ebony or Rift Olive Wood · deep-etched QR",
    summary: "For executives who treat a first impression as an enduring craft.",
    features: [
      "Everything in Professional",
      "Hand-oiled Mpingo Ebony or Rift Olive finish",
      "Bespoke laser-etched crest or monogram",
      "Deep laser-etched QR on the reverse",
      "Hardwood desk stand & presentation box",
      "Lifetime AI paper-card scanner access",
    ],
    cta: "Commission Atelier",
    href: "/#cta",
  },
];

export const teamPlans: Plan[] = [
  {
    id: "team-10",
    name: "Team",
    price: "KES 28,000",
    period: "per 10 people",
    note: "Branded wooden cards for your client-facing team",
    summary: "A unified, high-trust introduction for growing firms and studios.",
    features: [
      "10 Walnut NFC cards etched with your logo",
      "Shared company resources & pitch deck links",
      "Central member & card assignment dashboard",
      "Team-wide tap and contact-save reporting",
      "Guided onboarding session for your admin",
      "Dedicated Nairobi account manager",
    ],
    cta: "Configure Team Order",
    href: "/#cta",
  },
  {
    id: "team-scale",
    name: "Scale",
    price: "KES 2,400",
    period: "per person",
    note: "25 people and above, invoiced via LPO or card",
    summary: "For established firms standardising how every department leaves its mark.",
    features: [
      "Everything in Team at volume pricing",
      "Custom domain routing for every profile",
      "Role-based templates & instant offboarding",
      "Quarterly brand & conversion review",
      "Finance-ready invoicing and LPO support",
      "At-cost replacement cards for new hires",
    ],
    cta: "Book a Team Walkthrough",
    href: "/#cta",
    featured: true,
    badge: "Best for firms",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "annual",
    note: "Multi-country firms, banks, and executive summits",
    summary: "For organisations issuing verified identity across borders and events.",
    features: [
      "Everything in Scale",
      "Bespoke wood & brass co-branded editions",
      "CRM export & webhook integrations",
      "Data Protection Act (Kenya) & DPA review",
      "Multi-subsidiary brand management",
      "Named executive success lead",
    ],
    cta: "Speak to Enterprise",
    href: "/#cta",
  },
];

export const faqs = [
  {
    q: "Does the person receiving my Alama need an app?",
    a: "Never. Your Alama holds a secure pointer link, not raw personal files. When they tap the card with their phone, your profile opens immediately in Safari or Chrome. iPhones from 2018 onwards and almost all modern Android phones handle NFC taps natively.",
  },
  {
    q: "How does Alama help me leave real value with a contact?",
    a: "A paper card only transfers a phone number that someone has to type in later. Your Alama profile lets you attach high-value resources right under your name: a downloadable company capability statement, a calendar booking link, case studies, and a one-tap vCard save that includes your portrait so they always remember your face.",
  },
  {
    q: "Can the card carry my own or my organisation's wording?",
    a: "Yes. Every line on the card is yours: name, title, organisation, tagline, a monogram or wordmark in the centre, and the call to action and footer on the reverse. Cards can lead with a person or with your organisation, and the Alama maker's mark is optional. Design it in the card studio above, or send your wording with your order and we confirm the layout with you before engraving.",
  },
  {
    q: "What if their phone doesn't support NFC?",
    a: "Every card carries a QR code laser-etched into the reverse that opens the exact same profile. You also get a downloadable SVG and PNG QR code in your dashboard for presentation slides, email signatures, and event lanyards.",
  },
  {
    q: "What happens when I change roles, firms, or phone numbers?",
    a: "You update your details in the Alama dashboard and press publish. Every card you carry, and every link you have ever shared, reflects your new details immediately without reprinting a single piece of wood.",
  },
  {
    q: "Is my personal information exposed to the public?",
    a: "Only the fields you choose to switch on. You control visibility per field (for example, showing your work WhatsApp and hiding your personal email), and the NFC chip itself only stores your profile URL.",
  },
  {
    q: "How does the 55% reforestation commitment work?",
    a: "Over half of every order goes directly to indigenous tree planting partners across Kenyan counties. Every order generates a verifiable planting record in your dashboard showing the partner nursery and county supported by your card.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept M-Pesa and bank cards for instant checkout. Corporate and team orders can also be settled via formal invoice and Local Purchase Order (LPO).",
  },
  {
    q: "Can I share my Alama when network signal is weak?",
    a: "Yes. You can save your Alama pass to your phone home screen with your QR code and vCard cached offline, ensuring you can still share your contact details in basement boardrooms or on flights.",
  },
] as const;

export const impact = {
  eyebrow: "Impact, measured",
  heading: "More than half of every shilling grows something.",
  body: "Hardwood, not PVC plastic. Indigenous seedlings, not fast-growing exotics. Every Alama order directs 55% of revenue into reforestation work with Kenyan planting partners, and your dashboard records the trees tied to your card because an audited commitment matters more than a slogan.",
  stats: [
    { value: "55%", label: "of revenue to reforestation" },
    { value: "41,600", label: "indigenous seedlings planted" },
    { value: "126", label: "partner growers in 11 counties" },
    { value: "0", label: "grams of PVC plastic per card" },
  ],
} as const;

export const showcase = {
  eyebrow: "The digital identity",
  heading: "An introduction that does the remembering for you.",
  body: "Your tap opens a tailored page built around who you are and the value you bring. Visitors can save your contact with your portrait in one press, message you on WhatsApp, or download your firm profile without creating an account.",
  tabs: [
    {
      id: "tap",
      label: "NFC tap",
      title: "One tap, zero typing",
      body: "Hold your Alama near the top of any phone. Your profile opens in the default browser in under a second. Because the chip stores a pointer link, you can evolve your profile forever without replacing the card.",
      points: [
        "No app required on either side",
        "Native on iOS and Android",
        "Chip stores a secure URL, never raw private data",
      ],
    },
    {
      id: "qr",
      label: "Reverse QR",
      title: "Precision QR etched into the wood",
      body: "Etched on the reverse side to survive years in a pocket or cardholder. Recipients scan with their camera, and you can export matching SVG or PNG codes for decks and event badges.",
      points: [
        "Crisp vector SVG & PNG export",
        "Analytics tracked separately from NFC taps",
        "Scan the live code here to test /p/wanjiru",
      ],
    },
    {
      id: "profile",
      label: "Value & privacy",
      title: "Share what matters, guard what is private",
      body: "Lead with your portrait, title, firm, and direct contact actions. Below that, leave tangible value: downloadable briefs, booking links, and portfolio highlights, with granular privacy toggles per field.",
      points: [
        "One-tap vCard download with portrait",
        "Attach briefs, decks, and booking links",
        "Field-level privacy controls",
      ],
    },
  ],
} as const;

export const demoProfile = {
  slug: "wanjiru",
  name: "Wanjiru Kamau",
  Honorific: "Advocate of the High Court of Kenya",
  role: "Partner, Commercial Litigation",
  company: "Kamau & Waweru Advocates",
  location: "Upper Hill, Nairobi",
  bio: "Advising East African founders, fintechs, and cross-border investors on commercial dispute resolution, regulatory licensing, and corporate governance.",
  phone: "+254 712 345 678",
  phoneRaw: "+254712345678",
  whatsapp: "254712345678",
  email: "wanjiru@kamauwaweru.co.ke",
  website: "https://kamauwaweru.co.ke",
  websiteLabel: "kamauwaweru.co.ke",
  portrait: "/images/portrait.webp",
  cardFinish: "Mpingo Ebony · Atelier Edition",
  treesPlanted: 14,
  countySupported: "Nyeri & Kiambu Counties",
  resources: [
    {
      title: "2026 East Africa Fintech & Commercial Dispute Guide",
      subtitle: "PDF Brief · 12 pages · Free client resource",
      tag: "Brief",
      actionLabel: "Read summary",
      summary:
        "Key contractual safeguards, arbitration clauses, and CBK regulatory checkpoints for East African growth companies in 2026.",
    },
    {
      title: "Book a 20-Minute Initial Consultation",
      subtitle: "Direct calendar access for new matters",
      tag: "Calendar",
      actionLabel: "Request slot",
      summary:
        "Select a morning or afternoon slot for an introductory conflict check and matter scoping call with Wanjiru's chambers.",
    },
    {
      title: "Kamau & Waweru Practice Credentials",
      subtitle: "Chambers Global & Legal 500 overview",
      tag: "Credentials",
      actionLabel: "View practice",
      summary:
        "Ranked Tier 1 in Commercial Litigation and Cross-Border Arbitration across Kenya, Uganda, and Tanzania.",
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Practice Website", href: "https://kamauwaweru.co.ke" },
  ],
} as const;
