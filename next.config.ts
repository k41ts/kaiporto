import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // JANGAN tambahin `distDir` di sini.
  //
  // Sebelumnya folder build dipisah lewat NODE_ENV supaya `next build` lokal
  // nggak ngerusak cache `next dev`. Di lokal itu jalan, tapi di Vercel
  // deployment-nya jadi "Ready" sambil semua URL-nya balikin 404 — pemburu
  // output Vercel nggak nemu hasil build-nya. Kenyamanan lokal nggak sebanding
  // sama situs yang nggak bisa dibuka.
  //
  // Cara aman buat masalah aslinya: jangan jalanin `next build` sementara
  // `next dev` masih hidup. Matikan dev server-nya dulu.
  images: {
    formats: ["image/avif", "image/webp"],
    // Cover & galeri diunggah ke Supabase Storage, jadi host-nya harus diizinkan
    // di sini — kalau nggak, next/image nolak dan gambarnya blank.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
