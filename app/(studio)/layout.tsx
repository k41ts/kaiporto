import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeScript } from "@/components/os/ThemeScript";
import "../globals.css";
import "./studio/studio.css";

/**
 * Root layout kedua. Studio sengaja punya pohon HTML sendiri — dia bukan
 * halaman di dalam jendela portofolio, dia aplikasi lain yang kebetulan
 * sedomain.
 */
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      {/* Lihat catatan di app/(site)/layout.tsx — ekstensi browser nempelin
          atribut ke <body> sebelum hydration. Studio paling kena karena isinya
          form: Grammarly & password manager suka nyuntik di halaman begini. */}
      <body suppressHydrationWarning>{children}
      </body>
    </html>
  );
}
