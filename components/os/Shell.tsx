"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PageTransition } from "@/components/os/PageTransition";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** "/work/kasa-pos" → ["work", "kasa-pos"] */
function segments(pathname: string): string[] {
  return pathname.split("/").filter(Boolean);
}

export function Shell({ owner, children }: { owner: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Isi jendela punya penggulung sendiri, jadi Next nggak bisa mereset posisinya.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("portos-theme") : null;
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      return;
    }
    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("portos-theme", next);
    } catch {
      /* mode penyamaran — tema tetap jalan, cuma nggak diingat */
    }
  };

  const parts = segments(pathname);
  const trail = parts.length === 0 ? ["home"] : parts;

  return (
    <div className="desktop">
      <div className="win">
        <div className="titlebar">
          {/* Hiasan murni: bukan tombol, nggak bisa diklik, dan disembunyikan
              dari pembaca layar. Perannya cuma satu — jadi satu-satunya warna
              di halaman ini. */}
          <div className="lights" aria-hidden="true">
            <span className="light light-red" />
            <span className="light light-yellow" />
            <span className="light light-green" />
          </div>

          <span className="path">
            {owner}
            {trail.map((part, i) => (
              <span key={`${part}-${i}`}>
                {" / "}
                {i === trail.length - 1 ? <b>{part}</b> : part}
              </span>
            ))}
          </span>

          <span style={{ flex: 1 }} />

          {/* Label dan teksnya sengaja tetap, nggak ikut nilai `theme`.
              Theme baru ketahuan setelah efek jalan di klien, jadi apa pun yang
              bergantung ke situ bakal beda antara HTML server dan DOM klien —
              persis pola yang bikin peringatan hydration. Selain itu, teks yang
              berkedip pas halaman kebuka juga kelihatan murahan. */}
          <button type="button" className="tb-btn" onClick={toggleTheme} aria-label="Switch between light and dark theme">
            Theme
          </button>
        </div>

        <nav className="tabs" aria-label="Main navigation">
          {TABS.map((tab) => {
            const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            return (
              <Link key={tab.href} href={tab.href} className="tab" aria-current={active ? "page" : undefined}>
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="win-scroll" ref={scrollRef}>
          <main className="win-body">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </div>
  );
}
