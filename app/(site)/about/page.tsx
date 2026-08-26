import type { Metadata } from "next";
import Image from "next/image";
import { getProfile } from "@/lib/content";

/** Deskripsinya dirakit dari kartu peran, jadi nambah atau ganti peran di Studio
 *  nggak ninggalin daftar lama di hasil pencarian. */
export async function generateMetadata(): Promise<Metadata> {
  const { roles } = await getProfile();
  const titles = roles.map((role) => role.title.toLowerCase());
  const list =
    titles.length > 1 ? `${titles.slice(0, -1).join(", ")}, and ${titles.at(-1)}` : titles[0] ?? "";

  return {
    title: "About",
    description: `Zaidan Ikram — ${list}. What each of those means in practice.`,
    alternates: { canonical: "/about" },
  };
}

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
          <h1>One person, end to end</h1>
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

      <section className="role-row" data-reveal data-cols={profile.roles.length}>
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
