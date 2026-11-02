import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Loader } from "@/components/site/Loader";
import { Motion } from "@/components/site/Motion";
import { INTRO_KEY, SITE_URL, hakaikol, kaicash, loadout, profile } from "@/content/site";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-geist-mono", display: "swap" });

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s — ${profile.name}` },
  description: profile.headline,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: ["full-stack engineer", "technical partner", "tech lead", "Next.js", "TypeScript", "Jakarta", profile.name, hakaikol.name, kaicash.name],
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
  themeColor: "#09090a",
  colorScheme: "dark",
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
        image: `${SITE_URL}${profile.portrait}`,
        jobTitle: profile.role,
        description: profile.headline,
        address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
        knowsAbout: loadout.flatMap((m) => m.tools.map(([tool]) => tool)),
        sameAs: [profile.linkedin, profile.github, profile.instagram, hakaikol.url],
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
    // suppressHydrationWarning: skrip intro di bawah mengubah atribut <html> sebelum React hydrate.
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Intro cuma sekali per sesi: putuskan sebelum paint supaya nggak berkedip. */}
        <script dangerouslySetInnerHTML={{ __html: `try{var d=document.documentElement;sessionStorage.getItem("${INTRO_KEY}")?d.dataset.intro="seen":d.classList.add("intro-lock")}catch(e){document.documentElement.dataset.intro="seen"}` }} />
        <link rel="preload" as="image" href="/img/zaidan-head.webp" />
      </head>
      {/* Ekstensi browser sering nempelin atribut ke <body> sebelum React hydrate. */}
      <body suppressHydrationWarning>
        <Loader />
        {children}
        <Motion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
