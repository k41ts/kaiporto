import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Ikon buat layar utama iOS. Digambar di sini, bukan ditaruh sebagai berkas,
 * karena Next cuma nerima PNG/JPG buat apple-icon — sementara logonya sendiri
 * SVG. Daripada nyimpen dua bentuk yang gampang beda, PNG-nya dibangkitkan
 * dari bentuk yang sama.
 *
 * iOS ngasih sudut membulat sendiri, jadi latarnya dibiarin kotak penuh.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1917",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path d="M13 22 H40 L13 43 H36" fill="none" stroke="#f5f4f2" strokeWidth="7" strokeLinecap="square" />
          <rect x="45" y="23" width="9" height="20" fill="#f5f4f2" />
        </svg>
      </div>
    ),
    size,
  );
}
