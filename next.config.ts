import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // JANGAN tambahin `distDir` di sini: di Vercel deployment-nya jadi "Ready"
  // sambil semua URL-nya 404. Jangan jalanin `next build` sementara `next dev` hidup.
  images: { formats: ["image/avif", "image/webp"] },
  // Header keamanan. script-src masih butuh 'unsafe-inline' (skrip intro + JSON-LD di layout.tsx);
  // `next dev` juga butuh 'unsafe-eval'. Semua aset (font, gambar, Three.js) dilayani dari domain sendiri.
  async headers() {
    const dev = process.env.NODE_ENV !== "production";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      `connect-src 'self'${dev ? " ws:" : ""}`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // Halaman lama sudah digabung. Link yang sudah tersebar (dan indeks Google) diarahkan ke tempat barunya.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      // /work/fundchain halaman sendiri (studi kasus); slug lain masih ke anchor di /work.
      { source: "/work/:slug((?!fundchain$).*)", destination: "/work#:slug", permanent: true },
      { source: "/studio/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
