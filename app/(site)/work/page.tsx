import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Barcode } from "@/components/site/Barcode";
import { Contact } from "@/components/site/Contact";
import { KaiCashFan } from "@/components/site/KaiCashFan";
import { ProjectDetail } from "@/components/site/ProjectDetail";
import { ArrowUpRight, ChevronLeft } from "@/components/site/icons";
import { aegisescrow, collatera, hakaikol, hakaimusic, hakaitask, kaicash, kaicashFeatures, passinglab, passinglabStats, profile, projects } from "@/content/site";

export const metadata: Metadata = {
  title: "All work",
  description: `Every product ${profile.name} has taken from an idea to production: ${projects.map((p) => p.name).join(", ")}.`,
  alternates: { canonical: "/work" },
};

const Go = () => (
  <span className="gg">
    <ArrowUpRight size={14} stroke={2.6} />
  </span>
);

export default function WorkPage() {
  return (
    <>
      <a className="skip" href="#list">Skip to the list</a>

      <header className="wtop">
        <div className="p-top">
          <Link className="back" href="/"><ChevronLeft />Back to home</Link>
          <nav aria-label="Projects">
            {projects.map((p) => <a key={p.slug} href={`#${p.slug}`}>{p.name}</a>)}
            <a className="keep" href="#contact">Contact</a>
          </nav>
        </div>
        <div className="wtop-in">
          <div>
            <span className="sec-tag" style={{ color: "var(--black)" }}><span className="kj" lang="ja" style={{ color: "#fff" }}>作品一覧</span>{profile.name}</span>
            <h1 style={{ marginTop: 12 }}>All work</h1>
            <p className="sub">Every product I have taken from an idea to production, with what I did on each.</p>
            <Barcode seed={909} />
            <div className="stats">
              <span className="pill black">{projects.length} products</span>
              <span className="pill">1 in progress</span>
              <span className="pill line">Web and Android</span>
            </div>
          </div>
          <div className="art" data-in>
            <Image src="/img/p-oni-warrior.jpg" alt="A warrior in a red oni demon mask with long white hair, holding a club" width={1400} height={1638} priority sizes="(max-width: 900px) 100vw, 45vw" />
            <div className="hud" aria-hidden="true"><i /><i /><i /><i /><b><span className="kj">鬼</span>ONI-04 HOSTILE</b></div>
            <span className="vk kj" aria-hidden="true">鬼</span>
          </div>
        </div>
      </header>

      <div className="sheet" style={{ borderRadius: 0, marginTop: 0 }}>
        <main>
          <section className="idx" id="list" aria-labelledby="list-title">
            <span className="sec-tag"><span className="kj" lang="ja">一覧</span>Index</span>
            <h2 id="list-title">Projects</h2>
            <ol>
              {projects.map((p) => (
                <li key={p.slug}>
                  <a href={`#${p.slug}`}>
                    <span className="th">
                      {p.shots[0] ? <Image src={p.shots[0].src} alt="" width={112} height={112} sizes="56px" /> : <span className="kj th-kj">話</span>}
                    </span>
                    <strong>{p.name}{p.team && <em className="team">Team</em>}</strong>
                    <span className="kind">{p.kind}</span>
                    <span className="when">{p.when}</span>
                    <Go />
                  </a>
                </li>
              ))}
              <li>
                <a href="#next">
                  <span className="th" style={{ background: "var(--black)", display: "grid", placeItems: "center" }}>
                    <span className="kj" style={{ color: "var(--red)", fontSize: 26 }}>次</span>
                  </span>
                  <strong>Next build</strong>
                  <span className="kind">In progress</span>
                  <span className="when">{profile.nextOpening}</span>
                  <Go />
                </a>
              </li>
            </ol>
          </section>

          <section className="pl" id="passinglab" aria-labelledby="pl-title">
            <span className="wm kj" aria-hidden="true">試験</span>
            <div className="pl-head">
              <div>
                <span className="sec-tag" data-rv><span className="kj" lang="ja">試験</span>{passinglab.kind}, {passinglab.when}, featured</span>
                <h2 id="pl-title" data-rv>{passinglab.name}</h2>
                <p className="what" data-rv>{passinglab.summary}</p>
              </div>
              <a className="pill red" href={passinglab.url} target="_blank" rel="noopener" data-rv>Visit {passinglab.name} <ArrowUpRight /></a>
            </div>
            <div className="pl-main">
              <figure className="browser" data-rv>
                <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>passinglab.id/demo</span></div>
                <Image src={passinglab.shots[0].src} alt={passinglab.shots[0].alt} width={1440} height={900} sizes="(max-width: 1080px) 100vw, 62vw" />
              </figure>
              <dl className="pl-stats">
                {passinglabStats.map((s) => (
                  <div key={s.label} data-rv><dt>{s.label}</dt><dd>{s.value}</dd></div>
                ))}
              </dl>
            </div>
            <div className="pl-foot">
              <div className="pl-shots" data-rv>
                {passinglab.shots.slice(1).map((s) => (
                  <Image key={s.src} src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 1080px) 50vw, 26vw" />
                ))}
              </div>
              <div className="info">
                <ul data-rv>{passinglab.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <dl data-rv>
                  <dt>My part</dt><dd>{passinglab.role}</dd>
                  <dt>Built with</dt><dd>{passinglab.stack.join(", ")}</dd>
                </dl>
              </div>
            </div>
          </section>

          <ProjectDetail project={hakaikol} label={`${hakaikol.kind}, ${hakaikol.when}`} />



          <section className="ht" id="hakaitask" aria-labelledby="ht-title">
            <div className="ht-shots" data-rv>
              {hakaitask.shots.map((s) => (
                <Image key={s.src} src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 900px) 100vw, 45vw" />
              ))}
            </div>
            <div className="info">
              <span className="sec-tag" data-rv><span className="kj" lang="ja">話</span>{hakaitask.kind}, {hakaitask.when}</span>
              <h2 id="ht-title" data-rv>{hakaitask.name}</h2>
              <p className="what" data-rv>{hakaitask.summary}</p>
              <ul data-rv>{hakaitask.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              <dl data-rv>
                <dt>My part</dt><dd>{hakaitask.role}</dd>
                <dt>Team</dt><dd>{hakaitask.team}</dd>
                <dt>Built with</dt><dd>{hakaitask.stack.join(", ")}</dd>
              </dl>
              <a className="pill black" href={hakaitask.url} target="_blank" rel="noopener" style={{ alignSelf: "flex-start" }} data-rv>Open {hakaitask.name} <ArrowUpRight /></a>
            </div>
          </section>

          <section className="hm" id="hakaimusic" aria-labelledby="hm-title">
            <span className="wm kj" aria-hidden="true">音</span>
            <div className="hm-txt">
              <span className="sec-tag" data-rv><span className="kj" lang="ja">音</span>{hakaimusic.kind}, {hakaimusic.when}</span>
              <h2 id="hm-title" data-rv>{hakaimusic.name}</h2>
              <p className="what" data-rv>{hakaimusic.summary}</p>
              <ol className="hm-points">
                {hakaimusic.points.map((p) => <li key={p} data-rv>{p}</li>)}
              </ol>
              <div className="meta" data-rv>
                <span className="pill">{hakaimusic.role}</span>
                {hakaimusic.stack.slice(0, 4).map((t) => <span className="pill" key={t}>{t}</span>)}
              </div>
              <a className="pill lime" href={hakaimusic.url} target="_blank" rel="noopener" data-rv>View the source <ArrowUpRight /></a>
            </div>
            <div className="hm-row" data-in>
              {hakaimusic.shots.map((s) => (
                <figure key={s.src}>
                  <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 900px) 46vw, 200px" />
                </figure>
              ))}
            </div>
          </section>

          <section className="kc" id="kaicash" aria-labelledby="kc-title">
            <span className="wm kj" aria-hidden="true">携</span>
            <div className="txt">
              <span className="sec-tag" data-rv><span className="kj" lang="ja">携</span>{kaicash.kind}, {kaicash.when}</span>
              <h2 id="kc-title" data-rv>{kaicash.name}</h2>
              <p className="what" data-rv>{kaicash.summary}</p>
              <div className="feats">
                {kaicashFeatures.map((f) => (
                  <div className="feat" data-rv key={f.title}>
                    <span className="kj" lang="ja">{f.kanji}</span>
                    <div><b>{f.title}</b><span>{f.text}</span></div>
                  </div>
                ))}
              </div>
              <div className="meta" data-rv>
                <span className="pill">{kaicash.role}</span>
                {kaicash.stack.slice(0, 3).map((t) => <span className="pill" key={t}>{t}</span>)}
              </div>
            </div>
            <div className="stage">
              <span className="ring" aria-hidden="true" />
              <span className="ring" aria-hidden="true" />
              <span className="tag">KAICASH, 5 SCREENS</span>
              <KaiCashFan shots={kaicash.shots} />
              <div className="cap"><span>Tap a screen to open it</span><span>Android</span></div>
            </div>
          </section>

          <section className="strip" aria-labelledby="kc-screens">
            <h3 id="kc-screens">{kaicash.name}, screen by screen</h3>
            <div className="row">
              {kaicash.shots.map((s, i) => (
                <figure key={s.src}>
                  <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="220px" />
                  <figcaption>{["Home and balance", "Add a record", "History by date", "Spending analytics", "Pair with a parent"][i]}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="teamhead" aria-labelledby="team-title">
            <span className="sec-tag" data-rv><span className="kj" lang="ja">共同</span>With a team</span>
            <h2 id="team-title" data-rv>Team projects</h2>
            <p data-rv>Built with classmates and hackathon teammates. On both, I was the full-stack engineer.</p>
          </section>
          <ProjectDetail project={collatera} label={`${collatera.kind}, ${collatera.when}`} />
          <ProjectDetail project={aegisescrow} label={`${aegisescrow.kind}, ${aegisescrow.when}`} dark />

          <section className="next" id="next" aria-labelledby="next-title" data-in>
            <span className="kj" aria-hidden="true">次</span>
            <div>
              <h2 id="next-title">Next build</h2>
              <p>Something new is being built right now. It ships in {profile.nextOpening}.</p>
              <div className="bar" role="img" aria-label="About two thirds done"><i /></div>
            </div>
            <a className="pill black" href="#contact">Get early access</a>
          </section>
        </main>

        <Contact backHome />
      </div>
    </>
  );
}
