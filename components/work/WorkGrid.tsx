import Link from "next/link";
import { AdaptiveFrame } from "@/components/work/AdaptiveFrame";
import { planLayout, type Slot } from "@/lib/layout";
import type { Entry, Ghost } from "@/lib/types";

function deviceBadge(entry: Entry): string | null {
  switch (entry.device) {
    case "desktop":
      return "Desktop";
    case "mobile":
      return "Mobile";
    case "both":
      // Ditulis polos: React nge-escape sendiri, jadi "&amp;" kebaca mentah
      // sebagai "&amp;" di layar, bukan sebagai "&".
      return "Desktop & Mobile";
    default:
      return null;
  }
}

/** Semua kartu selebar penuh, urut, hantu-hantunya ditaruh di belakang. */
function stackLayout(entries: Entry[], ghosts: Ghost[]): Slot[] {
  const entrySlots: Slot[] = entries.map((entry) => ({
    kind: "entry",
    key: entry.slug,
    span: 12,
    ratio: entry.type === "note" ? "none" : "banner",
    entry,
  }));
  const ghostSlots: Slot[] = ghosts.map((ghost, i) => ({
    kind: "ghost",
    key: `ghost-${i}`,
    span: 12,
    ghost,
  }));
  return [...entrySlots, ...ghostSlots];
}

export function WorkGrid({
  entries,
  ghosts,
  priorityFirst = false,
  stacked = false,
}: {
  entries: Entry[];
  ghosts: Ghost[];
  priorityFirst?: boolean;
  /**
   * Satu kartu per baris. Dipakai di halaman daftar, di mana grid 12 kolom
   * bikin ukuran kartu naik-turun cuma karena kolom `device` entrinya —
   * dua kartu sempit di sebelah satu kartu lebar kelihatan nggak seimbang,
   * padahal isinya sama pentingnya.
   */
  stacked?: boolean;
}) {
  const slots = stacked ? stackLayout(entries, ghosts) : planLayout(entries, ghosts);

  return (
    <div className="showcase" data-layout={stacked ? "stack" : "grid"}>
      {slots.map((slot, index) => {
        if (slot.kind === "ghost") {
          return (
            <div className="case" data-span={slot.span} data-reveal key={slot.key}>
              <div className="ghost-card">
                <span className="t">{slot.ghost.title}</span>
                <span className="s">{slot.ghost.eta}</span>
              </div>
            </div>
          );
        }

        const { entry, ratio, span } = slot;
        const badge = deviceBadge(entry);

        return (
          <article className="case" data-span={span} data-reveal key={slot.key}>
            <Link href={`/work/${entry.slug}`} className="case-link" aria-label={entry.title}>
              {ratio === "none" ? (
                <div className="note-card">
                  <span className="eyebrow">Note</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                </div>
              ) : (
                <AdaptiveFrame
                  initialRatio={ratio}
                  shot={entry.cover}
                  priority={priorityFirst && index === 0}
                  sizes={span === 12 ? "(max-width: 720px) 100vw, 1000px" : span === 6 ? "(max-width: 720px) 100vw, 500px" : "(max-width: 720px) 50vw, 250px"}
                />
              )}

              <div className="case-meta">
                <h3>{entry.title}</h3>
                <span className="yr">{entry.year}</span>
              </div>
            </Link>

            {ratio !== "none" && <p>{entry.summary}</p>}

            <div className="chips">
              {/* Dulu label ini nempel ke petak selebar 12 kolom. Begitu daftarnya
                  jadi satu kartu per baris, semua petak jadi 12 dan semuanya
                  ngaku sorotan. Sumbernya sekarang kolom `featured` entrinya. */}
              {entry.featured && <span className="badge">Featured</span>}
              {badge && <span className="badge">{badge}</span>}
              {entry.type === "note" && <span className="badge">Note</span>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
