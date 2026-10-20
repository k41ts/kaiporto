/* Ikon kecil yang dipakai berulang. Semuanya dekoratif, jadi disembunyikan dari pembaca layar. */

export function ArrowUpRight({ size = 16, stroke = 2.4 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Chevrons({ size = 14, stroke = 2.6 }: { size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} aria-hidden="true">
      <path d="M6 6l6 6-6 6M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronLeft({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function Close({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

export function LinkedIn({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM10 9.5h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.1c0-1.22-.02-2.8-1.7-2.8-1.71 0-1.97 1.33-1.97 2.7V21H10z" />
    </svg>
  );
}

/** Logo Z dengan kursor terminal. */
export function Mark({ size = 64, color = "#0b0b0d" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M8 16 H44 L8 48 H40" fill="none" stroke={color} strokeWidth="8" strokeLinecap="square" />
      <rect x="48" y="22" width="10" height="26" fill={color} />
    </svg>
  );
}

/** Lencana bintang delapan di kartu nama poster. */
export function Burst() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <g fill="#0b0b0d">
        <path d="M36 4h8v20h-8zM36 56h8v20h-8zM4 36h20v8H4zM56 36h20v8H56z" />
        <path d="M14 8l12 12-6 6L8 14zM66 72L54 60l6-6 12 12zM8 66l12-12 6 6-12 12zM72 14L60 26l-6-6L66 8z" />
      </g>
    </svg>
  );
}
