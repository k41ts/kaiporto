import type { Metadata } from "next";
import Image from "next/image";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer, technical partner, and full-stack developer — three roles, one person. Here is what each of them actually means.",
  alternates: { canonical: "/about" },
};

export const revalidate = 60;

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <>
      <section className="hero" data-reveal>
        <div className="hero-photo">
          <Image
            src={profile.photo}
            alt={profile.photoAlt}
            width={352}
            height={352}
            priority
            sizes="(max-width: 720px) 132px, 184px"
          />
        </div>
        <div className="hero-copy">
          <span className="eyebrow">About</span>
          <h1>Three roles, one person</h1>
          <div className="prose">
            {profile.bio.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
            <p>
              Based in {profile.location}. The two situations people usually come to me with: something
              needs to be built from nothing, or an existing system has stopped keeping up with the
              people using it.
            </p>
          </div>
        </div>
      </section>

      <section className="role-row" data-reveal>
        {profile.roles.map((role) => (
          <div className="role g-card" key={role.key}>
            <span className="k">{role.key}</span>
            <span className="t">{role.title}</span>
            <span className="d">{role.description}</span>
          </div>
        ))}
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="section-head">
          <h2>What I reach for</h2>
        </div>
        <div className="chips">
          {profile.skills.map((skill) => (
            <span className="chip" key={skill}>
              {skill}
            </span>
          ))}
        </div>
        <p className="note">
          This is a list of tools, not an identity. If a project would be better served by something
          else, I will say so early.
        </p>
      </section>
    </>
  );
}
