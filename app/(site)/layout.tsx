import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Shell } from "@/components/os/Shell";
import { ThemeScript } from "@/components/os/ThemeScript";
import { getProfile, getSiteUrl } from "@/lib/content";
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const siteUrl = getSiteUrl();
  const title = `${profile.name} — Software Engineer & Tech Partner`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${profile.name}` },
    description: profile.headline,
    applicationName: `${profile.name} — Portfolio`,
    authors: [{ name: profile.fullName, url: siteUrl }],
    creator: profile.fullName,
    keywords: [
      "software engineer",
      "full-stack developer",
      "tech partner",
      "Next.js",
      "TypeScript",
      profile.name,
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: `${profile.name} — Portfolio`,
      title,
      description: profile.headline,
      images: [{ url: profile.photo, alt: profile.photoAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: profile.headline,
      images: [profile.photo],
    },
    robots: { index: true, follow: true },
    // Kode verifikasi Google Search Console. Diisi lewat env var supaya
    // nggak perlu ubah kode: tempel nilainya di Vercel, deploy ulang, selesai.
    // Kalau kosong, Next nggak nulis meta tag-nya sama sekali.
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efebf8" },
    { media: "(prefers-color-scheme: dark)", color: "#050507" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.fullName,
        url: siteUrl,
        // ImageObject, bukan string biasa. Dimensinya dicantumkan supaya
        // Google tau ini foto beresolusi penuh yang mewakili orangnya —
        // bukan sekadar salah satu gambar yang kebetulan ada di halaman.
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}${profile.photo}`,
          contentUrl: `${siteUrl}${profile.photo}`,
          width: 3024,
          height: 4032,
          caption: profile.photoAlt,
        },
        jobTitle: "Software Engineer",
        description: profile.headline,
        knowsAbout: profile.skills,
        sameAs: profile.socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${profile.name} — Portfolio`,
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      {/* Ekstensi browser (Grammarly, password manager, dark-mode) sering nempelin
          atribut ke <body> sebelum React hydrate, dan itu memicu peringatan
          hydration yang bukan berasal dari kode kita. Ini cuma meredam atribut
          di elemen <body> sendiri — mismatch di dalam komponen tetap kelaporan. */}
      <body suppressHydrationWarning>
        <Shell owner={profile.name.toLowerCase()}>{children}</Shell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
