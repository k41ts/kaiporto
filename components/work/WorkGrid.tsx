import Link from "next/link";
import { DeviceFrame } from "@/components/work/DeviceFrame";
import { planLayout } from "@/lib/layout";
import type { Entry, Ghost } from "@/lib/types";

function deviceBadge(entry: Entry): string | null {
  switch (entry.device) {
    case "desktop":
      return "Desktop";
    case "mobile":
      return "Mobile";
    case "both":
      return "Desktop &amp; Mobile";
    default:
      return null;
  }
}

export function WorkGrid({
  entries,
  ghosts,
  priorityFirst = false,
}: {
  entries: Entry[];
  ghosts: Ghost[];
  priorityFirst?: boolean;
}) {
  const slots = planLayout(entries, ghosts);

  return (
    <div className="showcase">
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
                <DeviceFrame
                  ratio={ratio}
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
              {span === 12 && <span className="badge">Featured</span>}
              {badge && <span className="badge">{badge}</span>}
              {entry.type === "note" && <span className="badge">Note</span>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
