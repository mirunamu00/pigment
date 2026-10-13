import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: the header mark in ink on paper (iOS does not use SVG icons).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#faf9f6" }}>
        <svg viewBox="0 0 40 40" width={180} height={180}>
          <circle cx="19" cy="21" r="11" fill="#0e0e0c" />
          <circle cx="25.5" cy="14.5" r="4.7" fill="#0e0e0c" opacity={0.6} />
        </svg>
      </div>
    ),
    size,
  );
}
