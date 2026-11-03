import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Pratinjau waktu link dibagikan: gelap, nama besar, satu aksen amber, dan potret di kanan. Sama nadanya dengan hero. */
export default async function Image() {
  // Satori nggak bisa baca webp, jadi pakai PNG potongan setengah badan dari cutout yang sama.
  const photo = await readFile(join(process.cwd(), "public/img/zaidan-og.png"));
  const src = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#09090a", color: "#f2f1ee", fontFamily: "sans-serif", backgroundImage: "radial-gradient(circle at 82% 30%, rgba(224,168,90,.28), transparent 42%)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={600} height={600} style={{ position: "absolute", right: -10, bottom: -30 }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: 780 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 56, height: 56, borderRadius: 12, background: "#f2f1ee", color: "#0b0b0c", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>ZI</div>
            <div style={{ fontSize: 28, color: "#8f8e93" }}>{profile.location}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 30, color: "#8f8e93", marginTop: 18 }}>
              <span>{profile.role} and technical partner.</span>
              <span style={{ color: "#e0a85a" }}>From the first plan to production.</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
