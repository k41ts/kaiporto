import Image from "next/image";
import Link from "next/link";
import { Band } from "@/components/site/Band";
import { Barcode } from "@/components/site/Barcode";
import { Clock } from "@/components/site/Clock";
import { CopyEmail } from "@/components/site/CopyEmail";
import { Decode } from "@/components/site/Decode";
import { IdeaForm } from "@/components/site/IdeaForm";
import { PosterFx } from "@/components/site/PosterFx";
import { Contact } from "@/components/site/Contact";
import { ProjectDetail } from "@/components/site/ProjectDetail";
import { ArrowRight, ArrowUpRight, Burst, Chevrons, ChevronRight, Download, GitHub, Instagram, LinkedIn, Mark } from "@/components/site/icons";
import { education, experience, loadout, passinglab, profile } from "@/content/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#about">Skip to introduction</a>

      {/* ===================== 1 · the red oni poster ===================== */}
      <header className="poster" id="top">
        <div className="bgfx" aria-hidden="true">
          <div className="rays" />
          <span className="oni kj">鬼</span>
          <div className="dots" />
          <div className="dots l" />
          <svg className="dial" viewBox="0 0 800 800">
            <circle className="r1" cx="400" cy="400" r="390" />
            <circle className="r2" cx="400" cy="400" r="330" />
            <circle className="r3" cx="400" cy="400" r="270" />
            <path id="arc" d="M400 40 a360 360 0 1 1 -0.1 0" fill="none" />
            <text>
              <textPath href="#arc">FULL-STACK ENGINEER  JAKARTA  UTC+7  ZAIDAN IKRAM  2026  </textPath>
            </text>
          </svg>
        </div>

        <div className="p-top">
          <span>
            Jakarta, <Clock /> WIB<span className="kata" lang="ja">{profile.katakana}</span>
          </span>
          <nav aria-label="Sections">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <Link href="/work">Work</Link>
            <a className="keep" href="#contact">Contact</a>
          </nav>
        </div>
        <p className="p-title" aria-hidden="true" style={d(0)}>{profile.name}</p>
        <div className="p-rule" />

        <div className="p-mid">
          <Barcode seed={2026} style={d(120)} />
          <div className="vkanji" aria-hidden="true" style={d(220)}>
            <span className="small kj">フルスタック</span>
            <Decode className="big kj" text="般若" when="mount" />
            <span className="yr">2026</span>
          </div>

          <div className="mask" id="mask" style={d(160)}>
            <Image src="/img/g-hannya-red.jpg" alt="A matte black hannya mask with curved horns and braided cords, lit red from the side, with glowing eyes and lines of light" width={848} height={1264} priority sizes="(max-width: 760px) 90vw, 620px" />
            <Image className="g g1" src="/img/g-hannya-red.jpg" alt="" width={848} height={1264} sizes="(max-width: 760px) 90vw, 620px" />
            <Image className="g g2" src="/img/g-hannya-red.jpg" alt="" width={848} height={1264} sizes="(max-width: 760px) 90vw, 620px" />
            <span className="scan" aria-hidden="true" />
            <svg className="wires" viewBox="0 0 848 1264" aria-hidden="true">
              <defs>
                <filter id="blur" x="-1" y="-1" width="3" height="3"><feGaussianBlur stdDeviation="9" /></filter>
              </defs>
              <path id="w3" className="w" d="M182 640 H92 V820 H-240" style={{ "--d": ".9s" } as React.CSSProperties} />
              <path id="w4" className="w" d="M666 640 H760 V780 H1080" style={{ "--d": "1.05s" } as React.CSSProperties} />
              <g>
                <rect className="node" x="174" y="632" width="16" height="16" />
                <rect className="node" x="658" y="632" width="16" height="16" />
              </g>
              <circle className="pulse" r="6"><animateMotion dur="3s" repeatCount="indefinite" begin="3.3s"><mpath href="#w3" /></animateMotion></circle>
              <circle className="pulse" r="6"><animateMotion dur="2.8s" repeatCount="indefinite" begin="3.6s"><mpath href="#w4" /></animateMotion></circle>
              <circle className="halo" cx="328" cy="513" r="34" filter="url(#blur)" />
              <circle className="halo" cx="520" cy="513" r="34" filter="url(#blur)" />
              <circle className="eye" cx="328" cy="513" r="11" />
              <circle className="eye" cx="520" cy="513" r="11" />
              <path className="bracket" d="M150 250 V176 H226 M622 176 H698 V250 M698 846 V920 H622 M226 920 H150 V846" />
              <text x="716" y="300"><tspan className="kj">般若</tspan></text>
              <text x="716" y="334">HANNYA-01</text>
              <text x="716" y="364">LOCKED</text>
            </svg>
          </div>

          <div className="lcol">
            <div className="box made" style={d(320)}>
              <Mark />
              <p>Built<b>by a human</b></p>
            </div>
            <div className="box word-l" style={d(400)}>
              <p className="stack-word" aria-hidden="true"><span>Full</span><span>Stack</span></p>
            </div>
            <div className="box samurai" style={d(460)} aria-hidden="true">
              <span className="kj">侍</span>
              <span>One engineer,<br />every layer</span>
            </div>
          </div>
        </div>

        <div className="p-foot">
          <div className="card-cut" style={d(520)}>
            <Burst />
            <h1>{profile.name}<small>{profile.role}</small></h1>
          </div>
          <div className="warn" style={d(600)}>
            <p><b>Warning:</b> this engineer ships to production. Use with a clear brief, a real deadline, and the patience to hear what should not be built.</p>
            <div className="acts">
              <a className="pill red" href="#about">Meet Kai</a>
              <a className="pill" href="#work">See the work</a>
              <a className="pill" href={profile.cv} download>Download CV <Download /></a>
            </div>
          </div>
        </div>
        <PosterFx />
      </header>

      {/* ===================== 2 · the sheet that slides over ===================== */}
      <div className="sheet">
        <main>
          <section className="frame" id="about" aria-labelledby="about-title">
            <svg className="wire" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="#ececf0" strokeWidth="1.2">
                <circle cx="560" cy="430" r="220" /><circle cx="560" cy="430" r="330" /><circle cx="560" cy="430" r="460" />
                <path d="M0 640 L1000 360 M0 700 L1000 420 M0 760 L1000 480" />
              </g>
            </svg>
            <span className="ghost" aria-hidden="true">自己紹介</span>

            <div className="bar">
              <a className="logo" href="#top"><span className="kj">侍</span>Z KAI</a>
              <nav className="navpill" aria-label="Sections">
                <a href="#about">About</a><a href="#skills">Skills</a><a href="#work">Featured</a><Link href="/work">All work</Link><a href="#contact">Contact</a>
              </nav>
              <div className="tools-r">
                <CopyEmail className="ibtn" icon />
                <a className="ibtn" href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn profile"><LinkedIn /></a>
                <a className="ibtn soc" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub profile"><GitHub /></a>
                <a className="ibtn soc" href={profile.instagram} target="_blank" rel="noopener" aria-label="Instagram profile"><Instagram /></a>
                <a className="ibtn" href={profile.cv} download aria-label="Download my CV"><Download size={17} /></a>
                <a className="me" href="#contact">
                  <Image src={profile.photo.src} alt="" width={72} height={72} sizes="36px" />
                  Hire me
                  <ChevronRight />
                </a>
              </div>
            </div>

            <div className="lead">
              <div>
                <span className="sec-tag" data-rv><span className="kj" lang="ja">自己紹介</span>About me</span>
                <h2 id="about-title" data-rv>I build software from the first plan to production</h2>
              </div>
              <a className="pill red" href="#contact" data-rv>Let’s talk <ArrowRight /></a>
            </div>

            <div className="bento">
              <div className="t t-black" data-rv>
                <span className="wm kj" aria-hidden="true">侍</span>
                <span className="tag">About</span>
                <p className="kicker">Call me {profile.nickname}</p>
                <h3>{profile.intro}</h3>
                <div className="rows">
                  <a href="#work">See what I have built <ArrowUpRight stroke={2} /></a>
                  <a href="#contact">Start a project with me <ArrowUpRight stroke={2} /></a>
                  <a href={profile.cv} download>Download my CV <Download /></a>
                </div>
                <span className="notch">
                  <a className="circle" href="#work" aria-label="Go to my work"><ArrowUpRight size={22} /></a>
                </span>
              </div>

              <figure className="t t-photo" data-rv style={{ margin: 0 }}>
                <Image src={profile.photo.src} alt={profile.photo.alt} width={3024} height={4032} sizes="(max-width: 760px) 100vw, 320px" />
                <figcaption className="pill">This is me</figcaption>
              </figure>

              <div className="t t-status" data-rv>
                <span className="wm kj" aria-hidden="true">今</span>
                <h3>Status</h3>
                <dl>
                  <div><dt>Right now</dt><dd className="live">Taking projects</dd></div>
                  <div><dt>Open to</dt><dd>{profile.openTo}</dd></div>
                  <div><dt>Jakarta time</dt><dd><Clock suffix=" WIB" /></dd></div>
                  <div><dt>Replies</dt><dd>Within a day</dd></div>
                </dl>
                <a className="pill black" href="#contact">Book a call</a>
              </div>

              <div className="t t-big" data-rv>
                <Image src="/img/g-oni-white.jpg" alt="A white oni mask with long red horns and painted red accents, resting on a rusted iron grate" width={1024} height={1024} sizes="(max-width: 1080px) 100vw, 55vw" />
                <div className="hud" aria-hidden="true"><i /><i /><i /><i /><b><span className="kj">鬼</span>ONI-02 TRACKED</b></div>
                <div className="tl">
                  <span className="pill">Jakarta, UTC+7</span>
                  <span className="pill line"><span className="dot" />Open to roles, 2027</span>
                </div>
                <div className="glass"><small>Full stack</small><p>Every layer of the product, built by one engineer.</p></div>
                <a className="circle" href="#skills" aria-label="See my tools"><ArrowUpRight size={26} /></a>
              </div>
            </div>
          </section>

          <Band />

          {/* ---------- loadout ---------- */}
          <section className="loadout" id="skills" aria-labelledby="skills-title">
            <div className="head">
              <div>
                <span className="sec-tag" data-rv><span className="kj" lang="ja">技術</span>Skills</span>
                <h2 id="skills-title" data-rv>My loadout</h2>
              </div>
              <p data-rv>Five layers of a product, and the tools I use for each. Every tool is tagged with where I used it.</p>
            </div>
            <div className="mods">
              {loadout.map((m) => (
                <article className="mod" data-rv key={m.title}>
                  <span className="scanl" />
                  <span className="wm kj" aria-hidden="true">{m.kanji}</span>
                  <div className="k"><Decode className="kj" text={m.kanji} /><small>{m.reading}</small></div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  <ul>
                    {m.tools.map(([tool, where]) => (
                      <li key={tool}><span>{tool}</span><span>{where}</span></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* ---------- experience ---------- */}
          <section className="exp" id="experience" aria-labelledby="exp-title">
            <div className="exp-head">
              <span className="sec-tag" data-rv><span className="kj" lang="ja">経歴</span>Experience</span>
              <h2 id="exp-title" data-rv>Where I have worked</h2>
              <p data-rv>Over three years of building for clients, teams, and my own products.</p>
            </div>
            <ol className="exp-list">
              {experience.map((e) => (
                <li key={e.role + e.org} data-rv>
                  <span className="when">{e.when}</span>
                  <div>
                    <h3>{e.role}</h3>
                    <p className="org">{e.org}<span className="pill">{e.type}</span></p>
                    <p>{e.text}</p>
                  </div>
                  <span className="where">{e.where}</span>
                </li>
              ))}
            </ol>
            <div className="edu" data-rv>
              <span className="sec-tag"><span className="kj" lang="ja">学歴</span>Education</span>
              {education.map((e) => (
                <div key={e.school}><b>{e.school}</b><span>{e.what}</span><small>{e.when}</small></div>
              ))}
            </div>
          </section>

          {/* ---------- featured work ---------- */}
          <section className="work" id="work" aria-labelledby="work-title">
            <div className="w-left">
              <div className="tabs">
                <strong><span className="kj" lang="ja">作品</span>WORK</strong>
                <Link className="pill" href="/work"><span className="ring" />All projects</Link>
              </div>
              <span className="sec-tag" data-rv style={{ marginTop: "clamp(20px,4vw,64px)" }}><span className="kj" lang="ja">推し</span>Featured project</span>
              <h2 id="work-title" data-rv style={{ marginTop: 0 }}>{passinglab.name}, the one I am proudest of</h2>
              <span className="pill date" data-rv>Live since Mar 2026</span>
              <p className="lead-s" data-rv>A paid UTBK tryout platform I rewrote alone, from the old Laravel app to Next.js, without losing a single answer.</p>
              <p className="big" data-rv>
                More products on one page{" "}
                <Link className="pill black" href="/work">See all work <span className="go"><Chevrons /></span></Link>
              </p>
            </div>

            <div className="w-mid">
              <IdeaForm />
              <div className="w-hero" data-rv>
                <Image className="r" src="/img/p-oni-samurai.jpg" alt="A warrior in a red oni mask, white mane and black and gold armour" width={1333} height={1800} sizes="(max-width: 1080px) 100vw, 40vw" />
                <div className="hud" aria-hidden="true"><i /><i /><i /><i /><b><span className="kj">鬼</span>ONI-03 IDENTIFIED</b></div>
                <div className="glass">
                  <small>Featured</small>
                  <p>{passinglab.name}: 1,604 questions across 7 UTBK subtests, with a timer the server owns.</p>
                  <div className="row">
                    <span className="faces">
                      {passinglab.shots.map((s) => (
                        <Image key={s.src} src={s.src} alt="" width={60} height={60} sizes="30px" />
                      ))}
                      <span>3 screens</span>
                    </span>
                    <a className="ibtn" href="#passinglab" aria-label="See PassingLab details"><ArrowUpRight size={14} /></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-right">
              <div className="tools-r"><a className="pill black" href="#top">Back to top</a></div>
              <a className="card-w" href="#passinglab" style={{ textDecoration: "none" }} data-rv>
                <span className="shot">
                  <Image src={passinglab.shots[0].src} alt={passinglab.shots[0].alt} width={passinglab.shots[0].width} height={passinglab.shots[0].height} sizes="(max-width: 1080px) 50vw, 25vw" />
                </span>
                <h3>{passinglab.name} <span>Web, 2026</span></h3>
                <span className="tg">{["Next.js", "React", "Drizzle", "Supabase"].map((t) => <span key={t}>{t}</span>)}</span>
              </a>
              <div className="sched" data-rv>
                <h3>Project timeline</h3>
                <a href="#passinglab"><i /><span className="pill">PassingLab</span><span className="when">Mar 2026 to now</span><span className="gg"><Chevrons size={10} stroke={3} /></span></a>
                <Link href="/work#hakaikol"><i /><span className="pill">HakaiKOL</span><span className="when">2026 to now</span><span className="gg"><Chevrons size={10} stroke={3} /></span></Link>
                <Link href="/work#hakaitask"><i /><span className="pill">HakaiTask</span><span className="when">Aug 2026</span><span className="gg"><Chevrons size={10} stroke={3} /></span></Link>
                <Link href="/work#hakaimusic"><i /><span className="pill">HakaiMusic</span><span className="when">2026 to now</span><span className="gg"><Chevrons size={10} stroke={3} /></span></Link>
                <Link href="/work#kaicash"><i /><span className="pill">KaiCash</span><span className="when">2026</span><span className="gg"><Chevrons size={10} stroke={3} /></span></Link>
                <Link href="/work#next"><i style={{ background: "var(--navy)" }} /><span className="pill">Next build</span><span className="when">{profile.nextOpening}</span><span className="gg"><Chevrons size={10} stroke={3} /></span></Link>
              </div>
            </div>
          </section>

          <ProjectDetail project={passinglab} label={`${passinglab.kind}, ${passinglab.when}, featured`} />
        </main>

        <Contact />
      </div>
    </>
  );
}

