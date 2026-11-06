"use client";

import { useMemo, type CSSProperties } from "react";
import QRCode from "qrcode";
import { cn } from "@/lib/cn";

/**
 * A scannable QR code drawn as a single SVG path filled with `currentColor`.
 *
 * There is deliberately no background rectangle: the code is meant to read as
 * if it were laser-etched straight into the card surface, so it inherits the
 * engraving colour of whatever timber it sits on. Error correction is set to
 * "Q" (about 25% recovery) to tolerate wood grain and burn variance.
 *
 * Runs synchronously on the client, so it can follow live input (for example a
 * profile handle typed into the Card Studio).
 */
export function EngravedQr({
  value,
  className,
  style,
  ariaLabel,
}: {
  value: string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const { size, path } = useMemo(() => {
    const qr = QRCode.create(value, { errorCorrectionLevel: "Q" });
    const { size: n, data } = qr.modules;
    let d = "";
    for (let y = 0; y < n; y++) {
      let x = 0;
      while (x < n) {
        if (!data[y * n + x]) {
          x++;
          continue;
        }
        // Merge horizontal runs of dark modules into one rectangle.
        const start = x;
        while (x < n && data[y * n + x]) x++;
        d += `M${start} ${y}h${x - start}v1h-${x - start}z`;
      }
    }
    return { size: n, path: d };
  }, [value]);

  return (
    <svg
      role="img"
      aria-label={ariaLabel ?? `QR code linking to ${value}`}
      viewBox={`0 0 ${size} ${size}`}
      shapeRendering="crispEdges"
      className={cn("block", className)}
      style={style}
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}
