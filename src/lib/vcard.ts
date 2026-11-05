import { demoProfile, site } from "@/lib/site";

/**
 * Generates a standards-compliant VCARD 3.0 string for the sample profile
 * (or any supplied profile payload) and triggers a browser download.
 */
export function buildDemoVCard(): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${demoProfile.name}`,
    "N:Kamau;Wanjiru;;;",
    `ORG:${demoProfile.company}`,
    `TITLE:${demoProfile.role}`,
    `TEL;TYPE=CELL,VOICE:${demoProfile.phoneRaw}`,
    `EMAIL;TYPE=PREF,INTERNET:${demoProfile.email}`,
    `URL:${site.url}/p/${demoProfile.slug}`,
    `ADR;TYPE=WORK:;;${demoProfile.location};Nairobi;;00100;Kenya`,
    `NOTE:${demoProfile.bio} Shared via ${site.name} (${site.domain}).`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

export function downloadDemoVCard() {
  if (typeof window === "undefined") return;
  const vcf = buildDemoVCard();
  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Wanjiru_Kamau_Alama.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
