import type { Project } from "@/content/site";
import { Gallery } from "@/components/site/Gallery";
import { ArrowUpRight } from "@/components/site/icons";

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8 3.5 3.5L13 5" /></svg>
);

/** Satu proyek di halaman Work: judul, screenshot, poin, dan perannya. */
export function ProjectDetail({ project: p, label, stats }: { project: Project; label?: string; stats?: { value: string; label: string }[] }) {
  return (
    <section className="proj" id={p.slug} aria-labelledby={`${p.slug}-title`}>
      <div className="wrap">
        <div className="proj-head">
          <div>
            <span className="eyebrow">{label ?? `${p.kind} · ${p.when}`}</span>
            <h2 id={`${p.slug}-title`} data-rv>{p.name}</h2>
            <p data-rv>{p.summary}</p>
          </div>
          {p.url && (
            <a className="btn" href={p.url} target="_blank" rel="noopener">
              {p.urlLabel ?? `Visit ${p.name}`} <ArrowUpRight size={14} />
            </a>
          )}
        </div>
        <div className="proj-body">
          <Gallery shots={p.shots} name={p.name} />
          <div className="panel" data-rv>
            <ul className="checks">{p.points.map((pt) => <li key={pt}><Check />{pt}</li>)}</ul>
            {stats && (
              <dl className="grid-stats">
                {stats.map((s) => <div key={s.label}><dd>{s.value}</dd><dt>{s.label}</dt></div>)}
              </dl>
            )}
            <dl className="meta">
              <dt>My part</dt><dd>{p.role}</dd>
              {p.team && (<><dt>Team</dt><dd>{p.team}</dd></>)}
              <dt>Built with</dt><dd>{p.stack.join(", ")}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
