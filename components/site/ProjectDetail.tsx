import Image from "next/image";
import type { Project } from "@/content/site";
import { ArrowUpRight } from "@/components/site/icons";

/**
 * Satu proyek: screenshot di kiri, ringkasan di kanan. Dipakai untuk HakaiKOL
 * dan proyek tim. `dark` membalik panelnya ke hitam, biar dua proyek
 * berurutan nggak kelihatan kembar.
 */
export function ProjectDetail({ project: p, label, dark = false }: { project: Project; label?: string; dark?: boolean }) {
  return (
    <section className={dark ? "detail dark" : "detail"} id={p.slug} aria-labelledby={`${p.slug}-title`}>
      <div className="shots" data-rv>
        {p.shots.slice(0, 3).map((s, i) => (
          <Image key={s.src} src={s.src} alt={s.alt} width={s.width} height={s.height} sizes={i === 0 ? "(max-width: 1080px) 100vw, 58vw" : "(max-width: 1080px) 50vw, 29vw"} />
        ))}
      </div>
      <div className="info">
        <span className="pill kick" data-rv>{label ?? `${p.kind}, ${p.when}`}</span>
        <h3 id={`${p.slug}-title`} data-rv>{p.name}</h3>
        <p className="what" data-rv>{p.summary}</p>
        <ul data-rv>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        <dl data-rv>
          <dt>My part</dt><dd>{p.role}</dd>
          {p.team && (<><dt>Team</dt><dd>{p.team}</dd></>)}
          <dt>Built with</dt><dd>{p.stack.join(", ")}</dd>
        </dl>
        {p.url && (
          <a className="pill red" href={p.url} target="_blank" rel="noopener" style={{ alignSelf: "flex-start" }} data-rv>
            {p.urlLabel ?? `Visit ${p.name}`} <ArrowUpRight />
          </a>
        )}
      </div>
    </section>
  );
}
