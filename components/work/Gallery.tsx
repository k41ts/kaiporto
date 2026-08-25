"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AdaptiveFrame } from "@/components/work/AdaptiveFrame";
import type { Device, Shot } from "@/lib/types";

/**
 * Galeri yang bisa dibuka besar. Tangkapan layar di kolom selebar 260px
 * praktis nggak kebaca — tulisan di dalamnya cuma jadi garis abu. Jadi tiap
 * gambar ditaruh di dalam tombol, dan klik membuka salinan seukuran layar.
 *
 * Nutupnya sengaja punya tiga jalan: tombol silang, klik di luar gambar, dan
 * tombol Esc. Yang ketiga nggak diminta, tapi dialog yang cuma bisa ditutup
 * pakai tetikus itu jebakan buat orang yang navigasinya lewat papan ketik.
 */
export function Gallery({ shots, device }: { shots: Shot[]; device: Device }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    // Fokus balik ke gambar yang tadi diklik — kalau nggak, fokusnya lompat ke
    // awal halaman dan orang yang pakai keyboard kehilangan tempatnya.
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    // Halaman di belakangnya dikunci, biar scroll nggak nembus ke bawah overlay.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const active = open === null ? undefined : shots[open];

  return (
    <>
      <div className="gallery" data-device={device} style={{ marginTop: 10 }}>
        {shots.map((shot, i) => (
          <button
            key={i}
            type="button"
            className="gallery-item"
            aria-label={shot.alt ? `Enlarge: ${shot.alt}` : `Enlarge screenshot ${i + 1}`}
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setOpen(i);
            }}
          >
            <AdaptiveFrame
              initialRatio={device === "mobile" ? "mobile" : "desktop"}
              shot={shot}
              sizes={device === "mobile" ? "200px" : "(max-width: 720px) 100vw, 340px"}
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt || "Screenshot"}
          // Cuma klik yang mendarat di lapisan ini yang nutup. Klik di dalam
          // gambar nggak nembus ke sini, jadi nggak perlu stopPropagation.
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button ref={closeRef} type="button" className="lightbox-close" onClick={close} aria-label="Close">
            ×
          </button>

          <figure className="lightbox-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.src} alt={active.alt} className="lightbox-img" />
            {active.alt && <figcaption className="lightbox-caption">{active.alt}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}
