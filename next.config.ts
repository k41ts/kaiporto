import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // `next build` dan `next dev` dulu sama-sama nulis ke .next, dan kalau
  // dijalanin barengan, cache dev-nya rusak ("Cannot find module './173.js'").
  // Dipisah otomatis lewat NODE_ENV — nggak ada variabel yang perlu diset
  // manual, jadi nggak bisa kelupaan. Vercel build pakai .next seperti biasa.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    // Cover & galeri diunggah ke Supabase Storage, jadi host-nya harus diizinkan
    // di sini — kalau nggak, next/image nolak dan gambarnya blank.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
