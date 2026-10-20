import type { Metadata, Viewport } from "next";
import { Poppins, Tektur } from "next/font/google";
import { Motion } from "@/components/site/Motion";
import { SITE_URL, hakaikol, kaicash, loadout, profile } from "@/content/site";
import "../globals.css";

const tektur = Tektur({ subsets: ["latin"], axes: ["wdth"], variable: "--font-tektur", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-poppins", display: "swap" });

/**
 * Dela Gothic One cuma dipakai buat kanji, jadi yang diunduh hanya karakter
 * yang benar-benar muncul (parameter `text` Google Fonts). Huruf baru di
 * konten? Tambahkan di sini, kalau nggak dia jatuh ke font cadangan sistem.
 */
const KANJI = [
  "般若鬼侍兜今推し一覧次",
  "自己紹介技術作品連絡作品一覧",
  "表裏蔵携礎全層構築開発者設計守攻面心刀電脳",
  "予算親子領収書試験音話共同経歴学",
  profile.katakana,
  "フルスタック",
  ...loadout.map((m) => m.kanji),
].join("");
const kanjiHref = `https://fonts.googleapis.com/css2?family=Dela+Gothic+One&text=${encodeURIComponent([...new Set(KANJI)].join(""))}&display=swap`;

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s — ${profile.name}` },
  description: profile.headline,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: ["full-stack engineer", "technical partner", "Next.js", "TypeScript", "Jakarta", profile.name, hakaikol.name, kaicash.name],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title,
    description: profile.headline,
  },
  twitter: { card: "summary_large_image", title, description: profile.headline },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#e8401c",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        alternateName: profile.nickname,
        url: SITE_URL,
        image: `${SITE_URL}${profile.photo.src}`,
        jobTitle: profile.role,
        description: profile.headline,
        address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
        knowsAbout: loadout.flatMap((m) => m.tools.map(([tool]) => tool)),
        sameAs: [profile.linkedin, hakaikol.url],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${profile.name} — Portfolio`,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <html lang="en" className={`${tektur.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={kanjiHref} />
      </head>
      {/* Ekstensi browser sering nempelin atribut ke <body> sebelum React hydrate. */}
      <body suppressHydrationWarning>
        {children}
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
