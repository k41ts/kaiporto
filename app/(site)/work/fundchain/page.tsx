import type { Metadata } from "next";
import Link from "next/link";
import { Contact } from "@/components/site/Contact";
import { Gallery } from "@/components/site/Gallery";
import { Nav } from "@/components/site/Nav";
import { ArrowRight, ArrowUpRight, GitHub } from "@/components/site/icons";
import { fundchain, fundchainCase, fundchainLeadStream, fundchainProject } from "@/content/site";

export const metadata: Metadata = {
  title: "FundChain case study",
  description: fundchainCase.intro,
  alternates: { canonical: "/work/fundchain" },
};

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8 3.5 3.5L13 5" /></svg>
);

/** Studi kasus panjang: masalah, batasan, keputusan dan harganya, hasil, dan yang belum selesai. */
export default function FundChainCasePage() {
  const c = fundchainCase;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav page="work" />

      <main id="main">
        <header className="wtop">
          <div className="wrap">
            <span className="eyebrow">Case study · {fundchainProject.name} · Tech Lead · University project</span>
            <h1>{c.title}</h1>
            <p>{c.intro}</p>
            <div className="acts cs-acts">
              <a className="btn primary" href={fundchain.url} target="_blank" rel="noopener">Open FundChain <ArrowUpRight size={14} /></a>
              <a className="btn" href={fundchain.repo} target="_blank" rel="noopener"><GitHub size={14} /> Source</a>
            </div>
            <dl className="lead-stats">
              {fundchain.stats.map((s) => <div key={s.label}><dd>{s.value}</dd><dt>{s.label}</dt></div>)}
            </dl>
          </div>
        </header>

        <div className="wrap cs">
          <section aria-labelledby="cs-problem">
            <span className="eyebrow">01 · Problem</span>
            <div>
              <h2 id="cs-problem">A donation record anyone with database access can edit</h2>
              {c.problem.map((t) => <p key={t}>{t}</p>)}
            </div>
          </section>

          <section aria-labelledby="cs-constraints">
            <span className="eyebrow">02 · Constraints</span>
            <div>
              <h2 id="cs-constraints">What we had to work with</h2>
              <dl className="cs-meta">
                {c.constraints.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
          </section>

          <section aria-labelledby="cs-decisions">
            <span className="eyebrow">03 · Decisions</span>
            <div>
              <h2 id="cs-decisions">Four decisions, and what each one cost</h2>
              <ol className="cs-dec">
                {c.decisions.map((d, i) => (
                  <li key={d.title} data-rv>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{d.title}</h3>
                      <p>{d.text}</p>
                      <p className="cost"><b>Trade-off.</b> {d.cost}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section aria-labelledby="cs-process">
            <span className="eyebrow">04 · Leading the team</span>
            <div>
              <h2 id="cs-process">From 27 docs to four workstreams</h2>
              <ul className="checks">{c.process.map((t) => <li key={t}><Check />{t}</li>)}</ul>
              <div className="cs-streams">
                {[...fundchain.streams, fundchainLeadStream].map((s) => (
                  <div key={s.name}><b>{s.name}</b><span className="mono">{s.issues} tasks</span></div>
                ))}
              </div>
            </div>
          </section>

          <section aria-labelledby="cs-result">
            <span className="eyebrow">05 · Result</span>
            <div>
              <h2 id="cs-result">What runs today</h2>
              <ul className="checks">{c.results.map((t) => <li key={t}><Check />{t}</li>)}</ul>
            </div>
          </section>

          <section aria-labelledby="cs-shots" className="cs-wide">
            <h2 id="cs-shots" className="sr">Screenshots</h2>
            <Gallery shots={fundchainProject.shots} name={fundchainProject.name} />
          </section>

          <section aria-labelledby="cs-open">
            <span className="eyebrow">06 · Still open</span>
            <div>
              <h2 id="cs-open">What is not done yet</h2>
              <ul className="cs-open">{c.open.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </section>

          <div className="next">
            <div>
              <span className="eyebrow">See it move</span>
              <h2>The same story as a 3D walkthrough</h2>
              <p>Spec, foundation, plan, assign, review, ship, on the homepage.</p>
            </div>
            <Link className="btn primary" href="/#lead">Open the walkthrough <ArrowRight size={14} /></Link>
          </div>
        </div>
      </main>

      <Contact />
    </>
  );
}
