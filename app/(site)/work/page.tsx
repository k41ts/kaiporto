import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Contact } from "@/components/site/Contact";
import { Nav } from "@/components/site/Nav";
import { ProjectDetail } from "@/components/site/ProjectDetail";
import { ArrowRight, ArrowUpRight } from "@/components/site/icons";
import { fundchain, passinglab, passinglabStats, profile, projects } from "@/content/site";

export const metadata: Metadata = {
  title: "All work",
  description: `Every product ${profile.name} has taken from an idea to production: ${projects.map((p) => p.name).join(", ")}.`,
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <a className="skip" href="#list">Skip to the list</a>
      <Nav page="work" />

      <main id="main">
        <header className="wtop">
          <div className="wrap">
            <span className="eyebrow">All work · {projects.length} products</span>
            <h1>Every product, from idea to production</h1>
            <p>Web platforms, Android apps and on-chain prototypes, with what I did on each. Click any screenshot to see it full size.</p>
          </div>
        </header>

        <section className="wrap" id="list" aria-label="Project index">
          <ol className="idx">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <a href={`#${p.slug}`}>
                  <span className="mono n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="th">{p.shots[0] && <Image src={p.shots[0].src} alt="" width={112} height={80} sizes="56px" />}</span>
                  <span><strong>{p.name}</strong>{p.team && <em>Team</em>}</span>
                  <span className="kind">{p.kind}</span>
                  <span className="when mono">{p.when}</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
            ))}
          </ol>
        </section>

        {projects.map((p) => (
          <ProjectDetail
            key={p.slug}
            project={p}
            label={`${p.kind} · ${p.when}${p.slug === passinglab.slug ? " · Featured" : ""}`}
            stats={p.slug === passinglab.slug ? passinglabStats : undefined}
          />
        ))}

        <div className="wrap">
          <div className="next" id="fundchain">
            <div>
              <span className="eyebrow">Leadership</span>
              <h2>{fundchain.name}, as Tech Lead</h2>
              <p>How I took a team of 15 from 27 planning docs to production, shown as a live 3D walkthrough.</p>
            </div>
            <Link className="btn primary" href="/#lead">See the walkthrough <ArrowRight size={14} /></Link>
          </div>
          <div className="next" id="next">
            <div>
              <span className="eyebrow">In progress</span>
              <h2>Next build</h2>
              <p>Something new is being built right now. It ships in {profile.nextOpening}.</p>
            </div>
            <a className="btn" href="#contact">Get early access</a>
          </div>
        </div>
      </main>

      <Contact />
    </>
  );
}
