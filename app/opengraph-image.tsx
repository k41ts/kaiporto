import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Pratinjau waktu link dibagikan: gelap, nama besar, satu aksen amber. Sama nadanya dengan hero. */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#09090a", color: "#f2f1ee", fontFamily: "sans-serif", backgroundImage: "radial-gradient(circle at 85% 10%, rgba(224,168,90,.22), transparent 45%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 56, height: 56, borderRadius: 12, background: "#f2f1ee", color: "#0b0b0c", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>ZI</div>
          <div style={{ fontSize: 28, color: "#8f8e93" }}>{profile.location}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 40, color: "#8f8e93", marginTop: 18 }}>
            <span>{profile.role} and technical partner.</span>
            <span style={{ color: "#e0a85a", marginLeft: 12 }}>From the first plan to production.</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
