import { ImageResponse } from "next/og";
import { MARK_SRC, PAPER } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: the watercolor mark on paper (iOS does not use SVG icons).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: PAPER }}>
        <img src={MARK_SRC} width={148} height={148} />
      </div>
    ),
    size,
  );
}
