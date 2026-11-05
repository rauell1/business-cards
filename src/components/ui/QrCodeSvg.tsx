import QRCode from "qrcode";
import { cn } from "@/lib/cn";

/**
 * Renders a genuine, scannable QR code as inline SVG (crisp at any size, no
 * client JS, no image request). Server component by design.
 */
export async function QrCodeSvg({
  value,
  className,
  dark = "#12362a",
  light = "#00000000",
  ariaLabel,
}: {
  value: string;
  className?: string;
  dark?: string;
  light?: string;
  ariaLabel?: string;
}) {
  const svg = await QRCode.toString(value, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark, light },
  });

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? `QR code linking to ${value}`}
      className={cn("[&>svg]:block [&>svg]:h-full [&>svg]:w-full", className)}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
