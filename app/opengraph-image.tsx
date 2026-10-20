import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Pratinjau waktu link dibagikan: poster merah dengan nama dan peran, sama seperti hero. */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#e8401c", color: "#0b0b0d", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ height: 6, background: "#0b0b0d", marginTop: 18 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", background: "#ffffff", padding: "28px 36px", borderRadius: 18 }}>
            <div style={{ fontSize: 52, fontWeight: 700, textTransform: "uppercase" }}>{profile.role}</div>
            <div style={{ fontSize: 28, marginTop: 8 }}>From the first plan to production. Jakarta.</div>
          </div>
          <div style={{ display: "flex", background: "#0b0b0d", color: "#fff", padding: "22px 28px", fontSize: 26, textTransform: "uppercase", maxWidth: 420 }}>
            Warning: this engineer ships to production.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
