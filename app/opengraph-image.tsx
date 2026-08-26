import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content";

export const alt = "Zaidan — Software Engineer & Tech Partner";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Gambar pratinjau waktu link dibagikan ke WhatsApp / LinkedIn. */
export default async function Image() {
  const profile = await getProfile();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050507",
          backgroundImage: "radial-gradient(60% 70% at 20% 0%, #7C3AED 0%, transparent 62%)",
          color: "#F0EDF9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#FF5F57" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#FEBC2E" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#28C840" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 62, letterSpacing: -2, lineHeight: 1.1 }}>
            {`${profile.name} — ${profile.headline}`}
          </div>
          <div style={{ fontSize: 27, color: "#B0A6C8" }}>
            {profile.roles.map((role) => role.title).join(" · ")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
