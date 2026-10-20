import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // JANGAN tambahin `distDir` di sini: di Vercel deployment-nya jadi "Ready"
  // sambil semua URL-nya 404. Jangan jalanin `next build` sementara `next dev` hidup.
  images: { formats: ["image/avif", "image/webp"] },
  // Halaman lama sudah digabung. Link yang sudah tersebar (dan indeks Google) diarahkan ke tempat barunya.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/work/:slug", destination: "/work#:slug", permanent: true },
      { source: "/studio/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
