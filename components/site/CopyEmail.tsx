"use client";

import { useState } from "react";
import { profile } from "@/content/site";

/** Tombol salin email. Kalau clipboard ditolak browser, alamatnya ditampilkan supaya bisa diseleksi manual. */
export function CopyEmail({ className = "pill black", label = "Copy email", icon = false }: { className?: string; label?: string; icon?: boolean }) {
  const [state, setState] = useState<string | null>(null);

  const copy = () => {
    const done = (text: string) => {
      setState(text);
      setTimeout(() => setState(null), 1600);
    };
    if (!navigator.clipboard) return done(profile.email);
    navigator.clipboard.writeText(profile.email).then(
      () => done("Copied"),
      () => done(profile.email),
    );
  };

  if (icon) {
    return (
      <button
        className={className}
        type="button"
        onClick={copy}
        aria-label={state ?? "Copy email address"}
        style={state ? { background: "var(--red)", color: "#fff" } : undefined}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </button>
    );
  }

  return (
    <button className={className} type="button" onClick={copy}>
      {state ?? label}
    </button>
  );
}
