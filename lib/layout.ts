import type { Entry, Ghost } from "@/lib/types";

/**
 * Grid 12 kolom. Tiga ukuran petak:
 *   12 = sorotan (banner 16:6)   6 = lebar (desktop 16:10)   3 = tinggi (HP 9:19.5)
 *
 * Karena 3 + 3 = 6, dua kartu HP persis selebar satu kartu desktop — itu yang
 * bikin campuran berapa pun nggak pernah nyisain lubang di baris.
 *
 * Aturan lengkapnya ada di design/design-plan.html §03.
 */

export type Span = 12 | 6 | 3;
export type Ratio = "banner" | "desktop" | "mobile" | "none";

export type Slot =
  | { kind: "entry"; key: string; span: Span; ratio: Ratio; entry: Entry }
  | { kind: "ghost"; key: string; span: Span; ghost: Ghost };

const ROW = 12;

/** Ukuran dasar sebelum ada yang dipromosikan jadi sorotan. */
function baseSpan(entry: Entry): Span {
  if (entry.type === "note") return 3;
  if (entry.device === "mobile") return 3;
  return 6;
}

/**
 * Berapa entri yang dipromosikan jadi sorotan, dan di posisi mana.
 *   1–3 entri → satu sorotan di paling atas
 *   4 entri   → nol sorotan; 2×2 yang rata justru lebih tenang
 *   5+ entri  → satu sorotan tiap 5 kartu, biar mata nggak capek
 */
function featurePositions(count: number): Set<number> {
  if (count === 0 || count === 4) return new Set();
  if (count <= 3) return new Set([0]);
  const positions = new Set<number>();
  for (let i = 0; i < count; i += 5) positions.add(i);
  return positions;
}

/** Pecah sisa kolom jadi petak-petak sah yang paling sedikit jumlahnya. */
function fillSpans(remaining: number): Span[] {
  const out: Span[] = [];
  let left = remaining;
  while (left >= 6) {
    out.push(6);
    left -= 6;
  }
  while (left >= 3) {
    out.push(3);
    left -= 3;
  }
  return out;
}

export function planLayout(entries: Entry[], ghosts: Ghost[]): Slot[] {
  const slots: Slot[] = [];
  let ghostIndex = 0;

  const nextGhost = (span: Span) => {
    const ghost = ghosts[ghostIndex % Math.max(ghosts.length, 1)] ?? {
      title: "Lagi dikerjain",
      eta: "segera",
    };
    ghostIndex += 1;
    slots.push({ kind: "ghost", key: `ghost-${slots.length}`, span, ghost });
  };

  // Portofolio yang masih kosong tetap harus kelihatan sengaja, bukan rusak.
  if (entries.length === 0) {
    nextGhost(12);
    return slots;
  }

  const features = featurePositions(entries.length);
  let remaining = ROW;

  entries.forEach((entry, index) => {
    let span = baseSpan(entry);
    let ratio: Ratio = entry.type === "note" ? "none" : entry.device === "mobile" ? "mobile" : "desktop";

    // Sorotan cuma buat kartu yang punya bingkai lebar. Banner 16:6 dari
    // screenshot HP bakal kelihatan salah, jadi mobile & note nggak dipromosikan.
    if (features.has(index) && span === 6) {
      span = 12;
      ratio = "banner";
    }

    if (span > remaining) {
      fillSpans(remaining).forEach((s) => nextGhost(s));
      remaining = ROW;
    }

    slots.push({ kind: "entry", key: entry.slug, span, ratio, entry });
    remaining -= span;
    if (remaining === 0) remaining = ROW;
  });

  if (remaining > 0 && remaining < ROW) {
    fillSpans(remaining).forEach((s) => nextGhost(s));
  }

  return slots;
}
