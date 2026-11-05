import type { Metadata } from "next";
import { QrCodeSvg } from "@/components/ui/QrCodeSvg";
import { demoProfile, site } from "@/lib/site";
import { ProfileClient } from "./ProfileClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const displayName =
    username.toLowerCase() === "wanjiru"
      ? demoProfile.name
      : username
          .replace(/[-_]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${displayName} · ${demoProfile.role}`,
    description: `${displayName} (${demoProfile.role} at ${demoProfile.company}). Save contact details, briefs, and direct links via ${site.name}.`,
    alternates: { canonical: `/p/${username}` },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const qr = (
    <QrCodeSvg
      value={`${site.url}/p/${username.toLowerCase()}`}
      ariaLabel={`QR code for ${username}'s ${site.name} profile`}
    />
  );

  return <ProfileClient username={username} qr={qr} />;
}
