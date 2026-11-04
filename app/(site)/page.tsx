import Image from "next/image";
import Link from "next/link";
import { Clock } from "@/components/site/Clock";
import { Contact } from "@/components/site/Contact";
import { LeadSim } from "@/components/site/LeadSim";
import { Nav } from "@/components/site/Nav";
import { ArrowRight, Download } from "@/components/site/icons";
import { education, experience, fundchain, heroStats, loadout, passinglab, passinglabStats, profile, projects } from "@/content/site";

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m3 8 3.5 3.5L13 5" /></svg>
);

/** Ikon kecil per kartu capability, urutannya sama dengan `loadout`. */
const capIcons = [
  <svg key="a" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" /><path d="M7 4.5h2.5V9" /></svg>,
  <svg key="d" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="8" cy="4" rx="5" ry="2" /><path d="M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4M3 8c0 1.1 2.2 2 5 2s5-.9 5-2" /></svg>,
  <svg key="b" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 4 1.5 8 5 12M11 4l3.5 4-3.5 4" /></svg>,
  <svg key="i" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M2 6h12" /></svg>,
  <svg key="m" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4.5" y="1.5" width="7" height="13" rx="1.5" /><path d="M7 12.5h2" /></svg>,
];

export default function HomePage() {
  const [arch, ...caps] = loadout;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />

      <main id="main">
        {/* ---------- hero ---------- */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div>
              <span className="pill"><span className="dot" /><b>Available</b> {profile.openTo}</span>
              <h1 id="hero-title">Full-stack engineer who ships <span className="soft">to production.</span></h1>
              <p className="lede">
                <b>{profile.name}, Computer Science student at {education[0].school}.</b> Architecture, data model, backend, web and Android: I own a feature from the schema to the screen. Available full-time for 12 months in 2027 through the BINUS Enrichment Program.
              </p>
              <div className="acts">
                <a className="btn primary" href="#work">See the work <ArrowRight size={14} /></a>
                <a className="btn" href={profile.cv} download>Download CV <Download size={14} /></a>
              </div>
              <dl className="kpis">
                {heroStats.map((s) => <div key={s.label}><dd>{s.value}</dd><dt>{s.label}</dt></div>)}
              </dl>
            </div>

            <div className="console">
              <div className="console-bar">
                <i /><i /><i />
                <span className="mono">zaidan.profile</span>
                <span className="mono live"><span className="dot" />Jakarta <span className="tab"><Clock /></span></span>
              </div>
              <div className="bgfx" aria-hidden="true" />
              <Image className="photo" src={profile.photo.src} alt={profile.photo.alt} width={profile.photo.width} height={profile.photo.height} priority sizes="(max-width: 980px) 90vw, 480px" />
              <div className="chip c1"><span className="mono">Studying</span><b>CS, {education[0].school}</b></div>
              <div className="chip c2"><span className="mono">Open to</span><b>{profile.openToShort}</b></div>
              <div className="chip c3">
                <span className="mono">Stack</span>
                <span className="stack">{["Next.js", "NestJS", "Postgres", "Supabase", "Kotlin"].map((t) => <span key={t}>{t}</span>)}</span>
              </div>
            </div>
          </div>
        </section>

        <nav className="strip" aria-label="Products">
          <div className="wrap">
            <span className="mono">Built</span>
            {projects.map((p) => <Link key={p.slug} href={`/work#${p.slug}`}>{p.name}</Link>)}
          </div>
        </nav>

        {/* ---------- capabilities ---------- */}
        <section className="sec" id="capabilities" aria-labelledby="cap-title">
          <div className="wrap">
            <div className="head">
              <div><span className="eyebrow">Capabilities</span><h2 id="cap-title" data-rv>One engineer across every layer of the product</h2></div>
              <p data-rv>Each tool is listed with the project where I used it, so you can check it.</p>
            </div>
            <div className="bento">
              <article className="card span-4" data-rv>
                <div className="arch">
                  <div>
                    <div className="ic">{capIcons[0]}</div>
                    <h3>{arch.title}</h3>
                    <p>{arch.text}</p>
                    <div className="tags">{arch.tools.map(([t, where]) => <span key={t} title={where}>{t}</span>)}</div>
                  </div>
                  <svg viewBox="0 0 360 200" role="img" aria-label="Diagram: web and Android clients talk to an API, which reads and writes Postgres and a payment provider">
                    <g fill="none" stroke="rgba(255,255,255,.14)">
                      <rect x="10" y="20" width="100" height="44" rx="8" fill="#17171a" />
                      <rect x="10" y="136" width="100" height="44" rx="8" fill="#17171a" />
                      <rect x="150" y="78" width="80" height="44" rx="8" fill="#1d1a15" stroke="rgba(224,168,90,.5)" />
                      <rect x="270" y="20" width="80" height="44" rx="8" fill="#17171a" />
                      <rect x="270" y="136" width="80" height="44" rx="8" fill="#17171a" />
                    </g>
                    <g fill="none" stroke="#e0a85a" strokeWidth="1.2">
                      <path className="flow" d="M110 42 C130 42 130 92 150 92" />
                      <path className="flow" d="M110 158 C130 158 130 108 150 108" />
                      <path className="flow" d="M230 92 C250 92 250 42 270 42" />
                      <path className="flow" d="M230 108 C250 108 250 158 270 158" />
                    </g>
                    <text x="22" y="40">Web</text><text className="sub" x="22" y="54">Next.js</text>
                    <text x="22" y="156">Android</text><text className="sub" x="22" y="170">Kotlin</text>
                    <text x="162" y="98">API</text><text className="sub" x="162" y="112">NestJS</text>
                    <text x="282" y="40">Postgres</text><text className="sub" x="282" y="54">Supabase</text>
                    <text x="282" y="156">Payments</text><text className="sub" x="282" y="170">QRIS</text>
                  </svg>
                </div>
              </article>
              {caps.map((c, i) => (
                <article className="card span-2" key={c.title} data-rv>
                  <div className="ic">{capIcons[i + 1]}</div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <div className="tags">{c.tools.map(([t, where]) => <span key={t} title={where}>{t}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- leadership: FundChain ---------- */}
        <section className="sec tight" id="lead" aria-labelledby="lead-title">
          <div className="wrap">
            <div className="head">
              <div><span className="eyebrow">Case: {fundchain.name} · Tech Lead</span><h2 id="lead-title" data-rv>How I lead a product team, from spec to production</h2></div>
              <p data-rv>{fundchain.summary}</p>
            </div>
            <LeadSim />
            <dl className="lead-stats">
              {fundchain.stats.map((s) => <div key={s.label}><dd>{s.value}</dd><dt>{s.label}</dt></div>)}
            </dl>
            <div className="acts cs-acts"><Link className="btn primary" href="/work/fundchain">Read the full case study <ArrowRight size={14} /></Link></div>
          </div>
        </section>

        {/* ---------- featured work ---------- */}
        <section className="sec tight" id="work" aria-labelledby="work-title">
          <div className="wrap">
            <div className="head">
              <div><span className="eyebrow">Featured case</span><h2 id="work-title" data-rv>An exam platform built so no answer is lost</h2></div>
              <Link className="btn" href="/work">All {projects.length} products <ArrowRight size={14} /></Link>
            </div>
            <article className="case" data-rv>
              <figure>
                <Image src={passinglab.shots[0].src} alt={passinglab.shots[0].alt} width={passinglab.shots[0].width} height={passinglab.shots[0].height} sizes="(max-width: 980px) 100vw, 700px" />
              </figure>
              <div className="body">
                <span className="mono">{passinglab.kind} · {passinglab.when} · {passinglab.role}</span>
                <h3>{passinglab.name}</h3>
                <p>{passinglab.summary}</p>
                <ul className="checks">{passinglab.points.slice(0, 3).map((pt) => <li key={pt}><Check />{pt}</li>)}</ul>
                <dl className="grid-stats">
                  {passinglabStats.map((s) => <div key={s.label}><dd>{s.value}</dd><dt>{s.label}</dt></div>)}
                </dl>
                <Link className="btn primary" href="/work#passinglab">See the details <ArrowRight size={14} /></Link>
              </div>
            </article>
          </div>
        </section>

        {/* ---------- experience ---------- */}
        <section className="sec tight" id="experience" aria-labelledby="exp-title">
          <div className="wrap">
            <div className="head"><div><span className="eyebrow">Experience</span><h2 id="exp-title" data-rv>Paid work for clients and teams since 2022</h2></div></div>
            <div className="tl" data-rv>
              {experience.map((e) => (
                <div key={e.role + e.org}>
                  <span className="mono when">{e.when}</span>
                  <span><b>{e.role}</b><span className="org">{e.org} · {e.where}</span></span>
                  <p>{e.text}</p>
                  <span className="type">{e.type}</span>
                </div>
              ))}
            </div>
            <div className="edu" data-rv>
              {education.map((e) => (
                <div key={e.school}><span className="mono">{e.when}</span><b>{e.school}</b><span>{e.what}</span></div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Contact />
    </>
  );
}
